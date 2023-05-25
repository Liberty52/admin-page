import {Stack} from "@mui/material";
import ProductOptionDetail from "./ProductOptionDetail";
import {ProductOptionDetailAddButton, ProductOptionInput, ProductOptionTitle} from "./styled/Product";
import ControlPointIcon from '@mui/icons-material/ControlPoint';


export default function ProductOption({option, onAddButtonClicked, onEditButtonClicked, actived}){


    return (
        <>
            <Stack sx={{width : 250}} spacing={2} >
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