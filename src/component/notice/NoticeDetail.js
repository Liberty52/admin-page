import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Layout, Descriptions, Input, Button, Form } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { postNotice } from "../../axios/Notice";
import SideNav from "../../screen/component/common/side-nav/SideNav";
import { MainContainer } from "../../screen/component/main/MainComponent";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { useLocation, useNavigate } from "react-router-dom";
import { getNoticeDetail, deleteNotice } from "../../axios/Notice";
import moment from "moment";
import { Box, Container, Stack, Typography } from "@mui/material";

const NoticeDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(state);
    let rawData = getNoticeDetail(state);
    rawData.then((appData) => {
      setData(appData.data);
    });
  }, []);
  const onEditNotice = () => {
    navigate("/notice/write");
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
        <a href="/notice">
          <button className="lf-button primary float-right">목록으로</button>
        </a>
        <table className="notice-table">
          <colgroup>
            <col width="20%" />
            <col width="80%" />
          </colgroup>
          <thead>
            <tr>
              <th>제목</th>
              <td>{data.title}</td>
            </tr>
            <tr>
              <th>작성일시</th>
              <td>{moment(data.createdAt).format("YYYY-MM-DD")}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="notice-contents"
                colSpan="2"
                dangerouslySetInnerHTML={{
                  __html: data.content,
                }}
              ></td>
            </tr>
          </tbody>
        </table>
        <Button onClick={() => onDeleteNotice(data.noticeId)}> 삭제 </Button>
        <Button onClick={onEditNotice}> 수정 </Button>
      </Box>
    </MainContainer>
  );
};
export default NoticeDetail;
