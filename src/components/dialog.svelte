<script lang="ts">
    let {
        reference = $bindable(),
        action,
        confirmation = "Confirm",
        title = "Confirm",
        children,
    } = $props();

    $effect(() => {
        if (reference) {
            reference.showModal?.();
        }
    });
</script>

<dialog class="modal" bind:this={reference}>
    <div class="modal-box">
        <h3 class="text-lg font-bold">{title}</h3>
        <p class="py-4">
            {@render children()}
        </p>
        <div class="modal-action">
            <form method="dialog">
                <button class="btn">Dismiss</button>
                <button type="button" class="btn btn-accent" onclick={action}
                    >{confirmation}</button
                >
            </form>
        </div>
    </div>
</dialog>
