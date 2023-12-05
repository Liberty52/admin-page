import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainContainer } from '../../../../component/common/MainComponent';
import SideNav from '../../../../component/common/side-nav/SideNav';
import {
  ContentMain,
  EffectDetailImageWrapper,
  EffectDetailInput,
  EffectDetailInputContainer,
  EffectDetailLabel,
  EffectDetailImage,
  EffectDetailRow,
  EffectDetailTitle,
  EffectDetailEditButton,
  EffectDetailButtonContainer,
  EffectDetailDeleteButton,
  EffectDetailImageAddButton,
  EffectDetailProgress,
} from './page.styled.tsx';
import {
  deletePreviewEffect,
  getPreviewEffectDetail,
  putPreviewEffect,
} from '../../../../api/ImageEditorSetting/PreviewEffect/index.ts';
import { generatePresignedUrl, uploadToPresignedUrl } from '../../../../api/PresignedUrl.ts';
import { PATH_IMAGE_EDITOR } from '../../../../constants/path.js';

interface Event<T = EventTarget> {
  target: T;
}

const PreviewEffectDetail = () => {
  const { effectId } = useParams();
  const [src, updateSrc] = useState('로딩중');
  const [opacity, updateOpacity] = useState(-1);
  const [name, updateName] = useState('로딩중');
  const navigate = useNavigate();

  useEffect(() => {
    if (effectId === 'new') {
      updateSrc('');
      updateOpacity(100);
      updateName('');
      return;
    }
    getPreviewEffectDetail(effectId!).then((data) => {
      updateSrc(data.src);
      updateOpacity(data.opacity ?? 100);
      updateName(data.name);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const putEffect = async () => {
    await putPreviewEffect({
      id: effectId === 'new' ? crypto.randomUUID() : effectId!,
      name,
      src,
      opacity,
    });
    navigate(PATH_IMAGE_EDITOR);
  };

  const deleteEffect = async () => {
    await deletePreviewEffect(effectId!);
    navigate(PATH_IMAGE_EDITOR);
  };

  return (
    <MainContainer>
      <SideNav />
      <ContentMain>
        <EffectDetailTitle>미리보기 효과</EffectDetailTitle>
        <EffectDetailInputContainer>
          <EffectDetailButtonContainer>
            <EffectDetailEditButton onClick={putEffect}>
              {effectId === 'new' ? '추가' : '수정'}
            </EffectDetailEditButton>
            {effectId !== 'new' && (
              <EffectDetailDeleteButton onClick={deleteEffect}>삭제</EffectDetailDeleteButton>
            )}
          </EffectDetailButtonContainer>
          <EffectDetailRow>
            <EffectDetailLabel>Name</EffectDetailLabel>
            <EffectDetailInput value={name} onChange={(v) => updateName(() => v.target.value)} />
          </EffectDetailRow>
          <EffectDetailRow>
            <EffectDetailLabel>Opacity</EffectDetailLabel>
            <EffectDetailInput
              type='number'
              value={opacity}
              onChange={(v) => updateOpacity(() => +v.target.value)}
            />
          </EffectDetailRow>
          <ImageRow src={src} onFileUploaded={(src) => updateSrc(src)} />
        </EffectDetailInputContainer>
      </ContentMain>
    </MainContainer>
  );
};

interface ImageRowProps {
  src: string;
  onFileUploaded: (src: string) => void;
}

const ImageRow = (props: ImageRowProps) => {
  const { src, onFileUploaded } = props;
  const imageFile = useRef<HTMLInputElement | null>(null);
  const [loading, updateLoading] = useState(false);

  const replaceImageSrc = (event: Event<HTMLInputElement>) => {
    const file = event.target.files!.item(0)!;
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      updateLoading(true);
      const fullUrl = await generatePresignedUrl(
        `image-editor/preview-effects/${crypto.randomUUID()}`,
        'IMAGE_PNG',
      );
      const url = await uploadToPresignedUrl(fullUrl, file, 'IMAGE_PNG');
      onFileUploaded(url);
      updateLoading(false);
    };
  };

  return (
    <EffectDetailRow>
      <EffectDetailLabel>Image</EffectDetailLabel>
      <EffectDetailImageWrapper onClick={() => imageFile.current?.click()}>
        <input type='file' ref={imageFile} hidden onChange={replaceImageSrc} />
        {loading ? (
          <EffectDetailProgress />
        ) : src === '' ? (
          <EffectDetailButtonContainer>
            <EffectDetailImageAddButton>불러오기</EffectDetailImageAddButton>
          </EffectDetailButtonContainer>
        ) : (
          <EffectDetailImage src={src} alt='미리보기 효과 이미지' />
        )}
      </EffectDetailImageWrapper>
    </EffectDetailRow>
  );
};

export default PreviewEffectDetail;
