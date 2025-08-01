<script lang="ts">
    import { Command } from "@tauri-apps/plugin-shell";
    import Box from "../../../components/box.svelte";
    interface ProjectSourceFile {
        name: string;
    }
    let { data } = $props();

    async function run(cmd: string) {}

    let currentDir = data.projectDir;

    async function compileSrc(file: ProjectSourceFile) {
        let escapedDirPath = currentDir.replaceAll(" ","\\ ");
        await Command.create("cmd", [
            "/C",
            `sass ${escapedDirPath}\\${file.name} ${escapedDirPath}\\${file.name}.css`,
        ]).execute();
    }
</script>

<article class="bg-base-100 p-4">
    <h1 class="text-xl">{data.projectName}</h1>
    <code class="text-base">{@html data.projectDir}</code>
    <Box>
        <ul class="list bg-base-200 rounded-box shadow-md">
            {#each data.files as file}
                <li class="list-row">
                    <div class="list-col-grow">
                        <div class="text-xs uppercase font-semibold opacity-60">
                            {file.name}
                        </div>
                    </div>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button
                        type="button"
                        onclick={(e) => compileSrc(file)}
                        class="btn btn-square btn-ghost"
                    >
                        <svg
                            class="size-[1.2em]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            ><g
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                stroke-width="2"
                                fill="none"
                                stroke="currentColor"
                                ><path d="M6 3L20 12 6 21 6 3z"></path></g
                            ></svg
                        >
                    </button>
                </li>
            {/each}
        </ul>
    </Box>
</article>
