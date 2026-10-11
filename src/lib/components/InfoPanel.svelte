<script lang="ts">
  import { fullName, type Animal } from "../types";
  import { getAnimal, getAnimals } from "../data.ts";

  let {
    animal,
    parents,
    siblings,
    onselect,
    onclose,
  }: {
    animal: Animal;
    parents: Animal[];
    siblings: Animal[];
    onselect: (a: Animal) => void;
    onclose: () => void;
  } = $props();

  const kids = $derived(animal.children);
</script>

{#snippet links(list: Animal[])}
  {#each list as a}
    <button class="link" onclick={() => onselect(a)}>{fullName(a)}</button>
  {:else}—{/each}
{/snippet}

<aside class="info" aria-label="Details">
  <header>
    <h2>{fullName(animal)}</h2>
    <button class="close" aria-label="Close" onclick={onclose}>×</button>
  </header>

  <dl>
    <dd>
      <img
        src={animal.photo ??
          "https://www.svgrepo.com/show/451667/image-missing.svg"}
        alt={animal.species}
        width="270"
      />
    </dd>

    <dt>First name</dt>
    <dd>{animal.firstName}</dd>

    <dt>Last name</dt>
    <dd>{animal.lastName ?? "—"}</dd>

    <dt>Species</dt>
    <dd>{animal.species || "—"}</dd>

    <dt>Married to</dt>
    <dd>
      {@render links(animal.marriedTo ? [getAnimal(animal.marriedTo)] : [])}
    </dd>

    <dt>Parents ({parents.length})</dt>
    <dd>{@render links(parents)}</dd>

    <dt>Siblings ({siblings.length})</dt>
    <dd>{@render links(siblings)}</dd>

    <dt>Children ({kids.length})</dt>
    <dd>{@render links(getAnimals(kids))}</dd>

    <dt>About</dt>
    <dd>{animal.about ?? "—"}</dd>
  </dl>
</aside>

<style>
  .info {
    width: 280px;
    flex-shrink: 0;
    padding: 16px;
    overflow: auto;
    border-left: 1px solid #ddd;
    background: white;
    color: #111;
    font: 14px sans-serif;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h2 {
    margin: 0;
    font-size: 18px;
  }
  .close {
    border: none;
    background: none;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
  }
  dt {
    margin-top: 12px;
    font-weight: bold;
  }
  dd {
    margin: 2px 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  img {
    max-width: 100%;
  }
  .link {
    border: none;
    background: none;
    padding: 0;
    color: #36c;
    text-decoration: underline;
    font: inherit;
    cursor: pointer;
  }
  @media (max-width: 700px) {
    .info {
      width: auto;
      max-height: 40vh;
      border-left: none;
      border-top: 1px solid #ddd;
    }
  }
</style>
