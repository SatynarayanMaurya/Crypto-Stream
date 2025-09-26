import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cryptoData :null,
    userDetails:null,
    allAlerts:null,
    refreshAlert:false
}

const cryptoSlice = createSlice({
    name:"crypto",
    initialState,
    reducers:{
        setCryptoData :(state,action)=>{
            state.cryptoData = action.payload
        },
        setUserDetails:(state,action)=>{
            state.userDetails = action.payload
        },
        clearUserDetails:(state,action)=>{
            state.userDetails=  null;
        },
        setAllAlerts:(state,action)=>{
            state.allAlerts = action.payload
        },
        clearAllAlerts :(state,action)=>{
            state.allAlerts = null
        },
        setRefreshAlert:(state,action)=>{
            state.refreshAlert = action.payload
        }
        
    }
})

export const {setCryptoData,setUserDetails,clearUserDetails,setAllAlerts,clearAllAlerts,setRefreshAlert} = cryptoSlice.actions
export default cryptoSlice.reducer