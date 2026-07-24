<script lang="ts">
    let { filelist } = $props();
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
                <th>Source</th>
                <th>Output</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each filelist as file}
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" class="checkbox" />
                        </label>
                    </th>
                    <td>
                        <div class="flex items-center gap-3">
                                <span class="font-bold">
                                    {file.name}
                                </span> 
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
</div>
