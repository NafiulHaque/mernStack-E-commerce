import { React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Image, ListGroup, Table } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  listProduct,
  productDeleteAction,
  productCreateAction,
} from "../actions/productAction";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
} from "@material-tailwind/react";
// import { FaArrowRight } from "react-icons/fa";

const ProductListScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

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
  }, [
    dispatch,
    userInfo,
    navigate,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(productDeleteAction(id));
    }
  };

  // const createProductHandler = () => {
  //   dispatch(productCreateAction());
  // };

  const createProductHandler = () => {
    navigate("/dashboard/product/create");
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Products
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <Button
                className="flex items-center gap-3"
                size="md"
                onClick={() => createProductHandler()}
              >
                <i className="fas fa-plus"></i> Create Product
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0 h-full">
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {loadingCreate && <Loader />}
          {errorCreate && <Message variant="danger">{errorCreate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                 
                  <th
                    key={""}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70 text-center"
                    >
                      (Id) Name
                    </Typography>
                  </th>
                  <th
                    key={""}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Price
                    </Typography>
                  </th>
                  <th
                    key={""}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Category
                    </Typography>
                  </th>
                  <th
                    key={""}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Brand
                    </Typography>
                  </th>
                  <th
                    key={""}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Edit/D
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product,index) => {
                  const isLast = index === products.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                  <tr key={product._id}>
                    
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      ><strong>({product._id})</strong><br/>
                        {product.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.price}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.category}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.brand}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Link to={`/dashboard/product/${product._id}/edit`}>
                        <Button variant="light" className="mr-2">
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
                )})}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default ProductListScreen;
