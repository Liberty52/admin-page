import styled from 'styled-components';

const PreviewContainer = styled.div`
  width: 50%;
  border: 1px solid #dadde6;
  height: 500px;
`;

const PreviewTitle = styled.div`
  display: flex;
  align-items: center;
  height: 45.67px;
  padding: 0 25px;
  background-color: #f7f9fc;
  border: 1px solid #ebedf2;
`;

const PreviewContent = styled.div`
  padding: 18px 25px;
  text-align: center;
  overflow: auto;
  height: 417.33px;

  > p {
    margin: 0;
    line-height: 160%;
  }

  img {
    width: 594px;
    overflow: hidden;
  }
`;

const EditorPreview = ({ previewRef }) => {
  return (
    <PreviewContainer>
      <PreviewTitle>
        <strong>Preview</strong>
      </PreviewTitle>
      <PreviewContent ref={previewRef}></PreviewContent>
    </PreviewContainer>
  );
};

export default EditorPreview;
