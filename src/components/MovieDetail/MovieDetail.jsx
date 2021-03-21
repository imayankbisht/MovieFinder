import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { GlobalContext } from "../../context/globalContext";

const MovieDetail = () => {
  let Global = React.useContext(GlobalContext);
  const { detail, theme, handleSubmit } = Global;
  return (
    <div
      style={{ height: "92vh" }}
      className={`d-flex justify-content-center ${
        theme ? "bg-dark" : "bg-light"
      } `}
    >
      <Container style={{ marginTop: "40px" }}>
        <Row style={{ background: "black", margin: "initial" }}>
          <Col xs={5} lg={3} className="p-0">
            <Card.Img className="img-fluid" src={detail.Poster} />
          </Col>
          <Col xs={7} lg={9}>
            <div>
              <div className="text-light">
                <p style={{ fontSize: "1.3rem", marginTop: "15px" }}>
                  {detail.Title} ({detail.Year})
                </p>
                <div>
                  <p className="m-0">IMDB Rating: {detail.imdbRating}</p>
                  <p className="m-0">Runtime: {detail.Runtime}</p>
                  <p className="m-0">Genre: {detail.Genre}</p>
                  <p className="m-0">Director: {detail.Director}</p>
                  <p className="m-0">Country: {detail.Country}</p>
                </div>
                <div className="mt-2">
                  <p>{detail.Plot}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div
          style={{ marginTop: "inherit" }}
          className="d-flex justify-content-center"
        >
          <Button
            onClick={handleSubmit}
            style={{ background: "black", border: "none" }}
            size="lg"
            className="w-50 p-3 "
          >
            <Link className="text-light" to="/">
              {" "}
              View Similar
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default MovieDetail;
