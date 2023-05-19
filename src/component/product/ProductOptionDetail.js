import {
    ProductOptionDetailButton,
    ProductOptionInput,
    ProductOptionDetailWrapper,
    ProductOptionDetailButtonWrapper
} from "./styled/Product";
import {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductOptionDetail({onEditButtonClicked,id,name}){
    const [focused, setFocused] = useState();


    const onMouseOn = () => {
        setFocused(true)
    }
    const onMouseOut = () => {
        setFocused(false)
    }




    return (
        <>
            <ProductOptionDetailWrapper
                onMouseEnter ={onMouseOn}
                onMouseLeave ={onMouseOut}
            >
            <ProductOptionInput
                                readOnly id={"text-align-center"}  value={"이젤 거치형"} />
                <ProductOptionDetailButton focused={focused}>
                    {/*TODO 삭제 클릭 시 삭제하시겠습니까? confirm 창 출력하기*/}
                    <ProductOptionDetailButtonWrapper
                        onClick={() => onEditButtonClicked(id,name)}

                    >
                        <EditIcon />
                    </ProductOptionDetailButtonWrapper>

                   <DeleteIcon/>
                </ProductOptionDetailButton>
            </ProductOptionDetailWrapper>
        </>
    )
}