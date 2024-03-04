import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./AuthContext/AuthContext";

//Stripe configuration
const stripePromise = loadStripe(
  "pk_test_51Oo22QGNfZDSdZAlw5yDwfH53nGGWCxdMCrddhoqWPpWKgzwL9BlOTeBcHI3jw7Ezs2pR2MiN7okJx3sVd3iUlmj003ScjmAdD"
);

const options = {
  mode: "payment",
  currency: "usd",
  amount: 1099,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
//React query client
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Elements stripe={stripePromise} options={options}>
          <App />
        </Elements>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
