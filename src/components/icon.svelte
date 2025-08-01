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

{#if name === "kebab"}
    {@render kebab()}
{:else if name === "close"}
    {@render close()}
{/if}
 
<style>
    svg {
        width: 24px;
        height: 24px;
        fill: none;
        stroke: var(--color-base-content);
    }
</style>
