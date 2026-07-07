import { readDir } from '@tauri-apps/plugin-fs';
import { ProjectManager, Project } from '../../../modules/ProjectManager.svelte';
const pm = new ProjectManager();
//Single project manager module;
//TODO export functions 


function getProject(name){
    return pm.get(name);
}
export async function load({ params }) {


    let project = await getProject(params.name);
    if (project) {
        project.Files = await readDir(project.SourceDir);
    }

    return project
}
