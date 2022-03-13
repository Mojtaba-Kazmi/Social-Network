import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Inscription from './Inscription/Inscription.js';
import Connexion from './Connexion/Connexion.js';
import Profil from './Profil/Profil.js';
import Discussion from './Discussion/Discussion.js';
import Message from './Message/Message.js';
import Home from './Home/Home';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import NotFoundPage from './NotFoundPage/NotFoundPage';

function App() {

  return (
    
    <Router>
       
        <Switch>

          <Route exact path='/' component={ Home} />
          <Route path='/Inscription' component={ Inscription }/>
          <Route path='/Connexion' component={ Connexion }/>
          <ProtectedRoute path='/Profil' component={ Profil } />
          <ProtectedRoute exact path='/Discussion' component={ Discussion } />
          <Route path='/Discussion/:id' component={Message}/>
          <ProtectedRoute path='/Message' component={Message} />
          <Route path= '*' component={NotFoundPage}/>
         
        </Switch>
       
    </Router>
    
  );
}

export default App;
