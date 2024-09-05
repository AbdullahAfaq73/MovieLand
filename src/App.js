import { useEffect, useState } from 'react';
import './App.css';
import searchIcon from './search.svg'
import MovieCard from './MovieCard';

// used for calling api
const API_URL = ' http://www.omdbapi.com?apikey=50c40a83';


const App = (props) => {

    const [isDark, setIsDark] = useState(false);
    const toggleBackgroundColor = () => {
        setIsDark(!isDark);
    };
    const backgroundColor = isDark ? 'black' : 'white';
    const color = isDark ? 'white' : 'black';
    // ................. fro dark theme.const.........

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  // data is synced and called from the api
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    console.log(data.Search);
    setMovies(data.Search)
  }


  //useeffect is used for when data comes it runs and shows data
  useEffect(() => {
    searchMovies('marvel');
  }, []);


  return (
    <div className='app' style={{ backgroundColor }}>
      <button style={{color}} className='theme-btn' onClick={toggleBackgroundColor}>Change Theme</button>
      <h1 style={{color}}>Ocean of Movies </h1>
      {/* this is the search bar for searching data  */}
      
      <div className='search'>
        <input
          placeholder="search for movies"
          value= {searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img
          src={searchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>



      {/* ...main div for container */}
      { movies?.length > 0
          ? (
            <div className='container'>
              { movies.map((movie) =>
                  <MovieCard movie={movie} />
                )}
            </div>
            ) : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div> 
          )}

   

    </div>
  );
}

export default App;
