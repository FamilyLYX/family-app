import luksoModule from '@lukso/web3-onboard-config';
import injectedMudule from '@web3-onboard/injected-wallets';
import { ConnectModalOptions } from '@web3-onboard/core/dist/types';

import { init as initWeb3Onboard } from '@web3-onboard/react';

import logo from '../logo.svg';

const lukso = luksoModule();

const injected = injectedMudule({
  custom: [lukso],
  sort: (wallets) => {
    const sorted = wallets.reduce<any[]>((sorted, wallet) => {
      if (wallet.label === 'Universal Profiles') {
        sorted.unshift(wallet);
      } else {
        sorted.push(wallet);
      }
      return sorted;
    }, []);
    return sorted;
  },
  displayUnavailable: ['Universal Profile'],
});

const wallets = [injected];

const chains = [
  {
    id: import.meta.env.VITE_CHAIN_ID,
    token: 'LYX',
    label: 'LUKSO',
    rpcUrl: import.meta.env.VITE_RPC_PROVIDER,
  },
];

const appMetadata = {
  name: 'FamilyLYX',
  icon: logo,
  logo: logo,
  description: 'FamilyLYX',
  recommendedInjectedWallets: [
    {
      name: 'Universal Profiles',
      url: 'https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en',
    },
  ],
};

const connect: ConnectModalOptions = {
  iDontHaveAWalletLink:
    'https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en',
  removeWhereIsMyWalletWarning: true,
  showSidebar: true,
  disableClose: false,
};

export function init() {
  return initWeb3Onboard({
    wallets,
    chains,
    appMetadata,
    connect,
    accountCenter: {
      desktop: {
        enabled: false,
        position: 'topRight',
        minimal: true,
      },
      mobile: {
        enabled: false,
        position: 'bottomRight',
      },
    },
  });
}
