import { React, useEffect, useState } from "react";
// import {Helmet} from "react-helmet";
import { Row, Col } from "react-bootstrap";
import Product from "../Components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../actions/productAction";
import Loader from "../Components/Loader.js";
import Message from "../Components/Message";
import Pagi from "./Pagi";
import { useParams } from "react-router-dom";
// import Procarousel from '../Components/ProCarousel.js'
import Carousel from "../Components/carousel/Carousel.js";
import ProductBox from "../Components/ProductBox.js";

const HeaderScreens = () => {
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const productsList = useSelector((state) => state.productList);

  const { loading, products, error } = productsList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProduct(keyword));
  }, [dispatch, keyword]);

  //   let product = products || [];
  const finalProcessData = products.sort(function (a, b) {
    if (a.createdAt > b.createdAt) return -1;
    if (a.createdAt < b.createdAt) return 1;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPOst = indexOfLastPost - postsPerPage;
  const currentPosts =
    finalProcessData.length > 0 &&
    finalProcessData.slice(indexOfFirstPOst, indexOfLastPost);
  const totalPosts = finalProcessData.length;
  const paginate = (pageNum) => setCurrentPage(pageNum);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);
  return (
    <>
      
      <h1 class="mt-5">Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Row>
          {currentPosts.length > 0 &&
            currentPosts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* <Product product={product} /> */}
                <ProductBox product={product} className="mb-3"/>
              </Col>
            ))}
        </Row>
      )}

      <div className="rt-pagination">
        <Pagi
          postsPerPage={postsPerPage}
          totalPosts={totalPosts}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={currentPage}
        />
      </div>
      {!keyword && <Carousel />}

    </>
  );
};

export default HeaderScreens;
