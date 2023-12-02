import React, { useEffect } from "react";
import "./Carousel.css";
import { useDispatch, useSelector } from "react-redux";
import { listTopProduct } from "../../actions/productAction";
import Loader from "../Loader";
import Message from "../Message";
import Rating from "../Rating";
import { Link } from "react-router-dom";

const Carousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProduct());
  }, [dispatch]);

  // const renderData = () => {
  //   return products?.map((item) => (
  //     <div key={item._id} className="w-full h-full">
  //       <p>id: {item._id}</p>
  //       <p>id: {item.name}</p>
  //       <img alt={item.name} src={item.image}  className="img-cover"/>
  //     </div>
  //   ));
  // };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
    <h1>Top Rated</h1>
    <div className="carousel w-full h-100 border border-spacing-2 overflow-hidden flex flex-row justify-around items-center p-3 py-3 gap-3 flex-wrap">
      
      {products?.map((item) => (
       <Link to={`/product/${item._id}`} className="no-underline">
        <div className="border p-3 rounded-md shadow-sm my-3 flex flex-row justify-around items-center w-[500px] h-full bg-[#f2f2f2]" key={item._id}>
          <div className="flex flex-col justify-between items-center p-2 ">
          <h3>{item.name}</h3>
          <h5>Price: {item.price} Tk</h5>
          {/* <p>{item.description}</p> */}
          <Rating
           value={item.rating}
           text={`${item.numReviews} reviews`}
           />
          </div>
          <img alt={item.name} src={item.image}  className="h-80 w-60 rounded-md"/>
        </div>
       </Link>
      ))}
    </div>
    </>
  );
};

export default Carousel;
