import React from 'react';
import {
  PreviewEffectItemImage,
  PreviewEffectItemImageWrapper,
  PreviewEffectItemContainer,
  PreviewEffectItemName,
  PreviewEffectItemOption,
  PreviewEffectItemOptionContainer,
} from './PreviewEffectItem.styled.tsx';
import { PreviewEffect } from '../../../../types/ImageEditorSetting/client.ts';
import { useNavigate } from 'react-router-dom';
import { PATH_IMAGE_EDITOR_PREVIEW_DETAIL } from '../../../../constants/path.js';

interface PreviewEffectItemProps {
  item: PreviewEffect;
}

const PreviewEffectItem = (props: PreviewEffectItemProps) => {
  const navigate = useNavigate();

  return (
    <PreviewEffectItemContainer
      onClick={() => navigate(PATH_IMAGE_EDITOR_PREVIEW_DETAIL.replace(':effectId', props.item.id))}
    >
      <PreviewEffectItemImageWrapper>
        <PreviewEffectItemImage src={props.item.src} alt='미리보기 효과 이미지' />
      </PreviewEffectItemImageWrapper>
      <PreviewEffectItemOptionContainer>
        <PreviewEffectItemOption>Opacity</PreviewEffectItemOption>
        <PreviewEffectItemOption>{props.item.opacity ?? 100}%</PreviewEffectItemOption>
      </PreviewEffectItemOptionContainer>
      <PreviewEffectItemName>{props.item.name}</PreviewEffectItemName>
    </PreviewEffectItemContainer>
  );
};

export default PreviewEffectItem;
