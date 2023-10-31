import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function Loader ()  {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

function App() {
 
const [imageUrls, setImageUrls] = useState([]);
const [searchText,setSearchText] = useState("");
const [finalSearch,setFinalSearch] = useState("");
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);


  useEffect(() => {
    if(!finalSearch)
    return;
    loadImages();
  },[finalSearch, page]);

  
  async function loadImages(){
    setLoading(true);
    try {
    const response = await fetch (`https://api.unsplash.com/search/photos/?query=${searchText}&page=${page}&per_page=30&client_id=LgmeGu6m1WcbZ2VdwgXgdPee5D9Va3PZVe73uc7b3ns`);
    const imagesResult = await response.json();
    if (page === 1) {
      setImageUrls(imagesResult.results.map(image=>image.urls.small));
    }
    else {
   setImageUrls(prev => [...prev,...imagesResult.results.map(image=>image.urls.small)]);
    }
  }catch(error){
    console.log(error);
  }
  finally{
    setLoading(false);
  }
  }
  
  
  function handleSearch() {
    setFinalSearch(searchText);
    setPage(1);
    
  }


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  },[])

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
      setPage(prev => prev + 1);
    }

   
  }
  return (
    <div className="App">
      <div><input value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      </div>
      <div id="gallery">
       {imageUrls.map((url,index) => <img width="300" height="300" src={url} key={index} alt="" />)}
       </div>
       {loading && <Loader />}
    </div>
  );
}

export default App;
