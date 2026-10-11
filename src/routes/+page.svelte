<script>
  import FamilyTree from "#lib/components/FamilyTree.svelte";
  import { family, rootId } from "#lib/data.ts";
</script>

<FamilyTree {family} {rootId} />
