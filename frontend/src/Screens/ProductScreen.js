import {React, useEffect,useState}from 'react'
import {axios} from "axios"
import { Link, useParams,useNavigate   } from "react-router-dom";
import { Col, Row, Image, ListGroup,Card,Button } from "react-bootstrap";
import Rating from "../Components/Rating.js";
import { useDispatch, useSelector } from 'react-redux'
import {ProductDetails} from '../actions/productAction'
import Loader from '../Components/Loader.js';
import Message from '../Components/Message.js';
import Form from 'react-bootstrap/Form';

const ProductScreen = () => {
  const [qty,setQty]=useState(1)
  console.log(typeof(qty))
const navigate =useNavigate  ()
  const { id } = useParams();
  const detailsOfProduct=useSelector((state)=>state.productDetail)
  const {error,loading,product}=detailsOfProduct

const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(ProductDetails(id))
},[id,dispatch])

const addToCartHandler=()=>{

  navigate(`/cart/?id=${id}&qty=${qty}`)
}
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading?( <Loader/> ):error?(<Message variant={'danger'}>{error}</Message>):(
         <Row>
         <Col md={6}>
           <Image src={product.image} alt={product.name} fluid />
         </Col>
         <Col md={3}>
           <ListGroup variant="flush">
             <ListGroup.Item>
               <h3>{product.name}</h3>
             </ListGroup.Item>
             <ListGroup.Item>
               <Rating
                 value={product.rating}
                 text={`${product.numReviews} reviews`}
               />
             </ListGroup.Item>
             <ListGroup.Item>Price:${product.price}</ListGroup.Item>
             <ListGroup.Item>Description:${product.description}</ListGroup.Item>
           </ListGroup>
         </Col>
         <Col md={3}>
           <Card>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                   <Row>
                     <Col>
                     price:
                     </Col>
                     <Col>
                     <strong>${product.price}</strong>
                     </Col>
                   </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                   <Row>
                     <Col>
                     Status:
                     </Col>
                     <Col>
                     {product.countInStock>0?'In Stock':'Out of Stock'}
                     </Col>
                   </Row>
                  </ListGroup.Item>
                  {product.countInStock>0 &&(
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                        <Form.Control as='select' value={qty} onChange={(e)=>setQty(Number(e.target.value))
                        }>

                        {  [...Array(product.countInStock).keys()].map((x)=>
                          (
                            <option key={x+1} value={x+1}>
                              {x+1}

                            </option>
                          ))}

                        </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                   <Button 
                   onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock===0}
                              >
                               Add to Cart
 
                         </Button>
 
                  
                  </ListGroup.Item>
               </ListGroup>
           </Card>
 
         </Col>
       </Row>
      )}

     
    </>
  );
};

export default ProductScreen;
