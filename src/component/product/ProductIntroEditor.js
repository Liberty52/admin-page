import { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { CurrentHtmlSizeSpan, HTMLSizeLimiter } from './styled/ProductIntroEditorComponent';
import {
  patchProductIntroduction,
  deleteProductIntroduction,
  uploadImage,
} from '../../axios/Product';
import { useParams } from 'react-router-dom';

export default function ProductIntroEditor({ content, setContent }) {
  const { productId } = useParams();

  const MAX_HTML_SIZE = 10000;

  const [data, setData] = useState(TagToAngleBracket(removeParagraphTags(content)));
  const [htmlSize, setHtmlSize] = useState(0);
  const [exceed, setExceed] = useState(false);

  const editorRef = useRef();

  const uploadImages = (blob, callback) => {
    uploadImage(blob).then((res) => {
      callback(res.data);
    });
  };

  const editorHTMLChanged = () => {
    const html = editorRef?.current.getInstance().getHTML();
    setData(html);
    setHtmlSize(html.length);
    setExceed(html.length > MAX_HTML_SIZE);
  };

  async function uploadProductIntroduction() {
    const response = await patchProductIntroduction(productId, data);
    if (response.status === 204) {
      alert('소개글 업로드 성공!');
      setContent(data);
    } else {
      alert(`[${response.status} ERROR] 소개글 업로드 실패.`);
    }
  }

  const deleteButtonClicked = () => {
    if (content === null || content === '') {
      alert('삭제할 내용이 없습니다');
      return;
    }
    if (!window.confirm('정말 기존의 소개글을 삭제하시겠습니까?')) {
      return;
    }
    removeProductIntroduction();
  };

  async function removeProductIntroduction() {
    const response = await deleteProductIntroduction(productId);
    if (response.status === 200) {
      alert('소개글 삭제 완료!');
      editorRef?.current.getInstance().setHTML('');
      setContent('');
    } else {
      alert(`[${response.status} ERROR] 소개글 삭제 실패.`);
    }
  }

  const uploadButtonClicked = () => {
    if (!validateContent()) return;
    uploadProductIntroduction();
  };

  const onPreviewButtonClicked = () => {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`<div style='text-align: center;'>${angleBracketToTag(data)}</div>`);
    newWindow.document.close();
  };

  function validateContent() {
    if (contentValidator(data)) {
      alert('내용을 입력해주세요');
      return false;
    }
    return true;
  }

  function contentValidator(content) {
    let stack = [];
    let v = '';
    for (let i = 0; i < content.length; i++) {
      if (content.charAt(i) === '<') {
        stack.push(content.charAt(i));
      } else if (content.charAt(i) === '>') {
        stack = [];
      } else if (stack.length === 0) v = v + content.charAt(i);
    }
    return v.trim().length === 0;
  }

  function removeParagraphTags(str) {
    return str.slice(3, -4);
  }

  function angleBracketToTag(str) {
    return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  }

  function TagToAngleBracket(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 10,
        }}
      >
        <Button
          type='button'
          sx={{ marginRight: 1, color: 'black', borderColor: 'black' }}
          variant='outlined'
          onClick={onPreviewButtonClicked}
        >
          미리보기
        </Button>
        <Button
          sx={{ marginRight: 1, fontWeight: 'bold' }}
          variant='outlined'
          onClick={uploadButtonClicked}
        >
          업로드
        </Button>
        <Button
          type='button'
          sx={{ marginRight: 1 }}
          color='error'
          variant='outlined'
          onClick={deleteButtonClicked}
        >
          삭제하기
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue={data}
        previewStyle='vertical'
        height='500px'
        initialEditType='wysiwyg'
        useCommandShortcut={true}
        language='ko-KR'
        hideModeSwitch={true}
        autofocus={false}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['table', 'image', 'link'],
        ]}
        onChange={editorHTMLChanged}
        hooks={{ addImageBlobHook: uploadImages }}
      />
      <HTMLSizeLimiter>
        <div>
          <CurrentHtmlSizeSpan isExeed={exceed}>{htmlSize}</CurrentHtmlSizeSpan>
          <span> / {MAX_HTML_SIZE}</span>
        </div>
      </HTMLSizeLimiter>
    </div>
  );
}
