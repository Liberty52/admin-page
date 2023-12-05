import axios from '../axios/axios';
import { ACCESS_TOKEN } from '../constants/token';

export const BlobContentTypes = [
  'TEXT_PAIN',
  'TEXT_RTF',
  'IMAGE_JPEG',
  'IMAGE_PNG',
  'IMAGE_GIF',
  'IMAGE_BMP',
  'IMAGE_TIFF',
  'APPLICATION_MSWORD',
  'APPLICATION_ZIP',
  'APPLICATION_PDF',
  'APPLICATION_X_ZIP',
  'APPLICATION_X_COMPRESSED',
  'AUDIO_MPEG',
] as const;

export type BlobContentType = (typeof BlobContentTypes)[number];

export const generatePresignedUrl = async (blobKey: string, contentType: BlobContentType) => {
  const res = await axios.get<string>('/admin/presigned-url', {
    headers: { Authorization: sessionStorage.getItem(ACCESS_TOKEN) },
    params: { blobKey, contentType },
  });
  return res.data;
};

export const uploadToPresignedUrl = async (
  url: string,
  file: any,
  contentType: BlobContentType,
) => {
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': toValueString(contentType),
    },
    body: file,
  });
  const _url = new URL(url);
  return _url.origin + _url.pathname;
};

const toValueString = (contentType: BlobContentType) => {
  switch (contentType) {
    case 'TEXT_PAIN':
      return 'text/plain';
    case 'TEXT_RTF':
      return 'text/rtf';
    case 'IMAGE_JPEG':
      return 'image/jpeg';
    case 'IMAGE_PNG':
      return 'image/png';
    case 'IMAGE_GIF':
      return 'image/gif';
    case 'IMAGE_BMP':
      return 'image/bmp';
    case 'IMAGE_TIFF':
      return 'image/tiff';
    case 'APPLICATION_MSWORD':
      return 'application/docx';
    case 'APPLICATION_ZIP':
      return 'application/zip';
    case 'APPLICATION_PDF':
      return 'application/pdf';
    case 'APPLICATION_X_ZIP':
      return 'application/x-zip';
    case 'APPLICATION_X_COMPRESSED':
      return 'application/x-compressed';
    case 'AUDIO_MPEG':
      return 'audio/mpeg';
  }
};
