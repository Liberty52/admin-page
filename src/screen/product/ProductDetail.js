import { MainContainer } from "../../component/common/MainComponent";
import SideNav from "../../component/common/side-nav/SideNav";
import { Box, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  CardDetailImage,
  PointeredBox,
  ProductChevronLeft,
  ProductDetailName,
  ProductOptionAddButton,
  ProductOptionHeader,
  ProductOptionHeaderTitle,
} from "../../component/product/styled/Product";
import { PATH_PRODUCT } from "../../constants/path";
import ProductOption from "../../component/product/ProductOption";
import ProductOptionDetailModal from "../../component/product/ProductOptionDetailModal";
import { useEffect, useState } from "react";
import { ModalMode } from "../../constants/mode";
import {
  retrieveProductDetail,
  retrieveProductOptionList,
} from "../../axios/Product";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Checkbox } from "@mui/joy";
import ProductOptionModal from "../../component/product/ProductOptionModal";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [optionDetailModalOpen, setOptionDetailModalOpen] = useState(false);
  const [optionDetailMode, setOptionDetailMode] = useState(ModalMode.ADD);
  const [product, setProduct] = useState(undefined);
  const [changed, setChanged] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionId, setOptionId] = useState("");
  const [optionDetailEditProps, setOptionDetailEditProps] = useState({
    optionDetailId: "",
    optionDetailName: "",
    price: 0,
    onSale: false,
  });
  const [optionProps, setOptionProps] = useState({
    id: "",
    optionName: "",
    require: false,
    onSale: false,
  });
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [optionMode, setOptionMode] = useState(ModalMode.ADD);
  const detailEffect = async () => {
    try {
      const response = await retrieveProductDetail(productId);
      setProduct(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getOptions = async () => {
    try {
      const response = await retrieveProductOptionList(productId, !showAll);
      setOptions(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    detailEffect();
  }, []);

  useEffect(() => {
    // TODO showAll 을 넘겨야 할 수 있음.
    getOptions();
  }, [changed, showAll]);

  const clearOptionEditProps = () => {
    setOptionProps({
      id: "",
      optionName: "",
      require: false,
      onSale: false,
    });
  };

  const clearOptionDetailEditProps = () => {
    setOptionDetailEditProps({
      optionDetailId: "",
      optionDetailName: "",
      price: 0,
      onSale: false,
    });
  };

  const onBackButtonClicked = () => {
    navigate(PATH_PRODUCT);
  };

  const onOptionDetailModifyButtonClicked = (detail) => {
    setOptionDetailModalOpen(true);
    setOptionDetailMode(ModalMode.EDIT);
    setOptionDetailEditProps(detail);
  };
  const onOptionDetailAddButtonClicked = (id) => {
    setOptionDetailModalOpen(true);
    setOptionDetailMode(ModalMode.ADD);
    setOptionId(id);
    setChanged((prev) => !prev);
  };

  const onOptionAddButtonClicked = () => {
    setOptionModalOpen(true);
    setOptionMode(ModalMode.ADD);
    setChanged((prev) => !prev);
  };
  const onOptionModifyButtonClicked = (option) => {
    setOptionModalOpen(true);
    setOptionMode(ModalMode.EDIT);
    setOptionProps({
      id: option.optionId,
      optionName: option.optionName,
      require: option.require,
      onSale: option.onSale,
    });
  };

  const actived = () => {
    setChanged((prev) => !prev);
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
                "https://liberty52.s3.ap-northeast-2.amazonaws.com/product/represent/liberty52-frame.png"
              }
            />
          </div>
          {/* 사진과 옵션 사이의 공간 설정*/}
          <Box sx={{ py: 2 }} />
          <Stack
            marginBottom={3}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <ProductOptionHeader>
              <ProductOptionHeaderTitle>옵션 목록</ProductOptionHeaderTitle>
              <Checkbox
                checked={showAll}
                onChange={(e) => setShowAll(e.target.checked)}
                label="전체 옵션 보기"
              />
            </ProductOptionHeader>
            <ProductOptionAddButton onClick={onOptionAddButtonClicked}>
              <ControlPointIcon />
            </ProductOptionAddButton>
          </Stack>
          {/*옵션 공간*/}
          <Stack direction={"row"} flexWrap={"wrap"} useFlexGap spacing={2}>
            {options.map((o) => (
              <ProductOption
                option={o}
                onOptionDetailAddButtonClicked={onOptionDetailAddButtonClicked}
                onOptionDetailEditButtonClicked={
                  onOptionDetailModifyButtonClicked
                }
                onOptionEditButtonClicked={onOptionModifyButtonClicked}
                actived={actived}
              />
            ))}
          </Stack>
        </Stack>
      </Box>
      <ProductOptionDetailModal
        open={optionDetailModalOpen}
        setOpen={setOptionDetailModalOpen}
        mode={optionDetailMode}
        optionId={optionId}
        setOptionId={setOptionId}
        editProps={optionDetailEditProps}
        clearEditProps={clearOptionDetailEditProps}
        actived={actived}
      />
      <ProductOptionModal
        open={optionModalOpen}
        setOpen={setOptionModalOpen}
        mode={optionMode}
        productId={productId}
        editProps={optionProps}
        clearEditProps={clearOptionEditProps}
        actived={actived}
      />
    </MainContainer>
  );
}
