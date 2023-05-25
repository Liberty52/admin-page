import {Button,  Grid, Input, Modal, ModalClose, Sheet, Stack, Typography} from "@mui/joy";
import Checkbox from '@mui/joy/Checkbox';

import {ModalMode} from "../../constants/mode";
import {useEffect, useState} from "react";
import {ProductOptionModalTitle} from "./styled/Product";
import Swal from "sweetalert2";
import {Toast} from "../../utils/Toast";
import {addOptionDetail} from "../../axios/Product";
import {Box} from "@mui/material";


export default function ProductOptionModal({open, setOpen, productId, mode, editProps, clearEditProps,actived}) {
    const [value,setValue] = useState("");
    const [require,setRequire] = useState(false);
    const [onSail, setOnSail] = useState(false);
    const [buttonText, setButtonText] = useState();
    useEffect(() => {
        console.log(editProps)
        setValue(editProps.optionName);
        setRequire(editProps.require)
        setOnSail(editProps.onSail);
        setButtonText(mode === ModalMode.ADD ? "추가하기" : "수정하기");
    },[open])
    const onCloseAction = () => {
        setOpen(false);
        clearEditProps();
        setValue("");
        setRequire(false);
        setOnSail(false);
        actived();
    }
    const onActionButtonClicked = () => {
        if(mode === ModalMode.ADD){
            addOptionButtonClicked();
        }else{
            editOptionDetail();
        }
    }
    const addOptionButtonClicked = async () => {
        let isValid = true;
        console.log(value)

        if(value.length === 0){
            Toast.fire({
                icon: 'warning',
                title: '옵션의 이름을 입력해주세요'
            })
            isValid = false;
        }

        if(!isValid)
            return;



        try{
            // const response = await addOptionDetail(optionId,{
            //     name : value ,
            //     price,
            //     onSail
            // });
            Toast.fire({
                icon: 'success',
                title: '옵션이 추가되었습니다.'
            })
            onCloseAction();
        }catch (e) {
            console.error(e)
        }
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
                    {mode === ModalMode.ADD? "옵션 추가" : "옵션 수정"}
                </ProductOptionModalTitle>
                <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems={"center"}>
                    <Grid sm={8}>
                        <Input value={value} onChange={(e)=> setValue(e.target.value)} placeholder={"추가할 옵션 항목의 이름을 입력해주세요"}/>
                    </Grid>
                    <Grid sm={2}>
                        <Checkbox checked={onSail} onChange={(e)=> setOnSail(e.target.checked)} label={"판매"}/>
                    </Grid>
                    <Grid sm={2}>
                        <Checkbox checked={require} onChange={(e)=> setRequire(e.target.checked)} label={"필수"}/>
                    </Grid>
                </Grid>
                <Stack direction={"row"} justifyContent={"flex-end"} spacing={1} marginTop={2}>
                    <Button onClick={onActionButtonClicked}>{buttonText}</Button>
                    <Button onClick={onCloseAction} color={"danger"}>취소하기</Button>
                </Stack>
            </Sheet>
        </Modal>
    )
}