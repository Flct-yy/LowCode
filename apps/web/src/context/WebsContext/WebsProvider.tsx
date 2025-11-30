import React, { useReducer } from 'react';
import WebsContext, { WebsContextType } from './WebsContext';
import PageModel from '@type/pageModel';
import ComponentInstance from '@type/componentInstance';

const initialState: PageModel = {
  components: [],
  showIframe: true,
  compActiveIndex: -1,
  aspectRatio: 16 / 9,
  zoomRatio: 1,
}

interface ActionType {
  ADD_COM: string,
  REMOVE_COM: string,
  EDIT_COMPONENT: string,

  EDIT_SHOW_IFRAME: string,
  EDIT_SELECT_COM: string,
  EDIT_ASPECT_RATIO: string,
  EDIT_ZOOM_RATIO: string,
}

const Actions: ActionType = {
  // 添加组件
  ADD_COM: 'ADD_COM',
  // 删除组件
  REMOVE_COM: 'REMOVE_COM',
  // 编辑组件列表
  EDIT_COMPONENT: 'EDIT_COMPONENT',

  // 编辑是否显示Iframe
  EDIT_SHOW_IFRAME: 'EDIT_SHOW_IFRAME',
  // 编辑选中组件索引
  EDIT_SELECT_COM: 'EDIT_SELECT_COM',
  // 编辑宽高比
  EDIT_ASPECT_RATIO: 'EDIT_ASPECT_RATIO',
  // 编辑缩放比例
  EDIT_ZOOM_RATIO: 'EDIT_ZOOM_RATIO',
}



function WebsReducer(state: PageModel, action: {
  type: string; payload: {
    id?: number, component?: ComponentInstance, showIframe?: boolean, compActiveIndex?: number, aspectRatio?: number, zoomRatio?: number
  }
}) {
  switch (action.type) {
    case Actions.ADD_COM:
      return {
        ...state,
        components: [...state.components, action.payload.component!],
      }
    case Actions.REMOVE_COM:
      return {
        ...state,
        components: state.components.filter((Com: ComponentInstance) => Com.id !== action.payload.id),
      }
    case Actions.EDIT_COMPONENT:
      return {
        ...state,
        components: state.components.map((Com: ComponentInstance) => Com.id === action.payload.id ? action.payload.component! : Com),
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
    default:
      return state;
  }
}

export default function WebsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(WebsReducer, initialState);

  const actions = {
    add_com: (com: ComponentInstance) => dispatch({ type: Actions.ADD_COM, payload: { component: com } }),
    remove_com: (id: number) => dispatch({ type: Actions.REMOVE_COM, payload: { id } }),
    edit_com: (id: number, com: ComponentInstance) => dispatch({ type: Actions.EDIT_COMPONENT, payload: { id, component: com } }),
    edit_show_iframe: (showIframe: boolean) => dispatch({ type: Actions.EDIT_SHOW_IFRAME, payload: { showIframe } }),
    edit_select_com: (compActiveIndex: number) => dispatch({ type: Actions.EDIT_SELECT_COM, payload: { compActiveIndex } }),
    edit_aspect_ratio: (aspectRatio: number) => dispatch({ type: Actions.EDIT_ASPECT_RATIO, payload: { aspectRatio } }),
    edit_zoom_ratio: (zoomRatio: number) => dispatch({ type: Actions.EDIT_ZOOM_RATIO, payload: { zoomRatio } }),
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
