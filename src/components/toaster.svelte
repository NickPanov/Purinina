<script lang="ts">
    import Alert from "./alert.svelte";
    import { ToasterArray, remove } from "../modules/toaster.svelte";
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

<style>
    .toaster {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        z-index: 9999;
    }
</style>
