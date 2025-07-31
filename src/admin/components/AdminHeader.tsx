import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';

import adminHeaderstyles from './AdminHeader.module.css';

const AdminHeader = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  return (
    <header className={`flex ${adminHeaderstyles.header}`}>
        <h1>投稿管理</h1>
        <button onClick={handleLogout} className={adminHeaderstyles.logoutBtn}>ログアウト</button>
    </header>
  );
};

export default AdminHeader;
