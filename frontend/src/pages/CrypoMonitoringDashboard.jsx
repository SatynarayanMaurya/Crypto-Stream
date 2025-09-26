import React, { useState, useEffect } from 'react';
import { Bell, TrendingUp, TrendingDown, Plus, X, Search, Filter, AlertCircle, CheckCircle, Activity, DollarSign, Target, Clock } from 'lucide-react';
import PriceCard from '../components/PriceCard';
import AlertCard from '../components/AlertCard';
import { alert, cryptoPrice, recentAlert } from '../data/cryptoPrices';
import {toast} from "react-toastify"
import {apiConnector} from '../services/apiConnector';
import { alertEndpoints, cryptoEndpoints } from '../services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { setAllAlerts, setCryptoData } from '../redux/slices/cryptoSlice';
import AllPriceCards from '../components/AllPriceCards';
import AlertComponent from '../components/AlertComponent';
import AlertChecker from '../components/AlertChecker';
import Spinner from '../components/Spinner';

const CryptoMonitoringDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const allAlerts = useSelector((state)=>state.crypto.allAlerts)
  const dispatch = useDispatch()

  const refreshAlert = useSelector((state)=>state.crypto.refreshAlert)

  const [recentAlerts, setRecentAlerts] = useState(recentAlert);


  const [count,setCount] = useState(0)
  const [loading ,setLoading ] = useState(false)

  const getAllAlert = async()=>{
    try{
      if(!localStorage.getItem("token")){
        return ;
      }
      if(allAlerts) return ;
      setLoading(true)
      const result = await apiConnector("GET",alertEndpoints.GET_USER_ALERT)
      dispatch(setAllAlerts(result?.data?.allAlerts?.reverse()))
      setLoading(false)
    }
    catch(error){
        // toast.error(error?.response?.data?.message || error.message || "Error in getting all the alert")
        setLoading(false)
        console.log("Error in getting all teh alert : ",error)
    }
  }

  useEffect(()=>{
    getAllAlert();
  },[refreshAlert])

  const getCryptoPrices = async()=>{
    try{
      setCount(count+1)
      setLoading(true)
      const response = await apiConnector("GET",cryptoEndpoints.GET_CRYPO_PRICES)
      dispatch(setCryptoData(response?.data?.prices))
      // toast.success(response?.data?.message)
      setLoading(false)
      
    }
    catch(error){
      setLoading(false)
      console.log("Error in getting the crypo prices : ",error)
      // toast.error(error?.response?.data?.message || error?.message || "Error in getting crypto prices")
    }
  }

  useEffect(() => {
    getCryptoPrices();

    const interval = setInterval(() => {
      getCryptoPrices();
    }, 10000);

    return () => clearInterval(interval);
  }, []);


  const [searchTerm, setSearchTerm] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('connected');


  const ConnectionIndicator = () => (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${
        connectionStatus === 'connected' ? 'bg-green-400' : 
        connectionStatus === 'connecting' ? 'bg-yellow-400' : 'bg-red-400'
      }`}></div>
      <span className="text-sm font-medium capitalize">{connectionStatus}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header */}
      <AlertChecker/>
      <header className="bg-white  shadow-sm border-b border-gray-200 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Activity className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900 ">Crypto Monitor</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <ConnectionIndicator />
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {recentAlerts.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {['dashboard', 'alerts', 'notifications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white  rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Watched</p>
                    <p className="text-2xl font-semibold text-gray-900 ">4</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white  rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Bell className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Active Alerts</p>
                    <p className="text-2xl font-semibold text-gray-900 ">
                      {allAlerts?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white  rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Gainers</p>
                    <p className="text-2xl font-semibold text-gray-900 ">
                      2
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Activity className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Live Updates</p>
                    <p className="text-2xl font-semibold text-gray-900 ">
                      ON
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search cryptocurrencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>

            {/* Crypto Price Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* {filteredCryptos.map((crypto) => (
                <PriceCard key={crypto.id} crypto={crypto} />
              ))} */}
              <AllPriceCards/>
            </div>
          </>
        )}

        {activeTab === 'alerts' && (
          <AlertComponent/>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 ">Recent Notifications</h2>
            
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="bg-white  rounded-lg p-4 border border-gray-200 ">
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      alert.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {alert.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900  font-medium">{alert.message}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {alert.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

    </div>
  );
};

export default CryptoMonitoringDashboard;