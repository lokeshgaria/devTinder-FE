import  Razorpay from "razorpay" 

export const RazorInstance = new Razorpay({
  key_id: import.meta.env.VITE_RAZOR_KEY_ID,
  key_secret:import.meta.env.VITE_RAZOR_KEY_SECRET,
});

 