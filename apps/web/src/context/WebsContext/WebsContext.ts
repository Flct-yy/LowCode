import { createContext } from 'react';
import PageModel from '@type/PageModel';
import type { ComponentSchema } from '@type/ComponentSchema';
import { ConfigAreaEnum, ConfigItemFieldEnum } from '@type/Config';



export interface WebsContextType {
  state: PageModel;
  actions: {
    edit_title: (title: string) => void;
    edit_description: (description: string) => void;
    edit_keywords: (keywords: string[]) => void;
    update_page: () => void;

    add_component: (component: ComponentSchema, parentId: number) => void;
    remove_component: (id: number) => void;
    edit_change_value: (areaName: ConfigAreaEnum, field: ConfigItemFieldEnum, currentValue: any) => void;
    edit_change_unit: (areaName: ConfigAreaEnum, field: ConfigItemFieldEnum, currentUnit: string) => void;

    edit_show_iframe: (showIframe: boolean) => void;
    edit_select_com: (compActiveIndex: number) => void;
    edit_aspect_ratio: (aspectRatio: number) => void;
    edit_zoom_ratio: (zoomRatio: number) => void;
    edit_preview_scroll: (previewScrollTop: number, previewScrollLeft: number) => void;

    edit_background: (background: PageModel['background']) => void;
  };
}

// 创建带类型的上下文
const WebsContext = createContext<WebsContextType | undefined>(undefined);
export default WebsContext;
