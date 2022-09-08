import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchquery, setSearchquery] = useState(false)

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
      setLoading(false);
    };
    loadPosts();
  }, []);
   
 let res = posts.map((item) => (
  <div className="col-md-4 m-5 justify-content-center " style={{border:"1px solid #ccc", }}>
    <h5 key={item.id}> {item.title} </h5>
    <p> {item.body} </p>
  </div>
))

  return (
    <div className="App">
      <div>
        <div>
          <h2>Search Filter</h2>
          <div className="">
          <input
            style={{ width: "30%", height: "25px" }}
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="search..."
          />
          <button className="btn btn-primary m-2"  type="search"  onClick={()=>setSearchquery(true)} > Search</button>

          </div>
          
          {loading ? (
            <h4>Loading ...</h4>
          ) : (
            (searchquery) ?  posts
            .filter((value) => (
                value.title.toLowerCase().includes(searchTitle.toLowerCase())
              )
            ).res : res
           
              
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
