<script lang="ts">
    import Icon from "./svg.svelte";
    let { message, type, id } = $props();
</script>

{#snippet success()}
    <div role="alert" class="alert alert-success"> 
        <i class="icon-[solar--check-circle-line-duotone]"></i>
        <span>{@html message}</span>
    </div>
{/snippet}
{#snippet error()}
    <div role="alert" class="alert alert-error">
       <i class="icon-[solar--close-circle-line-duotone]"></i>
        <span>{@html message}</span>
    </div>
{/snippet}
{#if type === "success"}
    {@render success()}
{:else if type === "error"}
    {@render error()}
{/if}

<style>
    .alert {
        margin-bottom: 0.5rem;
    }
</style>
