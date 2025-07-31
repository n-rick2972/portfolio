import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './Firebase';
import type { Work } from '../types/';

export const getWorkBySlug = async (slug: string): Promise<Work | null> => {
  const q = query(collection(db, 'works'), where('slug', '==', slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return {
    ...(doc.data() as Work)
  };
};