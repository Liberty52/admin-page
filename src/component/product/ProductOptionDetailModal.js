import {Button, Input, Modal, ModalClose, Sheet, Stack, Typography} from "@mui/joy";
import {ProductOptionModalMode} from "../../constants/mode";
import {useEffect, useState} from "react";
import {ProductOptionModalTitle} from "./styled/Product";
import Swal from "sweetalert2";
import {Toast} from "../../utils/Toast";


export default function ProductOptionDetailModal({open, setOpen, mode, editProps, clearEditProps}) {
    const [value,setValue] = useState();
    const [buttonText, setButtonText] = useState();
    useEffect(() => {
        setValue(editProps.name);
        setButtonText(mode === ProductOptionModalMode.ADD ? "추가하기" : "수정하기");
    },[open])
    const onCloseAction = () => {
        setOpen(false);
        clearEditProps();
        setValue("");
    }
    const onActionButtonClicked = () => {
        if(mode === ProductOptionModalMode.ADD){
            addOptionDetail();
        }else{
            editOptionDetail();
        }
    }
    const addOptionDetail = () => {
        Toast.fire({
            icon: 'success',
            title: '옵션이 추가되었습니다.'
        })
        onCloseAction();
    }
    const editOptionDetail = () => {
        if(value === editProps.name){
            Toast.fire({
                icon: 'warning',
                title: '내용을 수정해주세요'
            })
            return;
        }
    }



    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            hideBackdrop={true}
            onClose={() => onCloseAction()}
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Sheet
                variant="outlined"
                sx={{
                    minWidth : 500,
                    maxWidth: 500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
            >
                <ModalClose
                    variant="outlined"
                    sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '50%',
                        bgcolor: 'background.body',
                    }}
                />
                <ProductOptionModalTitle>
                    {mode === ProductOptionModalMode.ADD? "옵션 내용 추가" : "옵션 내용 수정"}
                </ProductOptionModalTitle>
                <Input value={value} onChange={(e)=> setValue(e.target.value)} placeholder={"추가할 옵션 내용을 입력해주세요"}/>
                <Stack direction={"row"} justifyContent={"flex-end"} spacing={1} marginTop={2}>
                    <Button onClick={onActionButtonClicked}>{buttonText}</Button>
                    <Button onClick={onCloseAction} color={"danger"}>취소하기</Button>
                </Stack>
            </Sheet>
        </Modal>
    )
}