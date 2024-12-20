import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer, { FooterPushDown } from './components/Footer';
import {Container} from 'react-bootstrap';

// Pages
import Home from './pages/Home';
// import TestParam from './pages/TestParam';
// import TestParamNone from './pages/TestParamNone';
import About from './pages/About';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import AddPost from "./pages/AddPost";
import MeetTheTeam from './pages/Team';
import PostInfo from './pages/PostInfo';

import CommentList from './components/CommentList'
import CommentForm from './components/CommentForm'

// Add Apollo context components
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  // uri: '/graphql'
  uri: '/graphql-image-gallery-nft-collab'
});

function App() {
  const basepath = process.env.REACT_APP_REACT_ROUTER_BASEPATH || '/';

  return (
    <ApolloProvider client={client}>
      <Router basename={basepath}>
        <Container className="p-0" fluid>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/post/new' component={AddPost} />
            <Route exact path='/post/:noftId?' component={PostInfo} />
            <Route exact path='/favorites/:username?' component={Favorites} />
            <Route exact path='/favorites/me' component={Favorites} />
            <Route exact path='/about' component={About} />
            <Route exact path='/about/team' component={MeetTheTeam} />
            <Route exact path='/profile/:username?' component={Profile} />
            <Route exact path='/commentForm' component={CommentForm} />
            <Route exact path='/commentList' component={CommentList} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
          <FooterPushDown />
          <Footer />
        </Container>
      </Router>
    </ApolloProvider>
  );
}

export default App;



