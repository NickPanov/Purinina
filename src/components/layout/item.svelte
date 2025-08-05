<script lang="ts">
    import Icon from "../icon.svelte";
    import { ProjectManager } from "../../modules/ProjectManager";
    let { name } = $props();
    let pm = new ProjectManager();

    function deleteProject() {
        let confirmDelete: any = document.getElementById(`confirm_delete_01`);

        console.log("deleting", name);
        console.log(confirmDelete);

        if (confirmDelete) {
            confirmDelete.showModal();
        }
    }
    async function deleteConfirmed() {
        let removal = await pm.remove(name);
        let confirmDelete: any = document.getElementById(`confirm_delete_01`);
        if (confirmDelete) {
            confirmDelete.close();
        }
        console.log(removal);
    }
</script>

<li class="list-row">
    <div class="list-col-grow">
        <div>{name}</div>
        <div class="text-xs uppercase font-semibold opacity-80">
            {name} Source Directory
        </div>
    </div>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <div class="tooltip" data-tip="Delete">
        <button class="btn btn-square btn-ghost" onclick={deleteProject}>
            <Icon name="remove"></Icon>
        </button>
    </div>
    <dialog id="confirm_delete_01" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Delete project?</h3>
            <p class="py-4">
                Are you sure you want to delete <strong>{name}</strong>
            </p>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Dismiss</button>
                    <button
                        type="button"
                        class="btn btn-accent"
                        onclick={deleteConfirmed}>Delete</button
                    >
                </form>
            </div>
        </div>
    </dialog>
    <div class="tooltip" data-tip="Select">
        <a href="/project/{name}" class="btn btn-square btn-ghost">
            <Icon name="right"></Icon>
        </a>
    </div>
</li>
