import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db } from '../../Firebase/Firebase';
import type { FormData } from '../../types';

import PostForm from '../components/PostForm';
import { updateImagesInStorage } from '../utils/updateImagesInStorage';

import adminStyles from './Admin.module.css';

const defaultFormData: FormData = {
  title: '',
  slug: '',
  client: '',
  description: '',
  url: '',
  url_text: '',
  categories: [],
  images: [null, null, null, null, null],
  publicIds: [null, null, null, null, null],
};

const PostEdit = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<FormData>(defaultFormData);

  const [docId, setDocId] = useState('');
  const [originalImages, setOriginalImages] =
    useState<string[]>([]);
  const [originalPublicIds, setOriginalPublicIds] =
    useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!slug) {
      navigate('/admin/post', { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        const slugQuery = query(
          collection(db, 'works'),
          where('slug', '==', slug)
        );

        const querySnapshot = await getDocs(slugQuery);

        if (querySnapshot.empty) {
          alert('指定された投稿が見つかりません。');
          navigate('/admin/post', { replace: true });
          return;
        }

        const document = querySnapshot.docs[0];
        const data = document.data();

        const images = Array.isArray(data.images)
          ? (data.images as string[])
          : [];

        const publicIds = Array.isArray(data.publicIds)
          ? (data.publicIds as string[])
          : [];

        const imageSlots: Array<string | File | null> = [
          ...images,
          ...Array(Math.max(0, 5 - images.length)).fill(null),
        ].slice(0, 5);

        const publicIdSlots: Array<string | null> = [
          ...publicIds,
          ...Array(Math.max(0, 5 - publicIds.length)).fill(null),
        ].slice(0, 5);

        setFormData({
          title: data.title ?? '',
          slug: data.slug ?? '',
          client: data.client ?? '',
          url: data.url ?? '',
          url_text: data.url_text ?? '',
          description: data.description ?? '',
          categories: Array.isArray(data.categories)
            ? data.categories
            : [],
          images: imageSlots,
          publicIds: publicIdSlots,
        });

        setOriginalImages(images);
        setOriginalPublicIds(publicIds);

      } catch (error) {
        console.error('投稿データ取得エラー:', error);
        alert('投稿データの取得に失敗しました。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug, navigate]);

  const handleChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index] = null;

      return {
        ...prev,
        images: updatedImages,
      };
    });
  };

  const isSlugDuplicated = async (
    targetSlug: string
  ): Promise<boolean> => {
    const slugQuery = query(
      collection(db, 'works'),
      where('slug', '==', targetSlug)
    );

    const querySnapshot = await getDocs(slugQuery);

    return querySnapshot.docs.some(
      (document) => document.id !== docId
    );
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!docId || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const normalizedSlug = formData.slug.trim();

      if (!normalizedSlug) {
        alert('スラッグを入力してください。');
        return;
      }

      const duplicated =
        await isSlugDuplicated(normalizedSlug);

      if (duplicated) {
        alert(
          'このスラッグはすでに使用されています。'
        );
        return;
      }

      const { updatedImages, publicIds } =
        await updateImagesInStorage(
          formData.images,
          originalImages,
          originalPublicIds,
          docId
        );

      await updateDoc(doc(db, 'works', docId), {
        title: formData.title.trim(),
        slug: normalizedSlug,
        client: formData.client.trim(),
        url: formData.url.trim(),
        url_text: formData.url_text.trim(),
        description: formData.description,
        categories: formData.categories,
        images: updatedImages,
        publicIds,
        updatedAt: serverTimestamp(),
      });

      alert('更新が完了しました。');
      navigate('/admin/post');
    } catch (error) {
      console.error('更新に失敗しました:', error);
      alert('更新に失敗しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  return (
    <>
      <h2 className={adminStyles.heading}>
        投稿を編集
      </h2>

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