import CardsContext from './CardsContext.ts';
import { useContext } from 'react';

export default function useCardsContext() {
  const cardsContext = useContext(CardsContext);
  if (!cardsContext) {
    throw new Error('useCardsContext必须在CardsProvider中使用');
  }
  return cardsContext;
}
