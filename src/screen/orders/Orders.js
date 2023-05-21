import { MainContainer } from "../component/main/MainComponent";
import SideNav from "../component/common/side-nav/SideNav";
import './Orders.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOrders,updateOrder } from '../../axios/Orders';
import { Checkbox } from "@mui/material";
import Modal from 'react-modal';
import Button from '../../component/Button';
import Input from '../../component/Input';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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


function OrderMiddle({ selectedStatus, setSelectedStatus, handleStatusUpdate }) {
  const statuses = ['MAKING', 'DELIVERING', 'COMPLETE '];

  return (
    <div className="Middle-Container">
      <Select
        value={selectedStatus}
        onChange={e => setSelectedStatus(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {statuses.map((status, index) => (
          <MenuItem key={index} value={status}>{status}</MenuItem>
        ))}
      </Select>
      <Button onClick={handleStatusUpdate} text="변경"></Button>
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
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [depositorBank, setDepositorBank] = useState('');
  const [depositorName, setDepositorName] = useState('');
  const [depositorAccount, setDepositorAccount] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);

/*
  const [orders, setOrders] = useState([
    {
      orderId: "1",
      orderNumber: "1234",
      orderDate: "2023-05-01",
      productName: "Test Product 1",
      orderStatus: "WAITING_DEPOSIT",
      customerName: "John Doe"
    },
    {
      orderId: "2",
      orderNumber: "2345",
      orderDate: "2023-05-02",
      productName: "Test Product 2",
      orderStatus: "Delivery",
      customerName: "Jane Doe"
    }
  ]);*/
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

  const handleOpenModal = (orderId) => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = async () => {
    await updateOrder( depositorBank, depositorName, depositorAccount);
    handleCloseModal();
  };


   return (
    <>
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

                }}
              />
                <p>{order.orderNumber}</p>
              </div>
              <p>{order.orderDate}</p>
              <p>{order.productName}</p>
              <div>
                <p>{order.orderStatus}</p>
                {order.orderStatus === 'WAITING_DEPOSIT' && (
                  <Button onClick={(e) => { e.stopPropagation(); handleOpenModal(order.orderId); }} text="입금 확인"></Button>
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

