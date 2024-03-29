// components
import { Box, Stack } from '@mui/material';
import { MainContainer } from '../../component/common/MainComponent';
import SideNav from '../../component/common/side-nav/SideNav';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CardDetailImage,
  PointeredBox,
  ProductChevronLeft,
  ProductDetailName,
} from '../../component/product/styled/Product';
import ProductTab from '../../component/product/ProductTab';
// react
import { useEffect, useState } from 'react';
// constants
import { PATH_PRODUCT } from '../../constants/path';
// axios
import { retrieveProductDetail } from '../../axios/Product';
import { LicenseTable } from '../../component/license/LicenseTable';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [introContent, setIntroContent] = useState(undefined);

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = () => {
    retrieveProductDetail(productId).then((res) => {
      setProduct(res.data);
      setIntroContent(res.data.content);
    });
  };

  const onBackButtonClicked = () => {
    navigate(PATH_PRODUCT);
  };

  const firstImage = () => {
    if (product.id === 'LIB-001') {
      product.pictureUrl =
        'https://liberty52.s3.ap-northeast-2.amazonaws.com/product/static/liberty52-frame.png';
    }
  };

  if (product === undefined) {
    return <div>Loading...</div>;
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
        <Stack>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <PointeredBox onClick={onBackButtonClicked}>
              <ProductChevronLeft>&lt;</ProductChevronLeft>
              뒤로가기
            </PointeredBox>
            <ProductDetailName>{product.name}</ProductDetailName>
          </Stack>
          <div>
            <CardDetailImage src={product.pictureUrl} />
            <Stack>
              <LicenseTable
                name={product.name}
                price={product.price}
                nOfRating={product.ratingCount}
                state={product.state}
                meanRate={product.meanRating}
                custom={product.custom}
                getProductDetail={getProductDetail}
              />
            </Stack>
          </div>
          {/* 사진과 옵션 사이의 공간 설정*/}
          <ProductTab
            content={introContent}
            setContent={setIntroContent}
            productCustom={product.custom}
          />

          <Box />
        </Stack>
      </Box>
    </MainContainer>
  );
}
