import axios from 'axios';

const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.REACT_APP_PINATA_SECRET_API_KEY;

export const uploadFileToIPFS = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    });

    console.log('✅ Uploaded to IPFS. CID:', res.data.IpfsHash);
    return res.data.IpfsHash;
  } catch (err) {
    console.error('❌ Upload Failed:', err.response?.data || err.message);
    return null;
  }
};
