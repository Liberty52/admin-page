import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CurrentHtmlSizeSpan,
  HTMLEditor,
  HTMLSizeLimiter,
  MoveToListButton,
  QuestEditorTitleInput,
  QuestionContainer,
  QuestionEditorHeader,
  QuestionPageButton,
  QuestionPageButtonWrapper,
} from "./style/QuestionComponent";
import { Input } from "antd";
import { Editor } from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { ProductOptionModalMode } from "../../constants/mode";
import { useNavigate } from "react-router";
import {
  createNotice,
  updateNotice,
  uploadImage,
  getNoticeDetail,
} from "../../axios/Notice";
import "./NoticeEditor.css";

export default function NoticeEditor() {
  const MAX_HTML_SIZE = 10000;
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [htmlSize, setHtmlSize] = useState(0);
  const [exceed, setExceed] = useState(false);
  const [prevData, setPrevData] = useState();
  const [noticeId, setNoticeId] = useState();

  let editor;

  const effect = async () => {
    const isMobile = /Mobi/i.test(window.navigator.userAgent); // "Mobi" 가 User agent에 포함되어 있으면 모바일
    const mode = location.state.mode;
    let data;
    if (mode === ProductOptionModalMode.ADD) {
      data = " ";
    } else {
      let PREV_DATA;
      await getNoticeDetail(location.state.id).then((res) => {
        PREV_DATA = res.data;
        setNoticeId(location.state.id);
      });
      data = PREV_DATA.content;
      setHtmlSize(data.length);
      setContent(data);
      setPrevData(PREV_DATA);
      setTitle(PREV_DATA.title);
      setAllowComments(PREV_DATA.commentable);
    }
    editor = new Editor({
      el: document.querySelector("#editor"),
      previewStyle: "vertical",
      height: "500px",
      initialEditType: "wysiwyg",
      initialValue: data,
      language: "ko-KR",
      hideModeSwitch: true,
      autofocus: false,
      toolbarItems: [
        ["heading", "bold", "italic", "strike"],
        ["hr", "quote"],
        ["ul", "ol", "task"],
        ["table", "image", "link"],
      ],
      events: {
        change: editorHTMLChanged,
      },
      hooks: {
        addImageBlobHook: (blob, callback) => uploadImages(blob, callback),
      },
    });
    if (isMobile) editor.setHeight("300px");
  };
  useEffect(() => {
    effect();
  }, []);

  const uploadImages = (blob, callback) => {
    uploadImage(blob).then((res) => {
      callback(res.data);
    });
  };

  const titleInputChanged = (event) => {
    setTitle(event.target.value);
  };
  const editorHTMLChanged = () => {
    setContent(editor.getHTML());
    setHtmlSize(editor.getHTML().length);
    setExceed(editor.getHTML().length > MAX_HTML_SIZE);
  };
  const moveToListButtonClicked = () => {
    navigate(`/notice/`);
  };

  function moveToQuestionDetailPage() {
    navigate(`/notice/`);
  }

  function updateQuestionButtonClikced() {
    alert("수정됐습니다!");
    const data = {
      title: title,
      content: content,
      commentable: allowComments,
    };
    updateNotice(data, moveToQuestionDetailPage, noticeId);
  }

  function addQuestion() {
    alert("공지사항이 추가되었습니다!");

    const data = {
      title: title,
      content: content,
      commentable: allowComments,
    };
    createNotice(data, moveToListButtonClicked);
  }
  const validateTitle = () => {
    if (title.length < 1) {
      alert("제목을 작성해주세요!");
      return false;
    }
    if (title.length > 50) {
      alert("제목은 50자를 초과할 수 없습니다.");
      return false;
    }
    return true;
  };

  const editorActionButtonClicked = () => {
    if (!validateTitle()) return;
    if (!validateContent()) return;

    if (location.state.mode === ProductOptionModalMode.EDIT) {
      updateQuestionButtonClikced();
    } else {
      addQuestion();
    }
  };

  function validateContent() {
    if (contentValidator()) {
      alert("내용을 입력해주세요");
      return false;
    }
    return true;
  }

  function contentValidator() {
    let stack = [];
    let v = "";
    for (let i = 0; i < content.length; i++) {
      if (content.charAt(i) === "<") {
        stack.push(content.charAt(i));
      } else if (content.charAt(i) === ">") {
        stack = [];
      } else if (stack.length == 0) v = v + content.charAt(i);
    }
    return v.trim().length === 0;
  }

  const [allowComments, setAllowComments] = useState(false);

  const onChangeCheck = (checked) => {
    if (checked) {
      setAllowComments(true);
    } else if (!checked) {
      setAllowComments(false);
    }
  };

  return (
    <>
      <QuestionContainer>
        <QuestionEditorHeader>공지사항</QuestionEditorHeader>
        <QuestEditorTitleInput
          autoFocus
          value={title}
          type={"text"}
          placeholder={"제목을 입력해주세요"}
          onChange={titleInputChanged}
        />
        <HTMLEditor id={"editor"}></HTMLEditor>
        <HTMLSizeLimiter>
          <div>
            <CurrentHtmlSizeSpan isExeed={exceed}>
              {htmlSize}
            </CurrentHtmlSizeSpan>
            <span> / {MAX_HTML_SIZE}</span>
          </div>
        </HTMLSizeLimiter>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <label>
            <span style={{ width: "initial", marginRight: "10px" }}>
              댓글 작성 허용
            </span>
            <Input
              type="checkbox"
              onChange={(e) => {
                onChangeCheck(e.target.checked);
              }}
              style={{ width: "initial" }}
            />
          </label>
        </div>
        <QuestionPageButtonWrapper>
          <MoveToListButton onClick={moveToListButtonClicked}>
            뒤로가기
          </MoveToListButton>
          <QuestionPageButton onClick={editorActionButtonClicked}>
            {location.state.mode === ProductOptionModalMode.EDIT
              ? "수정하기"
              : "작성하기"}
          </QuestionPageButton>
        </QuestionPageButtonWrapper>
      </QuestionContainer>
    </>
  );
}
