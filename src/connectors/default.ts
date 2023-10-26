import { initializeConnector } from "@web3-react/core";
import { EIP1193 } from "@web3-react/eip1193";

const EMPTY_HOOKS = {
  useAccount: () => null
};

export const [metaMask, hooks] = window.ethereum ? initializeConnector<EIP1193>(
  (actions) => new EIP1193({ actions, provider: window.ethereum })
) : [null, EMPTY_HOOKS];
