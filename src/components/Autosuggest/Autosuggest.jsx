import "../../styles.css";
import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Form,
  FormControl,
  Row,
  Col,
  Button,
  Container
} from "react-bootstrap";
import { GlobalContext } from "../../context/globalContext";

const AutoSuggest = () => {
  const Global = React.useContext(GlobalContext);
  const { suggest, show, handleDetail } = Global;
  return (
    <div className="panel d-flex justify-content-center position-absolute">
      <div
        style={{ background: "#bdc3c7", width: "90%" }}
        className={`position-absolute ${show ? "d-block" : "d-none"}`}
      >
        {suggest &&
          suggest.map((e) => {
            return (
              <Row className="m-0">
                <Col className="p-0">
                  <ul>
                    <Link
                      className="text-dark"
                      to={`/${e.imdbID}`}
                      onClick={() => handleDetail(e.imdbID)}
                    >
                      <li>{e.Title}</li>
                    </Link>
                  </ul>
                </Col>
              </Row>
            );
          })}
      </div>
    </div>
  );
};

export default AutoSuggest;
