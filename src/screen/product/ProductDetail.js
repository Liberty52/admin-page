import {MainContainer} from "../component/main/MainComponent";
import SideNav from "../component/common/side-nav/SideNav";
import {Box, Stack} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {
    CardDetailImage,
    PointeredBox,
    ProductChevronLeft,
    ProductDetailName
} from "../../component/product/styled/Product";
import {PATH_PRODUCT} from "../../constants/path";
import ProductOption from "../../component/product/ProductOption";
import ProductOptionDetailModal from "../../component/product/ProductOptionDetailModal";
import {useState} from "react";
import {ProductOptionModalMode} from "../../constants/mode";


export default function ProductDetail() {
    const {productId} = useParams();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState(ProductOptionModalMode.ADD);
    const [editProps, setEditProps] = useState({
        id: "",
        name: ""
    })

    const clearEditProps = () => {
        setEditProps({
            id: "",
            name: ""
        })
    }

    const onBackButtonClicked = () => {
        navigate(PATH_PRODUCT);
    }

    const onModifyButtonClicked = (id, name) => {
        setModalOpen(true);
        setMode(ProductOptionModalMode.EDIT)
        setEditProps({
            id, name
        })
    }
    const onAddButtonClicked = () => {
        setModalOpen(true)
        setMode(ProductOptionModalMode.ADD)
    }
    return (
        <MainContainer>
            <SideNav/>
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
                        <PointeredBox onClick={onBackButtonClicked}><ProductChevronLeft>&lt;</ProductChevronLeft>
                            뒤로가기</PointeredBox>
                        <ProductDetailName>Liberty52 Frame</ProductDetailName>
                    </Stack>
                    <div>
                        <CardDetailImage
                            src={"https://liberty52.s3.ap-northeast-2.amazonaws.com/product/represent/liberty52-frame.png"}
                        />

                    </div>
                    {/* 사진과 옵션 사이의 공간 설정*/}
                    <Box sx={{py: 2,}}/>
                    {/*옵션 공간*/}
                    <Stack direction={"row"} flexWrap={"wrap"} useFlexGap>
                        {/*TODO 각 ProductOption 당 아래 ProductOption 만들어 주기*/}
                        <ProductOption onAddButtonClicked={onAddButtonClicked}
                                       onEditButtonClicked={onModifyButtonClicked}/>
                    </Stack>
                </Stack>

            </Box>
            <ProductOptionDetailModal
                open={modalOpen}
                setOpen={setModalOpen}
                mode={mode}
                editProps={editProps}
                clearEditProps={clearEditProps}
            />

            {/*ToDo Modal만들어서 추가하건 수정하건, 그 안에서 입력하기*/}
        </MainContainer>


    )
}