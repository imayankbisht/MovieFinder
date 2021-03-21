import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Card } from "react-bootstrap";
import { GlobalContext } from "../../context/globalContext";

const Movie = () => {
  let Global = React.useContext(GlobalContext);
  const { result, theme, handleDetail } = Global;
  let Background = "";
  if (theme) {
    Background = "bg-dark";
  } else {
    Background = "bg-light";
  }
  return (
    <div className={Background}>
      <Container>
        <Row className="m-0">
          {result ? (
            result.map((e) => {
              return (
                <Col className="d-flex justify-content-center mt-5 ">
                  <Link
                    to={`/${e.imdbID}`}
                    onClick={() => handleDetail(e.imdbID)}
                  >
                    <Card styel={{ border: "none" }}>
                      <Card.Img
                        style={{
                          width: "18rem",
                          height: "-webkit-fill-available"
                        }}
                        src={e.Poster}
                      ></Card.Img>
                    </Card>
                  </Link>
                </Col>
              );
            })
          ) : (
            <div
              style={{ height: "92vh" }}
              className="w-100 d-flex justify-content-center align-items-center "
            >
              <h2>Movie not Found!</h2>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
