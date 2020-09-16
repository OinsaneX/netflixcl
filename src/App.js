import React,{useEffect,useState} from 'react';
import './App.css';
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow/MovieRow'
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie'
import Header from './components/Header/Header'
import {BrowserRouter as Router, Route} from 'react-router-dom'
function App() {

 const [movieList, setMovieList] = useState([]);
 const [featuredData, setfeaturedData] = useState(null)
const [blackHeader, setblackHeader] = useState(false);
useEffect(()=>{
const loadAll=async ()=>{
  //getting a list
  let list = await Tmdb.getHomeList();
setMovieList(list);
//featured
let originals = list.filter(i=>i.slug === "originals")
let randomChosem = Math.floor(Math.random()*(originals[0].items.results.length-1))
let chosen = originals[0].items.results[randomChosem];
let choseninfo = await Tmdb.getMovieInfo(chosen.id,'tv')
setfeaturedData(choseninfo)
}
loadAll()
},[]); 

useEffect(()=>{
const scrollListener = ()=>{
if(window.scrollY>30){
  setblackHeader(true)
}else{
  setblackHeader(false)
}
}

window.addEventListener('scroll',scrollListener);
return ()=>{
  window.removeEventListener('scroll',scrollListener)
}
},[]);

  return (
  <div className="page">
<Router basename="https://oinsanex.github.io/netflixcl/">
<Route path='/'>
<Header black ={blackHeader}/>
   {featuredData && <FeaturedMovie item= {featuredData}/>} 
   <section className="lists">
     {movieList.map((item,key)=>(
      <MovieRow key={key} title={item.title} items={item.items}/>
     )
     )}
   </section>

   <footer>
     Feito com <span role="img" aria-label="coraçao">💖</span> por Alejandro <br/>
     Direito de imagen para Netflix <br/>
     Dados pegos do site ThemovieDb.org
   </footer>

   {movieList.length <=0 &&
   <div className="loading">
     <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"/>
   </div>
}
</Route>
</Router>

  
  </div>
  );
}

export default App;
