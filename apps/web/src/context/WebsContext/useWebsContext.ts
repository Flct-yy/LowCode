import WebsContext, { WebsContextType } from './WebsContext.ts';
import { useContext } from 'react';

export default function useWebsContext(): WebsContextType {
  const websContextValue = useContext(WebsContext);
  if (!websContextValue) {
    throw new Error('useWebsContext必须在WebsProvider中使用');
  }
  return websContextValue;
}
