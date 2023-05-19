import {Stack} from "@mui/material";
import ProductOptionDetail from "./ProductOptionDetail";
import {ProductOptionDetailAddButton, ProductOptionInput, ProductOptionTitle} from "./styled/Product";
import ControlPointIcon from '@mui/icons-material/ControlPoint';


export default function ProductOption({onAddButtonClicked, onEditButtonClicked}){

    return (
        <>
            <Stack sx={{minWidth : 216}} spacing={2}>
                <ProductOptionTitle>거치 방식</ProductOptionTitle>
                <ProductOptionDetail id={1} name={"이젤거치형"} onEditButtonClicked={onEditButtonClicked}/>
                <ProductOptionDetailAddButton onClick={onAddButtonClicked} >
                    <ControlPointIcon/>
                </ProductOptionDetailAddButton >
            </Stack>
        </>
    )
}