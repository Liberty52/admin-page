import { MainContainer } from "../component/main/MainComponent";
import SideNav from "../component/common/side-nav/SideNav";
import './OrderDetail.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getOrderDetail } from './OrderDetail';
////////////////////////////
function Border(){
  return <div className="border"></div>;
}


///////////////////////////


function OrderTitle() {
    return (
        <div>
        <h1>주문 상세</h1>
        <Border/>
        </div>
    );
}

function OrderInquiry() {
    return (
      <div className="Inquiry-Detail-wrapper">
        <div>상품명</div>
        <div>상품금액</div>
        <div>배송비</div>
        <div>수량</div>
        <div>상품합계금액</div>
      </div>
    );
  }
function OrderInquiryDetail(){
  return (
    <div className="Inquiry-Delivery-wrapper">
      <div>사진</div>
      <div>상품명</div>
      <div>상품금액</div>
      <div>배송비</div>
      <div>수량</div>
      <div>상품합계금액</div>
    </div>
  );
}
function OrderInquiryDelivery(){
  return (
    <div className="Inquiry-Delivery-small-wrapper">
      <div>상품합계금액 : {}원</div>
      <div>배송비 : {}원</div>
      <div>결제금액 : {}원</div>
    </div>
  );
}

function OrderInquiryDelivery2(){
  return (
    <table className="Inquiry-Delivery">

      <tr className="Inquiry-Delivery-top">
        <th className="cell-top">상품합계금액</th>
        <th className="cell-top">배송비</th>
        <th className="cell-top">지역별배송비</th>
        <th className="cell-top">총결제금액</th>
      </tr>
      <tr className="Inquiry-Delivery-bottom">
        <td className="cell-bottom">{}원</td>
        <td className="cell-bottom" >{}원</td>
        <td className="cell-bottom">{}원</td>
        <td className="cell-bottom">{}원</td>
    </tr>
  </table>
  );
}

function OrderPerson() {
  return (
      <>
      <h2>주문자 정보</h2>
      <Border/>
      <div className="grid">
        <div className="Order-common">주문자명</div>
        <div className="Order-common">{}김김김</div>
      </div>
      <div className="grid">
        <div className="Order-common">휴대폰번호</div>
        <div className="Order-common">{}01012341234</div>
      </div>
      <div className="grid">
      <div className="Order-common">메일</div>
      <div className="Order-common">{}선정@네이버</div>
    </div>
      </>
  );
}

function OrderDelivery() {
  return (
      <>
      <h2>배송지 정보</h2>
      <Border/>
      <div className="grid">
        <div className="Order-common">주문자명</div>
        <div className="Order-common">{}김김김</div>
      </div>
      <div className="grid">
        <div className="Order-common">주소</div>
        <div className="Order-common">{}주소임</div>
      </div>
      <div className="grid">
        <div className="Order-common">휴대폰번호</div>
        <div className="Order-common">{}01012341234</div>
      </div>
      </>
  );
}
function OrderPayment() {
  return (
      <>
      <h2>결제 정보</h2>
      <Border/>
      <div className="grid">
        <div className="Order-common">상품합계금액</div>
        <div className="Order-common">{}김김김</div>
      </div>
      <div className="grid">
        <div className="Order-common">배송비</div>
        <div className="Order-common">{}김김김</div>
      </div>
      <div className="grid">
        <div className="Order-common">총결제금액</div>
        <div className="Order-common">{}김김김</div>
      </div>
      <div className="grid">
        <div className="Order-common">결제수단</div>
        <div className="Order-common">{}김김김</div>
      </div>
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
      <div className="OrderDetail">
            <OrderTitle/>
            <OrderInquiry/>
            <OrderInquiryDetail/>
            <OrderInquiryDelivery/>
            <OrderInquiryDelivery2/>
            <OrderPerson/>
            <OrderDelivery/>
            <OrderPayment/>
        </div>

      </div>
    </div>
  );
}

