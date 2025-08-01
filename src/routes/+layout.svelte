<script lang="ts">
    import Navbar from "../components/layout/navbar.svelte";
    import Projects from "../components/layout/projects.svelte";

    let { children } = $props();
</script>

<div class="flex">
    <div class="w-full max-w-1/3 bg-base-200 min-h-screen">
        <Navbar></Navbar>
        <Projects></Projects>
    </div>
    <div class="w-full max-w-2/3">
        {@render children()}
    </div>
</div>
