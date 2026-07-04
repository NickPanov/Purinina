import { readDir } from '@tauri-apps/plugin-fs';
import { ProjectManager, Project } from '../../../modules/ProjectManager.svelte';
const pm = new ProjectManager();
export async function load({ params }) {


    let project = await pm.get(params.name);
    if (project) {
        project.Files = await readDir(project.SourceDir);

    }

    return project
}
