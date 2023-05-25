import { MainContainer } from "../component/main/MainComponent";
import SideNav from "../component/common/side-nav/SideNav";
import './Orders.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOrders,updateOrder,updateOrderStatus } from '../../axios/Orders';
import { Checkbox } from "@mui/material";
import Modal from 'react-modal';
import Button from '../../component/Button';
import Input from '../../component/Input';

////////////////////////////
function Border(){
  return <div className="OrderBorder"></div>;
}
///////////////////////////

function OrderTop() {
  return (
  <div className="Top-Container">
    <h1>주문조회</h1>
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

function OrderSelect({ selectedOrders, setSelectedOrders }) {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalLastPage, setTotalLastPage] = useState(0);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [depositorBank, setDepositorBank] = useState('');
  const [depositorName, setDepositorName] = useState('');
  const [depositorAccount, setDepositorAccount] = useState('');
  const [newOrderStatus, setNewOrderStatus] = useState('');

  useEffect(() => {
    console.log('Selected Orders:', selectedOrders);

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
    console.log('Current Selected Orders:', selectedOrders);
  };

  const [currentOrderId, setCurrentOrderId] = useState(null);

  const handleOpenModal = (orderId) => {
    setCurrentOrderId(orderId);
    setModalOpen(true);
  };

  const handleCloseModal = async () => {
    setModalOpen(false);


    const data = await fetchOrders(currentPage, 10);
    if (data) {
      setOrders(data.orders);
      setTotalLastPage(data.totalLastPage);
    }
  };


  const handleConfirm = async () => {
    await updateOrder(currentOrderId, depositorBank, depositorName, depositorAccount);
    setCurrentOrderId(null);
    setDepositorBank('');
    setDepositorName('');
    setDepositorAccount('');
    handleCloseModal();
  };

  const handleStatusChange = async () => {
    for (const orderId of selectedOrders) {
      await updateOrderStatus(orderId, newOrderStatus);
      console.log('아이디',orderId);
      console.log('상태정보 ',  newOrderStatus);
    }

    const data = await fetchOrders(currentPage, 10);
    if (data) {
      setOrders(data.orders);
      setTotalLastPage(data.totalLastPage);

    }

    setSelectedOrders([]);
    setNewOrderStatus('');
  };

   return (
    <>
     <div>
        <select value={newOrderStatus} onChange={(e) => setNewOrderStatus(e.target.value)}>
          <option value="">주문 상태 선택</option>
          <option value="MAKING">제작시작</option>
          <option value="DELIVERING">배송시작</option>
          <option value="COMPLETE ">배송완료 </option>
        </select>
        <button onClick={handleStatusChange}>변경</button>
      </div>
      <OrderCount/>
      <Border/>
      <OrderInquiry/>

      <div className="order-select">
        {orders.length > 0 ? (
          orders.map((order) => (
            <button
              className={`order-select-detail `}
              key={order.orderId}
              onClick={() => handleOrderClick(order.orderId)}
            >
              <div className="order_select_checkbox">
              <Checkbox
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  if (e.target.checked) {
                    setSelectedOrders((prevSelectedOrders) => [...prevSelectedOrders, order.orderId]);
                  } else {
                    setSelectedOrders((prevSelectedOrders) =>
                      prevSelectedOrders.filter((orderId) => orderId !== order.orderId)
                    );
                  }
                }}
                checked={selectedOrders.includes(order.orderId)}
              />

                <p>{order.orderNumber}</p>
              </div>
              <p>{order.orderDate}</p>
              <p>{order.productName}</p>
              <div className="OrderStatus">
                <p>{order.orderStatus}</p>
                {order.orderStatus === '입금대기' && (
                  <Button className="orderStatus-Button" onClick={(e) => { e.stopPropagation(); handleOpenModal(order.orderId); }} text="입금 확인"></Button>
                )}
              </div>
              <p>{order.customerName}</p>
            </button>
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </div>

      <div className="pagination">
        {[...Array(totalLastPage)].map((_, i) => (
          <button
            className={`paginationBT ${currentPage === i ? 'active' : ''}`}
            key={i}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Update Order Modal"
      >
        <h2>가상 계좌 정보 입력</h2>
        <input type="text" placeholder="Bank" value={depositorBank} onChange={(e) => setDepositorBank(e.target.value)} />
        <input type="text" placeholder="Name" value={depositorName} onChange={(e) => setDepositorName(e.target.value)} />
        <input type="text" placeholder="Account" value={depositorAccount} onChange={(e) => setDepositorAccount(e.target.value)} />
        <Button onClick={handleConfirm} text="제출"></Button>
        <Button onClick={handleCloseModal} text="취소"></Button>
      </Modal>
    </>
  );
}

export default function Orders() {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [newOrderStatus, setNewOrderStatus] = useState('');

  return (
    <div className="MainContainer">
      <div className="left-Container">
        <MainContainer />
        <SideNav />
      </div>
      <div className="Right-Container">
        <OrderTop/>

        <div className="Bottom-Container">

          <OrderSelect
            selectedOrders={selectedOrders}
            setSelectedOrders={setSelectedOrders}
          />
          </div>
      </div>
    </div>
  );
}

