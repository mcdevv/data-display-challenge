import React from "react";
//import styled from "styled-components";
//import tw from "tailwind.macro";
//import classNames from 'classnames'

// global shared state; reflect state in URL
import {useStateContext} from './StateContext'

const initialState = {
  key: 'value - initial state',
}

export default () => {

  const[state,dispatch] = useStateContext()
  React.useEffect(() => {
    dispatch({type: 'replace', items: initialState})
    console.log('state: ', state)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
 
  return (

    <div className="
           h-screen
           flex flex-col items-center
           p-4
           bg-green-200
         "
    >

      <div className="">
        <h1 className="text-2xl">CRA Starter</h1>
      </div>

      <div 
        className="
          w-11/12
          max-w-screen-xl
          relative
          pt-4 pr-4
        "
        style={{height:'90vh'}}
      >

        {state.key}

      </div>

    </div>

  );
};

