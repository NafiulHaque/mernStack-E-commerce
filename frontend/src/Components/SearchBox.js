import { Input, Button } from "@material-tailwind/react";
import { React, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <form onSubmit={submitHandler} className="lg:mr-auto">
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            color="white"
            label="Search Products..."
            // className="pr-20"
            onChange={(e) => setKeyword(e.target.value)}
            containerProps={{
              className: "min-w-[288px]",
            }}
          />

          <Button
            size="sm"
            type="submit"
            color="white"
            className="!absolute right-1 top-1 rounded"
          >
            Search
          </Button>
        </div>
      </form>
    </>
  );
};

export default SearchBox;
