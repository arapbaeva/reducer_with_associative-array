
import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer=(state:Array<TodolistType>, action:tsarType): Array<TodolistType>=> {
    switch (action.type) {
        case "CHANGE-FILTER": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el)
        }
        case "REMOVE-TODOLIST": {
            return state.filter(el=>el.id !== action.payload.id)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el=>el.id===action.payload.id ? {...el, title:action.payload.title} : el)
        }
        case "ADD-TODOLIST": {
            // let newTodolistId = v1();
            let newTodolist={id: action.payload.newTodolistId, title: action.payload.title, filter: 'all' as FilterValuesType};
            // setTodolists([newTodolist, ...todolists]);

            return ([newTodolist, ...state])
        }
        default:
            return state
        }
    }

type tsarType = changeFilterACType | removeTodolistACType | changeTodolistTitleACType | addTodolistACType
type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC=(value: FilterValuesType, todolistId: string)=>{
    return {
        type: "CHANGE-FILTER",
        payload: {value, todolistId}
    }as const
}

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC=(id: string)=>{
    return {
        type: "REMOVE-TODOLIST",
        payload: {id}
    }as const
}


type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC=(id: string, title: string)=>{
   return {
       type: "CHANGE-TODOLIST-TITLE",
       payload: {id, title}
   }as const
}

export type addTodolistACType=ReturnType<typeof addTodolistAC>
export const addTodolistAC=(title: string)=>{
    return {
        type: "ADD-TODOLIST",
        payload: {title, newTodolistId:v1()}
    }as const
}