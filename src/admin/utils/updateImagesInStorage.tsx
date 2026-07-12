import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '../../Firebase/Firebase';

type UpdateImagesResult = {
  updatedImages: string[];
  publicIds: string[];
};

export const updateImagesInStorage = async (
  newImages: Array<string | File | null>,
  oldImages: string[],
  oldPublicIds: string[],
  workId: string
): Promise<UpdateImagesResult> => {
  const updatedImages: string[] = [];
  const updatedPublicIds: string[] = [];

  for (const image of newImages) {
  if (!image) continue;

  if (typeof image === 'string') {
    const oldIndex = oldImages.indexOf(image);

    if (oldIndex === -1) continue;

    const storagePath = oldPublicIds[oldIndex];

    updatedImages.push(image);

    if (storagePath) {
      updatedPublicIds.push(storagePath);
    }

    continue;
  }

  const safeFileName = image.name
    .trim()
    .replace(/\s+/g, '-');

  const fileName = `${crypto.randomUUID()}_${safeFileName}`;
  const storagePath = `works/${workId}/${fileName}`;
  const imageRef = ref(storage, storagePath);

  await uploadBytes(imageRef, image);

  const downloadUrl = await getDownloadURL(imageRef);

  updatedImages.push(downloadUrl);
  updatedPublicIds.push(storagePath);
}

  /*
   * フォームから取り除かれた既存画像を削除
   */
  const removedPublicIds = oldImages
    .map((url, index) => ({
      url,
      storagePath: oldPublicIds[index],
    }))
    .filter(({ url }) => !updatedImages.includes(url))
    .map(({ storagePath }) => storagePath)
    .filter((storagePath): storagePath is string => Boolean(storagePath));

  const deleteResults = await Promise.allSettled(
    removedPublicIds.map((storagePath) =>
      deleteObject(ref(storage, storagePath))
    )
  );

  deleteResults.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.warn(
        `旧画像の削除に失敗しました: ${removedPublicIds[index]}`,
        result.reason
      );
    }
  });

  return {
    updatedImages,
    publicIds: updatedPublicIds,
  };
};
