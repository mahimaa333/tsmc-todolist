interface TodoModel{
    name:string;
    description:string;
    deadline:number;
    id: string;
    completed: boolean;
    createdAt?: string;
    code?: string;
}

export enum filter{
    all="all",
    active="active",
    completed="completed",
}

export default TodoModel;