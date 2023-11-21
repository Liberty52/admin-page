import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Modal, Sheet } from '@mui/joy';
import { Button, Stack } from '@mui/joy';
import dayjs from 'dayjs';
import { getSpecificSales, getTotalSales } from '../../axios/Sales';
import Swal from 'sweetalert2';
import { TextField } from '@mui/material';

const SalesDialog = ({ open, onClose, product }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sales, setSales] = useState();
  const [productName, setProductName] = useState('');
  const [data, setData] = useState({
    productName: '',
    startDate: '',
    endDate: '',
  });
  const datePickerFormat = 'YYYY-MM-DD';
  const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
  };
  const handleClose = () => {
    setStartDate('');
    setEndDate('');
    onClose();
  };
  const check = () => {
    // console.log('dialog' + product);
  };

  return (
    <>
      <Modal
        aria-labelledby='modal-title'
        aria-describedby='modal-desc'
        open={open}
        hideBackdrop={true}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant='outlined'
          sx={{
            minWidth: 500,
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <DialogContent>
            <DialogTitle>상품 검색</DialogTitle>
          </DialogContent>
          <Stack direction={'row'} justifyContent={'flex-end'} spacing={1} marginTop={2}>
            <Button>추가하기</Button>
            <Button onClick={handleClose} color={'danger'}>
              취소하기
            </Button>
          </Stack>
        </Sheet>
      </Modal>
    </>
  );
};

export default SalesDialog;
