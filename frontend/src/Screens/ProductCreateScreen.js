import { Card, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

const ProductCreateScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);


  const handleFileUpload = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
   
  };
  return (
    <div>
      <Link to="/dashboard/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      {/* {loadingUpdate && <Loader />} */}
      {/* {errorUpdate && <Message variant="danger">{errorUpdate}</Message>} */}
      {/* {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : ( */}
      {/* <!-- component --> */}
      <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h1 class="text-xl font-bold text-blue-gray-600 capitalize dark:text-white">
          Create Product
        </h1>
        <form>
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label class="text-blue-gray-600 dark:text-gray-200" for="name">
                Produdct Name
              </label>
              <input
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label class="text-blue-gray-600 dark:text-gray-200" for="price">
                Price
              </label>
              <input
                id="price"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label class="text-blue-gray-600 dark:text-gray-200" for="brand">
                Brand
              </label>
              <input
                id="brand"
                type="text"
                onChange={(e) => setBrand(e.target.value)}
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                class="text-blue-gray-600 dark:text-gray-200"
                for="countInStock"
              >
                Count In Stock
              </label>
              <input
                id="countInStock"
                type="number"
                onChange={(e) => setCountInStock(e.target.value)}
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                class="text-blue-gray-600 dark:text-gray-200"
                for="selectCategory"
              >
                Select Category
              </label>
              <select
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Electronics</option>
                <option>Mobile</option>
                <option>Laptop</option>
              </select>
            </div>

            <div>
              <label
                class="text-blue-gray-600 dark:text-gray-200"
                for="description"
              >
                Description
              </label>
              <textarea
                id="description"
                type="textarea"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
           
            <div>
              <label
                class="text-blue-gray-600 dark:text-gray-200"
                for="countInStock"
              >
                Count In Stock
              </label>
              <input
                id="countInStock"
                type="file"
                onChange={handleFileUpload}
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
           
            </div>
            <div className="flex items-center mx-auto">
            <span className="inline-block h-14 w-14 rounded-full border my-3 overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt="product"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <RxAvatar className="w-14 h-14 " />
                )}
              </span>
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-gray-500 rounded-md hover:bg-blue-gray-700 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>

      {/* )} */}
    </div>
  );
};

export default ProductCreateScreen;
