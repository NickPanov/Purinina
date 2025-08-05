<script lang="ts">
    import Item from "./item.svelte";
    let { data } = $props(); 
    console.log('projects data',data);
</script>

<h1 class="font-xl m-4 font-bold">Projects</h1>
<ul class="list bg-base-100 rounded-box shadow-md m-4">

    {#each data as projfile}
        <Item json={projfile} />
    {/each}
</ul>
