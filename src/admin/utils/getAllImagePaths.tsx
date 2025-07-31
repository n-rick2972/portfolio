// src/admin/utils/getAllImagePaths.ts
import { getStorage, ref, listAll } from "firebase/storage";

export const getAllImagePaths = async (): Promise<string[]> => {
  const storage = getStorage();
  const listRef = ref(storage, "/");

  try {
    const res = await listAll(listRef);
    const paths = res.items.map((itemRef) => itemRef.fullPath);
    return paths;
  } catch (error) {
    console.error("画像一覧の取得に失敗しました", error);
    return [];
  }
};
