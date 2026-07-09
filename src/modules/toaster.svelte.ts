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
    console.log("adding toast", toast);
    ToasterArray.push(toast);
    //TODO: Make them disapear;
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