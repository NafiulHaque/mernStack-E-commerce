import React, { useEffect } from "react";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
  redirect,
  useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { addCart, removeFromCart } from "../actions/cartAction";
import Form from "react-bootstrap/Form";

const CartScreen = () => {
  // const history = useHistory()

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const q = searchParams.get("qty");
  const qty = Number(q);
  console.log("qty:", qty, "id:", id);

  const cart = useSelector((state) => state.cart);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { cartItems } = cart;
  console.log(cartItems);
  const dispatch = useDispatch();

  const removeCartItem = (id) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    if (id) {
      dispatch(addCart(id, qty));
    }
  }, [id, qty, dispatch]);

  const CheckoutHandler = () => {
    const loginInfo = localStorage.getItem("userInfo");
    console.log(loginInfo);
    if (!loginInfo) {
      navigate("/login");
    } else {
      if (loginInfo) {
        navigate("/shipping");
      }
    }
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>

        {cartItems.length === "0" ? (
          <Message>
            Your cart is empty<Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addCart(item.product, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      varient="light"
                      onClick={() => {
                        removeCartItem(item.product);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h5>
              {cartItems.map((item)=>{
              return(
                <span>{item.price+" x "+item.qty+" = "+item.price*item.qty}<br/></span>
              )}
              )}
              <hr/>
              <span>
              Subtotal =  
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
                </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={CheckoutHandler}
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
