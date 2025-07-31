// PrivateRoute.tsx
import { useEffect, useState, type JSX } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../Firebase/Firebase';

const ADMIN_UID = 'XKFbfWdjnCP7l49PQBIFolVRwxt2';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <div>読み込み中...</div>;
  if (user?.uid !== ADMIN_UID) return <Navigate to="/admin/login" />;

  return children;
};

export default PrivateRoute;
