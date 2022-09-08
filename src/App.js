import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchquery, setSearchquery] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    };
    loadPosts();
  }, []);

  const clickHandler = () => {
    setSearchquery(true);
  };

  const changeHandler = (e) => {
    setSearchquery(false);
    setSearchTitle(e.target.value);
  };

  return (
    <div className="App">
      <div>
        <div>
          <h2>Search Filter</h2>
          <div className="">
            <input
              style={{ width: "30%", height: "25px" }}
              type="text"
              onChange={changeHandler}
              placeholder="search..."
            />
            <button
              className="btn btn-primary m-2"
              type="search"
              onClick={clickHandler}
            >
              Search
            </button>
          </div>
          {searchquery ? (
            <>
              <div>Searched data</div>
              {posts
                .filter((value) =>
                  value.title.toLowerCase().includes(searchTitle.toLowerCase())
                )
                .map((item) => (
                  <div
                    className="col-md-4 m-5 justify-content-center "
                    style={{ border: "1px solid #ccc" }}
                  >
                    <h5 key={item.id}> {item.title} </h5>
                    <p> {item.body} </p>
                  </div>
                ))}
            </>
          ) : (
            <>
              <div>Initial Data</div>
              {posts.map((item) => (
                <div
                  className="col-md-4 m-5 justify-content-center "
                  style={{ border: "1px solid #ccc" }}
                >
                  <h5 key={item.id}> {item.title} </h5>
                  <p> {item.body} </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;