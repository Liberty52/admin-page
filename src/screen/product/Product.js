import { MainContainer } from '../../component/common/MainComponent';
import SideNav from '../../component/common/side-nav/SideNav';
import { Box, Container } from '@mui/material';
import ProductItem from '../../component/product/ProductItem';
import {
  ProductAddButtonWrapper,
  ProductBox,
  ProductHeaderWrapper,
  ProductTitle,
} from '../../component/product/styled/Product';
import { useEffect, useState } from 'react';
import { retrieveProduct } from '../../axios/Product';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import LicenseOption from '../../component/license/LicenseOption';
import { Stack } from '@mui/material';

export default function Product() {
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const effect = async () => {
    try {
      const response = await retrieveProduct();
      setProduct(response.data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    effect();
  }, []);

  const getProduct = () => {
    effect();
  };
  const openLicenseOpen = () => {
    setOpen(true);
  };
  const closeLicenseOption = () => {
    setOpen(false);
  };

  return (
    <>
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
          <Container sx={{ marginLeft: '30px' }} maxWidth='xl'>
            <ProductHeaderWrapper
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <ProductTitle>상품 관리</ProductTitle>
              <ProductAddButtonWrapper>
                <ControlPointIcon
                  sx={{ fontWeight: 'bold' }}
                  variant='outlined'
                  onClick={openLicenseOpen}
                />
              </ProductAddButtonWrapper>
            </ProductHeaderWrapper>

            <ProductBox useFlexGap flexWrap={'wrap'} direction={'row'} spacing={2}>
              {product !== undefined ? (
                product?.map((p) => (
                  <ProductItem
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    price={p.price}
                    stock={p.stock}
                    rating={p.meanRating}
                    nOfRating={p.ratingCount}
                    img={p.pictureUrl}
                    state={p.state}
                    custom={p.custom}
                  />
                ))
              ) : (
                <></>
              )}
            </ProductBox>
            <Stack>
              <LicenseOption open={open} onClose={closeLicenseOption} getProduct={getProduct} />
            </Stack>
          </Container>
        </Box>
      </MainContainer>
    </>
  );
}
