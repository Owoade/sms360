import * as actions from "./index"
export const setDarkMode = ()=>{
    return {
        type: actions.DARK_MODE
    }
} 
export const setLightMode = ()=>{
    return {
        type: actions.LIGHT_MODE
    }
}
export const reveal = ()=>{
    return {
        type:actions.REVEAL
    }
}
export const setErrorMode = ()=>{
    return {
        type:actions.CHANGE_ERROR_MODE
    }
}