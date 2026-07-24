<script lang="ts">
    import { Command } from "@tauri-apps/plugin-shell";
    import Filetable from "$components/filetable.svelte";
    import { ProjectManager } from "$modules/ProjectManager.svelte.js";
    import type {
        Project,
        SourceFile,
        ProjectSettings,
    } from "$modules/ProjectManager.svelte.js";

    let { data } = $props() as { data: Project };
    $inspect(data);

    let selectedExtensions: Array<string> = $derived(data.ProjectSettings?.filter ?? []);
    $effect(() => { 
        data.ProjectSettings.filter = selectedExtensions;
        ProjectManager.update(data);
    });

    
    const groupedByType = $derived.by(function () {
        const folders = (data.SourceFiles ?? []).filter(
            (item: SourceFile) => item.isDirectory,
        );
        const files = (data.SourceFiles ?? []).filter(
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
        if (selectedExtensions.length > 0 && data.SourceFiles) {
            let result = data.SourceFiles.filter((file) => {
                return (
                    file.extension !== undefined &&
                    selectedExtensions.includes(file.extension)
                );
            });
            return result;
        } else {
            return data.SourceFiles;
        }
    }); 
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
