import React, { useEffect, useState } from "react";
import { getWallets } from "@massalabs/wallet-provider";

function App() {
  const [wallet, setWallet] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const connect = async () => {
      const wallets = await getWallets();
      if (wallets.length === 0) {
        alert("No Massa wallet found");
        return;
      }
      const connected = await wallets[0].connect();
      const accounts = await connected.accounts();
      setWallet(connected);
      setAddress(accounts[0].address());
    };
    connect();
  }, []);

  return (
    <div>
      <h1>Rebalancio</h1>
      {address ? <p>Connected: {address}</p> : <p>Connecting...</p>}
    </div>
  );
}

export default App;
