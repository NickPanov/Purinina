import { load, Store } from "@tauri-apps/plugin-store"


class Project {
    Name: string;
    SourceDir: string;
    CSSOutputDir: string;
    JSOutputDir: string;
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

    async get(name: string) {
        let projects = await this.load();
        return projects.get(name);
    }
    async list(): Promise<string[]> {

        return ['1', '2'];

        return Array.from(this.projects.keys());
    }

    async add(name: string, dir: any) {
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
    remove(name: string): void {
        if (!this.projects.has(name)) {
            throw new Error(`Project with name ${name} does not exist.`);
        }
        this.projects.delete(name);
    }
}