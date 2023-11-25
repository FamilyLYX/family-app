import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import NiceModal from "@ebay/nice-modal-react";
// import { QueryClient, useQueryClient } from "@tanstack/react-query";

import Layout from "./pages/Layout";
import Marketplace from "./pages/marketplace";
import EscrowMoreinfo from "./pages/escrowmoreinfo";
import Inventory from "./pages/inventory";
import Store from "./pages/store";
import Trade from "./pages/trade";
import Phygitals from "./pages/inventory/phygitals";
import Digitals from "./pages/inventory/digitals";
import Orders from "./pages/inventory/orders";
import Admin from "./pages/admin/Admin";
import RegisterToken from "./pages/register";

import BuyModal from "./common/BuyModal";
import RegisterModal from "./common/RegisterModal";
import { Order } from "./pages/order";
import { Login } from "./pages/login";
import ListOnMarketplaceModal from "./common/ListOnMarketplaceModal";
import ProductCard from "./pages/ProductCard/ProductCard";

NiceModal.register("family-buy-modal", BuyModal);
NiceModal.register("family-register-modal", RegisterModal);
NiceModal.register("family-marketplace-list", ListOnMarketplaceModal);

const router = () =>
  createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/t/:uid" element={<RegisterToken />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Store />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders/:id" element={<Order />} />
          <Route path="/store" element={<Store />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/escrowmoreinfo" element={<EscrowMoreinfo />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route
            path="/marketplace/:collectionAddress/:tokenId"
            element={<ProductCard />}
          />
          <Route path="/product-card" element={<ProductCard />} />
          <Route path="/admin-xyz" element={<Admin />} />
          <Route path="/inventory" element={<Inventory />}>
            <Route
              index={true}
              path="/inventory/phygitals"
              element={<Phygitals />}
            />
            <Route path="/inventory/digitals" element={<Digitals />} />
            <Route path="/inventory/orders" element={<Orders />} />
          </Route>
        </Route>
      </>
    )
  );

export default function Router() {
  return <RouterProvider router={router()} />;
}
