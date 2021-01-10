import React, {useState, useEffect} from 'react'
import { Form, Row, Col, Button} from 'react-bootstrap'
import axios from 'axios';


function Account(props) {
    const [profile, setProfile] = useState('');
    const [shopUrl, setShopUrl] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [needsCollections, setNeedsCollections] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(shopUrl);
        console.log(shopAddress);
        if(shopUrl.includes("www.etsy.com")){
            //upload inventory
            let addprofileresult = await axios.post("http://localhost:5000/api/users/createprofile", {shopUrl: shopUrl, shopAddress: shopAddress});
            console.log(addprofileresult);
            let addproductsresult = await axios.post("http://localhost:5000/api/products/uploadinventory", {shopUrl: shopUrl})
            console.log(addproductsresult);
        }
        else{
            setNeedsCollections(true);
            alert("Non-Etsy URL provided - Please map your store's collections to LocalSource product categories")
        }
    }

    const handleUrlChange = (e) => {
        setShopUrl(e.target.value);
    }

    const handleAddressChange = (e) => {
        setShopAddress(e.target.value);
    }

    useEffect(() => {
        const loadProfile = async () => {
                const result = await axios.get("http://localhost:5000/api/users/getprofile").catch(err => console.log(err));
                setProfile(result.data);
                console.log(profile);    
            }

        loadProfile();

        return () => {
            console.log(profile);
        };
    },
        []
    );

    return (
        <Row className = "mt-4">
            <Col xs={2}/>
            <Col xs={8}>
        <Form onSubmit = {handleSubmit}>
            <Form.Group as={Row} controlId="email">
                <Form.Label column xs={3}>Email</Form.Label>
                <Col xs={9}>
                    <Form.Control type="email" placeholder={profile.email} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="storeurl">
                <Form.Label column xs={3}>Shop URL (Etsy Or Shopify Only)</Form.Label>
                <Col xs={7}>
                    <Form.Control type="text" placeholder="Eg: https://www.etsy.com/shop/ShelbyPageCeramics | https://shopursa.com/" required onChange={handleUrlChange}/>
                </Col>
                <Col xs={2}><Button>Add Collection</Button></Col>
            </Form.Group>
            <Form.Group as={Row} controlId="storeurl">
                <Form.Label column xs={3}>Shop Address (Optional)</Form.Label>
                <Col xs={9}>
                    <Form.Control type="text" placeholder="1234 N ABC St, City, State Zip" onChange={handleAddressChange}/>
                </Col>
            </Form.Group>
            <Button type="submit">Submit</Button>

        </Form>
        </Col>
            <Col xs={2}/>
            </Row>
    )
}
export default Account