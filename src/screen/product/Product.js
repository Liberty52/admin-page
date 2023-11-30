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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Product() {
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await retrieveProduct();
      const sortedData = response.data.sort((a, b) => a.order - b.order);
      setProduct(sortedData);
    } catch (e) {
      console.error(e);
    }
  };

  const openLicenseOpen = () => {
    setOpen(true);
  };
  const closeLicenseOption = () => {
    setOpen(false);
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(product);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProduct(items);

    // 변경된 순서대로 상품 ID 배열 생성
    const productOrder = items.map((item) => item.id);

    // 백엔드에 변경된 순서를 전송
    retrieveProduct(productOrder)
      .then(() => {
        console.log('상품 순서가 업데이트되었습니다.');
      })
      .catch((e) => {
        console.error('상품 순서 업데이트에 실패했습니다:', e);
      });
  };

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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided) => (
                <ProductBox
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  useFlexGap
                  flexWrap={'wrap'}
                  direction={'row'}
                  spacing={2}
                >
                  {product !== undefined ? (
                    product?.map((p, index) => (
                      <Draggable key={p.id} draggableId={p.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
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
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <></>
                  )}
                  {provided.placeholder}
                </ProductBox>
              )}
            </Droppable>
          </DragDropContext>
          <Stack>
            <LicenseOption
              open={open}
              onClose={closeLicenseOption}
              getProduct={getProduct}
              product={product}
            />
          </Stack>
        </Container>
      </Box>
    </MainContainer>
  );
}
