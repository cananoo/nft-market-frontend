import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import NFTCard from './NFTCard';
import {balanceof,tokenOfOwnerByIndex} from '../utils/nft.js';
import '../App.css';

const NFTGrid = () => {
    const [nfts,setNfts] = useState([]);
    const navigate = useNavigate();

const handleCardClick = (tokenId) => {
    navigate(`/nft-detail/${tokenId}`);
}

useEffect(() => {
    const fetchNFTs = async () => {
        const length = await balanceof("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
        console.log('length',length);
        for (let i = 0; i < length; i++) {
            const tokenId = await tokenOfOwnerByIndex("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",i);
           console.log('i',i);
            setNfts((prev) => [...prev,tokenId]);
            setNfts((prev) => [...new Set(prev)]);
        }
    };
    fetchNFTs();
}, []);

return (
    <div className='nft-grid'>
        {nfts.map(nft => (
            <NFTCard  tokenId={nft} onClick={() => handleCardClick(nft)} />
        ))}
    </div>
);

};

export default NFTGrid;