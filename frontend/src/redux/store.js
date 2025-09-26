
import {configureStore} from "@reduxjs/toolkit"
import cryptoSlice from "./slices/cryptoSlice"
export const store = configureStore({
    reducer:{
        "crypto":cryptoSlice
    }
})