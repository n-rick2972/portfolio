// src/admin/pages/Login.tsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import adminStyles from './Admin.module.css';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const isAdmin = await checkIsAdmin(user.uid);

      if (isAdmin) {
        navigate('/admin/post');
      } else {
        setError('管理者権限がありません');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError('ログインに失敗しました');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      if (adminDoc.exists()) {
        navigate('/admin/post');
      } else {
        alert('管理者権限がありません');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert('Googleログインに失敗しました');
    }
  };

  const checkIsAdmin = async (uid: string) => {
    const adminDocRef = doc(db, 'admins', uid);
    const adminDoc = await getDoc(adminDocRef);
    return adminDoc.exists();
  };

  return (
    <div className={adminStyles.login}>
      <h1>管理画面ログイン</h1>
      <form onSubmit={handleLogin} className={adminStyles.form}>
        <label htmlFor="mail">メールアドレス</label>
        <input
          type="email"
          name='mail'
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="pass">パスワード</label>
        <input
          type="password"
          name='pass'
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={adminStyles.submit}>ログイン</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>または</p>
      <button type="button" onClick={handleGoogleLogin} className={adminStyles.gLogin}>
        Googleでログイン
      </button>
    </div>
  );
};

export default Login;
