<script lang="ts">
    import Icon from "../icon.svelte";
    import { goto } from "$app/navigation";
</script>

<div class="navbar bg-base-300">
    <div class="flex-1">
        <a aria-label="Home" class="btn-circle avatar" href="/">
            <div class="w-10 rounded-full">
                <div class="purinina-logo"></div>
            </div>
        </a>
    </div>
    <div class="dropdown dropdown-end flex-none">
        <button class="btn btn-square btn-ghost">
            <Icon name="kebab" />
        </button>

        <ul
            class="mt-3 z-1 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
            <li>
                <button class="justify-between"
                    >New Project <span class="badge">New</span></button
                >
            </li>
            <li><button>Settings</button></li>
        </ul>
    </div>
</div>

<style>
    .purinina-logo {
        width: 40px;
        height: 40px;
        margin-bottom: 2rem;
        background-color: hsl(213, 18%, 90%);
        background-image: url("purinina-simple.svg");
        background-size: cover;
        border-radius: 100%;
    }
</style>
