<script lang="ts">
    import Icon from "../icon.svelte";
    import {
        Project,
        ProjectManager,
    } from "../../modules/ProjectManager.svelte";
    import { toast } from "../../modules/toaster.svelte";

    const { ID } = $props();

    let CurrentProject : any = $state({Name:'default',SourceDir:'default'});
    ProjectManager.get(ID)
        .then((res) => (CurrentProject = res))
        .catch((error) => {throw new Error(error)});

    //Methods
    let confirmDeleteDialog: any;
    function deleteProject() {
        if (confirmDeleteDialog) {
            confirmDeleteDialog.showModal();
        }
    }
    async function deleteConfirmed() {
        ProjectManager.remove(ID)
            .then(() => {
                // Project deleted successfully
                toast.success(`Project ${ID} deleted successfully.`);
            })
            .catch((error) => {
                // Handle error
                toast.error(error);
            });
        if (confirmDeleteDialog) {
            confirmDeleteDialog.close();
        }
    }
</script>

<li class="list-row">
    <div class="list-col-grow">
        <div>{CurrentProject.Name}</div>
        <div class="text-xs uppercase font-semibold opacity-80">
            {CurrentProject.SourceDir}
        </div>
    </div>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <div class="tooltip" data-tip="Delete">
        <button class="btn btn-square btn-ghost" onclick={deleteProject}>
            <Icon name="remove"></Icon>
        </button>
    </div>

    <div class="tooltip" data-tip="Select"> 
        <a href="/project/{ID}" class="btn btn-square btn-ghost">
            <Icon name="right"></Icon>
        </a>
    </div>
</li>
<!-- TODO Dialogs component? -->
<dialog id="confirm_delete_01" class="modal" bind:this={confirmDeleteDialog}>
    <div class="modal-box">
        <h3 class="text-lg font-bold">Delete project?</h3>
        <p class="py-4">
            Are you sure you want to delete <strong
                >{CurrentProject.Name}</strong
            >
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
