import Alert from "../models/alert.model.js";

// Create new alert
export const createAlert = async (req, res) => {
  try {
    const { coinId, condition, targetPrice } = req.body;

    const alert = await Alert.create({userId:req.user.id, coinId, condition, targetPrice });

    res.status(201).json({ message: "Alert created", alert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all alerts for a user
export const getUserAlerts = async (req, res) => {
  try {
    const  userId  = req.user.id;
    const alerts = await Alert.find({ userId });
    res.json({allAlerts:alerts});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an alert
export const deleteAlert = async (req, res) => {
  try {
    const { id } = req.params;
    await Alert.findByIdAndDelete(id);
    res.json({ message: "Alert deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateAlertActiveState = async(req,res)=>{
  try{
    const {activeState} = req.body;
    console.log("Active state : ",activeState)
    const {alertId} = req.params;
    if(!alertId){
      return res.status(404).json({
        success:false,
        message:"Alert id not found"
      })
    }
    if(req.user.id){
      await Alert.findByIdAndUpdate(alertId,{$set:{isActive:activeState}})
      return res.status(200).json({
        message:"State change"
      })
    }
    else{
      return res.status(403).json({
        success:false,
        message:"Login first"
      })
    }
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:error.message || "Error in updating the active state of the alert"
    })
  }
}

export const updateAlertTriggered = async(req,res)=>{
  try{
    const {alertId} = req.params;
    if(!alertId){
      return res.status(404).json({
        success:false,
        message:"Alert id not found"
      })
    }

    await Alert.findByIdAndUpdate(alertId,{$set:{triggered:true}})
    return res.status(200).json({
      success:true,
      message:"Triggered updated"
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message || "Error in updating the triggered state"
    })
  }
}
