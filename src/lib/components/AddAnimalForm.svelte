<script lang="ts">
  import { enhance } from "$app/forms";
  import type { AnimalOption } from "#lib/server/db.ts";

  let {
    animals,
    form,
  }: {
    animals: AnimalOption[];
    form?: { error?: string; success?: boolean; id?: string } | null;
  } = $props();
</script>

{#snippet picker(name: string, label: string)}
  <label>
    {label}
    <select {name}>
      <option value="">— none —</option>
      {#each animals as a}
        <option value={a.id}>{a.name}</option>
      {/each}
    </select>
  </label>
{/snippet}

<form method="POST" action="?/addAnimal" use:enhance>
  <h2>Add animal</h2>

  <label>
    First name *
    <input name="firstName" required />
  </label>

  <label>
    Last name
    <input name="lastName" />
  </label>

  <label>
    Species *
    <input name="species" required />
  </label>

  {@render picker("parent1", "Parent 1")}
  {@render picker("parent2", "Parent 2")}
  {@render picker("marriedTo", "Married to")}

  <label>
    Photo URL
    <input name="photo" type="url" />
  </label>

  <label>
    About
    <textarea name="about" rows="3"></textarea>
  </label>

  <button type="submit">Add</button>

  {#if form?.error}
    <p class="error">{form.error}</p>
  {:else if form?.success}
    <p class="ok">Added "{form.id}"</p>
  {/if}
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 320px;
    padding: 16px;
    font: 14px sans-serif;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .error {
    color: #c00;
  }
  .ok {
    color: #080;
  }
</style>
