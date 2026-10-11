<script lang="ts">
  import type { Animal, Family } from "../types";
  import { buildLayout, lineStyle, W, H, PAD } from "../layout";
  import { buildRelations } from "../relations";
  import InfoPanel from "./InfoPanel.svelte";
  import { getAnimal } from "#lib/data.ts";

  let { family, rootId }: { family: Family; rootId: string } = $props();

  const layout = $derived(buildLayout(getAnimal(rootId)));
  const relations = $derived(buildRelations(family));

  let selected = $state.raw<Animal | null>(null);
</script>

<svelte:window onkeydown={(e) => e.key === "Escape" && (selected = null)} />

<div class="layout">
  <div class="scroller">
    <div
      class="canvas"
      style="width:{layout.width}px; height:{layout.height}px"
    >
      {#each layout.lines as line}
        <div class="line" style={lineStyle(line)}></div>
      {/each}

      {#each layout.animals as { animal, x, y }}
        <button
          class="card"
          class:active={selected === animal}
          style="left:{x + PAD}px; top:{y + PAD}px; width:{W}px; height:{H}px"
          onclick={() => (selected = selected === animal ? null : animal)}
        >
          <strong>{animal.firstName}</strong>
          <small>{animal.species}</small>
        </button>
      {/each}
    </div>
  </div>

  {#if selected}
    <InfoPanel
      animal={selected}
      parents={relations.parentsOf.get(selected) ?? []}
      siblings={relations.siblingsOf.get(selected) ?? []}
      onselect={(a) => (selected = a)}
      onclose={() => (selected = null)}
    />
  {/if}
</div>

<style>
  .layout {
    display: flex;
    height: 100vh;
  }
  .scroller {
    flex: 1;
    overflow: auto; /* scroll both axes */
  }
  .canvas {
    position: relative;
    margin: 0 auto;
  }
  .line {
    position: absolute;
    background: #888;
  }
  .card {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    border: 2px solid #888;
    border-radius: 8px;
    background: white;
    color: #111;
    font: 14px sans-serif;
    cursor: pointer;
  }
  .card:hover,
  .card.active {
    border-color: #36c;
  }
  .card.active {
    background: #eef3ff;
  }
  .card small {
    opacity: 0.6;
  }
  @media (max-width: 700px) {
    .layout {
      flex-direction: column;
    }
  }
</style>
