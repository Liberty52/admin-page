import axios from '../../../axios/axios';
import { ACCESS_TOKEN } from '../../../constants/token';
import { PreviewEffect } from '../../../types/ImageEditorSetting/client';
import { PreviewEffectResponse } from '../../../types/ImageEditorSetting/remote';

export const getAllPreviewEffectImages = async () => {
  const res = await axios.get('/product/image-editor/preview-effects');
  return res.data as PreviewEffectResponse[];
};
export const getPreviewEffectDetail = async (id: string) => {
  const list = await getAllPreviewEffectImages();
  return list.find((e) => e.id === id)!;
};

export const putPreviewEffect = async (previewEffect: PreviewEffect) => {
  await axios.put('/admin/image-editor/preview-effects', previewEffect, {
    headers: { Authorization: sessionStorage.getItem(ACCESS_TOKEN) },
  });
};

export const deletePreviewEffect = async (id: string) => {
  await axios.delete(`/admin/image-editor/preview-effects/${id}`, {
    headers: { Authorization: sessionStorage.getItem(ACCESS_TOKEN) },
  });
};
