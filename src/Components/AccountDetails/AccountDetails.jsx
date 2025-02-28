import { useEffect, useState } from "react";
import { Card, Button, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { paymentService } from "../../Service/PaymentService";
import { useNavigate } from "react-router";
import "./AccountDetails.scss"; // Import SCSS file

const PaymentList = () => {
  const navigate = useNavigate();
  const [accountDetails, setAccountDetails] = useState([]);

  useEffect(() => {
    getAccountDetails();
  }, []);

  const getAccountDetails = () => {
    paymentService
      .getAllPayments()
      .then((response) => {
        setAccountDetails(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const onEdit = (payment) => {
    console.log("Edit:", payment);
  };

  const onDelete = (id) => {
    paymentService.deletePayment(id)
      .then(response => {
        message.success("Account deleted successfully")
        getAccountDetails()
      })
      .catch(error => {
        message.error("Error while deleting account")
      })
  };

  return (
    <main className="payment-container">
      <div className="header-container">
        <Button
          className="add-account-btn"
          icon={<PlusCircleOutlined />}
          onClick={() => navigate("/create-account")}
        >
          Add Account
        </Button>
      </div>

      <div className="payment-list">
        {accountDetails.map((payment) => (
          <Card key={payment.id} className="payment-card">
            <div className="payment-info">
              {payment.paymentMethod === "UPI" ? (
                <>
                  <p>UPI ID: {payment.upiId}</p>
                  <p>Phone: {payment.upiPhone}</p>
                  <img
                    src={payment.qrCodeUrl}
                    alt="QR Code"
                    className="qr-code"
                  />
                </>
              ) : (
                <>
                  <p><span style={{fontWeight:"bold"}}>Account Name : </span> {payment.accountName}</p>
                  <p><span style={{fontWeight:"bold"}}>Account Number : </span>{payment.accountNumber}</p>
                  <p><span style={{fontWeight:"bold"}}>IFSC Code : </span>{payment.ifscCode}</p>
                  <p><span style={{fontWeight:"bold"}}>Bank : </span>{payment.bankName}</p>
                </>
              )}
            </div>

            <div className="action-buttons">
              <Button className="delete-btn" onClick={() => onDelete(payment.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default PaymentList;
