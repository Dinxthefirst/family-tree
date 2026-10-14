<script lang="ts">
  import AddAnimalForm from "#lib/components/AddAnimalForm.svelte";
  import FamilyTree from "#lib/components/FamilyTree.svelte";
  import { family, rootId } from "#lib/data.ts";

  let { data, form } = $props();
</script>

<div>
  <div id="title">Descendents of the Great</div>
  <AddAnimalForm animals={data.animals} {form} />
  <FamilyTree {family} {rootId} />
</div>

<style>
  #title {
    font-size: 4rem;
    text-align: center;
    font-family: "Arial";
  }
</style>
