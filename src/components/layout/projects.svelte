<script lang="ts">
    import Item from "../item.svelte";
    import { readDir, BaseDirectory } from "@tauri-apps/plugin-fs";

    let projectfiles: Array<any>;
    async function collectProjects() {
        let collection = await readDir("projects", {
            baseDir: BaseDirectory.AppLocalData,
        });
        projectfiles = collection;
    }
    collectProjects();
</script>

<h1 class="font-xl m-4 font-bold">Projects</h1>
<ul class="list bg-base-100 rounded-box shadow-md m-4">
    {#each projectfiles as projfile}
        <Item json={projfile} />
    {/each}
</ul>
