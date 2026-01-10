import AXIOS_API from "../utils/axios";
import { useState } from "react";
import { showError, showSuccess } from "../utils/notifications";
import {triggerSuccessConfetti} from "../utils/helper"
const RAZOR_KEY_ID = import.meta.env.VITE_RAZOR_KEY_ID;

const useUpgrade = () => {
  const [loading, setLoading] = useState(null);

  async function payNow(PLAN) {
    try {
      setLoading(true);
      //const amount = 70000;

      // 1. Get Order from Backend
      const { data } = await AXIOS_API.post("/upgrade-plan", {
        currency: "INR",
        receipt: "receipt#1",
        notes: { plan_name: PLAN },
      });

      // Based on your code, data is likely response.data
      const order = data.order;

      console.log("order__", order, data);

      // 2. Configuration for the UI Checkout
      const options = {
        key: RAZOR_KEY_ID,
        amount: order.amount, // Use amount from backend order
        currency: order.currency,
        name: "LOvnti ☕",
        description: "Test Transaction",
        order_id: order.id, // CRITICAL: Use the ID from your API response
        handler: async function (response) {
          try {
            const VERIFY_PAYMENT = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const { data } = await AXIOS_API.post(
              "/verify-payment",
              VERIFY_PAYMENT
            );

            if (data.success) {
              // TRIGGER THE PARTY POPPER 🎉
              triggerSuccessConfetti();

              showSuccess(data.message);
              // Optional: Delay redirect to let user see confetti
              setTimeout(() => {
                window.location.href = "/";
              }, 2000);
            }
          } catch (error) {
            showError(error.message);
          }
        },
        prefill: {
          name: order.notes.user.name,
          email: order.notes.user.email,
          contact: order.notes.user.phone || "8076298443",
        },
        theme: {
          color: "#2E3192", // Tinder Pink - This will color the CTA button and header
          backdrop_color: "#202124", // Dark background for a premium feel
        },
      };

      // 3. Open the Checkout UI
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();

        // THIS handles the actual technical failures (wrong OTP, declined card)
        rzp.on("payment.failed", function (response) {
          console.error("Payment Failed!", response.error);

          // These are useful for your internal logs
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);

          showError(`Payment failed: ${response.error.description}`);
        });
      } else {
        alert(
          "Razorpay SDK not loaded. Check your internet or index.html script tag."
        );
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      showError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { payNow, loading };
};

export default useUpgrade;
