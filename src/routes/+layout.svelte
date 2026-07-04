<script lang="ts">
    import Navbar from "../components/layout/navbar.svelte";
    import Projects from "../components/layout/projects.svelte"; 
    import { GlobalState } from "../modules/GlobalContext.svelte";
    let { data, children } = $props();
    $inspect("Dynamic", GlobalState.ProjectsList.value);

    //TODO Make the aside hiding truly reactive to project list changes
</script>

<div class="flex">
    
    {#if GlobalState.ProjectsList.length > 0}
        <div class="w-full max-w-1/3 bg-base-200 min-h-screen">
            <Navbar></Navbar>
            <Projects data={GlobalState.ProjectsList}></Projects>
        </div>
    {/if}
    <div class="w-full">
        {@render children()}
    </div>
</div>
