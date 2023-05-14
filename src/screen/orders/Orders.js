import { MainContainer } from "../component/main/MainComponent";
import SideNav from "../component/common/side-nav/SideNav";
import './Orders.css';
import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../../axios/Orders';

////////////////////////////
function Border(){
  return <div className="border"></div>;
}


///////////////////////////

function OrderTop() {
  return (
  <div className="Top-Container">
    <h1>주문조회</h1>
  </div>
  );
}

function OrderMiddle() {
  return (
    <div className="Middle-Container">
      배송상태변경등
    </div>
  );
}


function OrderBotton() {
  return (
    <div className="Bottom-Container">
    <OrderCount/>
    <Border/>
    <OrderInquiry/>
    <OrderSelect/>
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

  return (
    <div className="OrderCount-Container">
    목록( 총 N개 )
    </div>
  );
}

function OrderSelect() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalLastPage, setTotalLastPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOrders(currentPage, 10);
      if (data) {
        setOrders(data.orders);
        setCurrentPage(data.currentPage);
        setTotalLastPage(data.totalLastPage);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="order-select">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.orderId}>
            <h2>{order.productName}</h2>
            <p>{order.customerName}</p>
            <p>{order.orderDate}</p>
            <p>{order.orderStatus}</p>
          </div>
        ))
      ) : (
        <p>데이터가 없습니다.</p>
      )}
      <div>
        {[...Array(totalLastPage)].map((_, i) => (
          <button key={i} onClick={() => handlePageChange(i)}>
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
      <div className="left-Container">
        <MainContainer />
        <SideNav />
      </div>
      <div className="Right-Container">
        <OrderTop/>
        <OrderMiddle/>
        <OrderBotton/>
      </div>
    </div>
  );
}

