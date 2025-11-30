import React, { useReducer } from 'react';
import ComsContext from './ComsContext';
import ComponentInstance from '@type/componentInstance';

const initialState: { Coms: ComponentInstance[] } = {
  Coms: []
}

interface ActionType {
  ADD_COM: string,
  REMOVE_COM: string
}

const Actions: ActionType = {
  // 添加组件
  ADD_COM: 'ADD_COM',
  // 删除组件
  REMOVE_COM: 'REMOVE_COM',
}

function ComsReducer(state: { Coms: ComponentInstance[] }, action: { type: string; payload: { Com?: ComponentInstance; id?: number } }) {
  switch (action.type) {
    case Actions.ADD_COM:
      return {
        ...state,
        Coms: [...state.Coms, action.payload.Com!]
      }
    case Actions.REMOVE_COM:
      return {
        ...state,
        Coms: state.Coms.filter(Com => Com.type.id !== action.payload.id)
      }
    default:
      return state;
  }
}

export default function ComsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(ComsReducer, initialState);

  const actions = {
    addCom: (Com: ComponentInstance) => dispatch({ type: Actions.ADD_COM, payload: { Com } }),
    removeCom: (id: number) => dispatch({ type: Actions.REMOVE_COM, payload: { id } }),
  }

  const contextValue = {
    state,
    actions,
  }
  return (
    <ComsContext.Provider value={contextValue}>
      {children}
    </ComsContext.Provider>
  )
}
