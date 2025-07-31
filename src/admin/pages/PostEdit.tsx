import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';

import PostForm from '../components/PostForm';
import type { FormData } from '../../types';
import adminStyles from './Admin.module.css';

import { updateImagesInStorage } from '../utils/updateImagesInStorage';

const PostEdit = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const defaultFormData: FormData = {
  title: '',
  slug: '',
  client: '',
  url: '',
  url_text: '',
  description: '',
  categories: [],
  images: [],
  publicIds: []
};
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [docId, setDocId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalImages, setOriginalImages] = useState<(string | File)[]>([]);

  // 編集対象の投稿を取得
  useEffect(() => {
    const fetchData = async () => {
  // slugからdocIdを検索
  const slugQuery = query(
    collection(db, 'works'),
    where('slug', '==', slug)
  );
  const querySnapshot = await getDocs(slugQuery);

  if (querySnapshot.empty) {
    console.warn('指定された投稿が見つかりません');
    navigate('/admin/post');
    return;
  }

  const docSnap = querySnapshot.docs[0];
  const data = docSnap.data() as FormData;

  setFormData(data);
  setOriginalImages(data.images.filter((img): img is string | File => img !== undefined));
  setDocId(docSnap.id);
};

    if (slug) fetchData();
  }, [slug, navigate]);

  // 入力変更時
  const handleChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 画像削除時
  const handleRemoveImage = (index: number) => {
    const updated = [...formData.images];
    updated[index] = undefined;
    handleChange('images', updated);
  };


  // 登録処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // スラッグの一意性チェック
      if (formData.slug !== slug) {
        const slugQuery = query(collection(db, 'works'), where('slug', '==', formData.slug));
        const querySnapshot = await getDocs(slugQuery);
        if (!querySnapshot.empty) {
          alert('このスラッグはすでに使用されています。別のスラッグを入力してください。');
          setIsSubmitting(false);
          return;
        }
      }

      // File → URL に変換する処理（アップロード）
      const cleanedImages = formData.images.filter((img): img is string | File => img !== undefined);
      const onlyUrls = originalImages.filter((img): img is string => typeof img === 'string');

      const { updatedImages, publicIds, } = await updateImagesInStorage(cleanedImages, onlyUrls);

      const updatedData = {
        ...formData,
        images: updatedImages,publicIds,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(doc(db, 'works', docId), updatedData);
      navigate('/admin/post');
    } catch (error) {
      console.error('更新に失敗しました', error);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <>
      <h2 className={adminStyles.heading}>投稿を編集</h2>
      <PostForm
        formData={formData}
        onChange={handleChange}
        onRemoveImage={handleRemoveImage}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default PostEdit;
