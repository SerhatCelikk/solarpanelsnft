import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { NFT_ABI } from "../constants/abi";
import { NFT_ADDRESS } from "../constants/addresses";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import defaultItems from "./items.json";

function MintNFT() {
  const [signer, setSigner] = useState("");
  const [provider, setProvider] = useState("");
  const [items, setItems] = useState(defaultItems);

  const [NftContract, setNftContract] = useState(null);

  useEffect(() => {
    const _provider = new ethers.providers.Web3Provider(window.ethereum);
    const _signer = _provider.getSigner();
    setSigner(_signer);
    setProvider(_provider);
    const _NftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, _signer);
    setNftContract(_NftContract);
  }, []);

  //Minft contract with index
  const mint = async (a) => {
    
       const txn = await NftContract.mintWithIndex(a);
       await txn.wait();
      
      let newItems = [...items];
      newItems[a-1].minted = true;
    setItems(newItems);
    }


  let myArr = Array(100).fill("#FFCA2C")
  const changeFoo = (index) => {
    if (myArr[index] != "#FFCA2C") {
      myArr[index] = "#FFCA2C";
    } else {
      myArr[index] = "#6C757D";
    }
  };
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const ListenNumbers = () => {
    return rows.map((row , rowIndex) => (
      <Row key={row}>
        <Col style={{ margin: "0px", padding: "0", display: "flex" }}>
          {numbers.map((number, numberIndex) => (
            <Button
              className="btn-lg rounded-0 success"
              key={number}
              style={{
                backgroundColor: items[10*rowIndex+numberIndex].minted ? "rgba(0, 0, 0, 0.76)" : "rgba(0, 0, 0, 0)" ,
                color:myArr[number+row*10],
                border: "1px solid",
                fontSize: "20px",
                flexGrow: "1",
              }}
              disabled={items[10*rowIndex+numberIndex].minted}
              onClick={() => {
                const index = number+row*10;
                mint(index);
              }}
            >
              Mint <br></br>
              {number + row * 10}
            </Button>
          ))}
        </Col>
      </Row>
    ));
  };

  return (
    <div>
      <br></br>
      <Container
        style={{
          backgroundImage:
            "url('https://gateway.pinata.cloud/ipfs/QmP39mkp2qcmzjHmf3NJMAsVqZHN7WSHEfnejf147FfTuw/Gunes-Paneli-Egim-Acisi.jpg')",
          backgroundSize: "contain !important",
          backgroundRepeat: "no-repeat !important",
          backgroundPosition: "100 200px !important",
        }}
      >
        <ListenNumbers />
      </Container>
    </div>
  );
}
export default MintNFT;
