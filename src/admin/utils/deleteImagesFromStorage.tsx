import { getStorage, ref, deleteObject } from 'firebase/storage';

export const deleteImagesFromStorage = async (imagePaths: string[]) => {
  const storage = getStorage();

  const deletePromises = imagePaths.map((path) => {
    const decodedPath = decodeURIComponent(new URL(path).pathname.replace(/^\/v0\/b\/[^/]+\/o\//, '').replace(/%2F/g, '/'));
    const fileRef = ref(storage, decodedPath);
    return deleteObject(fileRef).catch((error) => {
      console.warn(`画像削除失敗: ${decodedPath}`, error);
    });
  });

  await Promise.all(deletePromises);
};
