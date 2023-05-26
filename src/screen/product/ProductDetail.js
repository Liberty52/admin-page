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
import {useEffect, useState} from "react";
import {ProductOptionModalMode} from "../../constants/mode";
import {retrieveProductDetail, retrieveProductOptionList} from "../../axios/Product";


export default function ProductDetail() {
    const {productId} = useParams();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState(ProductOptionModalMode.ADD);
    const [product,setProduct] = useState(undefined);
    const [optionChanged,setOptionChanged] = useState(false);
    const [options,setOptions] = useState([]);
    const [optionId, setOptionId] = useState('');
    const [editProps, setEditProps] = useState({
        id: "",
        optionDetailName: "",
        price :0,
        onSail:false,
    })

    const detailEffect = async () => {
        try{
            const response = await retrieveProductDetail(productId);
            setProduct(response.data);
        }catch (e) {
            console.error(e);
        }
    }

    const getOptions = async () => {
        try{
            const response = await retrieveProductOptionList(productId);
            setOptions(response.data);
        }catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        detailEffect();
    },[])

    useEffect(() => {
        getOptions();
    },[optionChanged])



    const clearEditProps = () => {
        setEditProps({
            id: "",
            optionDetailName: "",
            price :0,
            onSail:false,
        })
    }

    const onBackButtonClicked = () => {
        navigate(PATH_PRODUCT);
    }

    const onModifyButtonClicked = (detail) => {
        setModalOpen(true);
        setMode(ProductOptionModalMode.EDIT)
        setEditProps(detail)
    }
    const onAddButtonClicked = (id) => {
        setModalOpen(true)
        setMode(ProductOptionModalMode.ADD)
        setOptionId(id);
        setOptionChanged(prev => !prev);
    }

    const actived = () => {
        setOptionChanged(prev => !prev)
    }

    if(product === undefined){
        return <div>Loading...</div>
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
                        <ProductDetailName>{product.name}</ProductDetailName>
                    </Stack>
                    <div>
                        <CardDetailImage
                            src={"https://liberty52.s3.ap-northeast-2.amazonaws.com/product/represent/liberty52-frame.png"}
                        />

                    </div>
                    {/* 사진과 옵션 사이의 공간 설정*/}
                    <Box sx={{py: 2,}}/>
                    {/*옵션 공간*/}
                    <Stack direction={"row"} flexWrap={"wrap"} useFlexGap spacing={2} >

                        {options.map(o =>
                            <ProductOption
                                option ={o}
                                onAddButtonClicked={onAddButtonClicked}
                                onEditButtonClicked={onModifyButtonClicked}
                                actived={actived}
                            />)}
                    </Stack>
                </Stack>

            </Box>
            <ProductOptionDetailModal
                open={modalOpen}
                setOpen={setModalOpen}
                mode={mode}
                optionId={optionId}
                setOptionId={setOptionId}
                editProps={editProps}
                clearEditProps={clearEditProps}
                actived ={actived}
            />


        </MainContainer>


    )
}