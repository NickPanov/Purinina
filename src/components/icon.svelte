<script lang="ts">
    let { name } = $props();
</script>

{#snippet kebab()}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        ></path>
    </svg>
{/snippet}
{#snippet close()}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
        ></path>
    </svg>
{/snippet}
{#snippet right()}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
{/snippet}
{#snippet remove()}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

{/snippet}
{#snippet error()}
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg> 
{/snippet}
{#snippet success()}
 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
{/snippet}

{#if name === "kebab"}
    {@render kebab()}
{:else if name === "close"}
    {@render close()}
    {:else if name === "right"}
    {@render right()}
       {:else if name === "remove"}
    {@render remove()}
       {:else if name === "remove"}
    {@render remove()}
       {:else if name === "error"}
    {@render error()}
       {:else if name === "success"}
    {@render success()}
{/if}
 
<style>
    svg {
        width: 24px;
        height: 24px;
        fill: none;
        stroke: var(--color-base-content);
          stroke: currentColor;
    } 
</style>    
