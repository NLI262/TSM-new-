const initState = {
    items: []
  }
  
  
  
  const rootReducer = (state = initState, action) => {
    if(action.type==="GET_PROJECT"){
      return{
          ...state,
          details:action.details
      }
  } else{
      return state;
  }
}
  
  export default rootReducer
  