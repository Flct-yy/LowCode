import React, { useReducer } from 'react';
import CardsContext from './ComsContext';
import Card from '@type/component';

const initialState: { cards: Card[] } = {
  cards: []
}

interface ActionType {
  ADD_CARD:string,
  REMOVE_CARD:string
}

const Actions:ActionType = {
  // 添加组件
  ADD_CARD: 'ADD_CARD',
  // 删除组件
  REMOVE_CARD: 'REMOVE_CARD',
}

function cardsReducer(state: typeof initialState, action: { type: string; payload: { card?: Card; id?: number } }) {
  switch (action.type) {
    case Actions.ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload.card!]
      }
    case Actions.REMOVE_CARD:
      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.payload.id)
      }
    default:
      return state;
  }
}

export default function CardsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cardsReducer, initialState);

  const actions = {
    addCard: (card: Card) => dispatch({ type: Actions.ADD_CARD, payload: { card } }),
    removeCard: (id: number) => dispatch({ type: Actions.REMOVE_CARD, payload: { id } }),
  }

  const contextValue = {
    state,
    actions,
  }
  return (
    <CardsContext.Provider value={contextValue}>
      {children}
    </CardsContext.Provider>
  )
}
