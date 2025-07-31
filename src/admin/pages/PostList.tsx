import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy,deleteDoc,doc } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';
import { deleteImagesFromStorage } from '../utils/deleteImagesFromStorage';
import type { Work } from '../../types';
import adminStyles from './Admin.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const PostList = () => {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    const fetchWorks = async () => {
      const q = query(collection(db, 'works'), orderBy('id', 'desc'));
      const snapshot = await getDocs(q);
      const worksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Work[];
      setWorks(worksData);
    };

    fetchWorks();
  }, []);

  const handleDelete = async (id: string, images: (string | File)[]) => {
    const confirmed = window.confirm('この投稿を本当に削除しますか？');
    if (!confirmed) return;

    try {
      // Firestore ドキュメント削除
      await deleteDoc(doc(db, 'works', id));

      // Cloud Storage 画像削除（File型でないstringのみ）
      const imagePaths = images.filter((img): img is string => typeof img === 'string');
      await deleteImagesFromStorage(imagePaths);

      // 表示から削除
      setWorks((prev) => prev.filter((work) => work.id !== id));
      alert('削除しました');
    } catch (error) {
      console.error('削除に失敗しました', error);
      alert('削除に失敗しました');
    }
  };


  return (
    <div className={adminStyles.wrapper}>
      <Link to="/admin/post/new" className={adminStyles.link}><FontAwesomeIcon icon={faPlus} /> 新規登録</Link>
      <h2 className={adminStyles.heading}>制作実績一覧</h2>
      <ul className={adminStyles.list}>
        {works.map((work) => (
          <li key={work.id} className={adminStyles.listItem}>
            <p>{work.title}</p>
            <div className={adminStyles.actionBtn}>
            <Link to={`/admin/post/edit/${work.slug}`}><FontAwesomeIcon icon={faPenToSquare} /> 編集</Link>
            <button onClick={() => handleDelete(work.id, work.images)}><FontAwesomeIcon icon={faTrashCan} /> 削除</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

};

export default PostList;
