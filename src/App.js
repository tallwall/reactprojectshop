import React from 'react';
import Navbar from './componets/Navbar';
import SearchBox from './componets/SearchBox';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';

function App() {
  return (
    <>
    <Router>
      <Navbar />
        <Switch>
          <Route path = '/' exact />  
        </Switch>
         <SearchBox/>
         
    </Router>
   

      </>
  );
}

export default App;
