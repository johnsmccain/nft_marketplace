import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import { uploadFileToPinata, uploadJSONToPinata } from '../pinata'


const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (file) {
      try {
        const fileRes = await uploadFileToPinata(file);
        setImage(`https://jade-just-rhinoceros-52.mypinata.cloud/ipfs/${fileRes.IpfsHash}`);
      } catch (error) {
        console.error("IPFS image upload error: ", error);
      }
    }
  }
  const createNFT = async () => {
    if (!image || !price || !name || !description) return;
    try {
      const metadata = { image, price, name, description };
      // console.log(metadata)
      const result = await uploadJSONToPinata(metadata);
      console.log(result);
      mintThenList(result.IpfsHash);
    } catch (error) {
      console.error("IPFS URI upload error: ", error);
    }
  };
 const mintThenList = async (ipfsHash) => {

    const uri = `https://jade-just-rhinoceros-52.mypinata.cloud/ipfs/${ipfsHash}`;

    console.log("unique URI",uri)
    // mint nft
    await(await nft.mint(uri)).wait()

    // get tokenId of new nft
    const id = await nft.tokenCount()
    console.log(nft, "id", id)

    // approve marketplace to spend nft
    console.log("Before setApprovalForAll setApprovalForAll")

    await(await nft.setApprovalForAll(marketplace.address, true)).wait()
    console.log("Before parseEther")
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString())
    console.log(nft.address)
    await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
    console.log("After makeItem", await marketplace.items(1))
  };
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
              <div className="d-grid px-0">
                <Button onClick={createNFT} variant="primary" size="lg">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Create