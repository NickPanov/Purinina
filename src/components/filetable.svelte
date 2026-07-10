<script lang="ts">
    let { filelist } = $props(); 
    const grouped = Object.groupBy(filelist, (item) => (item as { isDirectory: boolean }).isDirectory ? "folders" : "files"); 
    
</script>

<!-- TODO: Group files by file type and add a filter to show only certain file types.  -->

<div class="overflow-x-auto">
    <table class="table bg-base-200 rounded-box shadow-md mt-4">
        <!-- head -->
        <thead>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" class="checkbox" />
                    </label>
                </th>
                <th>Source</th>
                <th>Output</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each grouped.folders as folder}
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
                    <td> Output destination </td>
                    <th>
                        <button class="btn btn-ghost btn-xs">details</button>
                    </th>
                </tr>
            {/each}
        </tbody>
    </table>
     <table class="table bg-base-200 rounded-box shadow-md mt-4">
        <!-- head -->
        <thead>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" class="checkbox" />
                    </label>
                </th>
                <th>Source</th>
                <th>Output</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each grouped.files as file}
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" class="checkbox" />
                        </label>
                    </th>
                    <td>
                        <div class="flex items-center gap-3">
                            <div>
                                <div class="font-bold">{file.name}</div>
                            </div>
                        </div>
                    </td>
                    <td> Output destination </td>
                    <th>
                        <button class="btn btn-ghost btn-xs">details</button>
                    </th>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
