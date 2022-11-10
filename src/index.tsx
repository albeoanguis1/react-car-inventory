import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// react-router-dom REQUIRES v.5.2.0 to use Switch. There are newer versions available that no longer use Switch, but the code-along requires it.

// import { FirebaseAppProvider, AuthCheck } from 'reactfire';
import { Home, Contact, About, Inventory } from './components'
import Garage from './components/Garage'
import './style.css'
// import { firebaseConfig } from './firebaseConfig'
// import 'firebase/auth';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

const myTitle = "Antonio's Car Inventory"

ReactDOM.render(
  <React.StrictMode>
    {/* <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}> */}
    <Provider store={store}>
    <Router>
      <Switch>


        <Route exact path="/">
          <Home title={myTitle}/>
        </Route>
        <Route path='/garage'>
          <Garage></Garage>
          </Route>
        <Route path='/contact'>
          <Contact></Contact>
        </Route>
        <Route path='/inventory'>
          <Inventory></Inventory>
        </Route>
        <Route path='/about'>
          <About></About>
        </Route>
        {/* <Route path='/signin'>
          <SignIn></SignIn>
        </Route> */}



      </Switch>
    </Router>
    </Provider>
    {/* </FirebaseAppProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
