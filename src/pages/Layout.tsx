import { Outlet } from "react-router-dom";
import Header from "./Header";

import Footer from "./Footer";

export default function Layout () {
  return <div className="min-h-[100vh] relative">
    <Header />
    <div className="pb-8">
    <Outlet />
    </div>
    <Footer />
  </div>
}