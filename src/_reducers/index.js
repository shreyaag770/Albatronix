import { combineReducers } from 'redux'

import { recipeForm, filteredRecipes, recipes } from './recipe.reducer'
import { notification } from './notification.reducer'
import { loader } from './loader.reducer'

const rootReducer = combineReducers({
  recipeForm,
  notification,
  filteredRecipes,
  recipes,
  loader
})

export default rootReducer
