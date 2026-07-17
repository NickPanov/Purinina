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
export let ToasterArray: Array<Toast> = $state([]);

function add(message: string, type: string = "info") {
    const toast = new Toast(message, type);
    ToasterArray.push(toast);
    setTimeout(() => {
        ToasterArray.shift();
    }, 4000)
}
export function remove(id:number) {
    const index = ToasterArray.findIndex((toast) => toast.id === id);
    if (index !== -1) {
        ToasterArray.splice(index, 1);
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