import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./employee-dashboard.css"; 

export default function EmployeeDashboard() {
  const [paymentEntries, setPaymentEntries] = useState([]);

  const apiUrl = "https://localhost:3001/payment-entries"; // Update if needed

  // Fetch payment entries
  const getPaymentEntries = async () => {
    try {
      const response = await axios.get(apiUrl);
      setPaymentEntries(response.data.paymentEntries || []);
    } catch (error) {
      console.error("Error fetching payment entries:", error);
      toast.error("Failed to fetch payment entries");
    }
  };

  useEffect(() => {
    getPaymentEntries();
  }, []);

  // Update status
  const updateEntryStatus = async (index, newStatus) => {
    const entry = paymentEntries[index];

    if (newStatus === "VERIFIED" && entry.status === "VERIFIED") {
      toast.info("This entry is already verified.");
      return;
    }

    if (newStatus === "DECLINED" && (entry.status === "VERIFIED" || entry.status === "DECLINED")) {
      toast.info("This entry cannot be declined.");
      return;
    }

    try {
      const response = await axios.put(`${apiUrl}/${entry._id}`, { status: newStatus });
      const updatedEntries = [...paymentEntries];
      updatedEntries[index].status = response.data.paymentEntry.status;
      setPaymentEntries(updatedEntries);
      toast.success(`Payment entry ${newStatus.toLowerCase()} successfully.`);
    } catch (error) {
      console.error(`Error updating entry status:`, error);
      toast.error(`Failed to ${newStatus.toLowerCase()} payment entry.`);
    }
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "purple";
      case "VERIFIED":
        return "green";
      case "DECLINED":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <ToastContainer />
      <h2 style={{ padding: "15px", backgroundColor: "antiquewhite", color: "#7a478d", textAlign: "center" }}>
        Employee Dashboard
      </h2>

      <h2>Payment Verification</h2>

      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#f2f2f2" }}>
        <thead>
          <tr>
            <th>ID Number</th>
            <th>Bank Name</th>
            <th>SWIFT Code</th>
            <th>Currency</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentEntries.length > 0 ? (
            paymentEntries.map((entry, index) => (
              <tr key={entry._id} style={{ border: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{entry.idNumber}</td>
                <td style={{ padding: "10px" }}>{entry.bankName}</td>
                <td style={{ padding: "10px" }}>{entry.swiftCode}</td>
                <td style={{ padding: "10px" }}>{entry.currency}</td>
                <td style={{ padding: "10px" }}>{entry.amount}</td>
                <td style={{ padding: "10px", color: getStatusColor(entry.status) }}>
                  {entry.status || "PENDING"}
                </td>
                <td style={{ padding: "10px" }}>
                    <button onClick={() => updateEntryStatus(index, "VERIFIED")} className="verify-btn button-spacing">
                    Verify
                    </button>
                    <button onClick={() => updateEntryStatus(index, "DECLINED")} className="decline-btn">
                    Decline
                    </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                No payment entries found
              </td>
            </tr>
          )}
        </tbody>
        
      </table>
    </div>
  );
}
