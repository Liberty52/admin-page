import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  Card,
  DialogActions,
} from "@mui/material";
import { Textarea } from "@mui/joy";
import Editor from "@toast-ui/editor";
import { useEffect, useState } from "react";
import { getReviewDetail, createReviewReply } from "../../axios/Review";

export const ReviewDialog = (props) => {
  const { open, handleClose, id, isChanged } = props;
  const [data, setData] = useState();
  const [mode, setMode] = useState("VIEW");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    if (id === undefined) return;
    retrieveReviewDetailData();
  }, [id]);

  const retrieveDetail = (prevData, id) => {
    getReviewDetail(id).then((res) => {
      console.log(res.data.content);
      prevData = res.data.content;
      setData(prevData);
      setMode(prevData?.replies === null ? "ADD" : "VIEW");
      setTextAreaValue(prevData?.replies?.content);
      setImg(prevData?.replies?.imageUrls);
      const viewer = new Editor.factory({
        el: document.querySelector("#viewer"),
        height: "500px",
        initialEditType: "wysiwyg",
        initialValue: prevData.content,
        language: "ko-KR",
        viewer: true,
      });
    });
  };

  function retrieveReviewDetailData() {
    let prevData;
    try {
      retrieveDetail(prevData, id);
    } catch (err) {
      console.error(err);
    }
    setData(prevData);
  }
  const onTextAreaChanged = (e) => {
    setTextAreaValue(e.target.value);
  };
  const onAddButtonClicked = () => {
    if (textAreaValue === "" || textAreaValue === undefined) {
      alert("내용을 입력해주세요.");
      return;
    }
    createReviewReply(id, textAreaValue)
      .then(() => {
        alert("댓글을 작성하셨습니다.");
        isChanged(true);
      })
      .catch((err) => console.errer(err));
  };
  const onUpdateModeButtonClicked = (e) => {};
  const onDeleteButtonClicked = (e) => {};
  const onCloseButtonClicked = (e) => {};
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      maxWidth={"lg"}
      scroll={"body"}
    >
      {id !== undefined && (
        <Stack minWidth={500} padding={2}>
          <DialogTitle>리뷰 댓글 작성</DialogTitle>
          <Stack direction={"row"} spacing={1} justifyContent={"flex-end"}>
            <div>{data?.reviewCreatedAt}</div>
          </Stack>
          <Card sx={{ marginTop: "10px", padding: "10px 25px" }}>
            <div id={"viewer"}></div>
          </Card>
          <hr />
          <div>
            <Textarea
              placeholder={"댓글을 작성해주세요"}
              readOnly={mode === "VIEW"}
              onChange={onTextAreaChanged}
              value={textAreaValue}
              sx={{ padding: "10px 25px" }}
            />
          </div>
          <DialogActions>
            {mode === "ADD" ? (
              <>
                <Button onClick={onAddButtonClicked}>추가하기</Button>
              </>
            ) : (
              <>
                <Button onClick={onUpdateModeButtonClicked}>
                  {mode === "VIEW" ? "수정모드" : "수정하기"}
                </Button>
                <Button color={"error"} onClick={onDeleteButtonClicked}>
                  {mode === "VIEW" ? "삭제하기" : "취소하기"}
                </Button>
              </>
            )}
            <Button onClick={onCloseButtonClicked}>돌아가기</Button>
          </DialogActions>
        </Stack>
      )}
    </Dialog>
  );
};
