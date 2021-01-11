import React, {useState, useEffect} from 'react'
import { Form, Row, Col, Button} from 'react-bootstrap'
import axios from 'axios';


function Account(props) {
    const [profile, setProfile] = useState('');
    const [shopUrl, setShopUrl] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [category, setCategory] = useState('Accessories');
    const [needsCollections, setNeedsCollections] = useState(false)


    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(shopUrl);
        console.log(shopAddress);

        //upload inventory
        let addprofileresult = await axios.post("http://localhost:5000/api/users/createprofile", { shopUrl: shopUrl, shopAddress: shopAddress });
        console.log(addprofileresult);
        let addproductsresult = await axios.post("http://localhost:5000/api/products/uploadinventory", { shopUrl: shopUrl, category: category })
        console.log(addproductsresult);
        

    }

    const handleUrlChange = (e) => {
        setShopUrl(e.target.value);
    }

    const handleAddressChange = (e) => {
        setShopAddress(e.target.value);
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        console.log(category);
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
            <Form.Group as={Row} controlId="name">
                <Form.Label column xs={3}>Name</Form.Label>
                <Col xs={9}>
                    <Form.Control type="text" placeholder={profile.name} disabled/>
                </Col>
            </Form.Group>
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
                <Col xs={2}><Form.Control as="select" custom onChange={handleCategoryChange} defaultValue={category} value={category}>
                <option value="Accessories">Accessories</option>
                <option value="Art & Collectibles">Art & Collectibles</option>
                <option value="Bags & Purses">Bags & Purses</option>
                <option value="Bath & Beauty">Bath & Beauty</option>
                <option value="Books, Movies & Music">Books, Movies & Music</option>
                <option value="Clothing">Clothing</option>
                <option value="Craft Supplies & Tools">Craft Supplies & Tools</option>
                <option value="Electronics & Accessories">Electronics & Accessories</option>
                <option value="Home & Living">Home & Living</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Paper & Party Supplies">Paper & Party Supplies</option>
                <option value="Pet Supplies">Pet Supplies</option>
                <option value="Shoes">Shoes</option>
                <option value="Toys & Games">Toys & Games</option>
                <option value="Weddings">Weddings</option>
                <option value="Uncategorized / Other">Uncategorized / Other</option>
                </Form.Control></Col>
            </Form.Group>

            <Form.Group as={Row} controlId="storelocation">
                <Form.Label column xs={3}>Shop Address (Optional)</Form.Label>
                <Col xs={9}>
                    <Form.Control type="text" placeholder="1234 N ABC St, City, State Zip" onChange={handleAddressChange}/>
                </Col>
            </Form.Group>
            <Button type="submit">Submit</Button>

        </Form>
        
        <div className="mt-3">Shopify users - you must upload our collection URLs & Select the corresponding category for inventory to be correctly mapped</div>
        </Col>
            <Col xs={2}/>
            </Row>
    )
}
export default Account