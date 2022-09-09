import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistACType} from "./todolistsReducer";

export const taskReducer = (state: TasksStateType, action: tsarType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
          //1-й вариант функции
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.payload.todolistId]
            // const newTasks = tasks.filter(t => t.id !== action.payload.id)
            // stateCopy[action.payload.todolistId] = newTasks
            // return stateCopy
return {...state, [action.payload.todolistId]:[...state[action.payload.todolistId]].filter(el=>el.id !== action.payload.id)}
        }
        case "ADD-TASK": {
                let newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]:[newTask, ...state[action.payload.todolistId]]}

        }
        case "CHANGE-STATUS": {
            return {...state, [action.payload.todolistId]:[...state[action.payload.todolistId]].map(el => el.id === action.payload.id ? {...el, isDone:action.payload.isDone} : el)}
        }
        case "CHANGE-TASK-TITLE": {
            return {...state, [action.payload.todolistId]:[...state[action.payload.todolistId]].map(el=> el.id === action.payload.id ? {...el, title:action.payload.newTitle} : el)}
        }

        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.payload.newTodolistId] = []
            return stateCopy
        }
        default:
            return state
    }
}

type tsarType = removeTaskACType | addTaskACType | changeStatusACType | changeTaskTitleACType | addTodolistACType
type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {id, todolistId}
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string)=> {
    return {
        type: "ADD-TASK",
        payload: {title, todolistId}
    }as const
}

type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC=(id: string, isDone: boolean, todolistId: string)=> {
    return {
        type: "CHANGE-STATUS",
        payload: {id, isDone, todolistId}
    }as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string)=> {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {id, newTitle, todolistId}
    }as const
}