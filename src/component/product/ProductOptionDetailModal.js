import {Button, Grid, Input, Modal, ModalClose, Sheet, Stack} from "@mui/joy";
import Checkbox from '@mui/joy/Checkbox';

import {ModalMode} from "../../constants/mode";
import {useEffect, useState} from "react";
import {ProductOptionModalTitle} from "./styled/Product";
import {Toast} from "../../utils/Toast";
import {addOptionDetail, updateOptionDetail} from "../../axios/Product";
import {Box} from "@mui/material";


export default function ProductOptionDetailModal({open, setOpen, optionId, setOptionId, mode, editProps, clearEditProps,actived}) {
    const [value,setValue] = useState("");
    const [price,setPrice] = useState(0);
    const [onSale, setOnSale] = useState(false);
    const [buttonText, setButtonText] = useState();
    useEffect(() => {
        setValue(editProps.optionDetailName);
        setPrice(editProps.price)
        setOnSale(editProps.onSale);
        setButtonText(mode === ModalMode.ADD ? "추가하기" : "수정하기");
        console.log(editProps)
    },[open])
    const onCloseAction = () => {
        setOpen(false);
        clearEditProps();
        setValue("");
        setOptionId("");
        setPrice(0);
        setOnSale(false);
        actived();
    }
    const onActionButtonClicked = () => {
        if(mode === ModalMode.ADD){
            addOptionDetailButtonClicked();
        }else{
            editOptionDetail();
        }
    }
    const addOptionDetailButtonClicked = async () => {
        console.log(editProps)
        let isValid = true;

        
        if(value.length === 0){
            Toast.fire({
                icon: 'warning',
                title: '옵션의 이름을 입력해주세요'
            })
            isValid = false;
        }
        
        if(price < 0){
            Toast.fire({
                icon: 'warning',
                title: '가격은 0이상의 값을 입력해주세요'
            })
            isValid = false;
        }
        if(!isValid)
            return;



        try{
            const response = await addOptionDetail(optionId,{
                name : value ,
                price,
                onSale
            });
            Toast.fire({
                icon: 'success',
                title: '옵션이 추가되었습니다.'
            })
            onCloseAction();
        }catch (e) {
            console.error(e)
        }
    }
    const editOptionDetail = async () => {
        let isValid = true;
        if(value === editProps.name){
            Toast.fire({
                icon: 'warning',
                title: '내용을 수정해주세요'
            })
            return;
        }
        if(value.length === 0){
            Toast.fire({
                icon: 'warning',
                title: '옵션의 이름을 입력해주세요'
            })
            isValid = false;
        }

        if(price < 0){
            Toast.fire({
                icon: 'warning',
                title: '가격은 0이상의 값을 입력해주세요'
            })
            isValid = false;
        }
        if(!isValid)
            return;

        try{
            const response = await updateOptionDetail(editProps.optionDetailId,{
                name : value ,
                price,
                onSale
            });
            Toast.fire({
                icon: 'success',
                title: '옵션이 수정되었습니다.'
            })
            onCloseAction();
        }catch (e) {
            console.error(e)
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
                    {mode === ModalMode.ADD? "옵션 항목 추가" : "옵션 항목 수정"}
                </ProductOptionModalTitle>
                <Input value={value} onChange={(e)=> setValue(e.target.value)} placeholder={"추가할 옵션 항목의 이름을 입력해주세요"}/>
                <Box sx={{py: 1,}}/>

                <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems={"center"}>
                    <Grid sm={10}>
                    <Input value={price} type="number" onChange={(e)=> setPrice(e.target.value)} placeholder={"추가할 옵션 항목의 가격을 입력해주세요"}/>
                    </Grid>
                    <Grid sm={2}>
                        <Checkbox checked={onSale} onChange={(e)=> setOnSale(e.target.checked)} label={"판매"}/>
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