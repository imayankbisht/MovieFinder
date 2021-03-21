import "../../styles.css";
import React from "react";
import { Navbar, Form, FormControl, Row, Col, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { Switch } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { GlobalContext } from "../../context/globalContext";
import AutoSuggest from "../Autosuggest/Autosuggest";

const Navbars = (props) => {
  const Global = React.useContext(GlobalContext);
  const {
    theme,
    inputChange,
    handleSubmit,
    toggleMode,
    search,
    suggest
  } = Global;
  console.log(suggest);
  let Background = "";
  if (theme) {
    Background = "black";
  } else {
    Background = "white";
  }
  return (
    <>
      <Row className=" m-0 " style={{ background: Background }}>
        <Col xs={3} md={2}>
          <Navbar>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="./images/sovaimg.png"
                height="30px"
                style={{ verticalAlign: "top" }}
              />
            </Navbar.Brand>
          </Navbar>
        </Col>
        <Col xs={6} md={8} className="d-flex align-item-center ">
          <Form onSubmit={handleSubmit} className="w-100 " inline>
            <FormControl
              style={{ fontSize: "0.8rem" }}
              onChange={inputChange}
              type="text"
              placeholder="Find my movie"
              value={search}
              className="mr-sm-2 w-100 rounded-pill p-3"
            />
            <AutoSuggest />
            {/* {suggest &&
              suggest.map((e) => {
                return (
                  <div>
                    <ul>
                      <li>{e.Title}</li>
                    </ul>
                  </div>
                );
              })} */}
            <Button
              type="submit"
              className="position-absolute p-0 "
              style={{
                border: "none",
                background: "transparent",
                top: "14px",
                right: "40px",
                cursor: "pointer"
              }}
            >
              <BsSearch style={{ color: "black" }} />
            </Button>
          </Form>
        </Col>
        <Col
          xs={3}
          md={2}
          className="d-flex justify-content-center align-items-center"
        >
          <Switch
            style={{ background: "aquamarine" }}
            onClick={toggleMode}
            defaultChecked={theme}
          />
        </Col>
      </Row>
      {props.children}
    </>
  );
};

export default Navbars;
