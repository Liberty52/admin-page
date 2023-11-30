import { Button, Modal, ModalClose, Sheet, Stack } from '@mui/joy';
import Radio from '@mui/material/Radio';
import { Box, FormControlLabel, RadioGroup, TextField } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { addProduct } from '../../axios/License';
import { ProductTitle } from '../../component/product/styled/Product';

const LicenseOption = ({ open, onClose, getProduct, product }) => {
  const [image, setImage] = useState();
  const [data, setData] = useState({
    name: '',
    productState: '',
    price: '',
    isCustom: false,
    productOrder: '',
  });
  const [imageSrc, setImageSrc] = useState();
  const options = ['선택', '판매중', '품절', '미판매'];
  const onCloseAction = () => {
    setImageSrc();
    onClose();
  };

  const isCustomChange = (value) => {
    if (value && typeof value === 'string') {
      if (value.toLowerCase() === 'true') return true;
      if (value.toLowerCase() === 'false') return false;
    }
    return value;
  };
  const changeCustom = (e) => {
    setData({ ...data, [e.target.name]: isCustomChange(e.target.value) });
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const stateEnglish = (value) => {
    if (value && typeof value === 'string') {
      if (value === '판매중') return 'ON_SALE';
      if (value === '품절') return 'SOLD_OUT';
      if (value === '미판매') return 'NOT_SALE';
    }
    return value;
  };
  const stateChange = (e) => {
    setData({ ...data, [e.target.name]: stateEnglish(e.target.value) });
  };
  const ImageChange = (event) => {
    setImage(event.target.files[0]);

    let reader = new FileReader();
    reader.onload = function (event) {
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const addLicense = () => {
    //이름 판매여부 상품사진 가격 커스텀 여부
    const newProductData = {
      ...data,
      productOrder: product.length + 1, // 현재 상품 목록의 길이 + 1
    };
    console.log(newProductData);
    addProduct(newProductData, image)
      .then(() => {
        // 상품 목록 상태 업데이트;
        Swal.fire({
          title: '상품이 추가되었습니다.',
          icon: 'success',
        }).then(() => getProduct());
      })
      .catch(() => {
        Swal.fire({
          title: '상품 추가에 실패하였습니다.',
          icon: 'error',
        });
      });

    onCloseAction();
  };

  return (
    <Modal
      aria-labelledby='modal-title'
      aria-describedby='modal-desc'
      open={open}
      hideBackdrop={true}
      onClose={onCloseAction}
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
        <ProductTitle>항목</ProductTitle>
        <div className='product-change-status'>
          <select onChange={stateChange} key={'품절'} defaultValue={'선택'} name='productState'>
            {options.map((item) => (
              <option value={item} key={item} name='productState'>
                {item}
              </option>
            ))}
          </select>
        </div>
        <Box open={open} onClose={onCloseAction} sx={{ display: 'flex', gap: 2 }}>
          <RadioGroup row name='row-radio-buttons-group'>
            <FormControlLabel
              value='false'
              control={<Radio />}
              label='Premium License'
              name='isCustom'
              checked={data.isCustom === false}
              onChange={(e) => changeCustom(e)}
            />
            <FormControlLabel
              value='true'
              control={<Radio />}
              label='Custom'
              name='isCustom'
              onChange={(e) => changeCustom(e)}
            />
          </RadioGroup>
        </Box>

        <ModalClose
          variant='outlined'
          sx={{
            top: 'calc(-1/4 * var(--IconButton-size))',
            right: 'calc(-1/4 * var(--IconButton-size))',
            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
            borderRadius: '50%',
            bgcolor: 'background.body',
          }}
        />
        <TextField
          autoFocus
          margin='dense'
          name='name'
          label='이름'
          fullWidth
          variant='outlined'
          onChange={(e) => handleChange(e)}
        />
        <TextField
          autoFocus
          margin='dense'
          name='price'
          label='가격'
          fullWidth
          variant='outlined'
          onChange={(e) => handleChange(e)}
        />

        <>
          <img
            src={imageSrc}
            alt=''
            styled={{ maxWidth: '100px' }}
            object-fit='cover'
            resizeMode='cover'
            className='image'
          ></img>

          <Stack direction={'row'} justifyContent={'flex-start'} spacing={1} marginTop={2}>
            <Button component='label'>
              Upload File
              <input type='file' accept='image/*' name='image' hidden onChange={ImageChange} />
            </Button>
          </Stack>
        </>

        <Stack direction={'row'} justifyContent={'flex-end'} spacing={1} marginTop={2}>
          <Button onClick={addLicense}>추가하기</Button>
          <Button onClick={onCloseAction} color={'danger'}>
            취소하기
          </Button>
        </Stack>
      </Sheet>
    </Modal>
  );
};

export default LicenseOption;
