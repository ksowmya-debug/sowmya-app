import {createSlice} from '@reduxjs/toolkit'

const initialstate={
    Auth:null
}
export const AuthSlice=createSlice({
    name:"auth",
    initialState:initialstate,
    reducers:{
        setAuth:(state,action)=>{
            state.Auth=action.payload
        },
        logout :(state)=>{
            state.Auth=null
        }
    }
})
export const {setAuth, logout}=AuthSlice.actions

export default AuthSlice.reducer