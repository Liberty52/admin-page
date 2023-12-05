import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_IMAGE_EDITOR_PREVIEW_DETAIL } from '../../../../constants/path';
import {
  AddPreviewEffectItemContainer,
  AddPreviewEffectItemPlus,
} from './AddPreviewEffectItemCard.styled.tsx';

const AddPreviewEffectItemCard = () => {
  const navigate = useNavigate();

  return (
    <AddPreviewEffectItemContainer
      onClick={() => navigate(PATH_IMAGE_EDITOR_PREVIEW_DETAIL.replace(':effectId', 'new'))}
    >
      <AddPreviewEffectItemPlus>+</AddPreviewEffectItemPlus>
    </AddPreviewEffectItemContainer>
  );
};

export default AddPreviewEffectItemCard;
