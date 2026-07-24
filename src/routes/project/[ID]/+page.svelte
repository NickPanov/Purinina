<script lang="ts">
    import { Command } from "@tauri-apps/plugin-shell";
    import Filetable from "$components/filetable.svelte";
    import type { SourceFile } from "$modules/ProjectManager.svelte.js";

    let { data } = $props();
    let selectedExtensions: Array<string> = $state([]);

    let filelist = data.SourceFiles;
    const groupedByType = $derived.by(function () {
        const folders = (filelist ?? []).filter(
            (item: SourceFile) => item.isDirectory,
        );
        const files = (filelist ?? []).filter(
            (item: SourceFile) => !item.isDirectory,
        );
        return {
            folders,
            files,
            groupedByExtension: Object.groupBy(
                files,
                (item: SourceFile) => item.extension ?? "no-extension",
            ) as Record<string, SourceFile[] | undefined>,
        };
    });

    let filtered = $derived.by(() => {
        console.log(selectedExtensions.length > 0);

        if (selectedExtensions.length > 0) {
            let result = filelist.filter((file) => { 
                return Array.from(selectedExtensions).includes(file.extension);
            });
            return result;
        }
        else {
            return filelist;
        }
     
    });
    $inspect(filtered);
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
        <input class="input join-item w-full" readonly value={data.SourceDir} />
    </label>
    <ul class="menu bg-base-200 lg:menu-horizontal rounded-box mt-4">
        <li>
            <button class="btn btn-secondary"> Reload </button>
        </li>
    </ul>
    <!-- FILTER PILLS -->
    <form>
        {#each Object.entries(groupedByType.groupedByExtension ?? {}) as [extension]}
            <input
                class="btn mr-2"
                type="checkbox"
                bind:group={selectedExtensions}
                value={extension}
                aria-label={extension}
            />
        {/each}
        <input class="btn btn-square" type="reset" value="×" />
    </form>
    <!-- //FILTER PILLS -->

    <Filetable filelist={filtered}></Filetable>
</article>
