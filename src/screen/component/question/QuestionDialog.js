import {Button, Card, Dialog, DialogActions, DialogTitle, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {createQuestionReply, deleteQuestionReply, getQuestionDetail, updateQuestionReply} from "../../../axios/Question";
import {Editor} from "@toast-ui/editor";
import styled from "styled-components";
import {convertQuestionStatus} from "../../../utils";
import {Textarea} from "@mui/joy";
import {QuestionDetailTitle, QuestionDialogTitle} from "./index";



export const QuestionDialog = (props) => {
    const {
        open,
        handleClose,
        id,
        isChanged
    } = props;
    const [data,setData] = useState();
    const [mode,setMode] = useState("VIEW");
    const [textAreaValue, setTextAreaValue] = useState("");

    useEffect(()=>{
        if(id === undefined)
            return;
        retrieveQuestionDetailDataAndSetState();
    },[id])

    const retrieveDetail = (prevData, id) => {
        getQuestionDetail(id)
            .then(res => {
                prevData = res.data;
                setData(prevData);
                setMode(prevData?.questionReplyResponse === null ? "ADD" : "VIEW");
                setTextAreaValue(prevData?.questionReplyResponse?.replyContent);
                const viewer = new Editor.factory({
                    el: document.querySelector('#viewer'),
                    height: '500px',
                    initialEditType : 'wysiwyg',
                    initialValue : prevData.content,
                    language : "ko-KR",
                    viewer : true
                });
            });
    }

    function retrieveQuestionDetailDataAndSetState() {
        let prevData;
        try {
            retrieveDetail(prevData, id);
        } catch (err) {
            console.error(err)
        }
        setData(prevData)
    }

    const onAddButtonClicked = () => {

        if (textAreaValue === "" || textAreaValue === undefined) {
            alert("내용을 입력해주세요.")
            return;
        }
        if(textAreaValue.length > 1000){
            alert("문의 답변 내용이 정해진 양을 초과했습니다. (1000자 이내)")
            return;
        }


        createQuestionReply(id,textAreaValue)
            .then(()=> {
                alert("답변이 추가되었습니다.")
                isChanged(true)
                retrieveQuestionDetailDataAndSetState()})
            .catch(err => console.error(err));

    }


    const onUpdateModeButtonClicked = () => {
        if(mode === "EDIT"){
            if(textAreaValue === data.questionReplyResponse.replyContent){
                alert("내용을 변경해주세요.")
                return;
            }

            if(textAreaValue.length > 1000){
                alert("문의 답변 내용이 정해진 양을 초과했습니다. (1000자 이내)")
                return;
            }

            updateQuestionReply(data.questionReplyResponse.replyId,textAreaValue)
                .then(() => {
                    alert("수정했습니다.")
                    isChanged(true)
                    retrieveQuestionDetailDataAndSetState()})
                .catch(err => console.error(err))

        }else
            setMode("EDIT");

    }
    const onTextAreaChanged = (e) => {
        setTextAreaValue(e.target.value);
    }
    const onDeleteButtonClicked = () => {
        if(mode === "EDIT"){
            setTextAreaValue(data?.questionReplyResponse?.replyContent);
            setMode("VIEW");
        }else{
            deleteQuestionReply(data.questionReplyResponse.replyId)
                .then(()=>{
                    alert("삭제되었습니다.")
                    isChanged(true)
                    retrieveQuestionDetailDataAndSetState()
                    setTextAreaValue("");
                })
                .catch(err => console.error(err));
        }
    }
    const onCloseButtonClicked = () => {
        handleClose();
        setMode("VIEW");
        setTextAreaValue("");
    }



    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            maxWidth={'lg'}
            scroll={"body"}

        >
            {id === undefined ? <></> :
            <>
                <Stack  minWidth={500} padding={2}>
                    <QuestionDialogTitle>1:1 문의</QuestionDialogTitle>
                    <Stack>
                    <QuestionDetailTitle>{data?.title}</QuestionDetailTitle>
                    <Stack direction={"row"} spacing={1} justifyContent={"flex-end"}>
                        <div>{convertQuestionStatus(data?.status)}</div>
                        <div>{data?.createdAt}</div>
                    </Stack>
                    </Stack>
                    <Card sx={{marginTop : "10px", padding : "10px 25px"}}>
                    <div id={"viewer"}></div>
                    </Card>
                    <hr/>
                        <div>
                            <Textarea placeholder={"답변을 추가해주세요"} readOnly={mode==="VIEW"} onChange={onTextAreaChanged} value={textAreaValue} sx={{ padding : "10px 25px"}} />
                        </div>
                    <DialogActions>
                        {mode==="ADD" ? <>
                            <Button onClick={onAddButtonClicked}>추가하기</Button>
                        </> : <>
                            <Button onClick={onUpdateModeButtonClicked}>{mode==="VIEW" ? "수정모드" : "수정하기"}</Button>
                            <Button color={"error"} onClick={onDeleteButtonClicked}>{mode==="VIEW" ? "삭제하기" : "취소하기"}</Button>
                        </>}
                        <Button onClick={onCloseButtonClicked}>돌아가기</Button>
                    </DialogActions>
                </Stack>
            </>
                }

        </Dialog>
    )
}