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
  import { ProjectManager } from "../modules/ProjectManager.svelte";
  import { toast } from "../modules/toaster.svelte";

 

  async function checkDir() {
    const tokenExists = await exists("projects", {
      baseDir: BaseDirectory.AppLocalData,
    });
    
    if (!tokenExists) {
      await mkdir("projects", {
        baseDir: BaseDirectory.AppLocalData,
      });
    }
  }
 
  async function newProject() {
    // Open a dialog
    const projectDir: any = await open({
      multiple: false,
      directory: true,
    });
    const projectName = projectDir.split("\\").pop(); 
    ProjectManager.create(projectName, projectDir).then(() => {
      // Project created successfully
      //TODO: Can we bold the Project name?
      toast.success(`Project ${projectName} created successfully.`);
    }).catch((error) => {
      // Handle error
      toast.error(error);
    });
  }

  checkDir();
</script>
 
<div class="hero bg-base-100 min-h-screen">
  <div class="purinina-logo"></div>
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">PURININA</h1>
      <p class="py-6">Is not a Koala.</p>
      <button type="button" class="btn btn-neutral" onclick={checkDir}>
        Check
      </button>
      <button type="button" class="btn btn-primary" onclick={newProject}>
        Add Project
      </button>
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
    background-image: url("/purinina-simple.svg");
    background-size: cover;
    border-radius: 100%;
    border: 1px solid ;
  }
</style>
