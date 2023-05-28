import "./Orders.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../../axios/Orders";

////////////////////////////
function Border() {
  return <div className="OrderBorder"></div>;
}
///////////////////////////

function OrderMiddle() {
  return <div className="Middle-Container">배송상태변경등</div>;
}

function OrderBottom() {
  return (
    <div className="Bottom-Container">
      <OrderCount />
      <Border />
      <OrderInquiry />
      <OrderSelect />
    </div>
  );
}
/////////////////////

function OrderInquiry() {
  return (
    <div className="Order-Inquiry-wrapper">
      <div>주문번호</div>
      <div>주문일시</div>
      <div>상품명</div>
      <div>주문상태</div>
      <div>구매자명</div>
    </div>
  );
}

function OrderCount() {
  return <div className="OrderCount-Container">목록( 총 N개 )</div>;
}

function OrderSelect() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalLastPage, setTotalLastPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOrders(currentPage, 10);
      if (data) {
        setOrders(data.orders);
        setTotalLastPage(data.totalLastPage);
      }
    };

    fetchData();
  }, [currentPage]);
  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="order-select">
      {orders.length > 0 ? (
        orders.map((order) => (
          <button
            className="order-select-detail"
            key={order.orderId}
            onClick={() => handleOrderClick(order.orderId)}
          >
            <p>{order.orderNumber}</p>
            <p>{order.orderDate}</p>
            <p>{order.productName}</p>
            <p>{order.orderStatus}</p>
            <p>{order.customerName}</p>
          </button>
        ))
      ) : (
        <p>데이터가 없습니다.</p>
      )}
      <div className="pagination">
        {[...Array(totalLastPage)].map((_, i) => (
          <button
            className="paginationBT"
            key={i}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Orders() {
  return (
    <div className="MainContainer">
      <OrderMiddle />
      <OrderBottom />
    </div>
  );
}
