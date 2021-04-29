import React from "react";
import { GET_USERS_BY_FILTER } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import "./Search.css";
const Search = ({searchFilter}) => {
  // console.log(searchFilter)
  const { loading, data } = useQuery(GET_USERS_BY_FILTER, {
    //dumbest fix in the world -AG
    variables: {username: searchFilter?.searchFilter || "THIS_STRING_PURPOSELY_CANNOT_BE_FOUND"}
  });
  const users = data?.usersByFilter || [];
  
  const Results = ({users}) => {
    return (
      <div className="overlay-under">
      {/* {console.log({users}, {data})} */}
        {users.map((user, index) => (
          <div 
            className="suggestion-item"
            key={user.username}
            user={user}
            index={index}
          >
           <a href={"/profile/"+user.username}>{user.username}</a>
          </div>
        ))}
      </div>
    );
  };
  return (
    <>
      {!loading && (
        <Results users={users}/>
      )}
    </>
  );
};

export default Search;