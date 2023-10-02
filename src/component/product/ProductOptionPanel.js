import { Stack, Button } from "@mui/material";
import { Checkbox } from "@mui/joy";
import { ProductOptionAddButton } from "./styled/Product";
import ProductOption from "./ProductOption";
import ProductOptionModal from "./ProductOptionModal";
import ProductOptionDetailModal from "./ProductOptionDetailModal";
// icon
import ControlPointIcon from "@mui/icons-material/ControlPoint";
// react
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// constants
import { ModalMode } from "../../constants/mode";

// axios
import { retrieveProductOptionList } from "../../axios/Product";

export default function ProductOptionPanel() {
  const { productId } = useParams();

  const [showAll, setShowAll] = useState(false);
  const [changed, setChanged] = useState(false);
  const [optionDetailModalOpen, setOptionDetailModalOpen] = useState(false);
  const [optionDetailMode, setOptionDetailMode] = useState(ModalMode.ADD);
  const [options, setOptions] = useState([]);
  const [optionId, setOptionId] = useState("");
  const [optionDetailEditProps, setOptionDetailEditProps] = useState({
    optionDetailId: "",
    optionDetailName: "",
    price: 0,
    stock: 0,
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

  const getOptions = async () => {
    try {
      const response = await retrieveProductOptionList(productId, !showAll);
      setOptions(response.data);
    } catch (e) {
      console.error(e);
    }
  };
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
      stock: 0,
      onSale: false,
    });
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

  useEffect(() => {
    // TODO showAll 을 넘겨야 할 수 있음.
    getOptions();
  }, [changed, showAll]);

  return (
    <>
      <Stack
        marginBottom={3}
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <Checkbox
          sx={{ marginRight: 3 }}
          checked={showAll}
          onChange={(e) => setShowAll(e.target.checked)}
          label="전체 옵션 보기"
        />
        <Button
          sx={{ fontWeight: "bold" }}
          variant="outlined"
          onClick={onOptionAddButtonClicked}
        >
          옵션 추가
        </Button>
      </Stack>
      {/*옵션 공간*/}
      <Stack direction={"row"} flexWrap={"wrap"} useFlexGap spacing={2}>
        {options.map((o) => (
          <ProductOption
            option={o}
            onOptionDetailAddButtonClicked={onOptionDetailAddButtonClicked}
            onOptionDetailEditButtonClicked={onOptionDetailModifyButtonClicked}
            onOptionEditButtonClicked={onOptionModifyButtonClicked}
            actived={actived}
          />
        ))}
      </Stack>
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
    </>
  );
}
