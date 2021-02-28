import React from 'react'

const context= React.createContext({
  user:{},
  recipes:[],
  Login:null,
  checkedWords:[],
  ingredients:[],
  randomRecipe:{},
  spoonApi:'',
  handleAddIngredient:()=>{},
  addUser: () => {},
  addRecipe: ()=>{},
  deleteRecipe: ()=>{},
  showRecipe:()=>{},
  LoginUser:()=>{}
})
export const contextProvider = context.Provider;
export default context;