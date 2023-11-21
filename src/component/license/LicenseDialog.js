import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState, useRef } from 'react';
import dayjs from 'dayjs';
import { createLicense, getDetatilLicense, deleteLicense } from '../../axios/License';
import Swal from 'sweetalert2';
import { modifyLicense } from '../../axios/License';
import { useEffect } from 'react';
import { Toast } from '../../utils/Toast';
import { ModalMode } from '../../constants/mode';
import { Stack } from '@mui/joy';

const LicenseDialog = ({ open, onClose, getLicenses, mode, licenseImageId, imageUrl }) => {
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState(imageUrl);
  const [artistName, setArtistName] = useState('');
  const [artName, setArtName] = useState('');
  const [stock, setStock] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('YYYY-MM-DD');
  const fileInput = useRef(image);
  const [optionMode, SetOptionMode] = useState(ModalMode.EDIT);

  useEffect(() => {
    mode === ModalMode.ADD ? <></> : retrieveLicenseDetailDataAndSetState();
  }, []);

  const retrieveLicenseDetail = (prevData, licenseImageId) => {
    SetOptionMode(mode);
    getDetatilLicense(licenseImageId).then((res) => {
      prevData = res.data;
      setArtistName(prevData.artistName);
      setArtName(prevData.artName);
      setStock(prevData.stock);
      setStartDate(prevData.startDate);
      setEndDate(prevData.endDate);
    });
  };

  function retrieveLicenseDetailDataAndSetState() {
    let prevData;
    try {
      retrieveLicenseDetail(prevData, licenseImageId);
    } catch (err) {
      console.error(err);
    }
  }

  let reader = new FileReader();
  const ImageChange = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setImage(e.target.files[0]);
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageFile(reader.result);
        e.target.value = '';
      };
    }
  };

  const onHandleChangeImage = (e) => {
    setImage(e.target.files[0]);

    let reader = new FileReader();
    reader.onload = function (e) {
      setImageFile(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleClose = () => {
    onClose();
  };
  const enrollLicense = () => {
    if (startDate > endDate) {
      alert('시작 날짜가 마지막 날짜보다 뒤에 있습니다. 다시 선택해주세요.');
      return;
    }
    if (artName.length === 0) {
      Toast.fire({
        icon: 'warning',
        title: '작품의 이름을 입력해주세요.',
      });
      return;
    }
    if (artistName.length === 0) {
      Toast.fire({
        icon: 'warning',
        title: '작가의 이름을 입력해주세요.',
      });
      return;
    }
    if (stock <= 0) {
      Toast.fire({
        icon: 'warning',
        title: '재고를 1이상의 값을 입력해주세요.',
      });
      return;
    } else {
      createLicense({ artistName, artName, stock, startDate, endDate }, image)
        .then(() => {
          Swal.fire({
            title: '라이센스 등록에 성공했습니다!',
            text: `행사 기간은: ${startDate} ~ ${endDate}까지 입니다`,
            icon: 'success',
          }).then(() => getLicenses());
          onClose();
        })
        .catch(() => {
          Swal.fire({
            title: '라이센스 등록에 실패했습니다',
            icon: 'error',
          });
        });
    }
  };

  const editLicense = () => {
    retrieveLicenseDetailDataAndSetState();
    if (startDate > endDate) {
      alert('시작 날짜가 마지막 날짜보다 뒤에 있습니다. 다시 선택해주세요.');
      return;
    }
    if (artName.length === 0) {
      Toast.fire({
        icon: 'warning',
        title: '작품의 이름을 입력해주세요.',
      });
      return;
    }
    if (artistName.length === 0) {
      Toast.fire({
        icon: 'warning',
        title: '작가의 이름을 입력해주세요.',
      });
      return;
    }
    if (stock <= 0) {
      Toast.fire({
        icon: 'warning',
        title: '재고를 1이상의 값을 입력해주세요.',
      });
      return;
    } else {
      modifyLicense({ artistName, artName, stock, startDate, endDate }, licenseImageId, image)
        .then(() => {
          Swal.fire({
            title: '라이센스 수정에 성공했습니다!',
            text: `행사 기간은: ${startDate} ~ ${endDate}까지 입니다`,
            icon: 'success',
          }).then(() => getLicenses());
          retrieveLicenseDetailDataAndSetState();
          onClose();
        })
        .catch(() => {
          Swal.fire({
            title: '라이센스 수정에 실패했습니다',
            icon: 'error',
          });
        });
    }
  };
  const DeleteLicense = () => {
    handleClose();
    Swal.fire({
      title: '정말로 라이선스를 삭제하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '삭제하기',
      cancelButtonText: '취소하기',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          license: !licenseImageId,
        };
        deleteLicense(licenseImageId, data).then(() => {
          getLicenses();
          Toast.fire({
            icon: 'success',
            title: '삭제가 완료되었습니다',
          });
        });
      }
    });
  };
  const datePickerFormat = 'YYYY-MM-DD';
  const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
  };

  const startDateOption = (date) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setStartDate(formattedDate);
  };

  const endDateOption = (date) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setEndDate(formattedDate);
  };

  const textChangeArtistName = (e) => {
    setArtistName(e.target.value);
  };
  const textChangeArtName = (e) => {
    setArtName(e.target.value);
  };
  const textChangeStock = (e) => {
    setStock(e.target.value);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {mode === ModalMode.ADD ? '작가 포토폴리오 등록' : '작가 포트폴리오 수정'}
        </DialogTitle>
        <DialogContent>
          <>
            <>
              <TextField
                autoFocus
                margin='dense'
                name='artistName'
                label='작가 이름'
                fullWidth
                variant='outlined'
                value={artistName}
                onChange={textChangeArtistName}
              />
              <TextField
                autoFocus
                margin='dense'
                name='artName'
                label='작품 이름'
                fullWidth
                variant='outlined'
                value={artName}
                onChange={textChangeArtName}
              />
              <TextField
                autoFocus
                margin='dense'
                name='stock'
                label='수량'
                fullWidth
                variant='outlined'
                value={stock}
                onChange={textChangeStock}
              />
            </>
          </>

          <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={datePickerUtils}>
            <DemoContainer components={['DatePicker']}>
              {mode === ModalMode.ADD ? (
                <>
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
                </>
              ) : (
                <>
                  <DatePicker
                    name='startDate'
                    label='Start'
                    format='YYYY-MM-DD'
                    startDate={startDate}
                    onChange={(newValue) => {
                      startDateOption(newValue);
                    }}
                    value={dayjs(startDate)}
                  />

                  <DatePicker
                    name='endDate'
                    label='End'
                    format='YYYY-MM-DD'
                    startDate={startDate}
                    onChange={(newValue) => {
                      endDateOption(newValue);
                    }}
                    value={dayjs(endDate)}
                  />
                </>
              )}
            </DemoContainer>
          </LocalizationProvider>
          <>
            <img
              src={imageFile}
              alt=''
              styled={{ maxWidth: '100px' }}
              object-fit='cover'
              resizeMode='cover'
              className='image'
            ></img>

            <Stack direction={'row'} justifyContent={'flex-start'} spacing={1} marginTop={2}>
              <Button variant='contained' component='label'>
                Upload File
                <input
                  type='file'
                  accept='image/*'
                  name='image'
                  hidden
                  onChange={(e) => onHandleChangeImage(e)}
                />
              </Button>
            </Stack>
          </>
        </DialogContent>
        <DialogActions>
          {mode === ModalMode.ADD ? (
            <>
              <Button
                onClick={() => {
                  enrollLicense();
                }}
              >
                등록하기
              </Button>
              <Button onClick={handleClose}> 취소</Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  editLicense();
                }}
              >
                수정하기
              </Button>
              <Button color={'error'} onClick={DeleteLicense}>
                삭제하기
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                }}
              >
                {' '}
                취소
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LicenseDialog;
