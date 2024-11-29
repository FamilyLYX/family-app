import { Outlet } from 'react-router-dom';
// import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-[100vh] relative">
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}
