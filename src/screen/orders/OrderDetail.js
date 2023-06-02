import { MainContainer } from "../component/main/MainComponent";
import SideNav from "../component/common/side-nav/SideNav";
import "./OrderDetail.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import CancelModal from "../../component/order/CancelModal";
import {
  fetchOrderDetail,
  getCanceledOrderDetails,
  approveCancel,
} from "../../axios/Orders";

////////////////////////////
function Border() {
  return <div className="OrderBorder"></div>;
}

///////////////////////////

function OrderTitle() {
  return (
    <div className="OrderTitle-h1">
      <h1>주문상세</h1>
      <Border />
    </div>
  );
}

function OrderImage({ order }) {
  const handleImageDownload = async () => {
    for (const product of order.products) {
      try {
        const response = await fetch(product.productUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", product.name + ".png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="OrderIMG">
      <Button text="이미지 다운로드" onClick={handleImageDownload} />
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
function OrderInquiryDetail({ order }) {
  return (
    <>
      {order.products.map((product, index) => (
        <div key={index} className="Inquiry-Delivery-wrapper">
          <div>
            <img src={product.productUrl} alt={product.name} />
          </div>
          <div>{product.name}</div>
          <div>{product.price}원</div>
          <div>{order.deliveryFee}원</div>
          <div>{product.quantity}</div>
          <div>{product.price * product.quantity}원</div>
        </div>
      ))}
    </>
  );
}
function OrderInquiryDelivery({ order }) {
  return (
    <div className="Inquiry-Delivery-small-wrapper">
      <div>상품합계금액 : {order.totalProductPrice}원</div>
      <div>배송비 : {order.deliveryFee}원</div>
      <div>결제금액 : {order.totalPrice}원</div>
    </div>
  );
}

function OrderInquiryDelivery2({ order }) {
  return (
    <table className="Inquiry-Delivery">
      <tr className="Inquiry-Delivery-top">
        <th className="cell-top">상품합계금액</th>
        <th className="cell-top">배송비</th>
        <th className="cell-top">지역별배송비</th>
        <th className="cell-top">총결제금액</th>
      </tr>
      <tr className="Inquiry-Delivery-bottom">
        <td className="cell-bottom">{order.totalProductPrice}원</td>
        <td className="cell-bottom">{order.deliveryFee}원</td>
        <td className="cell-bottom">0원</td>
        <td className="cell-bottom">{order.totalPrice}원</td>
      </tr>
    </table>
  );
}

function OrderPerson({ order }) {
  return (
    <>
      <h2>주문자 정보</h2>
      <Border />
      <div className="grid">
        <div className="Order-common">주문자명</div>
        <div className="Order-common">{order.customerName}</div>
      </div>
      <div className="grid">
        <div className="Order-common">휴대폰번호</div>
        <div className="Order-common">{order.receiverPhoneNumber}</div>
      </div>
      <div className="grid">
        <div className="Order-common">메일</div>
        <div className="Order-common">{order.receiverEmail}</div>
      </div>
    </>
  );
}

function OrderDelivery({ order }) {
  return (
    <>
      <h2>배송지 정보</h2>
      <Border />
      <div className="grid">
        <div className="Order-common">주문자명</div>
        <div className="Order-common">{order.customerName}</div>
      </div>
      <div className="grid">
        <div className="Order-common">주소</div>
        <div className="Order-common">{order.address}</div>
      </div>
      <div className="grid">
        <div className="Order-common">휴대폰번호</div>
        <div className="Order-common">{order.receiverPhoneNumber}</div>
      </div>
    </>
  );
}
function OrderPayment({ order }) {
  let paymentDetail;

  switch (order.paymentType) {
    case "신용카드":
      paymentDetail = (
        <>
          {" "}
          <div className="grid">
            <div className="Order-common">카드사 이름</div>
            <div className="Order-common">{order.paymentInfo.cardName}</div>
          </div>
          <div className="grid">
            <div className="Order-common">카드 번호</div>
            <div className="Order-common">{order.paymentInfo.cardNumber}</div>
          </div>
          <div className="grid">
            <div className="Order-common">할부 개월 수</div>
            <div className="Order-common">{order.paymentInfo.cardQuota}</div>
          </div>
          <div className="grid">
            <div className="Order-common">결제 일자</div>
            <div className="Order-common">{order.paymentInfo.paidAt}</div>
          </div>
        </>
      );
      break;
    case "가상 계좌":
      paymentDetail = (
        <>
          <div className="grid">
            <div className="Order-common">가상계좌 정보</div>
            <div className="Order-common">{order.paymentInfo.vbankInfo}</div>
          </div>
          <div className="grid">
            <div className="Order-common">입금자 은행</div>
            <div className="Order-common">
              {order.paymentInfo.depositorBank}
            </div>
          </div>
          <div className="grid">
            <div className="Order-common">입금자 이름</div>
            <div className="Order-common">
              {order.paymentInfo.depositorName}
            </div>
          </div>

          <div className="grid">
            <div className="Order-common">입금자 계좌번호</div>
            <div className="Order-common">
              {order.paymentInfo.depositorAccount}
            </div>
          </div>
          <div className="grid">
            <div className="Order-common">현금영수증 신청 여부</div>
            <div className="Order-common">
              {order.paymentInfo.isApplyCashReceipt
                ? "신청됨"
                : "신청되지 않음"}
            </div>
          </div>
          <div className="grid">
            <div className="Order-common">결제 일자</div>
            <div className="Order-common">{order.paymentInfo.paidAt}</div>
          </div>
        </>
      );
      break;
    default:
      paymentDetail = (
        <div className="Order-common">결제정보를 불러올 수 없습니다.</div>
      );
  }
  return (
    <>
      <h2>결제 정보</h2>
      <Border />
      <div className="grid">
        <div className="Order-common">상품합계금액</div>
        <div className="Order-common">{order.totalProductPrice}원</div>
      </div>
      <div className="grid">
        <div className="Order-common">배송비</div>
        <div className="Order-common">{order.deliveryFee}원</div>
      </div>
      <div className="grid">
        <div className="Order-common">총결제금액</div>
        <div className="Order-common">{order.totalPrice}원</div>
      </div>
      <div className="grid">
        <div className="Order-common">결제수단</div>
        <div className="Order-common">{order.paymentType}</div>
      </div>
      {paymentDetail}
    </>
  );
}

function CancelInfo({ orderId, cancelInfo }) {
  const [modal, showModal] = useState(false);
  return (
    <>
      {modal && (
        <CancelModal orderId={orderId} closeModal={() => showModal(false)} />
      )}
      <h2>취소 정보</h2>
      <Border />
      <div className="grid">
        <div className="Order-common">취소사유</div>
        <div className="Order-common">{cancelInfo.reason}</div>
      </div>
      <div className="grid">
        <div className="Order-common">요청일시</div>
        <div className="Order-common">{cancelInfo.reqAt}</div>
      </div>
      <div className="grid">
        <div className="Order-common">취소일시</div>
        <div className="Order-common">{cancelInfo.canceledAt}</div>
      </div>
      {cancelInfo.approvedAdminName ? (
        <>
          <div className="grid">
            <div className="Order-common">취소요금</div>
            <div className="Order-common">
              &#8361;
              {cancelInfo.fee.toLocaleString("ko-KR")}
            </div>
          </div>
          <div className="grid">
            <div className="Order-common">담당자명</div>
            <div className="Order-common">{cancelInfo.approvedAdminName}</div>
          </div>
        </>
      ) : (
        <Button
          variant="outlined"
          sx={{
            width: "100%",
            fontWeight: "bold",
            fontSize: 15,
            borderColor: "black",
            color: "black",
            "&:hover": {
              borderColor: "black",
              backgroundColor: "white",
            },
          }}
          onClick={() => showModal(true)}
        >
          주문 취소 승인
        </Button>
      )}
    </>
  );
}
function ReOrderDetail() {
  const goBack = () => {
    window.location.href = "/order";
  };

  return (
    <div className="ReOrder">
      <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          width: "100%",
          fontSize: 15,
          "&:hover": {
            backgroundColor: "black",
          },
        }}
        onClick={goBack}
      >
        되돌아가기
      </Button>
    </div>
  );
}

export default function OrderDetail({ canceled }) {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [cancelInfo, setCancelInfo] = useState(null);

  useEffect(() => {
    if (canceled) {
      getCanceledOrderDetails(orderId)
        .then((res) => {
          setOrder(res.data.basicOrderDetail);
          setCancelInfo(res.data.canceledInfo);
        })
        .catch((err) => alert(err.response.data.error_message));
    } else {
      const fetchData = async () => {
        const data = await fetchOrderDetail(orderId);
        if (data) {
          setOrder(data);
        }
      };
      fetchData();
    }
  }, [orderId]);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="MainContainer">
      <div className="left-Container">
        <MainContainer />
        <SideNav />
      </div>
      <div className="Right-Container">
        <div className="OrderDetail">
          <OrderTitle />
          <OrderInquiry />
          <OrderInquiryDetail order={order} />
          <OrderImage order={order} />
          <OrderInquiryDelivery order={order} />
          <OrderInquiryDelivery2 order={order} />
          <OrderPerson order={order} />
          <OrderDelivery order={order} />
          <OrderPayment order={order} />
          {canceled && <CancelInfo orderId={orderId} cancelInfo={cancelInfo} />}
          <ReOrderDetail />
        </div>
      </div>
    </div>
  );
}
