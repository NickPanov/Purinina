// Tauri doesn't have a Node.js server to do proper SSR
// so we will use adapter-static to prerender the app (SSG)
// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
export const prerender = true;
export const ssr = false;
import "../app.css";
import { ProjectManager } from "../modules/ProjectManager";
let pm = new ProjectManager();
export async function load({ params }) {
    //layout loader, i.e. loads the projects names to list them in the menu;
    return {
        ProjectsList: await pm.list()
    }

}