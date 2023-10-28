import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import {
  CurrentHtmlSizeSpan,
  HTMLEditor,
  HTMLSizeLimiter,
} from "./styled/ProductIntroEditorComponent";
import { Editor } from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import {
  patchProductIntroduction,
  deleteProductIntroduction,
  uploadImage,
} from "../../axios/Product";
import { useParams } from "react-router-dom";

export default function ProductIntroEditor({ content, setContent }) {
  const { productId } = useParams();

  const MAX_HTML_SIZE = 10000;

  const [data, setData] = useState(content);
  const [htmlSize, setHtmlSize] = useState(0);
  const [exceed, setExceed] = useState(false);

  let editor;

  useEffect(() => {
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
  }, []);

  const uploadImages = (blob, callback) => {
    uploadImage(blob).then((res) => {
      callback(res.data);
    });
  };

  const editorHTMLChanged = () => {
    setData(editor.getHTML());
    setHtmlSize(editor.getHTML().length);
    setExceed(editor.getHTML().length > MAX_HTML_SIZE);
  };

  async function uploadProductIntroduction() {
    const response = await patchProductIntroduction(productId, data);
    if (response.status === 204) {
      alert("소개글 업로드 성공!");
      setContent(data);
    } else {
      alert(`[${response.status} ERROR] 소개글 업로드 실패.`);
    }
  }

  const deleteButtonClicked = () => {
    if (content === null || content === "") {
      alert("삭제할 내용이 없습니다");
      return;
    }
    if (!window.confirm("정말 기존의 소개글을 삭제하시겠습니까?")) {
      return;
    }
    removeProductIntroduction();
  };

  async function removeProductIntroduction() {
    const response = await deleteProductIntroduction(productId);
    if (response.status === 200) {
      alert("소개글 삭제 완료!");
      editor.setHTML("");
      setContent("");
    } else {
      alert(`[${response.status} ERROR] 소개글 삭제 실패.`);
    }
  }

  const uploadButtonClicked = () => {
    if (!validateContent()) return;
    uploadProductIntroduction();
  };

  function validateContent() {
    if (contentValidator(data)) {
      alert("내용을 입력해주세요");
      return false;
    }
    return true;
  }

  function contentValidator(content) {
    let stack = [];
    let v = "";
    for (let i = 0; i < content.length; i++) {
      if (content.charAt(i) === "<") {
        stack.push(content.charAt(i));
      } else if (content.charAt(i) === ">") {
        stack = [];
      } else if (stack.length === 0) v = v + content.charAt(i);
    }
    return v.trim().length === 0;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <Button
          type="button"
          sx={{ marginRight: 1, color: "black", borderColor: "black" }}
          variant="outlined"
          onClick={() => {
            // [TODO] 상품 소개 미리보기
            window.alert("구현되지 않은 기능입니다.");
            // window.open(
            //   "https://liberty52.com/order",
            //   "_blank",
            //   "noopener, noreferrer"
            // );
          }}
        >
          미리보기
        </Button>
        <Button
          sx={{ marginRight: 1, fontWeight: "bold" }}
          variant="outlined"
          onClick={uploadButtonClicked}
        >
          업로드
        </Button>
        <Button
          type="button"
          sx={{ marginRight: 1 }}
          color="error"
          variant="outlined"
          onClick={deleteButtonClicked}
        >
          삭제하기
        </Button>
      </div>
      <HTMLEditor id={"editor"}></HTMLEditor>
      <HTMLSizeLimiter>
        <div>
          <CurrentHtmlSizeSpan isExeed={exceed}>{htmlSize}</CurrentHtmlSizeSpan>
          <span> / {MAX_HTML_SIZE}</span>
        </div>
      </HTMLSizeLimiter>
    </div>
  );
}
