import { load, Store } from "@tauri-apps/plugin-store"
import { GlobalState } from "../modules/GlobalContext.svelte";
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
};



export class ProjectManager {
    //dynamic state properties
    
    static reload = async (message:string) => {
         GlobalState.ProjectsList = await this.list();
    } 
    //Private methods
    static async load() {
        return await load(`projects.purinina`, { autoSave: false });
    }
    static async count(): Promise<number> {
        let projects = await this.load();
        return (await projects.keys()).length;
    }
    async get(name: string) {
        let projects = await ProjectManager.load();
        return await projects.get(name);
    }
    static async list(): Promise<any> {
        let projects = await this.load();
        let result = Array.from(await projects.keys());
        console.log("returning project list", result);

        return result;
    }

    static async create(name: string, dir: any) {
        const projects = await this.load();
        let project = new Project(name, dir);
        let duplicated = await projects.has(name);
        if (duplicated) {
            // TODO Proper alert modal
            throw new Error(`Project with name ${name} already exists.`);
        }
        let setter = await projects.set(name, project);
        let saver = await projects.save();
        Promise.all([setter, saver]).then(() => { 
            this.reload('create') 
        });

        // TODO Success and navigate to project page
    }
    static async update(name: string, project: Project) {

    }
    static async remove(name: string) {
        let projects = await this.load();
        let exist = await projects.has(name)
        if (!exist) {
            // TODO Proper alert modal
            throw new Error(`Project with name ${name} does not exist.`);
        }
        projects.delete(name);
        this.reload('remove');
        //TODO Success and navigate to home page
    }
};

ProjectManager.list().then((list) => {
    GlobalState.ProjectsList = list;
}); 