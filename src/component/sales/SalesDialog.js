import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Sheet } from '@mui/joy';
import { Button, Stack } from '@mui/joy';
import { useEffect, useState } from 'react';
import { retrieveProductOptionList } from '../../axios/Product';
import useAppContext from './contexts/useAppContext';

import { getProductInfo } from '../../axios/Sales';
import Swal from 'sweetalert2';
import { RadioGroup, FormControlLabel } from '@mui/material';
import { Radio } from '@mui/material';
import Radios from '../common/Radios';
import OverviewSales from './OverviewSales';

export default function SalesDialog({
  open,
  onClose,
  searchProductName,
  productId,
  name,
  stock,
  key,
  optionDetailId,
  propFunction,
}) {
  const [options, setOptions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { frameOption, setFrameOption } = useAppContext();
  const [additionalPrice, setAdditionalPrice] = useState({});
  const [optionDetail, setOptionDetail] = useState({});
  const [productInfo, setProductInfo] = useState({});
  const [price, setPrice] = useState(0);
  const [check, setCheck] = useState(false);
  const [optionId, setOptionId] = useState('');
  const [optionName, setOptionName] = useState('');
  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    retriveProductData();
    getOptions();
  }, []);

  const retriveProductData = () => {
    getProductInfo(productId).then((res) => {
      setProductInfo(res.data);
      setPrice(res.data.price);
    });
  };

  const onHandleChange = (e, option) => {
    setFrameOption({
      ...frameOption,
      [e.target.value]: option,
    });
    setOptionId(e.target.value);
    propFunction(optionId);
  };
  const addHandleChange = (e, option) => {
    setFrameOption({
      ...frameOption,
      [e.target.value]: option,
    });
    setOptionId(option.id);
    propFunction(optionId);
    onClose();
  };
  const getOptions = async () => {
    try {
      const response = await retrieveProductOptionList(productId, !showAll);
      setOptions(response.data);
    } catch (e) {
      console.error(e);
    }
  };
  const selectOptionDetail = (e) => {
    setOptionDetail(e.target.value);
  };

  const Options = ({ options, onHandleChange }) => {
    return (
      <>
        {options &&
          options.map((option, idx) => {
            return (
              <div key={idx} className='option'>
                <div id={idx} className='order-title'>
                  <RadioGroup row name='row-radio-buttons-group'>
                    <FormControlLabel
                      value={option.id}
                      control={<Radio />}
                      label={option.name}
                      name='isCustom'
                      checked={optionDetail === option.name}
                      onChange={(e) => selectOptionDetail(e)}
                    />
                  </RadioGroup>

                  <Radios
                    style={{
                      marginBottom: '10px',
                    }}
                    text={option.name}
                    value={option.id}
                    onChange={(e) => {
                      onHandleChange(e, option);
                    }}
                    required
                  ></Radios>
                </div>

                {option.optionItems &&
                  option.optionItems.map((item, idx) => {
                    const isDisabled = item.stock <= 0;
                    return (
                      <Radios
                        key={idx}
                        style={{
                          marginBottom: '10px',
                          opacity: isDisabled ? '0.6' : '1',
                          pointerEvents: isDisabled ? 'none' : 'auto',
                        }}
                        name={option.name}
                        text={item.name}
                        id={item.id}
                        onChange={(e) => {
                          onHandleChange(e, item, item.price);
                        }}
                        required
                      >
                        <span style={{ color: '#bbbbbb' }}>
                          {` + `}&#8361;{`${item.price}`}
                        </span>
                        <span style={{ display: 'none' }}>{item.stock}</span>
                      </Radios>
                    );
                  })}
              </div>
            );
          })}
      </>
    );
  };

  return (
    <>
      <Dialog
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
            <div style={{ fontSize: 'xx-large', marginBottom: '3%' }}>상품</div>

            <div style={{ fontSize: 'large', marginBottom: '10%' }}>{name}</div>
            <Options options={productInfo.options} onHandleChange={onHandleChange} />
          </DialogContent>
          <Stack direction={'row'} justifyContent={'flex-end'} spacing={1} marginTop={2}>
            <Button onClick={addHandleChange}>선택하기</Button>
            <Button onClick={handleClose} color={'danger'}>
              취소하기
            </Button>
          </Stack>
        </Sheet>
      </Dialog>
    </>
  );
}
