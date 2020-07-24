import React, {useState, useEffect} from 'react';
import './App.css'; 
import {Switch, Route, Link} from 'react-router-dom';
import CreateAccount from './Comp/CreateAccount';
import CreateClass from './Comp/CreateClass';
import AltNav from './Comp/Header';
import HomePage from './Comp/home';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const getPosts = () => {
      axios
      .get('https://anywhere-fitness-bw-2020.herokuapp.com/api/classes')

      .then(res => {
      console.log(res);
      setPosts(res.data);})

      .catch(er => {
      console.log(er,'did not work');
      })
    }
    getPosts();
  }, []);
  return (
    <div className="App">
      <AltNav />
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <HomePage posts={posts}/>
          </Route>
          <Route path='/createAccount'>
            <CreateAccount />
          </Route>
          <Route path='/postClass'>
            <CreateClass />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
