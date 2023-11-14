import { Button, Grid, Input, Modal, ModalClose, Sheet, Stack } from '@mui/joy';
import Checkbox from '@mui/joy/Checkbox';

import { ModalMode } from '../../constants/mode';
import { useEffect, useState, useRef } from 'react';
import { ProductOptionModalTitle } from './styled/Product';
import { Toast } from '../../utils/Toast';
import { createLicenseOptionDetail, modifyLicenseOptionDetail } from '../../axios/License';
import { Box } from '@mui/material';
import { ProductOptionaModalPriceQuantityName } from './styled/Product';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function LicenseOptionDetailModal({
  open,
  setOpen,
  licenseOptionId,
  setLicenseOptionId,
  mode,
  editProps,
  clearEditProps,
  actived,
  imageFile,
}) {
  const [artValue, setArtValue] = useState('');
  const [price, setPrice] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [buttonText, setButtonText] = useState();
  const [stock, setStock] = useState(0);
  const [artistValue, setArtistValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imageSrc, setImageSrc] = useState(imageFile);
  const [image, setImage] = useState(imageSrc);
  const fileInput = useRef(image);
  const datePickerFormat = 'YYYY-MM-DD';
  const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
  };

  useEffect(() => {
    setArtValue(editProps.artName);
    setPrice(editProps.price);
    setStock(editProps.stock);
    setOnSale(editProps.onSale);
    setArtistValue(editProps.artistName);
    setStartDate(editProps.startDate);
    setEndDate(editProps.endDate);
    setImage(editProps.artUrl);
    setImageSrc(editProps.artUrl);
    setButtonText(mode === ModalMode.ADD ? '추가하기' : '수정하기');
  }, [open]);
  const onCloseAction = () => {
    setOpen(false);
    clearEditProps();
    setArtValue('');
    setLicenseOptionId('');
    setPrice(0);
    setStock(0);
    setOnSale(false);
    actived();
    setArtistValue('');
    setStartDate('');
    setEndDate('');
  };
  const onActionButtonClicked = () => {
    if (mode === ModalMode.ADD) {
      addOptionDetailButtonClicked();
    } else {
      editOptionDetail();
    }
  };
  const startDateOption = (date) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setStartDate(formattedDate);
  };
  const endDateOption = (date) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setEndDate(formattedDate);
  };
  const onHandleChangeImage = (e) => {
    setImage(e.target.files[0]);

    let reader = new FileReader();
    reader.onload = function (event) {
      setImageSrc(event.target.result);
      event.target.value = '';
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const addOptionDetailButtonClicked = async () => {
    let isValid = true;

    if (artValue.length === 0) {
      Toast.fire({
        icon: 'warning',
        title: '라이선스 작품의 이름을 입력해주세요',
      });
      isValid = false;
    }
    if (artistValue.length === 0) {
      Toast.fire({
        icon: 'warning',
        title: '라이선스 작가의 이름을 입력해주세요',
      });
      isValid = false;
    }
    if (price <= 0) {
      Toast.fire({
        icon: 'warning',
        title: '수량을 0이상의 값을 입력해주세요.',
      });
      isValid = false;
    }

    if (stock <= 0) {
      Toast.fire({
        icon: 'warning',
        title: '수량을 0이상의 값을 입력해주세요.',
      });
      isValid = false;
    }
    if (startDate === null) {
      Toast.fire({
        icon: 'warning',
        title: '시작 날짜를 입력해주세요.',
      });

      isValid = false;
    }
    if (!isValid) return;

    try {
      const response = await createLicenseOptionDetail(
        licenseOptionId,
        {
          artName: artValue,
          artistName: artistValue,
          stock,
          onSale,
          price,
          startDate,
          endDate,
        },
        image,
      );
      Toast.fire({
        icon: 'success',
        title: '옵션이 추가되었습니다.',
      });
      onCloseAction();
    } catch (e) {
      console.error(e);
    }
  };
  const editOptionDetail = async () => {
    let isValid = true;
    if (artValue === editProps.name) {
      Toast.fire({
        icon: 'warning',
        title: '내용을 수정해주세요',
      });
      return;
    }
    if (artValue.length === 0) {
      Toast.fire({
        icon: 'warning',
        title: '옵션의 이름을 입력해주세요',
      });
      isValid = false;
    }

    if (price < 0) {
      Toast.fire({
        icon: 'warning',
        title: '가격은 0이상의 값을 입력해주세요',
      });
      isValid = false;
    }

    if (stock < 0) {
      Toast.fire({
        icon: 'warning',
        title: '제품 수량은 0이상의 값을 입력해주세요',
      });
    }
    if (!isValid) return;

    try {
      const response = await modifyLicenseOptionDetail(
        editProps.licenseOptionDetailId,
        {
          artName: artValue,
          artistName: artistValue,
          stock,
          onSale,
          price,
          startDate,
          endDate,
        },
        image,
      );
      Toast.fire({
        icon: 'success',
        title: '옵션이 수정되었습니다.',
      });
      onCloseAction();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      aria-labelledby='modal-title'
      aria-describedby='modal-desc'
      open={open}
      hideBackdrop={true}
      onClose={() => onCloseAction()}
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
        <ProductOptionModalTitle>
          {mode === ModalMode.ADD ? '라이선스 옵션 항목 추가' : '라이선스 옵션 항목 수정'}
        </ProductOptionModalTitle>
        <>
          <ProductOptionaModalPriceQuantityName>작가이름</ProductOptionaModalPriceQuantityName>
          <Input
            value={artistValue}
            onChange={(e) => setArtistValue(e.target.value)}
            placeholder={'추가할 작가의 이름을 입력해주세요'}
          />
        </>
        <>
          <ProductOptionaModalPriceQuantityName>작품이름</ProductOptionaModalPriceQuantityName>
          <Input
            value={artValue}
            onChange={(e) => setArtValue(e.target.value)}
            placeholder={'추가할 작품의 이름을 입력해주세요'}
          />
          <ProductOptionaModalPriceQuantityName>제품 가격</ProductOptionaModalPriceQuantityName>
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder={'추가할 제품 가격을 입력해주세요.'}
          />
        </>
        <Box sx={{ py: 1 }} />

        <div>
          {mode === ModalMode.ADD ? (
            <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems={'center'}>
              <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={datePickerUtils}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    name='startDate'
                    label='Start'
                    format='YYYY-MM-DD'
                    onChange={(newValue) => {
                      startDateOption(newValue);
                    }}
                  ></DatePicker>
                  <DatePicker
                    name='endDate'
                    label='End'
                    format='YYYY-MM-DD'
                    onChange={(newValue) => {
                      endDateOption(newValue);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Grid sm={10}>
                <ProductOptionaModalPriceQuantityName>
                  제품 수량
                </ProductOptionaModalPriceQuantityName>
                <Input
                  value={stock}
                  type='number'
                  onChange={(e) => setStock(e.target.value)}
                  placeholder={'추가할 옵션 항목의 수량을 입력해주세요'}
                />
              </Grid>
              <Grid sm={4}>
                <Checkbox
                  checked={onSale}
                  onChange={(e) => setOnSale(e.target.checked)}
                  label={'판매'}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems={'center'}>
              <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={datePickerUtils}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    name='startDate'
                    label='Start'
                    format='YYYY-MM-DD'
                    onChange={(newValue) => {
                      startDateOption(newValue);
                    }}
                    value={dayjs(startDate)}
                  ></DatePicker>
                  <DatePicker
                    name='endDate'
                    label='End'
                    format='YYYY-MM-DD'
                    onChange={(newValue) => {
                      endDateOption(newValue);
                    }}
                    value={dayjs(endDate)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Grid sm={10}>
                <ProductOptionaModalPriceQuantityName>
                  제품 수량
                </ProductOptionaModalPriceQuantityName>
                <Input
                  value={stock}
                  type='number'
                  onChange={(e) => setStock(e.target.value)}
                  placeholder={'추가 혹은 줄일 제품의 수량을 입력해주세요.'}
                />
              </Grid>
              <Grid sm={4}>
                <Checkbox
                  checked={onSale}
                  onChange={(e) => setOnSale(e.target.checked)}
                  label={'판매'}
                />
              </Grid>
            </Grid>
          )}

          <img src={imageSrc} alt='' width='35%'></img>

          <>
            <Button component='label'>
              Upload File
              <input
                type='file'
                accept='image/*'
                name='image'
                hidden
                ref={fileInput}
                onChange={(e) => onHandleChangeImage(e)}
              />
            </Button>
          </>
        </div>
        <Stack direction={'row'} justifyContent={'flex-end'} spacing={1} marginTop={2}>
          <Button onClick={onActionButtonClicked}>{buttonText}</Button>
          <Button onClick={onCloseAction} color={'danger'}>
            취소하기
          </Button>
        </Stack>
      </Sheet>
    </Modal>
  );
}
