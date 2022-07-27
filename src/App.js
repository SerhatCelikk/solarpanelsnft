import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import MintNFT from "./components/MintNFT";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage:
          "url(https://moderndiplomacy.eu/wp-content/uploads/2018/03/greenplanet.jpg)",
        backgroundSize: "contain",
      }}
    >
      <ConnectWallet></ConnectWallet>
      <MintNFT></MintNFT>
    </div>
  );
}

export default App;
