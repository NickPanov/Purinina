import { readDir, readTextFile, BaseDirectory, type DirEntry } from '@tauri-apps/plugin-fs';
interface Project {
    projectDir: string,
    projectName: string,
    files: DirEntry[]
}

export async function load({ params }) {



    let proj: Project = JSON.parse(await readTextFile(`projects\\${params.json}`, {
        baseDir: BaseDirectory.AppLocalData,
    }));

    proj.files = await readDir(proj.projectDir); 
    return proj
}
