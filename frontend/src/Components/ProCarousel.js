import React, { useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {listTopProduct} from '../actions/productAction'
import Loader from './Loader';
import Message from './Message'


export default function Procarousel() {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated) 
    const {loading,error,products} = productTopRated

    useEffect(() =>{
        dispatch(listTopProduct())
    },[dispatch])

    return loading ? <Loader/> : error ? <Message variant="danger">{error}</Message>
    :(
        <Carousel pause='hover' className='bg-dark'>
             { products.map(product =>(
                 <Carousel.Item key={product._id}>
                   <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name}/>
                   </Link>
                    <Carousel.Caption className='carousel-caption'>
                      <h2 >
                        {product.name}
                        
                        (${product.price})  
                      </h2>
                    </Carousel.Caption>
                 </Carousel.Item>
             ))} 
        </Carousel>
    )
}
