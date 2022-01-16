import { formConstants } from '../_constants';

const initialState = localStorage.getItem('recipes') ? JSON.parse(localStorage.getItem('recipes')).data : [];

export function recipeForm(state = { recipes: initialState }, action) {
  switch (action.type) {
    case formConstants.ADD_RECIPE:
      return { recipes: [...state.recipes, action.payload] };
    default:
      return state;
  }
}

export function filteredRecipes(state = { recipes: initialState }, action) {
  switch (action.type) {
    case formConstants.FILTER_RECIPES:
      return { recipes: [...action.payload.originalRecipes.filter((recipe) => action.payload.filters.some((r) => recipe.listIngredients.indexOf(r) >= 0))] };
    default:
      return state;
  }
}

export function recipes(state = { recipes: initialState }, action) {
  switch (action.type) {
    case formConstants.GET_RECIPES:
      return { recipes: [...state.recipes] };
    default:
      return state;
  }
}
