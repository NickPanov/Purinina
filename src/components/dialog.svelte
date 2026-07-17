<script lang="ts">
    let {
        reference = $bindable(),
        action = $bindable(),
        confirmation,
        children,
    } = $props();
</script>

<dialog class="modal" bind:this={reference}>
    <div class="modal-box">
        <h3 class="text-lg font-bold">Delete project?</h3>
        <p class="py-4">
            {@render children()}
        </p>
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Dismiss</button>
                <button type="button" class="btn btn-accent" onclick={action}
                    >{confirmation}</button
                >
            </form>
        </div>
    </div>
</dialog>
