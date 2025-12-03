import React, { useReducer } from 'react';
import WebsContext, { WebsContextType } from './WebsContext';
import PageModel, { AspectRatioEnum } from '@/type/PageModel';
import type { ComponentSchema } from '@type/ComponentSchema';

const initialState: PageModel = {
  metadata: {
    id: new Date().getTime(),
    title: '',
    description: '',
    keywords: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  components: [],
  showIframe: true,
  selectedComponentId: -1,
  aspectRatio: AspectRatioEnum.RATIO_16_9,
  zoomRatio: 1,
  previewScrollTop: 0,
  previewScrollLeft: 0,
  background: {
    color: '#fff',
    image: '',
    repeat: 'no-repeat',
    position: 'center center',
    size: 'cover',
  }
}

interface ActionType {
  // 编辑Page源
  EDIT_TITLE: string,
  EDIT_DESCRIPTION: string,
  EDIT_KEYWORDS: string,
  UPDATE_PAGE: string,

  // 编辑组件
  ADD_COMPONENT: string,
  REMOVE_COMPONENT: string,
  EDIT_COMPONENT: string,

  EDIT_SHOW_IFRAME: string,
  EDIT_SELECT_COM: string,
  EDIT_ASPECT_RATIO: string,
  EDIT_ZOOM_RATIO: string,
  EDIT_PREVIEW_SCROLL: string,

  // 编辑背景
  EDIT_BACKGROUND: string,
}

const Actions: ActionType = {
  // 编辑Page源
  EDIT_TITLE: 'EDIT_TITLE',
  EDIT_DESCRIPTION: 'EDIT_DESCRIPTION',
  EDIT_KEYWORDS: 'EDIT_KEYWORDS',
  UPDATE_PAGE: 'UPDATE_PAGE',

  // 编辑组件
  ADD_COMPONENT: 'ADD_COMPONENT',
  REMOVE_COMPONENT: 'REMOVE_COMPONENT',
  EDIT_COMPONENT: 'EDIT_COMPONENT',

  // 编辑是否显示Iframe
  EDIT_SHOW_IFRAME: 'EDIT_SHOW_IFRAME',
  // 编辑选中组件索引
  EDIT_SELECT_COM: 'EDIT_SELECT_COM',
  // 编辑宽高比
  EDIT_ASPECT_RATIO: 'EDIT_ASPECT_RATIO',
  // 编辑缩放比例
  EDIT_ZOOM_RATIO: 'EDIT_ZOOM_RATIO',
  // 编辑预览区域滚动位置
  EDIT_PREVIEW_SCROLL: 'EDIT_PREVIEW_SCROLL',

  // 编辑背景
  EDIT_BACKGROUND: 'EDIT_BACKGROUND',
}



function WebsReducer(state: PageModel, action: {
  type: string; payload: {
    id?: number, title?: string, description?: string, keywords?: string[], createdAt?: Date, updatedAt?: Date,
    comSchemaId?: number, component?: ComponentSchema,
    showIframe?: boolean, compActiveIndex?: number,
    aspectRatio?: number, zoomRatio?: number,
    previewScrollTop?: number, previewScrollLeft?: number,
    background?: PageModel['background'],
  }
}) {
  switch (action.type) {
    case Actions.EDIT_TITLE:
      return {
        ...state,
        metadata: { ...state.metadata, title: action.payload.title! },
      }
    case Actions.EDIT_DESCRIPTION:
      return {
        ...state,
        metadata: { ...state.metadata, description: action.payload.description! },
      }
    case Actions.EDIT_KEYWORDS:
      return {
        ...state,
        metadata: { ...state.metadata, keywords: action.payload.keywords! },
      }
    case Actions.UPDATE_PAGE:
      return {
        ...state,
        metadata: { ...state.metadata, updatedAt: new Date() },
      }
    case Actions.ADD_COMPONENT:
      return {
        ...state,
        components: [...state.components, action.payload.component!],
      }
    case Actions.REMOVE_COMPONENT:
      return {
        ...state,
        components: state.components.filter((component: ComponentSchema) => component.comSchemaId !== action.payload.comSchemaId),
      }
    case Actions.EDIT_COMPONENT:
      return {
        ...state,
        components: state.components.map((component: ComponentSchema) => component.comSchemaId === action.payload.comSchemaId ? action.payload.component! : component),
      }
    case Actions.EDIT_SHOW_IFRAME:
      return {
        ...state,
        showIframe: action.payload.showIframe!,
      }
    case Actions.EDIT_SELECT_COM:
      return {
        ...state,
        compActiveIndex: action.payload.compActiveIndex!,
      }
    case Actions.EDIT_ASPECT_RATIO:
      return {
        ...state,
        aspectRatio: action.payload.aspectRatio!,
      }
    case Actions.EDIT_ZOOM_RATIO:
      return {
        ...state,
        zoomRatio: action.payload.zoomRatio!,
      }
    case Actions.EDIT_PREVIEW_SCROLL:
      return {
        ...state,
        previewScrollTop: action.payload.previewScrollTop!,
        previewScrollLeft: action.payload.previewScrollLeft!,
      }
    case Actions.EDIT_BACKGROUND:
      return {
        ...state,
        background: {
          ...state.background,
          ...action.payload.background!,
        }
      }
    default:
      return state;
  }
}

export default function WebsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(WebsReducer, initialState);

  const actions = {
    edit_title: (title: string) => dispatch({ type: Actions.EDIT_TITLE, payload: { title } }),
    edit_description: (description: string) => dispatch({ type: Actions.EDIT_DESCRIPTION, payload: { description } }),
    edit_keywords: (keywords: string[]) => dispatch({ type: Actions.EDIT_KEYWORDS, payload: { keywords } }),
    update_page: () => dispatch({ type: Actions.UPDATE_PAGE, payload: {} }),

    add_component: (component: ComponentSchema) => dispatch({ type: Actions.ADD_COMPONENT, payload: { component } }),
    remove_component: (id: number) => dispatch({ type: Actions.REMOVE_COMPONENT, payload: { id } }),
    edit_component: (id: number, component: ComponentSchema) => dispatch({ type: Actions.EDIT_COMPONENT, payload: { id, component } }),

    edit_show_iframe: (showIframe: boolean) => dispatch({ type: Actions.EDIT_SHOW_IFRAME, payload: { showIframe } }),
    edit_select_com: (compActiveIndex: number) => dispatch({ type: Actions.EDIT_SELECT_COM, payload: { compActiveIndex } }),
    edit_aspect_ratio: (aspectRatio: number) => dispatch({ type: Actions.EDIT_ASPECT_RATIO, payload: { aspectRatio } }),
    edit_zoom_ratio: (zoomRatio: number) => dispatch({ type: Actions.EDIT_ZOOM_RATIO, payload: { zoomRatio } }),
    edit_preview_scroll: (previewScrollTop: number, previewScrollLeft: number) => dispatch({ type: Actions.EDIT_PREVIEW_SCROLL, payload: { previewScrollTop, previewScrollLeft } }),
    edit_background: (background: PageModel['background']) => dispatch({ type: Actions.EDIT_BACKGROUND, payload: { background } }),
  }

  const contextValue: WebsContextType = {
    state,
    actions,
  }
  return (
    <WebsContext.Provider value={contextValue}>
      {children}
    </WebsContext.Provider>
  )
}
