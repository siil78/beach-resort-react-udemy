import React from 'react';
import './App.css';
//import pages
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import SingleRoom from './pages/SingleRoom'
import Error from './pages/Error'
//Router components
import { Route, Switch } from 'react-router-dom'
//components
import Navbar from './components/Navbar'



function App() {
  return (
    <>
    <Navbar/>
    {/* Switch prochází všechny routy, dokud nějaká neodpovídá url */}
    <Switch>
      {/* keyword exact určuje, že url musí odpovídat přesně path */}
      <Route exact path="/" component={Home} />        
      <Route exact path="/rooms" component={Rooms} />        
      <Route exact path="/rooms/:slug" component={SingleRoom} />     
      {/* protože u Error není definovaná path, zobrazí se při chybně zadané url */}
      <Route component={Error} />        
    </Switch>   
    </>
  );
}

export default App;
