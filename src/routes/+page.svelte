<script>
  import FamilyTree from "#lib/components/FamilyTree.svelte";
  import { family, rootId } from "#lib/data.ts";
</script>

<div>
  <div id="title">Descendents of the Great</div>
  <FamilyTree {family} {rootId} />
</div>

<style>
  #title {
    font-size: 4rem;
    text-align: center;
    font-family: "Arial";
  }
</style>
