import { React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Table,
} from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listProduct, productDeleteAction,productCreateAction } from "../actions/productAction";

const ProductListScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete,error:errorDelete,success:successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);

  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;


  useEffect(() => {

    dispatch({ type: "PRODUCT_CREATE_RESET" });



    if (userInfo && userInfo.isAdmin) {
      dispatch(listProduct());
    } else {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/dashboard/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProduct());
    }


  }, [dispatch, userInfo,navigate,successDelete,successCreate,createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(productDeleteAction(id));
    }
  };

  // const createProductHandler = () => {
  //   dispatch(productCreateAction());
  // };

  const createProductHandler =()=>{
    navigate("/dashboard/product/create")
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={()=>createProductHandler()}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>


        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (



      
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/dashboard/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

      
      </Row>
    </>
  );
};

export default ProductListScreen;
