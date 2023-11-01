import {
  HoverButton,
  HoverButtonWrapper,
  ProductOptionDetailWrapper,
  ProductOptionItemName,
  ProductOptionItemStock,
  ProductOptionItemWrapper,
} from './styled/Product';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { changeOptionDetailOnSale } from '../../axios/Product';
import Swal from 'sweetalert2';
import { Toast } from '../../utils/Toast';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

export default function ProductOptionDetail({ onEditButtonClicked, detail, actived }) {
  const [focused, setFocused] = useState();
  const onMouseOn = () => {
    setFocused(true);
  };
  const onMouseOut = () => {
    setFocused(false);
  };
  const onDeleteButtonClicked = () => {
    Swal.fire({
      title: '정말로 판매 상태를 변경하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '변경하기',
      cancelButtonText: '취소하기',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          onSale: !detail.onSale,
        };
        changeOptionDetailOnSale(detail.optionDetailId, data).then(() => {
          Toast.fire({
            icon: 'success',
            title: '변경이 완료되었습니다',
          });
          actived();
        });
      }
    });
  };

  return (
    <>
      <ProductOptionDetailWrapper
        onMouseEnter={onMouseOn}
        onMouseLeave={onMouseOut}
      >
        <ProductOptionItemWrapper>
          <ProductOptionItemName>
            {detail.optionDetailName}
          </ProductOptionItemName>
          <ProductOptionItemStock>재고: {detail.stock}</ProductOptionItemStock>
        </ProductOptionItemWrapper>
        <HoverButtonWrapper focused={focused}>
          <HoverButton onClick={() => onEditButtonClicked(detail)}>
            <EditIcon />
          </HoverButton>
          <HoverButton onClick={onDeleteButtonClicked}>
            {detail.onSale ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />}
          </HoverButton>
        </HoverButtonWrapper>
      </ProductOptionDetailWrapper>
    </>
  );
}
