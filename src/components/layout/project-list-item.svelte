<script lang="ts">
    import {
        Project,
        ProjectManager,
    } from "../../modules/ProjectManager.svelte";
    import { toast } from "../../modules/toaster.svelte";
    import Dialog from "../dialog.svelte";

    const { ID } = $props();

    let CurrentProject: any = $state({ Name: "default", SourceDir: "default" });
    ProjectManager.get(ID)
        .then((res) => (CurrentProject = res))
        .catch((error) => {
            throw new Error(error);
        });

    //Methods
    let dialogElement: any;
    function deleteProject() {
        dialogElement.showModal();
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
            <i class="icon-[solar--close-circle-line-duotone]"></i>
        </button>
    </div>

    <div class="tooltip" data-tip="Select">
        <a href="/project/{ID}" class="btn btn-square btn-ghost">
            <i class="icon-[solar--round-arrow-right-line-duotone]"></i>

            <!-- <Icon name="right"></Icon> -->
        </a>
    </div>
</li>
<Dialog
    bind:reference={dialogElement}
    bind:action={deleteConfirmed}
    confirmation={"Delete"} 
>
    Are you sure you want to delete <strong>{CurrentProject.Name}</strong>
</Dialog>
