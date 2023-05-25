import {Stack} from "@mui/material";
import ProductOptionDetail from "./ProductOptionDetail";
import {
    ProductOptionDetailAddButton,
    HoverButtonWrapper, HoverButton,
    ProductOptionTitle,
    ProductOptionTitleWrapper
} from "./styled/Product";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from "@mui/icons-material/Edit";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import {useState} from "react";


export default function ProductOption({option, onAddButtonClicked, onEditButtonClicked, actived}){

    const [focused, setFocused] = useState();
    const onMouseOn = () => {
        setFocused(true)
    }
    const onMouseOut = () => {
        setFocused(false)
    }
    return (
        <>
            <Stack sx={{width : 250}} spacing={2} >
                <ProductOptionTitleWrapper
                    onMouseEnter ={onMouseOn}
                    onMouseLeave ={onMouseOut}
                >
                    <ProductOptionTitle>{option.optionName}</ProductOptionTitle>
                    <HoverButtonWrapper focused={focused}>
                        <HoverButton
                            // onClick={() => onEditButtonClicked(detail)}
                        >
                            <EditIcon />
                        </HoverButton>
                        <HoverButton
                            // onClick={onDeleteButtonClicked}
                        >
                            <AutorenewIcon/>
                        </HoverButton>
                    </HoverButtonWrapper>
                </ProductOptionTitleWrapper>

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