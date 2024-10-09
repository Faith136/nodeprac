import { useState } from "react";
import "./index.css";
import Axios from "axios";

function App() {
  const [phone, setPhone] = useState(""); // Default to empty string
  const [amount, setAmount] = useState(""); // Default to empty string

  const payHandler = (event) => {
    event.preventDefault();

    // Basic input validation
    if (!phone || !amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid phone number and amount.");
      return;
    }

    Axios.post("http://localhost:5100/mpay", {
      amount,
      phone,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-green-50">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img
            src="/src/assets/mpes.png" // Verify the path
            alt="Lipa na Mpesa"
            className="w-32 h-auto"
          />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Pay with <span className="text-green-600">Mpesa</span>
        </h1>
        <form onSubmit={payHandler} className="space-y-5">
          <input
            type="text"
            placeholder="Enter phone number"
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-100 text-center"
          />
          <input
            type="number"
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-100 text-center"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 rounded-lg transition duration-300 hover:bg-green-500 shadow-md"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

