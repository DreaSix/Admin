import { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { paymentService } from "../../Service/PaymentService";
import { useNavigate } from "react-router";


const PaymentList = () => {
    const navigate = useNavigate();
    const [accountDetails, setAccoutDetails] = useState([])

  useEffect(() => {
    getAccountDetails()
  },[])

  const getAccountDetails = () => {
    paymentService.getAllPayments()
        .then(response => {
            setAccoutDetails(response?.data)
        })
        .catch(error => {
            console.log('error', error)
        })
  }

  const onEdit = (payment) => {
  }

  const onDelete = (id) => {
    console.log('id', id)
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className=" items-center mb-4" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2 className="text-lg font-semibold">Payments</h2>
        <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => navigate("/create-account")}>
          Add Payment
        </Button>
      </div>

      <div className="space-y-4">
      {accountDetails.map((payment) => (
        <Card key={payment.id} className="p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">

              {payment.paymentMethod === "UPI" ? (
                <div className="mt-2 text-sm">
                  <p>UPI ID: {payment.upiId}</p>
                  <p>Phone: {payment.upiPhone}</p>
                  <img
                    src={payment.qrCodeUrl}
                    alt="QR Code"
                    className="w-20 h-20 mt-2 rounded"
                  />
                </div>
              ) : (
                <div className="mt-2 text-sm">
                  <p>Account Name: {payment.accountName}</p>
                  <p>Account No: {payment.accountNumber}</p>
                  <p>IFSC Code: {payment.ifscCode}</p>
                  <p>Bank: {payment.bankName}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(payment)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(payment.id)}
              >
                Delete
              </Button>
            </div>
        </Card>
      ))}
    </div>
    </div>
  );
};

export default PaymentList;
