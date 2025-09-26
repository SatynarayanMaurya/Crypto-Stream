import React, { useState } from 'react'
import { Target } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { apiConnector } from '../services/apiConnector'
import { alertEndpoints } from '../services/apis'
import { clearAllAlerts, setRefreshAlert } from '../redux/slices/cryptoSlice'
import Spinner from "../components/Spinner"

function AlertCard({ alert }) {

  const [loading ,setLoading] = useState(false)
  const dispatch = useDispatch()
  const refreshAlert = useSelector((state)=>state.crypto.refreshAlert)
  const updateActiveState = async(value,alert)=>{
    try{
      setLoading(true)
      const result = await apiConnector("PUT",`${alertEndpoints.UPDATE_ALERT_ACTIVE_STATE}/${alert?._id}`,{activeState:value})
      toast.success(result?.data?.message)
      setLoading(false)
      dispatch(clearAllAlerts())
      dispatch(setRefreshAlert(!refreshAlert))
    }
    catch(error){
      toast.error(error?.response?.data?.message || error.message || "error in updating the state of the alert")
      setLoading(false)
    }
  }
  const cryptoData = useSelector((state)=>state.crypto.cryptoData)

  if(loading){
    return <Spinner/>
  }
  return (
    <div className="bg-white  rounded-lg p-4 border border-gray-200 ">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-blue-500" />
          <span className="font-medium text-gray-900 ">{alert?.coinId}</span>
          <span className="text-sm text-gray-500">({alert?.coinId === "bitcoin" ? "BTC" : alert?.coinId === "ethereum"?"ETH":alert?.coinId === "cardano"?"ADA":"DOT"})</span>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          alert?.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {/* {alert?.isActive ? 'Active' : 'Inactive'} */}
          <select name="" id="" value={alert.isActive} onChange={(e)=>updateActiveState(e.target.value,alert)}>
            <option value='true'>Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>
      
      <div className="text-sm text-gray-600  mb-2">
        Alert when price goes {alert?.condition} ${alert.targetPrice.toLocaleString()}
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 ">
        {/* <span>Current: ${alert?.currentPrice.toLocaleString()}</span> */}
        <span>Current: ${cryptoData?.[alert?.coinId]?.usd}</span>
        <span>Created: {new Date(alert?.createdAt).toLocaleString()}</span>
      </div>
    </div>
  )
}

export default AlertCard
