import { readDir, type DirEntry } from '@tauri-apps/plugin-fs';
import { ProjectManager, Project } from '../../../modules/ProjectManager.svelte';

//Single project manager module;
//TODO export functions 
class SourceFile {
    name: string;
    isDirectory: boolean;
    isFile: boolean;
    isSymlink: boolean;
    extension?: string;
    constructor(rawFile: DirEntry) {
        
        Object.assign(this, rawFile);
        this.extension = this.name.split(".").pop();
    }

}
export async function load({ params }) {

    let project = await ProjectManager.get(params.ID);
    if (project) {
        project.SourceFiles = (await readDir(project.SourceDir)).map(rawFile => new SourceFile(rawFile));
    }
    return project
}
