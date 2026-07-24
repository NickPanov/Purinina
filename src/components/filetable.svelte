<script lang="ts">
    import { type SourceFile } from "../modules/ProjectManager.svelte";

    let { filelist } = $props();

    let selectedExtensions = $state<string[]>([]);

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

    function isVisible(extension: string) {
        return (
            selectedExtensions.length === 0 ||
            selectedExtensions.includes(extension)
        );
    }
</script>

<div class="overflow-x-auto">
    <!-- DESIGN:0710  Probably the whole page should be a list not a table -->
    <table class="table bg-base-200 rounded-box shadow-md mt-4">
        <thead>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" class="checkbox" />
                    </label>
                </th>
                <th>Folders</th>
                <th>Output</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each groupedByType.folders as folder}
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" class="checkbox" />
                        </label>
                    </th>
                    <td>
                        <div class="flex items-center gap-3">
                            <div>
                                <div class="font-bold">{folder.name}</div>
                            </div>
                        </div>
                    </td>
                    <td>Output destination</td>
                    <th>
                        <button class="btn btn-ghost btn-xs">details</button>
                    </th>
                </tr>
            {/each}
        </tbody>
    </table>
    <form class="mt-4">
        <!-- BUG: The pills remain active when another project is selected -->
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
        {#each Object.entries(groupedByType.groupedByExtension ?? {}) as [extension, files]}
            {#if files && isVisible(extension)}
                <table class="table bg-base-200 rounded-box shadow-md mt-4">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" class="checkbox" />
                                </label>
                            </th>
                            <th>{extension}</th>
                            <th>Output</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each files as file}
                            <tr>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            class="checkbox"
                                        />
                                    </label>
                                </th>
                                <td>
                                    <div class="flex items-center gap-3">
                                        <div>
                                            <div class="font-bold">
                                                {file.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>Output destination</td>
                                <th>
                                    <button class="btn btn-ghost btn-xs"
                                        >details</button
                                    >
                                </th>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {/if}
        {/each}
    </form>
</div>
