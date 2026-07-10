// src/pages/admin/PostNew.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../Firebase/Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  setDoc
} from 'firebase/firestore';
import type { FormData } from '../../types';
import adminStyles from './Admin.module.css';
import PostForm from '../components/PostForm';


const PostNew = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    client: '',
    description: '',
    url: '',
    url_text: '',
    categories: [],
    images: [],
    publicIds: []
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const worksRef = collection(db, 'works');
      const q = query(worksRef, orderBy('id', 'desc'), limit(1));
      const snapshot = await getDocs(q);

      let newId = 1;

      if (!snapshot.empty) {
        const maxId = Number.parseInt(snapshot.docs[0].data().id, 10);

        if (!Number.isNaN(maxId)) {
          newId = maxId + 1;
        }
      }

      const paddedId = String(newId).padStart(3, '0');
      const generatedSlug = `works${paddedId}`;

      const uploadedUrls: string[] = [];
      const publicIds: string[] = [];

      for (const file of formData.images) {
        if (!(file instanceof File)) continue;

        const safeFileName = file.name
          .trim()
          .replace(/\s+/g, '-');

        const fileName = `${crypto.randomUUID()}_${safeFileName}`;
        const storagePath = `works/${paddedId}/${fileName}`;
        const fileRef = ref(storage, storagePath);

        await uploadBytes(fileRef, file);

        const url = await getDownloadURL(fileRef);

        uploadedUrls.push(url);
        publicIds.push(storagePath);
      }

      await setDoc(doc(db, 'works', paddedId), {
        id: paddedId,
        slug: generatedSlug,
        title: formData.title,
        client: formData.client,
        description: formData.description,
        url: formData.url,
        url_text: formData.url_text,
        categories: formData.categories,
        images: uploadedUrls,
        publicIds,
      });

      alert('登録が完了しました');
      navigate('/admin/post');
    } catch (error) {
      console.error('登録エラー:', error);
      alert('登録に失敗しました');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const generateInitialSlug = async () => {
      const worksRef = collection(db, 'works');
      const q = query(worksRef, orderBy('id', 'desc'), limit(1));
      const snapshot = await getDocs(q);

      let newId = 1;
      if (!snapshot.empty) {
        const maxId = parseInt(snapshot.docs[0].data().id, 10);
        newId = maxId + 1;
      }

      const paddedId = String(newId).padStart(3, '0');
      const generatedSlug = `works-${paddedId}`;

      setFormData((prev) => ({
        ...prev,
        slug: generatedSlug,
      }));
    };

    generateInitialSlug();
  }, []);


  return (
    <div className="admin-wrapper">
      <h2 className={adminStyles.heading}>新規登録</h2>
      <PostForm
        formData={formData}
        onChange={handleChange}
        onRemoveImage={handleRemoveImage}
        onSubmit={handleSubmit}
        isSubmitting={uploading}
      />
    </div>
  );
};

export default PostNew;
