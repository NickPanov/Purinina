<script lang="ts">
    import Alert from "./alert.svelte";
    import Dialog from "./dialog.svelte";
    import {
        ToasterArray,
        DialogArray,
        remove,
        removeDialog,
    } from "$modules/Toaster.svelte";
</script>

<div class="toaster">
    {#each ToasterArray as toast (toast.id)}
        <Alert
            message={toast.message}
            type={toast.type}
            id={toast.id}
            callback={remove}
        />
    {/each}
</div>
{#each DialogArray as dialog (dialog.id)}
    <Dialog
        title={dialog.title}
        confirmation={dialog.confirmation}
        action={() => {
            dialog.resolve?.(true);
            dialog.action?.();
            removeDialog(dialog.id);
        }}
    >
        {@html dialog.message}
    </Dialog>
{/each}

<style>
    .toaster {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        z-index: 9999;
    }
</style>
