<script lang="ts">
    import { readTextFile, BaseDirectory } from "@tauri-apps/plugin-fs";

    let { json } = $props();

    let projectName = $state("");
    let projectDir = $state("");
 
 
    json.then(res=>{
        console.log(res)
    })

    // readTextFile(`projects\\${json.name}`, {
    //     baseDir: BaseDirectory.AppLocalData,
    // }).then((res) => { 
    //     let proj = JSON.parse(res);
    //     projectName = proj.projectName;
    //     projectDir = proj.projectDir;
    // });
</script>

<li class="list-row">
    <div class="list-col-grow">
        <div>{projectName}</div>
        <div class="text-xs uppercase font-semibold opacity-60">
            {projectDir}
        </div>
    </div>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <a href="/project/{json.name}" class="btn btn-square btn-ghost">
        <svg
            class="size-[1.2em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            ><g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g
            ></svg
        >
    </a>
</li>
