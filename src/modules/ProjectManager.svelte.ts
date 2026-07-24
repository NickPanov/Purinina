import { load, Store } from "@tauri-apps/plugin-store"
import { GlobalState } from "$modules/GlobalContext.svelte";
import { dialog, toast } from "$modules/Toaster.svelte";

import { goto } from "$app/navigation";
import { open } from "@tauri-apps/plugin-dialog";

// This is the module that manages the Projects and their filelists;
export interface SourceFile {
    name: string;
    isDirectory: boolean;
    isFile: boolean;
    isSymlink: boolean;
    extension?: string;
}
export class Project {
    ID: string;
    Name: string;
    SourceDir: string;
    CSSOutputDir: string;
    JSOutputDir: string;
    SourceFiles: Array<SourceFile>;
    constructor(dir: string = './') {
        //new project is initialized as same dir for input and output;
        this.ID = `${Date.now()}-${crypto.randomUUID()}`;
        this.Name = dir.split("\\").pop() ?? "";
        this.SourceDir = dir;
        this.CSSOutputDir = dir;
        this.JSOutputDir = dir;
    }
};

export class ProjectManager {
    static async load() {
        //TODO: Shall we migrate to LazyStore?
        return await load(`projects.purinina`, { autoSave: false });
    }

    static reload = async (message: string) => {
        GlobalState.ProjectsList = await this.list();
    }
    static async dupeCheck(key: keyof Project, value: any) {
        const projects = await this.load();
        return Array.from(await projects.values()).some((object: any) => object[key] == value)
    }

    static async count(): Promise<number> {
        let projects = await this.load();
        return (await projects.keys()).length;
    }
    static async get(id: string): Promise<Project | undefined> {
        let projects = await ProjectManager.load();
        return await projects.get(id);
    }
    static async list(): Promise<any> {
        let projects = await this.load();
        let result = Array.from(await projects.keys());

        return result;
    }

    static async create() {
        //TODO: We should create projects by ID and check for duplicates by URI; 
        //then WARN the user, but not prevent them from creating a project with the same path;
        //We should also check for duplicates by name, and warn the user, but not prevent them from creating a project with the same name;

        let dir: any = await open({
            multiple: false,
            directory: true,
        });
        const projects = await this.load();
        let newProject = new Project(dir);
        let dupedSourceDir = await this.dupeCheck("SourceDir", newProject.SourceDir);
        if (dupedSourceDir) {
            let ok = await dialog.confirm({
                title: `Duplicated source`,
                message: `The selected folder <strong>${newProject.SourceDir}</strong> is already used in another project. Are you sure you want to proceed?`,
            });
            //TODO throw warning confirm
        }
        let dupedName = await this.dupeCheck("SourceDir", newProject.SourceDir);
        if (dupedName) {
            //TODO throw warning confirm, ask to rename as +(1);
        }
        let setter = projects.set(newProject.ID, newProject);
        let saver = projects.save();

        Promise.all([setter, saver]).then(() => {
            this.reload('create');
            goto(`/project/${newProject.ID}`);
            toast.success(`Project <strong>${newProject.Name}</strong> created sucessfully.`)
        }).catch(err => {
            toast.error(err)
        });


    }
    static async update(name: string, project: Project) {

    }
    static async remove(ID: string) {
        let projects = await this.load();
        let exist = await projects.has(ID)
        if (!exist) {
            //TODO we should extract the name of the project;
            throw new Error(`Project with name ${ID} does not exist.`);
        }
        projects.delete(ID);
        this.reload('remove');
        goto(`/`);
    }
};

ProjectManager.list().then((list) => {
    GlobalState.ProjectsList = list;
}); 