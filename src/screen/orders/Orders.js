import './Orders.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOrders,updateOrder,updateOrderStatus } from '../../axios/Orders';
import { Checkbox } from "@mui/material";
import Modal from 'react-modal';
import Button from '../../component/Button';
import Input from '../../component/Input';
import Select from '../../component/Select';

function Border(){
  return(
    <div className='order-border'></div>
  )
}

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
    console.log('Modal opened: ', orderId);
    setDepositorBank('');
    setDepositorName('');
    setDepositorAccount('');
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
    console.log("Current bank: ", depositorBank);
    console.log("Current name: ", depositorName);
    console.log("Current account: ", depositorAccount);

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
     <div className="order-change-status">
      <Select
        value={newOrderStatus}
        onChange={setNewOrderStatus}
        options={[
          { value: '', label: '주문 상태 선택' },
          { value: 'MAKING', label: '제작시작' },
          { value: 'DELIVERING', label: '배송시작' },
          { value: 'COMPLETE', label: '배송완료' },
        ]}
        />
        <Button
          onClick={handleStatusChange}
          text="변경"
        />
      </div>




      <div className="order-select">
      <OrderInquiry/>
      <Border/>
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
                const checked = e.target.checked;
                if (checked) {
                  setSelectedOrders([order.orderId]);
                } else {
                   setSelectedOrders([]);
                }
              }}
              checked={selectedOrders.includes(order.orderId)}
            />
                <p>{order.orderNumber}</p>
              </div>
              <p>{order.orderDate}</p>
              <p>{order.productName}</p>

              {order.orderStatus === '입금대기' ? (
            <div className="OrderStatus">
              <p>{order.orderStatus}</p>
                <Button className="orderStatus-Button"
                  onClick={(e) => {
                    e.stopPropagation();
                     handleOpenModal(order.orderId);
                     }} text="입금 확인"/>
                </div>
              ) : (
                <p>{order.orderStatus}</p>
              )}
              <p>{order.customerName}</p>
            </button>
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}


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
      </div>


      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Update Order Modal"
        className="myContent"
      >
        <h2 className='order-modal-h2'>가상 계좌 정보 입력</h2>
        <Input
        type="text"
        name="Bank"
        label="Bank"
        placeholder="Bank"
        value={depositorBank}
        onChange={(e) => {
          console.log('Bank input changed: ', e.target.value);
          setDepositorBank(e.target.value);
        }}
      />

      <Input
        type="text"
        name="Name"
        label="Name"
        placeholder="Name"
        value={depositorName}
        onChange={(e) => {
          console.log('Name input changed: ', e.target.value);
          setDepositorName(e.target.value);
        }}
      />

      <Input
        type="text"
        name="Account"
        label="Account"
        placeholder="Account"
        value={depositorAccount}
        onChange={(e) => {
          console.log('Account input changed: ', e.target.value);
          setDepositorAccount(e.target.value);
        }}
      />

        <Button onClick={handleConfirm} text="제출"/>
        <Button onClick={handleCloseModal} text="취소"/>
      </Modal>
    </>
  );
}


export default function Orders() {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [newOrderStatus, setNewOrderStatus] = useState('');

  return (

          <OrderSelect
            selectedOrders={selectedOrders}
            setSelectedOrders={setSelectedOrders}
          />

  );
}
