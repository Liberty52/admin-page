import Modal from '../common/Modal';
import { approveCancel } from '../../axios/Orders';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CancelModal({ orderId, closeModal }) {
  const navigate = useNavigate();
  return (
    <Modal title='주문 취소 승인' closeModal={closeModal}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (window.confirm('주문 취소 승인하시겠습니까?')) {
            const dto = {
              orderId: orderId,
              fee: e.target.fee.value,
            };
            approveCancel(dto)
              .then(() => {
                alert('주문 취소 완료');
                navigate('/order');
                closeModal();
              })
              .catch((err) => alert(err.response.data.error_message));
          }
        }}
      >
        <TextField
          type='number'
          sx={{ width: '100%', marginBottom: 2 }}
          label='취소 요금'
          variant='outlined'
          name='fee'
        />
        <Button type='submit' variant='contained' sx={{ width: '100%', height: 45 }}>
          확인
        </Button>
      </form>
    </Modal>
  );
}
