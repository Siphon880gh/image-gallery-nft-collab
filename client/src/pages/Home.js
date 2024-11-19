import React from 'react';
import { CardColumns, Container } from 'react-bootstrap';
import { GET_STREAM } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import PostCard from "../components/PostCard";

import LoadingSpindle from "../assets/spinner-1.3s-200px.png";

export function Home() {
  const { loading, data } = useQuery(GET_STREAM);
  const streamnofts = data?.stream || [];

  return (<React.Fragment>
    {loading ? (
      <div><img src={LoadingSpindle}></img>If on free server Heroku, this may take a while if the page hasn't been loaded in a while. Thank you.</div>
      // TODO: We can add a spinner here
    ) : (
      <Container>
        <h2>
          {streamnofts.length
            ? ``
            : <><br/>No trending NoFTs found. Is this a fresh install? Try seeding the database.</>
            }
        </h2>
        <CardColumns>
          {streamnofts.map((reprint, itrIndex) => {
            return (
              <PostCard key={reprint._id} postcard={reprint}></PostCard>
            );
          })}
        </CardColumns>

      </Container>
    )
    }
  </React.Fragment>);
};

export default Home;
