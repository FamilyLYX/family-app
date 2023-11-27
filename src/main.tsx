// import './polyfill.ts';

import React from 'react'
import ReactDOM from 'react-dom/client'

import NiceModal from '@ebay/nice-modal-react';

import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast';

import App from './App.tsx'
import './index.css';

// Import Swiper styles
import 'swiper/css';
import UserProvider from './contexts/UserContext.tsx';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getFirestore(app);

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position='bottom-right' />
        <NiceModal.Provider>
          <ReactQueryDevtools initialIsOpen={false} />
          <App />
        </NiceModal.Provider>
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>
)
