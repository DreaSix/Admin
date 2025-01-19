import React, { useEffect } from "react";
import { Input, Button } from "antd";
import "./Deposite.scss";
import { transactionService } from "../../Service/TransactionService";

const Deposite = () => {

  useEffect(() => {
    getDepositTransactions()
  }, [])

  const getDepositTransactions = () => {
    transactionService.getAllTransactions()
      .then(response => {
        console.log('response', response)   
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  return (
    <div className="add-user-amount-container">
      <h2>Add User Amount</h2>

      {/* Form Fields */}
      <div className="form-group">
        <label>User Name / ID</label>
        <Input placeholder="Enter User Name or ID" />
      </div>
      <div className="form-group">
        <label>Amount</label>
        <Input placeholder="Enter Amount" />
      </div>
      <div className="form-group">
        <label>UTR / Transaction ID</label>
        <Input placeholder="Enter UTR or Transaction ID" />
      </div>

      {/* Submit Button */}
      <Button type="primary" className="done-button">
        Done
      </Button>
    </div>
  );
};

export default Deposite;
