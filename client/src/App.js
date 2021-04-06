import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer, { FooterPushDown } from './components/Footer';

// Pages
import Home from './pages/Home';
import TestParam from './pages/TestParam';
import TestParamNone from './pages/TestParamNone';
import About from './pages/About';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import UploadForm from "./pages/UploadForm";
import AddPost from './pages/addPost';
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
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/post/new' component={AddPost} />
            <Route exact path='/post/:title?' component={PostInfo} />
            <Route exact path='/favorites/:username?' component={Favorites} />
            <Route exact path='/favorites/me' component={Favorites} />
            <Route exact path='/test-param/me' component={TestParamNone} />
            <Route exact path='/test-param/:id' component={TestParam} />
            <Route exact path='/about' component={About} />
            <Route exact path='/about/team' component={MeetTheTeam} />
            <Route exact path='/profile/me' component={Profile} />
            <Route exact path='/profile/:username?' component={Profile} />
            <Route exact path='/upload' component={UploadForm} />
            <Route exact path='/commentForm' component={CommentForm} />
            <Route exact path='/commentList' component={CommentList} />

            <Route exact path='/' component={Home} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
          <FooterPushDown />
          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;



