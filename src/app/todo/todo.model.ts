export class Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;

    constructor(title: string) {
        this.id = Date.now().toString();
        this.title = title;
        this.completed = false;
        this.createdAt = new Date();
    }
}

// Class --> contructor ->  Object
// export const todos: Todo[] = [];