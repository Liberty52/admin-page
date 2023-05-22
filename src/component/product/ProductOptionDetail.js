import {
    ProductOptionDetailButton,
    ProductOptionInput,
    ProductOptionDetailWrapper,
    ProductOptionDetailButtonWrapper
} from "./styled/Product";
import {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteOptionDetail} from "../../axios/Product";
import Swal from "sweetalert2";
import {Toast} from "../../utils/Toast";

export default function ProductOptionDetail({onEditButtonClicked,detail, actived}){
    const [focused, setFocused] = useState();


    const onMouseOn = () => {
        setFocused(true)
    }
    const onMouseOut = () => {
        setFocused(false)
    }

    const onDeleteButtonClicked = () => {
        Swal.fire({
            title: '정말로 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '삭제하기',
            cancelButtonText : '취소하기'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    onSail : !detail.onSail
                }
                deleteOptionDetail(detail.optionDetailId,data).then(() => {
                    Toast.fire({
                        icon: 'warning',
                        title: '삭제가 완료되었습니다'
                    })
                    actived();
                });
            }
        })

    }




    return (
        <>
            <ProductOptionDetailWrapper
                onMouseEnter ={onMouseOn}
                onMouseLeave ={onMouseOut}

            >
            <ProductOptionInput
                                id={'product-option-input'}
                                readOnly  value={detail.optionDetailName} />
                <ProductOptionDetailButton focused={focused}>
                    <ProductOptionDetailButtonWrapper
                        onClick={() => onEditButtonClicked(detail)}
                    >
                        <EditIcon />
                    </ProductOptionDetailButtonWrapper>
                    <ProductOptionDetailButtonWrapper
                        onClick={onDeleteButtonClicked}
                    >
                   <DeleteIcon/>
                    </ProductOptionDetailButtonWrapper>
                </ProductOptionDetailButton>
            </ProductOptionDetailWrapper>
        </>
    )
}