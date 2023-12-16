import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import {Link ,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import FormContainer from '../Components/FormContainer';
import CheckoutSteps from '../Components/CheckoutSteps';
import {savePaymentMethod} from '../actions/cartAction'

const PaymentScreen = () => {
     
    const navigate = useNavigate()

    const dispatch = useDispatch()
    
    const cart = useSelector(state => state.cart)
    const{shippingAddress} = cart 

    if(!shippingAddress){
        navigate('/shipping');
    }

  
    const [paymentMethod,setPaymentMethod] = useState('payPal')

     const handleSubmit = (e) =>{
        e.preventDefault() 
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeOrder'); 
     }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
             <h1>Payment Method </h1>

            <Form onSubmit={handleSubmit}>
             
               <Form.Group>
                   <Form.Label as='legend'>Select Method</Form.Label>
               
                <Col>
                   <Form.Check
                    type="radio"
                    label="payPal or Credit Card"
                    value="payPal" 
                    name="PaymentMethod"
                    
                    onChange={(e) =>setPaymentMethod(e.target.value)} 
                   >
                   </Form.Check>
                   <Form.Check
                    type="radio"
                    label="Bkash"
                    value="bkash" 
                    name="PaymentMethod"
                    
                    onChange={(e) =>setPaymentMethod(e.target.value)} 
                   >
                   </Form.Check>
                 </Col>
                 </Form.Group>
                
                <Button type="Submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;