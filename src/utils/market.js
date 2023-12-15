import ABI from '../contracts/Market.json'
const {ethers} = require('ethers')

let provider = new ethers.BrowserProvider(window.ethereum)
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const contract = new ethers.Contract(contractAddress,ABI,await provider.getSigner())

export async function buy(tokenId){
    const result = await contract.buy(tokenId)
    console.log(result.hash)
}

export async function changePrice(tokenId,price){
    const result = await contract.changePrice(tokenId,price)
    console.log(result.hash)
}

export async function cancelOrder(tokenId){
    const result = await contract.cancelOrder(tokenId)
    console.log(result.hash)
}

export async function getAllNFTs(){
    const result = await contract.getAllNFTs()
    return result
}

export async function getMyNFTs(){
    const result = await contract.getMyNFTs()
    return result
}

export async function getOrder(tokenId){
    const result = await contract.orderOfId(tokenId)
    return {
        seller: result[0],
        tokenId:result.tokenId,
        price: Number(result[2]) / 1e18,
    }
}