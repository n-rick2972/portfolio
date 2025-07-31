import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../Firebase/Firebase';

export const updateImagesInStorage = async (
  newImages: (string | File)[],
  oldUrls: string[]
): Promise<{ updatedImages: string[]; publicIds: string[] }> => {
  const uploadedUrls: string[] = [];
  const publicIds: string[] = [];

  for (const img of newImages) {
    if (typeof img === 'string') {
      uploadedUrls.push(img);
      publicIds.push(extractFileName(img));
    } else {
      const fileName = `${Date.now()}_${img.name}`;
      const fileRef = ref(storage, fileName);
      await uploadBytes(fileRef, img);
      const url = await getDownloadURL(fileRef);
      uploadedUrls.push(url);
      publicIds.push(fileName);
    }
  }

  // 不要画像を削除（任意）
  const unusedOldUrls = oldUrls.filter((url) => !uploadedUrls.includes(url));
  for (const url of unusedOldUrls) {
    try {
      const decodedPath = decodeURIComponent(new URL(url).pathname.split('/o/')[1]);
      const fileRef = ref(storage, decodedPath);
      await deleteObject(fileRef);
    } catch (e) {
      console.warn('画像削除に失敗しました:', e);
    }
  }

  return { updatedImages: uploadedUrls, publicIds };
};

// 画像URLからファイル名を抽出（?alt=media など除去）
const extractFileName = (url: string): string => {
  return url.split('?')[0].split('/').pop() ?? '';
};
