import { readDir } from '@tauri-apps/plugin-fs';
import { ProjectManager, Project } from '../../../modules/ProjectManager.svelte';

//Single project manager module;
//TODO export functions 
class SourceFile {
    constructor(rawFile) {

    }
}
export async function load({ params }) {

    let project = await ProjectManager.get(params.ID);
    if (project) {
        project.Files = (await readDir(project.SourceDir)).map(rawFile => {
            return new SourceFile(rawFile)
        });
    }

    return project
}
