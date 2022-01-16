import { alertActions } from '.';
import { formConstants } from '../_constants';

function addRecipe(recipeData) {
  return (dispatch) => {
    const recipes = localStorage.getItem('recipes');
    let jsonRecipes = {};
    if (recipes) {
      jsonRecipes = JSON.parse(recipes);
      jsonRecipes.data.push(recipeData);
    } else {
      jsonRecipes.data = [recipeData];
    }
    localStorage.setItem('recipes', JSON.stringify(jsonRecipes));
    dispatch({ type: formConstants.ADD_RECIPE, payload: recipeData });
    dispatch(alertActions.success('Recipe added successfully'));
  };
}

function filterRecipes(filters) {
  return (dispatch, getState) => {
    dispatch({ type: formConstants.FILTER_RECIPES, payload: { filters, originalRecipes: getState().recipeForm.recipes } });
  };
}

function getRecipes() {
  return { type: formConstants.GET_RECIPES };
}

export const formActions = {
  addRecipe,
  filterRecipes,
  getRecipes,
};
