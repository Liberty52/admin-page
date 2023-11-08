import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Card,
  Rating,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { HoverButton } from "../product/styled/Product";
import EditIcon from "@mui/icons-material/Edit";
import { patchProduct,deleteProduct, retrieveProductDetail, } from '../../axios/Product';
import { useParams } from 'react-router-dom';
export const LicenseTable = (props) => {
  const { name, price, state, nOfRating, meanRate, custom } = props;

  const [stateText, setStateText] = useState('');
  const [customText, setCustomText] = useState('');
  const [open , setOpen]= useState(false);
  const [productState, setProductState] = useState(state);
  const [productName, setProductName] = useState(name);
  const [productPrice, setProductPrice] = useState(price);
  const [isCustomProduct, setIsCustomProduct] = useState(custom);
  const { productId } = useParams();

  useEffect(() => {
    check();
    retrieveProductState();
  }, [name, state, price, custom]);

  const retrieveProduct = (prevData, productId) => {
    retrieveProductDetail(productId).then((res) => {
      prevData = res.data;
      setProductName(prevData.name);
      setProductState(prevData.state);
      setProductPrice(prevData.price);
      setIsCustomProduct(prevData.custom);
    })

  }
  
  function retrieveProductState(){
    let prevData;
    try{
      retrieveProduct(prevData, productId);
    }catch(e){
      console.error(e);
    }
  }
  useEffect(() => {
    check();
  }, [state, custom]);

  const check = () => {
    let newStateText = '';
    let newCustomText = '';

    switch(state) {
      case 'ON_SALE':
        newStateText = '판매중';
        break;
      case 'SOLD_OUT':
        newStateText = '품절';
        break;
      case 'NOT_SALE':
        newStateText = '미판매';
        break;
      default:
        newStateText = state;
    }

    newCustomText = custom ? 'Premium License' : 'Custom';

    setStateText(newStateText);
    setCustomText(newCustomText);
  };
   
  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  const handleUpdate = () => {
    const productRequestDto = {
      name: productName,  // 상품명
      state: productState,  // 상품 상태
      price: productPrice,  // 상품 가격
      custom: isCustomProduct,   // 커스텀 상품 여부
    };
  
    retrieveProductDetail(productId);
    patchProduct(productId, productRequestDto)
      .then((response) => {
        // 성공적으로 수정되었을 때의 로직을 여기에 추가
        alert('상품이 성공적으로 수정되었습니다.');
        closeDialog();
        if (props.onProductUpdate) {
          props.onProductUpdate(); // 수정된 정보를 바탕으로 상품 상세 정보를 다시 불러옴
        }
      })
      .catch((error) => {
        // 수정에 실패했을 때의 에러 처리 로직
        if (error.response && error.response.status) {
          const statusCode = error.response.status;
          switch(statusCode) {
            case 400:
              alert("잘못된 요청 데이터로 요청하였습니다.");
              break;
            case 404:
              alert("존재하지 않는 productId입니다.");
              break;
            case 415:
              alert("잘못된 요청 타입으로 요청하였습니다.");
              break;
            default:
              alert("에러가 발생했습니다. 다시 시도해주세요.");
          }
        } else {
          alert("에러가 발생했습니다. 다시 시도해주세요.");
        }
      });
  };

 
  return (
  <>
    <Dialog open={open} onClose={closeDialog}>
    <DialogTitle style={{ fontWeight: 'bold' }}>상품 정보 수정</DialogTitle>
    <DialogContent>
      <DialogContentText style={{ color: 'black' }}>
        아래의 정보를 수정해 주세요.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        label="상품 이름"
        type="text"
        fullWidth
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <TextField
        margin="dense"
        label="상품 상태"
        type="text"
        fullWidth
        select
        value={productState}
        onChange={(e) => setProductState(e.target.value)}
        SelectProps={{
          native: true,
        }}
      >
        <option value="ON_SALE">판매중</option>
        <option value="SOLD_OUT">품절</option>
        <option value="NOT_SALE">미판매</option>
      </TextField>
      <TextField
        margin="dense"
        label="가격"
        type="number"
        fullWidth
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />
      <FormControlLabel
    control={
        <Checkbox
        checked={isCustomProduct}
        onChange={(e) => setIsCustomProduct(e.target.checked)}
         />
         }
        label="커스텀 여부"
       />
    </DialogContent>
    <DialogActions>
      <Button onClick={closeDialog} color="primary">
        취소
      </Button>
      <Button onClick={handleUpdate} color="primary">
        확인
      </Button>
    </DialogActions>
  </Dialog>
    <Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>상품 이름</TableCell>
              <TableCell>가격</TableCell>
              <TableCell>판매 상태</TableCell>
              <TableCell>평점</TableCell>
              <TableCell>댓글 개수</TableCell>
              <TableCell>커스텀 여부</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell>
               <div style={{ display: 'flex', alignItems: 'center' }}>
               <HoverButton style={{ color: 'grey' }} onClick={()=> openDialog()}>
               <EditIcon />
               </HoverButton>
               {productName}
               </div>
          </TableCell>
            <TableCell>{productPrice}</TableCell>
            <TableCell>{productState}</TableCell>

            <TableCell>
              <Rating defaultValue={meanRate} size='large' readOnly />
            </TableCell>
            <TableCell>{nOfRating}</TableCell>

            <TableCell>{customText}</TableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    </>
  );
};
