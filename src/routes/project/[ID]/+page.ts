import { readDir } from '@tauri-apps/plugin-fs';
import { ProjectManager, Project } from '../../../modules/ProjectManager.svelte';
 
//Single project manager module;
//TODO export functions 
 
export async function load({ params }) {


    let project = await ProjectManager.get(params.ID);
    if (project) {
        project.Files = await readDir(project.SourceDir);
    }

    return project
}
