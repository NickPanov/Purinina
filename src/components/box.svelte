<script lang="ts">
    let { children } = $props();
</script>

<div class="box">
    {@render children()}
</div>
<style>
    .box {
        padding:2rem;
    }
</style>