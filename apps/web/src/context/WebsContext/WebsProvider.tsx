import React, { useReducer, useState, useEffect } from 'react';
import WebsContext, { WebsContextType } from './WebsContext';
import PageModel, { AspectRatioEnum } from '@type/PageModel';
import { type ComponentSchema } from '@wect/type';
import { ConfigAreaEnum, ConfigItemFieldEnum } from '@wect/type';
import { useNavigate } from 'react-router-dom';
import pageApi from '@/api/pageApi';
import { stringToAspectRatioEnum } from '@/utils/stringToAspectRatioEnum';
import { ComTree, comTreeInstance } from '@wect/type';

export interface PageData extends Pick<PageModel, 'comTree' | 'metadata' | 'aspectRatio'> { }


const Actions = {
  // 通过API返回的数据设置Page数据
  SET_PAGE: 'SET_PAGE',

  // 编辑Page源
  EDIT_TITLE: 'EDIT_TITLE',
  EDIT_DESCRIPTION: 'EDIT_DESCRIPTION',
  EDIT_KEYWORDS: 'EDIT_KEYWORDS',
  UPDATE_PAGE: 'UPDATE_PAGE',

  // 编辑组件
  ADD_COMPONENT: 'ADD_COMPONENT',
  REMOVE_COMPONENT: 'REMOVE_COMPONENT',
  EDIT_COM_TREE: 'EDIT_COM_TREE',
  EDIT_CHANGE_VALUE: 'EDIT_CHANGE_VALUE',
  EDIT_CHANGE_UNIT: 'EDIT_CHANGE_UNIT',
  HANDLE_DRAG_DROP: 'HANDLE_DRAG_DROP',
  EDIT_LOCK_COM: 'EDIT_LOCK_COM',
  REMOVE_PREVIEW_NODE: 'REMOVE_PREVIEW_NODE',
  COPY_COMPONENT: 'COPY_COMPONENT',

  // 编辑选中组件索引
  EDIT_SELECT_COM: 'EDIT_SELECT_COM',
  // 编辑宽高比
  EDIT_ASPECT_RATIO: 'EDIT_ASPECT_RATIO',
  // 编辑缩放比例
  EDIT_ZOOM_RATIO: 'EDIT_ZOOM_RATIO',
  // 编辑预览区域滚动位置
  EDIT_PREVIEW_SCROLL: 'EDIT_PREVIEW_SCROLL',
  // 编辑是否拖动画布还是组件
  EDIT_IS_DRAG_COM: 'EDIT_IS_DRAG_COM',
  // 编辑是否滑动
  EDIT_IS_SLIDING: 'EDIT_IS_SLIDING',
}

function WebsReducer(state: PageModel, action: {
  type: string;
  payload: {
    PageData?: PageData,
    metadataId?: number, title?: string, description?: string, keywords?: string[], createdAt?: Date, updatedAt?: Date,

    selectedComponentId?: number,
    aspectRatio?: AspectRatioEnum, zoomRatio?: number,

    previewScrollTop?: number, previewScrollLeft?: number,

    isDragCom?: boolean, isSliding?: boolean,

    comSchemaId?: number, component?: ComponentSchema, copyComponent?: ComponentSchema,

    areaName?: ConfigAreaEnum, field?: ConfigItemFieldEnum, parentId?: number,
    currentValue?: any,
    currentUnit?: string,

    sourceId?: number, targetParentId?: number, childrenIndex?: number,
  }
}): PageModel {
  switch (action.type) {
    case Actions.SET_PAGE:
      return {
        ...state,
        ...action.payload.PageData,
      }
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
      state.comTree.addNode(action.payload.component!, action.payload.parentId!, action.payload.childrenIndex!)
      return {
        ...state,
        comTree: state.comTree,
      }
    case Actions.REMOVE_COMPONENT:
      state.comTree.removeNode(action.payload.comSchemaId!)
      return {
        ...state,
        comTree: state.comTree,
      }
    case Actions.EDIT_COM_TREE:
      state.comTree.setRoot(action.payload.component!)
      return {
        ...state,
        comTree: state.comTree,
      }
    case Actions.EDIT_CHANGE_VALUE:
      state.comTree.updateNodeConfig(state.selectedComponentId!, action.payload.areaName!, action.payload.field!, action.payload.currentValue!)
      return {
        ...state,
        comTree: state.comTree,
      }
    case Actions.EDIT_CHANGE_UNIT:
      state.comTree.updateNodeUnit(state.selectedComponentId!, action.payload.areaName!, action.payload.field!, action.payload.currentUnit!)
      return {
        ...state,
        comTree: state.comTree,
      }
    case Actions.HANDLE_DRAG_DROP:
      state.comTree.dropDrag(action.payload.sourceId!, action.payload.targetParentId!, action.payload.childrenIndex!)
      return {
        ...state,
        comTree: state.comTree,
      }
    case Actions.EDIT_LOCK_COM:
      state.comTree.updateNodeLock(action.payload.comSchemaId!)
      return {
        ...state,
        comTree: state.comTree,
      }
    case Actions.REMOVE_PREVIEW_NODE:
      state.comTree.removePreviewNodes()
      return {
        ...state,
        comTree: state.comTree,
      }
    case Actions.COPY_COMPONENT:
      return {
        ...state,
        copyComponent: action.payload.copyComponent!,
      }
    case Actions.EDIT_SELECT_COM:
      return {
        ...state,
        selectedComponentId: action.payload.selectedComponentId!,
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
    case Actions.EDIT_IS_DRAG_COM:
      return {
        ...state,
        isDragCom: action.payload.isDragCom!,
      }
    case Actions.EDIT_IS_SLIDING:
      return {
        ...state,
        isSliding: action.payload.isSliding!,
      }
    default:
      return state;
  }
}

export default function WebsProvider({ pageId, children }: { pageId: number, children: React.ReactNode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const defaultPageState: PageModel = {
    metadata: {
      id: 0,
      title: '',
      description: '',
      keywords: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    comTree: comTreeInstance,
    copyComponent: undefined,
    selectedComponentId: -1,
    aspectRatio: AspectRatioEnum.RATIO_16_9,
    zoomRatio: 1,
    previewScrollTop: 0,
    previewScrollLeft: 0,
    isDragCom: false,
    isSliding: false,
  };
  // 使用useEffect确保API只在pageId变化时调用一次
  useEffect(() => {
    // 重置状态
    setLoading(true);
    setError(null);
    // 验证pageId
    if (!pageId || typeof pageId !== 'number') {
      setError('pageId 为空或类型不正确');
      setLoading(false);
      navigate('/');
      return;
    }
    // 调用API获取页面详情
    pageApi.getPageById(pageId)
      .then((res) => {
        if (!res || !res.pageMetadata || !res.com_tree) {
          throw new Error('API返回数据格式不正确');
        }
        // 数据转换
        const transformedData: PageData = {
          metadata: {
            ...res.pageMetadata,
            // 确保日期字段是Date对象
            createdAt: new Date(res.pageMetadata.createdAt),
            updatedAt: new Date(res.pageMetadata.updatedAt),
          },
          // 使用API返回的com_tree数据创建ComTree实例
          comTree: new ComTree(res.com_tree.root, res.com_count),
          aspectRatio: stringToAspectRatioEnum(res.aspect_ratio),
        };
        // 调用set_page设置页面数据
        actions.set_page(transformedData);
      })
      .catch((error) => {
        // 处理API调用错误
        const errorMessage = error instanceof Error ? error.message : '获取页面详情失败';
        console.error('获取页面详情失败:', error);
        setError(errorMessage);
        // 跳转到列表页
        navigate('/');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pageId, navigate]);

  // 使用useReducer管理状态，初始状态为initialPageState
  const [state, dispatch] = useReducer(WebsReducer, defaultPageState);
  const actions = {
    set_page: (PageData: PageData) => {
      dispatch({ type: Actions.SET_PAGE, payload: { PageData } })
    },
    edit_title: (title: string) => {
      dispatch({ type: Actions.EDIT_TITLE, payload: { title } }),
        dispatch({ type: Actions.UPDATE_PAGE, payload: {} })

    }, edit_description: (description: string) => {
      dispatch({ type: Actions.EDIT_DESCRIPTION, payload: { description } }),
        dispatch({ type: Actions.UPDATE_PAGE, payload: {} })

    }, edit_keywords: (keywords: string[]) => {
      dispatch({ type: Actions.EDIT_KEYWORDS, payload: { keywords } }),
        dispatch({ type: Actions.UPDATE_PAGE, payload: {} })

    }, update_page: () => {
      dispatch({
        type: Actions.UPDATE_PAGE, payload: {}
      }),
        dispatch({ type: Actions.UPDATE_PAGE, payload: {} })

    },
    add_component: (component: ComponentSchema, parentId: number, childrenIndex: number) => {
      dispatch({ type: Actions.ADD_COMPONENT, payload: { component, parentId, childrenIndex } }),
        dispatch({ type: Actions.UPDATE_PAGE, payload: {} })

    },
    remove_component: (comSchemaId: number) => {
      dispatch({ type: Actions.REMOVE_COMPONENT, payload: { comSchemaId } }),
        dispatch({ type: Actions.UPDATE_PAGE, payload: {} })

    },
    edit_change_value: (areaName: ConfigAreaEnum, field: ConfigItemFieldEnum, currentValue: any) => {
      dispatch({ type: Actions.EDIT_CHANGE_VALUE, payload: { areaName, field, currentValue } }),
        dispatch({ type: Actions.UPDATE_PAGE, payload: {} })
    },
    edit_change_unit: (areaName: ConfigAreaEnum, field: ConfigItemFieldEnum, currentUnit: string) => {
      dispatch({ type: Actions.EDIT_CHANGE_UNIT, payload: { areaName, field, currentUnit } }),
        dispatch({ type: Actions.UPDATE_PAGE, payload: {} })
    },
    handle_drag_drop: (sourceId: number, targetParentId: number, childrenIndex: number) => {
      dispatch({
        type: Actions.HANDLE_DRAG_DROP, payload: {
          sourceId, targetParentId
          , childrenIndex
        }
      })
      dispatch({ type: Actions.UPDATE_PAGE, payload: {} })
    },
    edit_lock_com: (comSchemaId: number) => {
      dispatch({ type: Actions.EDIT_LOCK_COM, payload: { comSchemaId } }),
        dispatch({ type: Actions.UPDATE_PAGE, payload: {} })
    },
    remove_preview_node: () => {
      dispatch({ type: Actions.REMOVE_PREVIEW_NODE, payload: {} }),
        dispatch({ type: Actions.UPDATE_PAGE, payload: {} })
    },
    copy_component: (copyComponent: ComponentSchema) => {
      dispatch({ type: Actions.COPY_COMPONENT, payload: { copyComponent } }),
        dispatch({ type: Actions.UPDATE_PAGE, payload: {} })
    },
    edit_select_com: (selectedComponentId: number) => {
      dispatch({ type: Actions.EDIT_SELECT_COM, payload: { selectedComponentId } }),
        dispatch({ type: Actions.UPDATE_PAGE, payload: {} })
    },
    edit_aspect_ratio: (aspectRatio: AspectRatioEnum) => {
      dispatch({ type: Actions.EDIT_ASPECT_RATIO, payload: { aspectRatio } })
      dispatch({ type: Actions.UPDATE_PAGE, payload: {} })
    },
    edit_zoom_ratio: (zoomRatio: number) => {
      dispatch({ type: Actions.EDIT_ZOOM_RATIO, payload: { zoomRatio } })
      dispatch({ type: Actions.UPDATE_PAGE, payload: {} })
    },
    edit_preview_scroll: (previewScrollTop: number, previewScrollLeft: number) => {
      dispatch({ type: Actions.EDIT_PREVIEW_SCROLL, payload: { previewScrollTop, previewScrollLeft } })
      dispatch({ type: Actions.UPDATE_PAGE, payload: {} })
    },
    edit_is_drag_com: (isDragCom: boolean) => {
      dispatch({ type: Actions.EDIT_IS_DRAG_COM, payload: { isDragCom } })
      dispatch({ type: Actions.UPDATE_PAGE, payload: {} })
    },
    // 编辑是否滑动
    edit_is_sliding: (isSliding: boolean) => {
      dispatch({ type: Actions.EDIT_IS_SLIDING, payload: { isSliding } })
      dispatch({ type: Actions.UPDATE_PAGE, payload: {} })
    },
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
