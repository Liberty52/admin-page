import {Stack} from "@mui/material";
import ProductOptionDetail from "./ProductOptionDetail";
import {
    HoverButton,
    HoverButtonWrapper,
    ProductOptionDetailAddButton,
    ProductOptionTitle,
    ProductOptionTitleWrapper
} from "./styled/Product";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from "@mui/icons-material/Edit";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import {useState} from "react";
import Swal from "sweetalert2";
import {changeProductOptionOnSale} from "../../axios/Product";
import {Toast} from "../../utils/Toast";


export default function ProductOption({option, onOptionDetailAddButtonClicked, onOptionDetailEditButtonClicked,onOptionEditButtonClicked, actived}){

    const [focused, setFocused] = useState();
    const onMouseOn = () => {
        setFocused(true)
    }
    const onMouseOut = () => {
        setFocused(false)
    }

    const onDeleteButtonClicked = () => {
        Swal.fire({
            title: '정말로 옵션의 판매 상태를 변경하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '변경하기',
            cancelButtonText : '취소하기'
        }).then((result) => {
            if (result.isConfirmed) {
                changeProductOptionOnSale(option.optionId).then(() => {
                    Toast.fire({
                        icon: 'success',
                        title: '변경이 완료되었습니다'
                    })
                    actived();
                });
            }
        })
    }

    return (
        <>
            <Stack sx={{width : 250}} spacing={2} >
                <ProductOptionTitleWrapper
                    onMouseEnter ={onMouseOn}
                    onMouseLeave ={onMouseOut}
                >
                    <ProductOptionTitle onSale={option.onSale}>{option.optionName}</ProductOptionTitle>
                    <HoverButtonWrapper focused={focused}>
                        <HoverButton
                            onClick={() => onOptionEditButtonClicked(option)}
                        >
                            <EditIcon />
                        </HoverButton>
                        <HoverButton
                            onClick={onDeleteButtonClicked}
                        >
                            <AutorenewIcon/>
                        </HoverButton>
                    </HoverButtonWrapper>
                </ProductOptionTitleWrapper>

                {option.optionDetailList.map(detail =>
                    <ProductOptionDetail
                        detail={detail}
                                         actived={actived}
                                         onEditButtonClicked={onOptionDetailEditButtonClicked}/>
                )}

                <ProductOptionDetailAddButton onClick={() => onOptionDetailAddButtonClicked(option.optionId)} >
                    <ControlPointIcon/>
                </ProductOptionDetailAddButton >
            </Stack>
        </>
    )
}