import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [4],
  // supportedChainIds: [80001],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    // 80001: " https://rpc-mumbai.maticvigil.com",
  },
  qrcode: true,
});
