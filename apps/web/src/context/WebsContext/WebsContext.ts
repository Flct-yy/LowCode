import { createContext } from 'react';
import PageModel, { AspectRatioEnum } from '@type/PageModel';
import { type PageMetadata } from '@wect/type';
import type { ComponentSchema } from '@wect/type';
import { ConfigAreaEnum, ConfigItemFieldEnum } from '@wect/type';
import { ApiPageData } from './WebsProvider';

export interface WebsContextType {
  state: PageModel;
  actions: {
    set_api_page: (pageData: ApiPageData) => void;

    edit_title: (title: string) => void;
    edit_description: (description: string) => void;
    edit_keywords: (keywords: string[]) => void;
    update_page: () => void;

    add_component: (component: ComponentSchema, parentId: number, childrenIndex: number) => void;
    remove_component: (id: number) => void;
    edit_change_value: (areaName: ConfigAreaEnum, field: ConfigItemFieldEnum, currentValue: any) => void;
    edit_change_unit: (areaName: ConfigAreaEnum, field: ConfigItemFieldEnum, currentUnit: string) => void;
    handle_drag_drop: (sourceId: number, targetParentId: number, childrenIndex: number) => void;
    edit_lock_com: (id: number) => void;
    remove_preview_node: () => void;
    copy_component: (copyComponent: ComponentSchema) => void;

    edit_select_com: (compActiveIndex: number) => void;
    edit_aspect_ratio: (aspectRatio: AspectRatioEnum) => void;
    edit_zoom_ratio: (zoomRatio: number) => void;
    edit_preview_scroll: (previewScrollTop: number, previewScrollLeft: number) => void;
    edit_is_drag_com: (isDragCom: boolean) => void;
    edit_is_sliding: (isSliding: boolean) => void;
  };
}

// 创建带类型的上下文
const WebsContext = createContext<WebsContextType | undefined>(undefined);
export default WebsContext;
