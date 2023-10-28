// components
import { Box, Stack } from "@mui/material";
import { MainContainer } from "../../component/common/MainComponent";
import SideNav from "../../component/common/side-nav/SideNav";
import { useNavigate, useParams } from "react-router-dom";
import {
  CardDetailImage,
  PointeredBox,
  ProductChevronLeft,
  ProductDetailName,
} from "../../component/product/styled/Product";
import ProductTab from "../../component/product/ProductTab";
// react
import { useEffect, useState } from "react";
// constants
import { PATH_PRODUCT } from "../../constants/path";
// axios
import { retrieveProductDetail } from "../../axios/Product";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(undefined);
  const [introContent, setIntroContent] = useState("");

  const detailEffect = async () => {
    try {
      const response = await retrieveProductDetail(productId);
      setProduct(response.data);
      setIntroContent(response.data.content);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    detailEffect();
  }, []);

  const onBackButtonClicked = () => {
    navigate(PATH_PRODUCT);
  };

  if (product === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <MainContainer>
      <SideNav />
      <Box
        component="main"
        sx={{
          padding: "0 5%",
          flexGrow: 1,
          py: 8,
        }}
      >
        <Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <PointeredBox onClick={onBackButtonClicked}>
              <ProductChevronLeft>&lt;</ProductChevronLeft>
              뒤로가기
            </PointeredBox>
            <ProductDetailName>{product.name}</ProductDetailName>
          </Stack>
          <div>
            <CardDetailImage
              src={
                "https://liberty52.s3.ap-northeast-2.amazonaws.com/product/static/liberty52-frame.png"
              }
            />
          </div>
          {/* 사진과 옵션 사이의 공간 설정*/}
          <ProductTab content={introContent} setContent={setIntroContent} />
          <Box />
        </Stack>
      </Box>
    </MainContainer>
  );
}
