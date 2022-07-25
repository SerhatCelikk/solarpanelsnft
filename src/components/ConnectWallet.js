import { ethers } from "ethers";
import { useState } from "react";

function ConnectWallet() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  function connect() {
    if (!window.ethereum) alert("Metamask is not installed");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => setAccount(accounts[0]))
      .catch((err) => console.log(err));
    const signer = provider.getSigner();
    signer.getAddress().then((address) => setAddress(address));
  }
  

  return (
    <div  style={{background:"#FFCA2C",padding: "25px 0",
        textAlign: "center",marginTop:"-20px",marginBottom:"-25px"}}>{account ? <p className="btn btn-primary btn-lg active" style={{marginTop:"10px",fontSize:"20px",marginLeft:"750px"}}>Connected with: {address}</p>: <button className="btn btn-primary btn-lg active"  style={{marginTop:"10px",marginBottom:"10px",fontSize:"20px",marginLeft:"750px"}} onClick={connect}>{account ? "Connected" : "Connect"} </button> }
      
    </div>
  );
}
export default ConnectWallet;
