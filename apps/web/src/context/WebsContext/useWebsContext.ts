import WebsContext from './WebsContext.ts';
import { useContext } from 'react';

export default function useWebsContext() {
  const websContext = useContext(WebsContext);
  if (!websContext) {
    throw new Error('useWebsContext必须在WebsProvider中使用');
  }
  return websContext;
}
