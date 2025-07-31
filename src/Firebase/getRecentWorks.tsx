// Firebase/getRecentWorks.ts
import { db } from './Firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import type { Work } from '../types';

export const getRecentWorks = async (): Promise<Work[]> => {
  const q = query(
    collection(db, 'works'),
    orderBy('id', 'desc'), // idの降順
    limit(6)               // 最大6件まで
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Work));
};
