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
  handleAddIngredient:()=>{},
  addUser: () => {},
  addRecipe: ()=>{},
  deleteRecipe: ()=>{},
  showRecipe:()=>{},
  loginUser:()=>{},
  loginUserFriends:()=>{},
  handleRecipe:()=>{}
})
export const contextProvider = context.Provider;
export default context;