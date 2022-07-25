import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { NFT_ABI } from "../constants/abi";
import { NFT_ADDRESS } from "../constants/addresses";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MintNFT() {
  const [signer, setSigner] = useState("");
  const [provider, setProvider] = useState("");

  const [NftContract, setNftContract] = useState(null);

  useEffect(() => {
    const _provider = new ethers.providers.Web3Provider(window.ethereum);
    const _signer = _provider.getSigner();
    setSigner(_signer);
    setProvider(_provider);
    const _NftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, _signer);
    setNftContract(_NftContract);
  }, []);
  const mint = async () => {
    const txn = await NftContract.mint(1);
    await txn.wait();
  };

// let myArr=Array(13).fill(Array(17).fill("#FFCA2C"))
// const changeFoo =(key,row)=>{
//     if(myArr[row][key]!="#FFCA2C") myArr[row][key]="#FFCA2C";
//     else{myArr[row][key]="#6C757D"}
// }
  const numbers = [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17];
  const listItems =numbers.map((number) =>
  <Button
  className="btn-lg rounded-0 success"
  key={number}
  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", color:"#FFCA2C",border:"1px solid" , fontSize:"20px",flexGrow:"1"}}
  onClick={mint}
>
  Mint {number}
</Button>
);
  
const rows = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const listRows = rows.map((row)=>(
    <Row key={row}>
    <Col style={{ margin: "0px", padding:"0",display:"flex" }}>
   {listItems}
    </Col>
  </Row>
))


  return (
    <div >
        <br></br>
      <Container
        style={{ backgroundImage: "url('https://gateway.pinata.cloud/ipfs/QmP39mkp2qcmzjHmf3NJMAsVqZHN7WSHEfnejf147FfTuw/Gunes-Paneli-Egim-Acisi.jpg')",backgroundSize: "contain !important",
        backgroundRepeat: "no-repeat !important",
        backgroundPosition: "100 200px !important"}}
      >
     
      {listRows}
      </Container>
    </div>
  );
}
export default MintNFT;
