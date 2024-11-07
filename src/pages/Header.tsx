import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { Link } from 'react-router-dom';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { LinkButton, Button } from '../common/buttons';

import logo from '../logo.svg';

function LeftActions() {
  return (
    <>
      <LinkButton to="/marketplace">Marketplace</LinkButton>
      {/* <LinkButton to="/trade">Trade</LinkButton> */}
    </>
  );
}

function NavActions() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(getAuth(), setUser);
  }, []);

  async function disconnect() {
    const auth = getAuth();
    console.log('sign out');

    await auth.signOut();
    localStorage.removeItem('family:connected:wallet');
  }

  if (!user) {
    return (
      <>
        {/* <LinkButton to="/store">Store</LinkButton> */}
        <LinkButton to="/login">Login</LinkButton>
      </>
    );
  }

  return (
    <>
      {/* <LinkButton to="/store">Store</LinkButton> */}
      <LinkButton to="/inventory/phygitals">Inventory</LinkButton>
      <Button onClick={disconnect}>
        <span className="sr-only">Sign Out</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      </Button>
    </>
  );
}

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto px-1 relative border-b">
            <div className="flex items-center justify-between h-16">
              <div className="hidden lg:block">
                <div className="ml-4 flex items-center">
                  <LeftActions />
                </div>
              </div>
              {/* <div className="grow"></div> */}
              <div className="flex items-center absolute left-1/2 -ml-[40px]">
                <Link to="/buy/honft" className="flex-shrink-0">
                  <img src={logo} alt="Family" />
                </Link>
              </div>
              <div className="grow"></div>
              <div className="hidden lg:block">
                <div className="ml-4 flex items-center lg:ml-6">
                  <NavActions />
                </div>
              </div>
              <div className="-mr-2 flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="rounded-full border p-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="pt-4 pb-3 h-screen">
              <div className="flex flex-col space-y-2">
                {/* <LeftActions/> */}
                <NavActions />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
