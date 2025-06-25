import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import OrderProduct from "../components/orderComponents/OrderProduct";
import { LoginContext } from "../context/LoginContext";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

function Orders() {
  const { token } = useContext(LoginContext);
  const { backendUrl } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  async function loadOrderData() {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } },
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.map((item, index) => {
          return (
            <OrderProduct
              key={index}
              item={item}
              loadOrderData={loadOrderData}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
