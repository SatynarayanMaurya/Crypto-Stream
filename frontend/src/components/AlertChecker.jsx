import { useEffect } from "react";
import { toast } from "react-toastify"; // or any toast lib
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { alertEndpoints, sendEmailEndpoints } from "../services/apis";
import { clearAllAlerts, setRefreshAlert } from "../redux/slices/cryptoSlice";

const AlertChecker = () => {
    const allAlerts = useSelector((state)=>state.crypto.allAlerts)
    const cryptoData = useSelector((state)=>state.crypto.cryptoData)
    const dispatch = useDispatch();
    const refreshAlert = useSelector((state)=>state.crypto.refreshAlert)
  // useEffect(async() => {
  //   allAlerts?.forEach(async(alert) => {
  //     const { coinId, condition, targetPrice, triggered, isActive } = alert;

  //     if (!isActive || triggered) return; // skip inactive or already triggered

  //     const currentPrice = cryptoData?.[coinId]?.usd;
  //     if (!currentPrice) return; // skip if coin not found

  //     let shouldTrigger = false;

  //     if (condition === "above" && currentPrice > targetPrice) {
  //       shouldTrigger = true;
  //     } else if (condition === "below" && currentPrice < targetPrice) {
  //       shouldTrigger = true;
  //     }

  //     if (shouldTrigger) {
  //       // 🔔 Show Toast
  //       toast.success(
  //         `${coinId.toUpperCase()} is ${condition} ${targetPrice} (Now: $${currentPrice})`
  //       );

  //       try{
  //         const result = await apiConnector("POST",sendEmailEndpoints.SEND_EMAIL,{text:`${coinId.toUpperCase()} is ${condition} than ${targetPrice} (Now: $${currentPrice})`})
  //         toast.success(result?.data?.message)
  //       }
  //       catch(error){
  //         toast.error(error?.response?.data?.message || error?.message || "Error in sending the email")

  //       }

  //     }
  //   });
  // }, [allAlerts, cryptoData]);

  useEffect(() => {
  const checkAlerts = async () => {
    allAlerts?.forEach(async (alert) => {
      const { coinId, condition, targetPrice, triggered, isActive } = alert;

      if (!isActive || triggered) return; // skip inactive or already triggered

      const currentPrice = cryptoData?.[coinId]?.usd;
      if (!currentPrice) return; // skip if coin not found

      let shouldTrigger = false;

      if (condition === "above" && currentPrice > targetPrice) {
        shouldTrigger = true;
      } else if (condition === "below" && currentPrice < targetPrice) {
        shouldTrigger = true;
      }

      if (shouldTrigger) {
        // 🔔 Show Toast
        toast.success(
          `${coinId.toUpperCase()} is ${condition} ${targetPrice} (Now: $${currentPrice})`
        );

        try {
          const result = await apiConnector(
            "POST",
            sendEmailEndpoints.SEND_EMAIL,
            {
              text: `${coinId.toUpperCase()} is ${condition} than ${targetPrice} (Now: $${currentPrice})`
            }
          );
          toast.success(result?.data?.message);
        } catch (error) {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Error in sending the email"
          );
        }

        try{
          await apiConnector("PUT",`${alertEndpoints.UPDATE_ALERT_TRIGGERED_STATE}/${alert?._id}`)
          dispatch(clearAllAlerts())
          dispatch(setRefreshAlert(!refreshAlert))
        }
        catch(error){
          console.log("Error in updating the triggered state of alert : ",error)
        }
      }
    });
  };

  checkAlerts();
}, [allAlerts, cryptoData]);

  return null;
};

export default AlertChecker;
