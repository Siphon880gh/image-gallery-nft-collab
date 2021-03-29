import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer, {FooterPushDown} from './components/Footer';

// Pages
import Home from './pages/Home';
import TestParam from './pages/TestParam';

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
            <Route exact path='/post/new' component={Home} />
            <Route exact path='/post/:id' component={Home} />
            <Route exact path='/favorites' component={Home} />
            <Route exact path='/test-param/me' component={TestParam} />
            <Route exact path='/test-param/:id' component={TestParam} />
            <Route exact path='/profile/me' component={Home} />
            <Route exact path='/profile/:id' component={Home} />
            <Route exact path='/' component={Home} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
          <FooterPushDown/>
          <Footer/>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;



