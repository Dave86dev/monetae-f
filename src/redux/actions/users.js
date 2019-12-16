import store from "../store"


export const login = (user)=>{
    store.dispatch({type:'LOGIN',payload:user})
}