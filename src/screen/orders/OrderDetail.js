import { MainContainer } from '../../component/common/MainComponent';
import SideNav from '../../component/common/side-nav/SideNav';
import './OrderDetail.css';
import { Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchOrderDetail, upscaleImage, fetchRealTimeDeliveryInfo } from '../../axios/Orders';
import Button from '../../component/common/Button';

function Border() {
  return <div className='OrderBorder'></div>;
}

function OrderTitle() {
  return (
    <div className='OrderTitle-h1'>
      <h1>주문상세</h1>
      <Border />
    </div>
  );
}

function OrderImage({ product }) {
  const [upscaling, setUpScaling] = useState(false);

  const handleImageDownload = async () => {
    try {
      const response = await fetch(product.productUrl, { cache: 'no-cache' });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', product.name + '.png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpscale = (url) => {
    if (!upscaling) {
      setUpScaling(true);
      upscaleImage(url, 4)
        .then((res) => {
          const afterUrl = res.data.afterUrl;
          if (afterUrl === '' || afterUrl === null) {
            alert('[사용 제한] 잠시 후 다시 이용해주세요.');
          } else {
            alert('이미지 업스케일링 성공');
            const showImageWindow = setInterval(function () {
              fetch(afterUrl)
                .then((res) => {
                  if (res.status === 200) {
                    window.open(afterUrl, '_blank').focus();
                    clearInterval(showImageWindow);
                  }
                })
                .catch((e) => alert(e));
            }, 1000);
          }
          setUpScaling(false);
        })
        .catch((err) => {
          alert(err.response.data.error_message);
          setUpScaling(false);
        });
    }
  };

  return (
    <div className='OrderIMG'>
      <h2>배경 이미지</h2>
      <div>
        <img
          src={product.custom ? product.productUrl : product.licenseArtUrl}
          alt={product.name}
          onClick={() => window.open(product.productUrl, '_blank')}
        />
        <div className='img-button-group'>
          <Button
            text={upscaling ? '업스케일링 진행 중...' : '이미지 업스케일링'}
            onClick={() => handleImageUpscale(product.productUrl)}
          />
          <Button text='이미지 다운로드' onClick={handleImageDownload} />
        </div>
      </div>
    </div>
  );
}

function OrderInquiry() {
  return (
    <div className='Inquiry-Detail-wrapper'>
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
        <div key={index}>
          <div className='Inquiry-Delivery-wrapper'>
            <div>{product.name}</div>
            <div>{product.price}원</div>
            <div>{order.deliveryFee}원</div>
            <div>{product.quantity}</div>
            <div>{product.price * product.quantity}원</div>
          </div>
          <OrderImage product={product} />
        </div>
      ))}
    </>
  );
}
function OrderInquiryDelivery({ order }) {
  return (
    <div className='Inquiry-Delivery-small-wrapper'>
      <div>상품합계금액 : {order.totalProductPrice}원</div>
      <div>배송비 : {order.deliveryFee}원</div>
      <div>결제금액 : {order.totalPrice}원</div>
    </div>
  );
}

function OrderInquiryDelivery2({ order }) {
  return (
    <table className='Inquiry-Delivery'>
      <thead>
        <tr className='Inquiry-Delivery-top'>
          <th className='cell-top'>상품합계금액</th>
          <th className='cell-top'>배송비</th>
          <th className='cell-top'>지역별배송비</th>
          <th className='cell-top'>총결제금액</th>
        </tr>
      </thead>
      <tbody>
        <tr className='Inquiry-Delivery-bottom'>
          <td className='cell-bottom'>{order.totalProductPrice}원</td>
          <td className='cell-bottom'>{order.deliveryFee}원</td>
          <td className='cell-bottom'>0원</td>
          <td className='cell-bottom'>{order.totalPrice}원</td>
        </tr>
      </tbody>
    </table>
  );
}

function OrderPerson({ order }) {
  return (
    <>
      <h2>주문자 정보</h2>
      <Border />
      <div className='grid'>
        <div className='Order-common'>주문자명</div>
        <div className='Order-common'>{order.customerName}</div>
      </div>
      <div className='grid'>
        <div className='Order-common'>휴대폰번호</div>
        <div className='Order-common'>{order.receiverPhoneNumber}</div>
      </div>
      <div className='grid'>
        <div className='Order-common'>메일</div>
        <div className='Order-common'>{order.receiverEmail}</div>
      </div>
    </>
  );
}

function OrderDestination({ order }) {
  return (
    <>
      <h2>배송지 정보</h2>
      <Border />
      <div className='grid'>
        <div className='Order-common'>주문자명</div>
        <div className='Order-common'>{order.customerName}</div>
      </div>
      <div className='grid'>
        <div className='Order-common'>주소</div>
        <div className='Order-common'>{order.address}</div>
      </div>
      <div className='grid'>
        <div className='Order-common'>휴대폰번호</div>
        <div className='Order-common'>{order.receiverPhoneNumber}</div>
      </div>
    </>
  );
}

function OrderDelivery({ order }) {
  return (
    <>
      <div className='grid'>
        <div className='Order-common'>택배사 이름</div>
        <div className='Order-common'>{order.orderDelivery?.name}</div>
      </div>
      <div className='grid'>
        <div className='Order-common'>운송장번호</div>
        <div className='Order-common'>{order.orderDelivery?.trackingNumber}</div>
      </div>
      <Button
        text='배송조회'
        onClick={() => {
          const popup = window.open(
            'about:blank',
            '배송조회',
            'width=500,height=700,top=100,left=100',
          );
          fetchRealTimeDeliveryInfo(order, popup);
        }}
      ></Button>
    </>
  );
}

function OrderPayment({ order }) {
  let paymentDetail;

  switch (order.paymentType) {
    case '신용카드':
      paymentDetail = (
        <>
          {' '}
          <div className='grid'>
            <div className='Order-common'>카드사 이름</div>
            <div className='Order-common'>{order.paymentInfo.cardName}</div>
          </div>
          <div className='grid'>
            <div className='Order-common'>카드 번호</div>
            <div className='Order-common'>{order.paymentInfo.cardNumber}</div>
          </div>
          <div className='grid'>
            <div className='Order-common'>할부 개월 수</div>
            <div className='Order-common'>{order.paymentInfo.cardQuota}</div>
          </div>
          <div className='grid'>
            <div className='Order-common'>결제 일자</div>
            <div className='Order-common'>{order.paymentInfo.paidAt}</div>
          </div>
        </>
      );
      break;
    case '가상 계좌':
      paymentDetail = (
        <>
          <div className='grid'>
            <div className='Order-common'>가상계좌 정보</div>
            <div className='Order-common'>{order.paymentInfo.vbankInfo}</div>
          </div>
          <div className='grid'>
            <div className='Order-common'>입금자 은행</div>
            <div className='Order-common'>{order.paymentInfo.depositorBank}</div>
          </div>
          <div className='grid'>
            <div className='Order-common'>입금자 이름</div>
            <div className='Order-common'>{order.paymentInfo.depositorName}</div>
          </div>

          <div className='grid'>
            <div className='Order-common'>입금자 계좌번호</div>
            <div className='Order-common'>{order.paymentInfo.depositorAccount}</div>
          </div>
          <div className='grid'>
            <div className='Order-common'>현금영수증 신청 여부</div>
            <div className='Order-common'>
              {order.paymentInfo.isApplyCashReceipt ? '신청됨' : '신청되지 않음'}
            </div>
          </div>
          <div className='grid'>
            <div className='Order-common'>결제 일자</div>
            <div className='Order-common'>{order.paymentInfo.paidAt}</div>
          </div>
        </>
      );
      break;
    default:
      paymentDetail = <div className='Order-common'>결제정보를 불러올 수 없습니다.</div>;
  }
  return (
    <>
      <h2>결제 정보</h2>
      <Border />
      <div className='grid'>
        <div className='Order-common'>상품합계금액</div>
        <div className='Order-common'>{order.totalProductPrice}원</div>
      </div>
      <div className='grid'>
        <div className='Order-common'>배송비</div>
        <div className='Order-common'>{order.deliveryFee}원</div>
      </div>
      <div className='grid'>
        <div className='Order-common'>총결제금액</div>
        <div className='Order-common'>{order.totalPrice}원</div>
      </div>
      <div className='grid'>
        <div className='Order-common'>결제수단</div>
        <div className='Order-common'>{order.paymentType}</div>
      </div>
      {paymentDetail}
    </>
  );
}
function ReOrderDetail() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/order');
  };

  return (
    <div className='ReOrder'>
      <Button onClick={goBack} text='되돌아가기'></Button>
    </div>
  );
}

export default function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOrderDetail(orderId);
      if (data) {
        setOrder(data);
        console.log(data);
      }
    };

    fetchData();
  }, [orderId]);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <MainContainer>
      <SideNav />
      <Box
        component='main'
        sx={{
          padding: '0 5%',
          flexGrow: 1,
          py: 8,
        }}
      >
        <div className='OrderDetail'>
          <OrderTitle />
          <OrderInquiry />
          <OrderInquiryDetail order={order} />
          <OrderInquiryDelivery order={order} />
          <OrderInquiryDelivery2 order={order} />
          <OrderPerson order={order} />
          <OrderDestination order={order} />
          {order.orderDelivery !== null ? <OrderDelivery order={order} /> : <></>}
          <OrderPayment order={order} />
          <ReOrderDetail />
        </div>
      </Box>
    </MainContainer>
  );
}
