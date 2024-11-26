import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import NiceModal from '@ebay/nice-modal-react';
// import { QueryClient, useQueryClient } from "@tanstack/react-query";

import Layout from './pages/Layout';

import Inventory from './pages/inventory';
import Store from './pages/store';

import Phygitals from './pages/inventory/phygitals';

import Orders from './pages/inventory/orders';

import RegisterToken from './pages/register';

import RegisterModal from './common/RegisterModal';
import { Order } from './pages/order';
import { Login } from './pages/login';
import ListOnMarketplaceModal from './common/ListOnMarketplaceModal';
import TransferModal from './common/TransferModal';
import OrderModal from './common/OrderModal';
import OrderScreen from './common/OrderScreen';
import BuyItem from './pages/buy';
import TermCondition from './pages/TermCondition';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Trade from './pages/trade';
import EscrowMoreInfo from './pages/escrowmoreinfo';
import Marketplace from './pages/marketplace';
import ProductCard from './pages/ProductCard/ProductCard';
import Digitals from './pages/inventory/digitals';
import ListDigitalModal from './common/ListDigital';
import Admin from './pages/admin/Admin';
// import ProductCard from './pages/ProductCard/ProductCard';

NiceModal.register('family-buy-modal', OrderModal);
NiceModal.register('family-register-modal', RegisterModal);
NiceModal.register('family-marketplace-list', ListOnMarketplaceModal);
NiceModal.register('family-marketplace-list-digital', ListDigitalModal);
NiceModal.register('family-transfer-modal', TransferModal);
NiceModal.register('family-order-modal', OrderModal);

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
          <Route path="/buy/:item" element={<BuyItem />} />
          <Route path="/terms" element={<TermCondition />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/trade/:id" element={<EscrowMoreInfo />} />
          {/* <Route path="/escrowmoreinfo" element={<EscrowMoreInfo />} /> */}
          <Route path="/marketplace" element={<Marketplace />} />
          <Route
            path="/marketplace/:collectionAddress/:tokenId"
            element={<ProductCard />}
          />
          {/* <Route path="/product-card" element={<ProductCard />} /> */}
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
          <Route path="/mob-order" element={<OrderScreen />} />
        </Route>
      </>
    )
  );

export default function Router() {
  return <RouterProvider router={router()} />;
}
