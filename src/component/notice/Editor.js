import React, { useState } from "react";
import styled from "styled-components";
import { Layout, Descriptions, Input, Button, Form } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { postNotice } from "../../axios/Notice";
import SideNav from "../common/side-nav/SideNav";
import { MainContainer } from "../common/MainComponent";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";

const Container = styled.div`
  width: 100%;
  height: 80%;
  padding: 30px 10px 10px 100px;
  text-align: -webkit-center;
  .ant-descriptions-item-label {
    width: 100px;
  }
  .ant-form-horizontal {
    width: 1000px;
  }
`;

const MyBlock = styled.div`
  .wrapper-class {
    width: 50%;
    margin: 0 auto;
    margin-bottom: 4rem;
  }
  .editorClassName {
    height: 400px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
  }
  .rdw-fontsize-dropdown {
    width: 50px;
  }
`;

const NoticeEditor = () => {
  const onFinish = (value) => {
    if (
      value.title == "" ||
      value.title == undefined ||
      draftToHtml(convertToRaw(editorState.getCurrentContent())) == "<p></p>\n"
    ) {
      alert("제목 및 내용을 입력해주세요");
    } else {
      postNotice(value, editorState, allowComments);
    }
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [allowComments, setAllowComments] = useState(false);

  const onChangeCheck = (checked) => {
    if (checked) {
      setAllowComments(true);
    } else if (!checked) {
      setAllowComments(false);
    }
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  // const uploadCallback = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onloadend = async () => {
  //       const formData = new FormData();
  //       formData.append("multipartFiles", file);
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // };

  //     const DIV = styled.div`
  //     .ant-form-item-control-input-content {
  //     display: flex;
  //     align-items: center;
  //     }
  //     label {
  //         width: 100px;
  //     }
  // `
  return (
    <MainContainer>
      <SideNav />
      <Layout style={{ padding: "0 24px 24px" }}>
        <div style={{ borderTop: "1px solid #eee" }} />
        <div style={{ textAlign: "center" }}>
          <h3>공지사항 작성</h3>
        </div>

        <Container>
          <Form onFinish={onFinish} style={{ textAlign: "center" }}>
            <Descriptions
              title=""
              column={1}
              bordered
              size="small"
              style={{ textAlign: "left" }}
            >
              <Descriptions.Item label="제목" style={{ textAlign: "center" }}>
                <FormItem name="title" style={{ margin: "0" }}>
                  <Input placeholder="제목을 작성해주세요." maxLength={50} />
                </FormItem>
              </Descriptions.Item>
              <Descriptions.Item label="내용" style={{ textAlign: "center" }}>
                <MyBlock>
                  <Editor
                    placeholder="내용을 작성해주세요."
                    localization={{
                      locale: "ko",
                    }}
                    // toolbar={{
                    //   list: { inDropdown: false },
                    //   textAlign: { inDropdown: false },
                    //   link: { inDropdown: false },
                    //   history: { inDropdown: false },
                    //   image: { uploadCallback: uploadCallback },
                    // }}
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                  />
                </MyBlock>
              </Descriptions.Item>
              <Descriptions.Item
                label="댓글 허용 여부"
                style={{ textAlign: "center" }}
              >
                <FormItem name="allowComments" style={{ margin: "0" }}>
                  <Input
                    type="checkbox"
                    onChange={(e) => {
                      onChangeCheck(e.target.checked);
                    }}
                  />
                </FormItem>
              </Descriptions.Item>
            </Descriptions>
            <br />
            <Button type="default" htmlType="submit">
              등록
            </Button>
          </Form>
        </Container>
      </Layout>
    </MainContainer>
  );
};
export default NoticeEditor;
