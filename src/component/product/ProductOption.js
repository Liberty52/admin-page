import {Stack} from "@mui/material";
import ProductOptionDetail from "./ProductOptionDetail";
import {ProductOptionDetailAddButton, ProductOptionInput, ProductOptionTitle} from "./styled/Product";
import ControlPointIcon from '@mui/icons-material/ControlPoint';


export default function ProductOption({option, onAddButtonClicked, onEditButtonClicked, actived}){

    const mockId = '53d6db8d-94e9-400f-9c1e-4d7095577995';
    const mockDetailId = 'OPT-004';

    return (
        <>
            <Stack sx={{minWidth : 216}} spacing={2} >
                <ProductOptionTitle>{option.optionName}</ProductOptionTitle>
                {option.optionDetailList.map(detail =>
                    <ProductOptionDetail
                        detail={detail}
                                         actived={actived}
                                         onEditButtonClicked={onEditButtonClicked}/>
                )}

                <ProductOptionDetailAddButton onClick={() => onAddButtonClicked(option.optionId)} >
                    <ControlPointIcon/>
                </ProductOptionDetailAddButton >
            </Stack>
        </>
    )
}