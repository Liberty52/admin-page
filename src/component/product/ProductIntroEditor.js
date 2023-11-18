import { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { CurrentHtmlSizeSpan, HTMLSizeLimiter } from './styled/ProductIntroEditorComponent';
import {
  patchProductIntroduction,
  deleteProductIntroduction,
  uploadImage,
} from '../../axios/Product';
import EditorPreview from './EditorPreview';
import { useParams } from 'react-router-dom';

export default function ProductIntroEditor({ content, setContent }) {
  const { productId } = useParams();

  const MAX_HTML_SIZE = 10000;
  const [htmlSize, setHtmlSize] = useState(0);
  const [exceed, setExceed] = useState(false);

  const editorRef = useRef();
  const previewRef = useRef();

  useEffect(() => {
    if (previewRef.current) previewRef.current.innerHTML = content;
  }, [content]);

  const uploadImages = (blob, callback) => {
    uploadImage(blob).then((res) => {
      callback(res.data);
    });
  };

  const editorHTMLChanged = () => {
    const html = angleBracketToTag(editorRef?.current.getInstance().getHTML());
    setContent(html);
    setHtmlSize(html.length);
    setExceed(html.length > MAX_HTML_SIZE);
  };

  async function uploadProductIntroduction() {
    const response = await patchProductIntroduction(productId, content);
    if (response.status === 204) {
      alert('소개글 업로드 성공!');
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

  function validateContent() {
    if (contentValidator(content)) {
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

  function angleBracketToTag(str) {
    return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  }

  function TagToAngleBracket(str) {
    // '<p>', '</p>', '<br>'에 포함된 '<'와 '>'를 제외한 모든 '<'와 '>'를 ''로 대체
    const retVal = str.replace(/<(\/?p|br)[^>]*>|<|>/g, (match) => {
      if (match === '<') {
        return '&lt;'; // '<'와 '>'를 빈 문자열로 대체
      } else if (match === '>') {
        return '&gt;';
      } else {
        return match; // '<p>', '</p>', '<br>'에 포함된 '<'와 '>'는 그대로 유지
      }
    });
    return retVal;
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
      <div style={{ display: 'flex' }}>
        {content !== undefined && (
          <>
            <Editor
              ref={editorRef}
              initialValue={TagToAngleBracket(content)}
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
          </>
        )}
        <EditorPreview previewRef={previewRef} />
      </div>
      <HTMLSizeLimiter>
        <div>
          <CurrentHtmlSizeSpan isExeed={exceed}>{htmlSize}</CurrentHtmlSizeSpan>
          <span> / {MAX_HTML_SIZE}</span>
        </div>
      </HTMLSizeLimiter>
    </div>
  );
}
