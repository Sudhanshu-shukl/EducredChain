import { NFTStorage, File } from 'nft.storage';

const REAL_API_TOKEN = process.env.NFT_STORAGE_KEY!; 
// Put your real key in .env → NFT_STORAGE_KEY=xxxx

/**
 * Upload a file to IPFS using NFT.Storage
 * @returns real IPFS CID
 */
export const uploadToIPFS = async (file: File): Promise<string> => {
  try {
    const client = new NFTStorage({ token: REAL_API_TOKEN });

    // Upload actual file
    const cid = await client.storeBlob(file);

    console.log("Uploaded → CID:", cid);
    return cid;
  } catch (err) {
    console.error("IPFS Upload Failed:", err);
    throw err;
  }
};

/**
 * Retrieve a file from IPFS using its CID
 * @returns file Blob
 */
export const retrieveFromIPFS = async (cid: string): Promise<Blob> => {
  try {
    const url = `https://ipfs.io/ipfs/${cid}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Failed to retrieve: ${res.statusText}`);

    const blob = await res.blob();
    return blob;
  } catch (err) {
    console.error("IPFS Retrieval Failed:", err);
    throw err;
  }
};
