<script lang="ts">
    import { Command } from "@tauri-apps/plugin-shell";
    import Box from "../../../components/box.svelte";
    import Table from "../../../components/filetable.svelte";
    import Filetable from "../../../components/filetable.svelte";
    interface ProjectSourceFile {
        name: string;
    }
    let { data } = $props();

    async function run(cmd: string) {}

    let currentDir = data.projectDir;

    async function compileSrc(file: ProjectSourceFile) {
        let escapedDirPath = currentDir.replaceAll(" ", "\\ ");
        await Command.create("cmd", [
            "/C",
            `sass ${escapedDirPath}\\${file.name} ${escapedDirPath}\\${file.name}.css`,
        ]).execute();
    }
</script>

<div class="navbar bg-base-200">
    <div class="flex-1">
        <h1 class="text-xl">{data.projectName}</h1>
    </div>
</div>
<article class="bg-base-100 p-4">
    <label class="input w-full">
        <span class="label">Source folder</span>
        <input
            class="input join-item w-full"
            placeholder="Search"
            readonly
            value={data.projectDir}
        />
    </label>

    <Filetable data={data.files}></Filetable>
</article>
