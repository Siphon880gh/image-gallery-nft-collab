import React, { useState } from "react";

// Assets
import "./FavoriteButton.css";

// GraphQL
import { FAVORITE, UNFAVORITE } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

export default function FavoriteButton({ noftId, favoritedIds }) {
    //   console.log({favoritedIds})

    // Favoriting/Unfavoriting to graphQL
    let [favorite] = useMutation(FAVORITE);
    let [unfavorite] = useMutation(UNFAVORITE);

    let isFavoritedByMe = favoritedIds.includes(noftId);
    let [favorited, setFavorite] = useState(isFavoritedByMe);

    // handleFavorite toggles the favorite button style and also updates the User favorites regarding the current post
    let handleFavorite = async (event) => {

        // Prevents it from triggering more than once when clicked
        event.stopPropagation();
        event.preventDefault();

        let handleButton = event.target;
        let canFavorite = handleButton.classList.contains("can-favorite");

        if (canFavorite) {
            try {
                favorite({
                    variables: { reprintId: noftId }
                });
            } catch (e) {
                console.error(e);
            }
            handleButton.classList.remove("can-favorite");
        } else {
            try {
                unfavorite({
                    variables: { reprintId: noftId }
                });
            } catch (e) {
                console.error(e);
            }
            handleButton.classList.add("can-favorite");
        } // else

    }; // handleFavorite

    return (
        <button className={favorited ? "favorite-btn" : "favorite-btn can-favorite"} onClick={handleFavorite} />
    );
};
// export default FavoriteButton;