import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_USERS_BY_FILTER } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import { Card } from "react-bootstrap";

const Search = ({searchFilter}) => {
  console.log(searchFilter)
  const { loading, data } = useQuery(GET_USERS_BY_FILTER, {
    //dumbest fix in the world -AG
    variables: {username: searchFilter.searchFilter}
  });
  const users = data?.usersByFilter || [];
  
  const Results = ({users}) => {
    return (
      <>
      {console.log({users}, {data})}
        {users.map((user, index) => (
          <Card
            className="tester"
            key={user.username}
            user={user}
            index={index}
          >
           <a href={"/profile/"+user.username}>{user.username}</a>
          </Card>
        ))}
      </>
    );
  };
  return (
    <>
      {loading ? (
        <h1> Loading...</h1>
      ) : (
        <Results users={users}/>
      )}
    </>
  );
};

export default Search;