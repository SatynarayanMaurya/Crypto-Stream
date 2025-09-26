import React, { useEffect, useState } from 'react'
import AlertCard from './AlertCard'
import {Plus,X} from "lucide-react"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { apiConnector } from '../services/apiConnector'
import { alertEndpoints } from '../services/apis'
import { clearAllAlerts, setAllAlerts, setRefreshAlert } from '../redux/slices/cryptoSlice'

function AlertComponent() {
    const [loading ,setLoading] = useState(false)
    const refreshAlert = useSelector((state)=>state.crypto.refreshAlert)
    const dispatch = useDispatch()
    const allAlerts = useSelector((state)=>state.crypto.allAlerts)
    console.log(allAlerts)
    const cryptoData = useSelector((state)=>state.crypto.cryptoData)
    const [isAddAlertModal,setIsAddAlertModal] = useState(false)
    const [newAlert, setNewAlert] = useState({
        crypto: 'bitcoin',
        condition: 'above',
        targetPrice: ''
    });
    
  const handleCreateAlert = async() => {
    if(!localStorage.getItem("token")){
        toast.warn("Login for creating alert")
        return ;
    }
    if (!newAlert.targetPrice){
        toast.warn("Provide a target price for alerting")
        return;
    }
    try{
        setLoading(true)
        const result = await apiConnector("POST",alertEndpoints.CREATE_ALERT,{coinId:newAlert.crypto,condition:newAlert.condition,targetPrice:newAlert.targetPrice})
        toast.success(result?.data?.message)
        setLoading(false)
        dispatch(clearAllAlerts())
        dispatch(setRefreshAlert(!refreshAlert))

    }
    catch(error){
        toast.error(error?.response?.data?.message || error.message || "Error in creating the alert");
        setLoading(false)
    }
    setNewAlert({ crypto: 'bitcoin', condition: 'above', targetPrice: '' });
    setIsAddAlertModal(false);
  };

  const getAllAlert = async()=>{
    try{
        if(!localStorage.getItem("token")){
            return ;
        }
        // if(allAlerts) return ;
        setLoading(true)
        const result = await apiConnector("GET",alertEndpoints.GET_USER_ALERT)
        dispatch(setAllAlerts(result?.data?.allAlerts?.reverse()))
        setLoading(false)
    }
    catch(error){
        toast.error(error?.response?.data?.message || error.message || "Error in getting all the alert")
        setLoading(false)
        console.log("Error in getting all teh alert : ",error)
    }
  }
  useEffect(()=>{
    getAllAlert()
  },[refreshAlert])
  return (
    <div>
      <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 ">Price Alerts</h2>
              <button
                onClick={() => setIsAddAlertModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Alert</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allAlerts?.length === 0 ? <p className='text-center'>No Alert found</p>:
              allAlerts?.map((alert) => (
                <AlertCard key={alert._id} alert={alert} />
              ))}
            </div>
        </div>

        <>
            {
                isAddAlertModal && 
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white  rounded-lg p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 ">Create Price Alert</h3>
                        <button
                            onClick={() => setIsAddAlertModal(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        </div>

                        <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700  mb-2">
                            Cryptocurrency
                            </label>
                            <select name="" id="" value={newAlert.crypto} onChange={(e) => setNewAlert({...newAlert, crypto: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-none">
                                <option value="bitcoin">Bitcoin</option>
                                <option value="ethereum">Ethereum</option>
                                <option value="cardano">Cardano</option>
                                <option value="polkadot">Polkadot</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700  mb-2">
                            Condition
                            </label>
                            <select
                            value={newAlert.condition}
                            onChange={(e) => setNewAlert({...newAlert, condition: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                            <option value="above">Price goes above</option>
                            <option value="below">Price goes below</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700  mb-2">
                            Target Price ($)
                            </label>
                            <input
                            type="number"
                            value={newAlert.targetPrice}
                            onChange={(e) => setNewAlert({...newAlert, targetPrice: e.target.value})}
                            placeholder="0.00"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex space-x-3 pt-4">
                            <button
                            onClick={() => setIsAddAlertModal(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                            Cancel
                            </button>
                            <button
                            onClick={handleCreateAlert}
                            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                            Create Alert
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            }
        </>
    </div>
  )
}

export default AlertComponent
