import axios from 'axios';

const pinataApiKey = 'f682d26d64a476923d0b';
const pinataSecretApiKey = '648afb439f8b8607fa631c328f4d47ca48fec5c2babd2b30bb99074e38c06d7e';

export const uploadFileToPinata = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  let data = new FormData();
  data.append('file', file);
    data.append("file", file);
    const metadata = JSON.stringify({
    name: "NFT Marketplace"});
    data.append("pinataMetadata", metadata)

    const options = JSON.stringify({
        cidVersion: 0,
    });
    data.append("pinataOptions", options);

  const res = await axios.post(url, data, {
    maxContentLength: 'Infinity',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      'pinata_api_key': pinataApiKey,
      'pinata_secret_api_key': pinataSecretApiKey
    }
  });

  return res.data;
};

export const uploadJSONToPinata = async (json) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  const res = await axios.post(url, json, {
    headers: {
      'pinata_api_key': pinataApiKey,
      'pinata_secret_api_key': pinataSecretApiKey
    }
  });

  return res.data;
};
