import React, { useState } from "react";

// Assets
import "./FavoriteButton.css";

// GraphQL
import { FAVORITE, UNFAVORITE } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

export default function FavoriteButton({ noftId, favoritedIds }) {
    console.log({ favoritedIds })

    // Favoriting/Unfavoriting to graphQL
    let [favorite] = useMutation(FAVORITE);
    let [unfavorite] = useMutation(UNFAVORITE);

    let isFavoritedByMe = favoritedIds.includes(noftId);
    let [favorited, setFavorite] = useState(isFavoritedByMe);

    // handleFavorite toggles the favorite button style and also updates the User favorites regarding the current post
    let handleFavorite = async (event) => {

        let handleButton = event.target;
        let isFavoriting = handleButton.classList.contains("favoriting");

        if (isFavoriting) {
            try {
                favorite({
                    variables: { reprintId: noftId }
                });
            } catch (e) {
                console.error(e);
            }
        } else {
            try {
                unfavorite({
                    variables: { reprintId: noftId }
                });
            } catch (e) {
                console.error(e);
            }
        } // else

        event.target.classList.toggle("favoriting");
    }; // handleFavorite

    return (
        <button className={favorited ? "favorite-btn" : "favorite-btn favoriting"} onClick={handleFavorite} />
    );
};
// export default FavoriteButton;