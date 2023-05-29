import React, {useEffect, useState} from "react";
import {Button} from "antd";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {deleteNotice, getNoticeDetail} from "../../axios/Notice";
import SideNav from "../../screen/component/common/side-nav/SideNav";
import {MainContainer} from "../../screen/component/main/MainComponent";
import {useLocation, useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import {
  DetailPageButtonWrapper,
  MoveToListButton,
  NoticeDetailCreatedAt,
  NoticeDetailHeader,
  NoticeDetailTitle,
  Viewer,
} from "./style/Notice";
import "./Notice.css";
import {ModalMode} from "../../constants/mode";

const NoticeDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState([]);
  const [allowComments, setAllowComments] = useState("");
  useEffect(() => {
    console.log(state);
    let rawData = getNoticeDetail(state);
    rawData.then((appData) => {
      setData(appData.data);
      console.log(data);
      setAllowCommentsByData(appData.data.commentable);
    });
  }, []);
  function setAllowCommentsByData(commentable) {
    if (commentable == true) {
      setAllowComments("댓글 작성 가능");
    } else if (commentable == false) {
      setAllowComments("댓글 작성 불가");
    } else {
    }
  }
  const onEditNotice = () => {
    navigate("/notice/editor", {
      state: {
        id: state,
        mode: ModalMode.EDIT,
      },
    });
  };
  const onDeleteNotice = (id) => {
    if (window.confirm("삭제 하시겠습니까?")) deleteNotice(id);
  };

  return (
    <MainContainer>
      <SideNav />
      <Box
        component="main"
        sx={{
          padding: "0 5%",
          flexGrow: 1,
          py: 8,
        }}
      >
        <>
          <NoticeDetailHeader>
            {data ? (
              <div>
                <NoticeDetailTitle>{data.title}</NoticeDetailTitle>
                <NoticeDetailCreatedAt>
                  공지사항 {" / "} {data.createdAt}
                  {" / "}
                  {allowComments}
                </NoticeDetailCreatedAt>
              </div>
            ) : (
              <></>
            )}
          </NoticeDetailHeader>
          <Viewer id={"viewer"}></Viewer>
          <table>
            <td
              className="notice-contents"
              dangerouslySetInnerHTML={{
                __html: data.content,
              }}
            ></td>
          </table>
          {data ? (
            <DetailPageButtonWrapper>
              <Button onClick={() => onDeleteNotice(data.noticeId)}>
                삭제
              </Button>
              <Button onClick={onEditNotice}> 수정 </Button>
              <MoveToListButton onClick={() => navigate("/notice")}>
                목록
              </MoveToListButton>
            </DetailPageButtonWrapper>
          ) : (
            <></>
          )}
        </>
      </Box>
    </MainContainer>
  );
};
export default NoticeDetail;
