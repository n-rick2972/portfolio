import { Outlet } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import AdminHeader from '../admin/components/AdminHeader';

const AdminLayout = () => {
  return (
    <>
      {/* 必要であればここに管理用ヘッダーやサイドバー */}
      <AdminHeader />
      <main className={styles.adminMain}>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
