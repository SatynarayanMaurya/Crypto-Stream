import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coinId: { type: String, required: true }, // e.g., "bitcoin"
    condition: { type: String, enum: ["above", "below"], required: true },
    targetPrice: { type: Number, required: true },
    isActive:{type:Boolean,default:true},
    triggered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);

