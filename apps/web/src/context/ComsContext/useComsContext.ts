import ComsContext from './ComsContext.ts';
import { useContext } from 'react';

export default function useComsContext() {
  const context = useContext(ComsContext);
  if (!context) {
    throw new Error('useComsContext必须在ComsProvider中使用');
  }
  return context;
}
