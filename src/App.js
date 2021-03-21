import "./styles.css";
import React, { useState } from "react";
import Axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Movie from "./components/Movie/Movie";
import Frontui from "./components/Samples/Frontui";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { GlobalContext } from "./context/globalContext";
import MovieDetail from "./components/MovieDetail/MovieDetail";

export default function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [suggest, setSuggest] = useState([]);
  const [theme, setTheme] = useState(true);
  const [loader, setLoader] = useState(true);
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState({});
  const [movieID, setMovieID] = useState("");

  const toggleMode = () => {
    setTheme(!theme);
  };

  React.useEffect(() => {
    const onreload = async () => {
      const search = JSON.parse(window.localStorage.getItem("searchItem"));
      const movie = JSON.parse(window.localStorage.getItem("movieId"));
      console.log(search, movie);
      setSearch(search);
      setMovieID(movie);
      if (search || movie) {
        const [firstResponse, secondResponse] = await Promise.all([
          Axios.get(`http://www.omdbapi.com/?s=${search}&apikey=9d494647`, {
            header: {
              "Access-Control-Allow-Origin": "*"
            }
          }),
          Axios.get(`http://www.omdbapi.com/?i=${movie}&apikey=9d494647`, {
            header: {
              "Access-Control-Allow-Origin": "*"
            }
          })
        ]);
        console.log(firstResponse, secondResponse);
        setResult(firstResponse.data.Search);
        setDetail(secondResponse.data);
        setLoader(false);
        setShow(true);
      }
    };
    onreload();
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("searchItem", JSON.stringify(search));
    window.localStorage.setItem("movieId", JSON.stringify(movieID));
  });

  React.useEffect(() => {
    const onchangeItem = async () => {
      const res = await Axios.get(
        `http://www.omdbapi.com/?s=${search}&apikey=9d494647`
      );
      setSuggest(res.data.Search);
      setShow(true);
    };

    onchangeItem();
  }, [search]);

  const handleDetail = async (id) => {
    setMovieID(id);
    try {
      const result = await Axios.get(
        `http://www.omdbapi.com/?i=${id}&apikey=9d494647`,
        {
          header: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      );

      console.log(result);
      setDetail(result.data);
      setShow(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Axios.get(
        `http://www.omdbapi.com/?s=${search}&apikey=9d494647`,
        {
          header: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
      setResult(result.data.Search);
      setLoader(false);
      setShow(false);
    } catch (e) {
      console.log(e);
    }
  };

  const inputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <GlobalContext.Provider
        value={{
          theme,
          inputChange,
          handleSubmit,
          toggleMode,
          result,
          search,
          suggest,
          show,
          handleDetail,
          detail
        }}
      >
        <Router>
          <Navbar>
            {loader || search === "" ? (
              <Route path="/" exact component={Frontui} />
            ) : (
              <Route path="/" exact component={Movie} />
            )}
            <Route path="/:id" component={MovieDetail} />
          </Navbar>
        </Router>
      </GlobalContext.Provider>
    </div>
  );
}
