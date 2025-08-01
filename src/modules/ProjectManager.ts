import { load } from '@tauri-apps/plugin-store';


interface Project {
    projectDir: string;
    projectName: string;
    files: DirEntry[];
}

class ProjectManager {
    private projects: Map<string, any>;

    constructor() {
        this.projects = new Map();
    }

    addProject(name: string, project: any): void {
        if (this.projects.has(name)) {
            throw new Error(`Project with name ${name} already exists.`);
        }
        this.projects.set(name, project);
    }

    getProject(name: string): any | undefined {
        return this.projects.get(name);
    }

    removeProject(name: string): void {
        if (!this.projects.has(name)) {
            throw new Error(`Project with name ${name} does not exist.`);
        }
        this.projects.delete(name);
    }

    listProjects(): string[] {
        return Array.from(this.projects.keys());
    }
}