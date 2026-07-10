import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../../Firebase/Firebase';

export const deleteImagesFromStorage = async (
  storagePaths: string[]
): Promise<void> => {
  const results = await Promise.allSettled(
    storagePaths.map((storagePath) => {
      const imageRef = ref(storage, storagePath);
      return deleteObject(imageRef);
    })
  );

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.warn(
        `画像削除に失敗しました: ${storagePaths[index]}`,
        result.reason
      );
    }
  });
};