import React, { useState, useContext, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import RecipesContext from '../hooks/RecipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function ButtonsFavorite() {
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);
  const [urlCopied, setUrlCopied] = useState(false);

  const { saveRecipeToLocalStorage,
    removeRecipeFromLocalStorage,
    isRecipeOnLocalStorage } = useContext(RecipesContext);

  const { id } = useParams();

  const shareRecipe = () => {
    copy(window.location.href.replace('/in-progress', ''));
    setUrlCopied(true);
    const FOUR_SEC = 4000;
    setTimeout(() => setUrlCopied(false), FOUR_SEC);
  };

  const favoriteRecipe = () => {
    if (isRecipeOnLocalStorage(id)) {
      removeRecipeFromLocalStorage(id);
      setFavoriteIcon(whiteHeartIcon);
    } else {
      saveRecipeToLocalStorage(id);
      setFavoriteIcon(blackHeartIcon);
    }
  };

  const changeFavoriteIcon = () => {
    if (!isRecipeOnLocalStorage(id)) setFavoriteIcon(whiteHeartIcon);
    else setFavoriteIcon(blackHeartIcon);
  };

  useEffect(() => {
    changeFavoriteIcon();
  }, []);

  return (
    <div>
      {urlCopied && (<span>Link copied!</span>)}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ shareRecipe }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ favoriteRecipe }
        src={ favoriteIcon }
      >
        <img
          src={ favoriteIcon }
          alt="favorite"
        />
      </button>
    </div>
  );
}
