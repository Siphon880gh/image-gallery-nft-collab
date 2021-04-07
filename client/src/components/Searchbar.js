import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import {GET_USER} from "../utils/queries"
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from './Link';

const Search = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [getUser, { error }] = useMutation(GET_USER);

  return (
    <>
      <div>
        Search
        <input
          type="text"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <button>OK</button>
      </div>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
};

export default Search;