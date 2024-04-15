import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

import Footer from "./Footer";

export default function Layout () {
  const loc = useLocation();
  const isLandingPage = loc.pathname === '/';
  

  return <div className="min-h-[100vh] relative">
    { !isLandingPage && <Header /> }
    <Outlet />
    {/* <Footer /> */}
  </div>
}