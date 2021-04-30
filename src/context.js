import React from 'react'

const context= React.createContext({
  user:{},
  recipes:[],
  recipe:{},
  Login:null,
  checkedWords:[],
  friends:[],
  ingredients:[],
  randomRecipe:{},
  spoonApi:'',
  eventRecipe:null,
  handleAddIngredient:()=>{},
  handleDeleteIngredient:()=>{},
  addUser: () => {},
  addRecipe: ()=>{},
  deleteRecipe: ()=>{},
  showRecipe:()=>{},
  loginUser:()=>{},
  loginUserFriends:()=>{},
  handleRecipe:()=>{},
  handleSetEventRecipe:()=>{}
})
export const contextProvider = context.Provider;
export default context;