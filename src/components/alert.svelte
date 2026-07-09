<script lang="ts">
    import Icon from "./icon.svelte";
    let { message, type, id } = $props();
</script>

{#snippet success()}
    <div role="alert" class="alert alert-success">
        <Icon name="success" />
        <span>{@html message}</span>
    </div>
{/snippet}
{#snippet error()}
    <div role="alert" class="alert alert-error">
        <Icon name="error" />
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
