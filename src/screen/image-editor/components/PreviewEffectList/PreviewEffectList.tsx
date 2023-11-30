import React, { useEffect, useState } from 'react';
import { getAllPreviewEffectImages } from '../../../../api/ImageEditorSetting/PreviewEffect/index.ts';
import { PreviewEffectListContainer } from './PreviewEffectList.styled.tsx';
import PreviewEffectItem from '../PreviewEffectItem/PreviewEffectItem.tsx';
import { PreviewEffect } from '../../../../types/ImageEditorSetting/client.ts';
import AddPreviewEffectItemCard from '../PreviewEffectItem/AddPreviewEffectItemCard.tsx';

const PreviewEffectList = () => {
  const [effects, updateEffects] = useState<PreviewEffect[]>([]);

  useEffect(() => {
    (async () => {
      const list = await getAllPreviewEffectImages();
      updateEffects([...list]);
    })();
  }, []);

  return (
    <PreviewEffectListContainer>
      {effects.map((e) => (
        <PreviewEffectItem key={e.id} item={e} />
      ))}
      {<AddPreviewEffectItemCard />}
    </PreviewEffectListContainer>
  );
};

export default PreviewEffectList;
