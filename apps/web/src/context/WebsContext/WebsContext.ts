import { createContext } from 'react';
import PageModel from '@type/pageModel';
import ComponentInstance from '@type/componentInstance';


export interface WebsContextType {
  state: PageModel;
  actions: {
    add_com: (com: ComponentInstance) => void;
    remove_com: (id: number) => void;
    edit_com: (id: number, com: ComponentInstance) => void;
    edit_show_iframe: (showIframe: boolean) => void;
    edit_select_com: (compActiveIndex: number) => void;
    edit_aspect_ratio: (aspectRatio: number) => void;
    edit_zoom_ratio: (zoomRatio: number) => void;
  };
}

// 创建带类型的上下文
const WebsContext = createContext<WebsContextType | undefined>(undefined);
export default WebsContext;
