import React from 'react'

import useQuery from "./useQuery";

const StateContext = React.createContext(null); // 'QA test value'
 
export default ({ children }) => {
  //const [value, setValue] = React.useState(1);
  const [state, dispatch] = useQuery(
    React.useReducer( 
      (state,action) => { 
        switch (action.type) { 
          case 'update': return {...state, ...action.items}
          case 'replace': return action.items
          case 'reset': return {} 
          default: return state 
        }
      },
      {}, // empty state
    ),
    "replace",
    ['example']
  ) 

  // dispatch({type:'update', items: {leftPaneMode}})

  //const changeValue = React.useCallback(newValue => setValue(newValue), []);
  const changeValue = React.useCallback(action => dispatch(action), []);

  //const data = React.useMemo(() => [value, changeValue], [value, changeValue]);
  const data = React.useMemo(() => [state, changeValue], [state, changeValue]);
  return (
    <StateContext.Provider value={data}>{children}</StateContext.Provider>
  );
};
 
export const useStateContext = () => {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error(
      `useValue can only be used inside descendant components 
      of a component wrapped by SharedContextProvider`
    );
  }
  return context;
};