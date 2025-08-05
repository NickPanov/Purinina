<script lang="ts">
    let { data } = $props();
</script>


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
            {#each data as file}
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
