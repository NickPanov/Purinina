<script lang="ts">
  import {
    exists,
    create,
    BaseDirectory,
    readDir,
    mkdir,
    writeTextFile,
    type DirEntry,
  } from "@tauri-apps/plugin-fs";
  import { open } from "@tauri-apps/plugin-dialog";
  import Item from "../components/item.svelte";

  async function checkDir() {
    const tokenExists = await exists("projects", {
      baseDir: BaseDirectory.AppLocalData,
    });
    console.log("check", tokenExists);
    if (!tokenExists) {
      await mkdir("projects", {
        baseDir: BaseDirectory.AppLocalData,
      });
    }
  }
  let projectfiles: Array<DirEntry>;
  async function newProject() {
    // Open a dialog
    const projectDir: any = await open({
      multiple: false,
      directory: true,
    });

    let projectName = projectDir.split("\\").pop();

    let initialData = JSON.stringify({
      projectName: projectName,
      projectDir: projectDir,
    });

    await create(`projects\\${projectName}.json`, {
      baseDir: BaseDirectory.AppLocalData,
    });

    await writeTextFile(`projects\\${projectName}.json`, initialData, {
      baseDir: BaseDirectory.AppLocalData,
    });
    projectfiles.push({
      name: `${projectName}.json`,
      isDirectory: false,
      isFile: true,
      isSymlink: false,
    });
  }

  async function collectProjects() {
    let collection = await readDir("projects", {
      baseDir: BaseDirectory.AppLocalData,
    });
    projectfiles = collection;
  }
  checkDir();
</script>

<div class="hero bg-base-100 min-h-120">
  <div class="purinina-logo"></div>
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">PURININA</h1>
      <p class="py-6">Is not a Koala.</p>
      <button type="button" class="btn btn-primary" onclick={checkDir}
        >Check</button
      >
      <button type="button" class="btn btn-primary" onclick={newProject}
        >Add Project</button
      >
    </div>
  </div>
</div>

<style>
  .hero {
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
  .purinina-logo {
    width: 160px;
    height: 160px;
    margin-bottom: 2rem;
    background-color: hsl(213, 18%, 90%);
    background-image: url("purinina-simple.svg");
    background-size: cover;
    border-radius: 100%;
  }
</style>
