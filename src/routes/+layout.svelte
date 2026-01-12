<script lang="ts">
    import Navbar from "../components/layout/navbar.svelte";
    import Projects from "../components/layout/projects.svelte";
    import { ProjectManager } from "../modules/ProjectManager";
    let pm = new ProjectManager();
    let { data, children } = $props();
    let showAside = $state(false);

    (async () => {
        let res = await pm.count() > 0;
        console.log(res)
        showAside = res;
    })();   

    //TODO Make the aside hiding truly reactive to project list changes
</script>

<div class="flex">
    {#if showAside}
        <div class="w-full max-w-1/3 bg-base-200 min-h-screen">
            <Navbar></Navbar>
            <Projects data={data.ProjectsList}></Projects>
        </div>
        {:else}
        <p>No data</p>
    {/if}
    <div class="w-full">
        {@render children()}
    </div>
</div>
