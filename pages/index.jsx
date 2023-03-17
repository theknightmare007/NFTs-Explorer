import { useState } from 'react';
import { NFTCard } from '../components/nftCard';

const Home = () => {
 const [wallet,setWalletAddress] = useState("");
 const [collection, setCollectionAddress] = useState("");
 const [NFTs , setNFTS] = useState([]);
 const [fetchForCollection , setFetchForCollection] = useState(false);

 // Fetch NFTs with owner , with or without Collection filtering

 const fetchNFTs = async() => {
  let nfts; 
  console.log("fetching nfts");
  const api_key = "TTLLqv5MxV8X-bMTZpWG70XuItqDGRTo"
  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;
  var requestOptions = {
      method: 'GET'
    };
   
  if (!collection.length) {
  
    const fetchURL = `${baseURL}?owner=${wallet}`;

    nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
  } else {
    console.log("fetching nfts for collection owned by address")
    const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
    nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
  }

  if (nfts) {
    console.log("nfts:", nfts)
    setNFTS(nfts.ownedNfts);
  }
}

const fetchNFTsForCollection = async () => {
  if (collection.length) {
    var requestOptions = {
      method: 'GET'
    };
    const api_key = "TTLLqv5MxV8X-bMTZpWG70XuItqDGRTo"
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
    const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
    const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    if (nfts) {
      console.log("NFTs in collection:", nfts)
      setNFTS(nfts.nfts)
    }
  }
}

  return (
    <div className="flex flex-col items-center justify-center py-10 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Input wallet address here"></input>
        <input onChange ={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="NFT collection address (optional)"></input>
        <label><input onChange={(e)=>setFetchForCollection(e.target.checked)} type={"Checkbox"}></input>Fetch for collection</label>
        <button onClick={
          () => {
            if (fetchForCollection) {
              fetchNFTs();
              fetchNFTsForCollection();
            } else fetchNFTs();
          }
        }>Search for NFTs</button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
           NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>)
          })
        }
      </div>
    </div>
  )
}

export default Home