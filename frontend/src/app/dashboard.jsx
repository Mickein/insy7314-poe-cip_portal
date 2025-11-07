import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./dashboard.css";

export default function Dashboard() {
  const [completedPayment, setCompletedPayment] = useState({
    idNumber: "",
    recipientName: "",
    bankName: "",
    swiftCode: "",
    accountNumber: "",
    currency: "USD",
    amount: "",
    recipientReference: "",
    ownReference: ""
  });

  const [outstandingPayments, setOutstandingPayments] = useState([]);

  // handle input change
  const handleChange = (e) => {
    setCompletedPayment({
      ...completedPayment,
      [e.target.name]: e.target.value
    });
  };

  // submit form
  const paymentsForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:3001/outstanding-payment", completedPayment, {
        headers: { "Content-Type": "application/json" }
      });
      toast.success("Payment Request Submitted ✅");

      setCompletedPayment({
        idNumber: "",
        recipientName: "",
        bankName: "",
        swiftCode: "",
        accountNumber: "",
        currency: "USD",
        amount: "",
        recipientReference: "",
        ownReference: ""
      });

      fetchOutstandingPayments();
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Error during submission ❌");
    }
  };

  // fetch outstanding payments
  const fetchOutstandingPayments = async () => {
    try {
      const res = await axios.get("https://localhost:3001/payments");
      setOutstandingPayments(res.data);
    } catch (error) {
      console.error("Error fetching outstanding payments:", error);
    }
  };

  useEffect(() => {
    fetchOutstandingPayments();
  }, []);

  return (
    <>
      <ToastContainer />
      <h2 className="dashboard-heading">Dashboard</h2>

      <div className="container">
        <form className="popup-form" onSubmit={paymentsForm}>
          <h3>Make Payment:</h3>

          <label>ID Number</label>
          <input
            type="text"
            name="idNumber"
            value={completedPayment.idNumber}
            onChange={handleChange}
            placeholder="ID Number"
          />

          <label>Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={completedPayment.recipientName}
            onChange={handleChange}
            placeholder="Recipient Name"
          />

          <label>Bank Name Of Recipient</label>
          <input
            type="text"
            name="bankName"
            value={completedPayment.bankName}
            onChange={handleChange}
            placeholder="Bank Name Of Recipient"
          />

          <input
            type="text"
            name="swiftCode"
            value={completedPayment.swiftCode}
            onChange={handleChange}
            placeholder="Recipient Swift Code"
          />

          <input
            type="text"
            name="accountNumber"
            value={completedPayment.accountNumber}
            onChange={handleChange}
            placeholder="Account Number"
          />

          <label>Currency</label>
          <select
            name="currency"
            value={completedPayment.currency}
            onChange={handleChange}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="ZAR">ZAR - South African Rand</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CHF">CHF - Swiss Franc</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
          </select>

          <input
            type="text"
            name="amount"
            value={completedPayment.amount}
            onChange={handleChange}
            placeholder="Amount"
          />

          <label>References</label>
          <input
            type="text"
            name="recipientReference"
            value={completedPayment.recipientReference}
            onChange={handleChange}
            placeholder="Recipient Reference"
          />

          <input
            type="text"
            name="ownReference"
            value={completedPayment.ownReference}
            onChange={handleChange}
            placeholder="Own Reference"
          />

          <div className="submit-button-container">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
