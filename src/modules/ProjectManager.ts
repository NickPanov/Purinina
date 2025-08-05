import { load, Store } from "@tauri-apps/plugin-store"

interface SourceFile {

}
export class Project {
    Name: string;
    SourceDir: string;
    CSSOutputDir: string;
    JSOutputDir: string;
    Files: Array<SourceFile>;
    constructor(name: string, dir: string) {
        //new project is initialized as same dir for input and output;
        this.Name = name;
        this.SourceDir = dir;
        this.CSSOutputDir = dir;
        this.JSOutputDir = dir;
    }
}
export class ProjectManager {
    async load() {
        return await load(`projects.purinina`, { autoSave: false });
    }

    async get(name: string): Promise<Project | undefined> {
        let projects = await this.load();
        return await projects.get(name);
    }
    async list(): Promise<string[]> {
        let projects = await this.load();
        return Array.from(await projects.keys());
    }

    async create(name: string, dir: any) {
        const projects = await this.load();
        let project = new Project(name, dir);
        let duplicated = await projects.has(name);
        if (duplicated) {
            // TODO 
            throw new Error(`Project with name ${name} already exists.`);
        }
        await projects.set(name, project);
        await projects.save();
    }
    async update(name: string, project: Project) {

    }
    async remove(name: string) {
        console.log(name);
        let projects = await this.load();
        let exist = await projects.has(name)
        if (!exist) {
            throw new Error(`Project with name ${name} does not exist.`);
        }
        projects.delete(name);
    }
}