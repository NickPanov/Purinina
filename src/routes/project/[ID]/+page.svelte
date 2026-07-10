<script lang="ts">
    import { Command } from "@tauri-apps/plugin-shell";
    import Filetable from "../../../components/filetable.svelte";
    interface ProjectSourceFile {
        name: string;
    }
    let { data } = $props();
    //TODO create a new SASS compiler that will compile SASS files to CSS

    // async function compileSrc(file: ProjectSourceFile) {
    //     let escapedDirPath = SourceDir.replaceAll(" ", "\\ ");
    //     await Command.create("cmd", [
    //         "/C",
    //         `sass ${escapedDirPath}\\${file.name} ${escapedDirPath}\\${file.name}.css`,
    //     ]).execute();
    // }

    //TODO Create reload function that crawls the directory and updates the project files list
</script>

<div class="navbar bg-base-200">
    <div class="flex-1">
        <h1 class="text-xl">{data.Name}</h1>
    </div>
</div>
<article class="bg-base-100 p-4">
    <label class="input w-full">
        <span class="label">Source folder</span>
        <input
            class="input join-item w-full"
            placeholder="Search"
            readonly
            value={data.SourceDir}
        />
    </label>
    <ul class="menu bg-base-200 lg:menu-horizontal rounded-box mt-4">
        <li>
            <button class="btn btn-secondary"> Reload </button>
        </li>
    </ul>
    <Filetable filelist={data.Files}></Filetable>
</article>
