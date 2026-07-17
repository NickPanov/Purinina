interface DialogOptions {
    title?: string;
    message: string;
    action?: () => void;
    confirmation?: string;
}
class Toast {
    id: number;
    message: string;
    type: string;
    constructor(message: string, type: string) {
        this.id = Date.now();
        this.message = message;
        this.type = type;
    }
}
class Dialog {
    id: number;
    title: string;
    message: string;
    confirmation: string;
    action?: () => void;
    resolve: ((value: boolean) => void) | null;

    constructor(options: DialogOptions) {
        this.id = Date.now() + Math.floor(Math.random() * 1000);
        this.title = options.title ?? "Confirm";
        this.message = options.message;
        this.confirmation = options.confirmation ?? "Confirm";
        this.action = options.action;
        this.resolve = null;
    }
}
export let ToasterArray: Array<Toast> = $state([]);
export let DialogArray: Array<Dialog> = $state([]);

function add(message: string, type: string = "info") {
    const toast = new Toast(message, type);
    ToasterArray.push(toast);
    setTimeout(() => {
        ToasterArray.shift();
    }, 4000)
}
export function remove(id: number) {
    const index = ToasterArray.findIndex((toast) => toast.id === id);
    if (index !== -1) {
        ToasterArray.splice(index, 1);
    }
}
export function removeDialog(id: number) {
    const index = DialogArray.findIndex((dialog) => dialog.id === id);
    if (index !== -1) {
        DialogArray.splice(index, 1);
    }
}
export class toast {
    static success(message: string) {
        add(message, "success");
    }
    static error(message: string) {
        add(message, "error");
    }
    static info(message: string) {
        add(message, "info");
    }
}
export class dialog {
    static confirm(options: DialogOptions) {
        return new Promise<boolean>((resolve) => {
            const dialogInstance = new Dialog(options);
            dialogInstance.resolve = resolve;
            DialogArray.push(dialogInstance);
        });
    }
}