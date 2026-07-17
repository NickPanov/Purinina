<script lang="ts">
    let { message, type, id ,callback} = $props(); 
</script> 
<div role="alert" id={id} class="alert {type=='success'?'alert-success':'alert-error'}">
    <i class="{type=='success'?'icon-[solar--check-circle-line-duotone]':'icon-[solar--close-circle-line-duotone]'} "></i>
    <span>{@html message}</span>
    <button type="button" onclick={()=>callback(id)} class="btn btn-square {type=='success'?'btn-success':'btn-error'}">x</button>
</div> 
<style>
    .alert {
        margin-bottom: 0.5rem;
    }
</style>
