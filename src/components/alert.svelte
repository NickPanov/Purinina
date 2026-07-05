<script lang="ts">
    import Icon from "./icon.svelte"; 
    let {message, type, id} = $props();
    
</script>

<div role="alert" class="alert alert-{type}">
    <Icon name={type} />
    <span>{message}</span>
</div>
<style>
    .alert {
        margin-bottom: 0.5rem;
    }
</style>