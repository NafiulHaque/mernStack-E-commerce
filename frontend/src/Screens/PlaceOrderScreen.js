import React, { useEffect, useState } from "react";
import { CardHeader, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import CheckoutSteps from "../Components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/OrderAction";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
  Button,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  TabPanel,
  TabsBody,
  Input,
} from "@material-tailwind/react";
import { clearCart, saveDelivery, savePaymentMethod } from "../actions/cartAction";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log("userinfo----", userInfo);

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [deliveryOption,setDeliveryOption]=useState("outsidedhaka");
  const [token, setToken] = useState("");

  useEffect(() => {
    dispatch(savePaymentMethod(paymentMethod));
    dispatch(saveDelivery(deliveryOption));
  }, [paymentMethod, dispatch,deliveryOption]);

  // useEffect(() => {
  //   if (success) {
  //     navigate(`/orders/${order._id}`);
  //   }

  // }, [success, navigate, order]);

  //place order handler

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
    if (success) {
      dispatch(clearCart());
      navigate(`/orders/${order._id}`);

    }
  };

  const handleTokenSubmit = (e) => {
    e.preventDefault();
    if (token === "M40") {
      cart.shippingPrice = addDecimals(0);
      setToken("");
    } else {
      cart.shippingPrice = addDecimals(100);
    }
  };

 
  console.log("Token....", deliveryOption);
  //calculate prices

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  if (cart.deliveryOption === "insidedhaka") {
    cart.shippingPrice = addDecimals(60);
  } else {
    cart.shippingPrice = addDecimals(100);
  }


  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice).toFixed(2));

  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice))
    // Number(cart.taxPrice)
    .toFixed(2);

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <Row>
            <Col md={6}>
              <Card className="w-full max-w-[26rem] my-3 h-[92%]">
                <CardBody>
                  <h4>Shipping</h4>
                  <p>
                    {" "}
                    <strong style={{ fontWeight: "bold", color: "#000" }}>
                      Address:{" "}
                    </strong>
                    {cart.shippingAddress.address}
                    <br />
                    <strong>City: </strong> {cart.shippingAddress.city}
                    <br />
                    <strong>PostCode: </strong>
                    {cart.shippingAddress.postalCode} <br />
                    <strong>Country:</strong>
                    {cart.shippingAddress.country}
                    <br />
                    <strong>Phone Number:</strong>
                    <br />
                    <strong>Email:</strong>
                    {userInfo.email}
                  </p>
                  <Button onClick={() => navigate("/shipping")}>
                    Edit Info
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="w-full max-w-[26rem] p-3 my-3">
                <h4>Payment Method</h4>

                <CardBody>
                  <Tabs value={paymentMethod} className="overflow-visible">
                    <TabsHeader className="relative z-0 ">
                      <Tab
                        value="Bkash"
                        onClick={() => setPaymentMethod("Bkash")}
                      >
                        Pay with Bkash
                      </Tab>
                      <Tab
                        value="Cash On Delivery"
                        onClick={() => setPaymentMethod("Cash On Delivery")}
                      >
                        Cash On Delivery
                      </Tab>
                    </TabsHeader>
                    <TabsBody
                      className="!overflow-x-hidden !overflow-y-visible"
                      animate={{
                        initial: {
                          x: paymentMethod === "Bkash" ? 400 : -400,
                        },
                        mount: {
                          x: 0,
                        },
                        unmount: {
                          x: paymentMethod === "Cash On Delivery" ? 400 : -400,
                        },
                      }}
                    >
                      <TabPanel
                        value="Bkash"
                        className="p-0 h-24 w-full flex justify-center items-center"
                      >
                        <img
                          className="h-full w-full rounded-lg object-cover object-center"
                          src="https://res.cloudinary.com/dackyi7oq/image/upload/v1702732456/bkash-logo-835789094A-seeklogo.com_cyt0tj.png"
                        />
                      </TabPanel>
                      <TabPanel
                        value="Cash On Delivery"
                        className="p-0 h-24 w-full flex justify-center items-center"
                      >
                        <img
                          className="h-full w-full rounded-lg object-cover object-center"
                          src="https://res.cloudinary.com/dackyi7oq/image/upload/v1702733156/cashondelivery1_q6idhs.jpg"
                        />
                      </TabPanel>
                    </TabsBody>
                  </Tabs>
                </CardBody>
                <p className="">
                  <strong style={{ fontWeight: "bold", color: "#000" }}>
                    Method:{" "}
                  </strong>
                  {cart.paymentMethod}
                </p>
              </Card>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <h4>Order Items</h4>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            rounded
                            fluid
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <CardBody>
              <h4>Token</h4>

              <div className="relative flex w-full max-w-[24rem]">
                <Input
                  type="text"
                  label="Token...."
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
                <Button
                  onClick={handleTokenSubmit}
                  size="sm"
                  className="!absolute right-1 top-1 rounded"
                >
                  Apply
                </Button>
              </div>
              <h4 className="mt-4">Delivery Options</h4>
              <div className="flex gap-10">
                <Radio name="type" label="Inside Dhaka"  onClick={()=>setDeliveryOption("insidedhaka")}/>
                <Radio name="type" label="Outside Dhaka" onClick={()=>setDeliveryOption("outsidedhaka")} defaultChecked/>
              </div>
             
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>Order Summary</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>{cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>{cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {error && <Message variant="danger">{error}</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={cart.cartItems === 0}
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
