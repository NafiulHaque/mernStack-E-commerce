import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const ProductBox = ({ product }) => {
  //   console.log("----------", product);
  return (
    <>
      <div className="border rounded-md mb-3 p-2 flex flex-col items-center h-96">
       <Link to={`/product/${product._id}`}
       
          className="bg-no-repeat bg-cover bg-center w-full h-60"
          style={{ backgroundImage: `url(${product.image})` }}
        >
       </Link>
        <div className="p-2 flex flex-col items-center justify-around">
          <Link className="no-underline hover:text-blue-600" to={`/product/${product._id}`}>{product.name}</Link>
          <h6>Price: {product.price} tk</h6>
          <Rating value={product.rating} />
        </div>
      </div>
    </>
  );
};

export default ProductBox;
