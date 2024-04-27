import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import NiceModal from "@ebay/nice-modal-react";
// import { QueryClient, useQueryClient } from "@tanstack/react-query";

import Layout from "./pages/Layout";

import Inventory from "./pages/inventory";
import Store from "./pages/store";

import Phygitals from "./pages/inventory/phygitals";

import Orders from "./pages/inventory/orders";

import RegisterToken from "./pages/register";

import RegisterModal from "./common/RegisterModal";
import { Order } from "./pages/order";
import { Login } from "./pages/login";
import ListOnMarketplaceModal from "./common/ListOnMarketplaceModal";
import TransferModal from "./common/TransferModal";
import OrderModal from "./common/OrderModal";
import OrderScreen from "./common/OrderScreen";
import BuyItem from "./pages/buy";

NiceModal.register("family-buy-modal", OrderModal);
NiceModal.register("family-register-modal", RegisterModal);
NiceModal.register("family-marketplace-list", ListOnMarketplaceModal);
NiceModal.register('family-transfer-modal', TransferModal);
NiceModal.register("family-order-modal", OrderModal);

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
          <Route path='/buy/:item' element={<BuyItem />} />
          {/* <Route path="/trade" element={<Trade />} /> */}
          {/* <Route path="/escrowmoreinfo" element={<EscrowMoreinfo />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/product-card" element={<ProductCard />} /> */}
          {/* <Route path="/admin-xyz" element={<Admin />} /> */}
          <Route path="/inventory" element={<Inventory />}>
            <Route
              index={true}
              path="/inventory/phygitals"
              element={<Phygitals />}
            />
            {/* <Route path="/inventory/digitals" element={<Digitals />} /> */}
            <Route path="/inventory/orders" element={<Orders />} />
          </Route>
          <Route path="/mob-order" element={<OrderScreen />} />
        </Route>
      </>
    )
  );

export default function Router() {
  return <RouterProvider router={router()} />;
}
