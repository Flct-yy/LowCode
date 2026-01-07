-- =============================================
-- 低代码平台页面初始化脚本（page_model主表 + page_metadata从表）
-- 适配指定表结构：先建表→建序列→绑定默认值→插入数据
-- =============================================
-- 事务包裹：所有操作原子性执行
BEGIN;

-- =============================================
-- 1. 清理原有表和序列（开发环境使用，生产环境注释）
-- =============================================
DROP TABLE IF EXISTS public.page_metadata CASCADE;
DROP TABLE IF EXISTS public.page_model CASCADE;
DROP SEQUENCE IF EXISTS public.page_model_id_seq;
DROP SEQUENCE IF EXISTS public.page_metadata_id_seq;

-- =============================================
-- 2. 创建page_model主表（按指定结构）
-- =============================================
-- 第一步：先创建表（不指定序列默认值）
CREATE TABLE public.page_model (
    id bigint NOT NULL, -- 先只定义主键字段，不设置默认值
    com_tree json NOT NULL,  -- 组件树JSON数据
    aspect_ratio varchar(20) NOT NULL DEFAULT '16/9', -- 宽高比例（字符串类型，长度限制20足够）
    CONSTRAINT page_model_pkey PRIMARY KEY (id)
);

-- 第二步：创建序列并绑定到主表主键列
CREATE SEQUENCE public.page_model_id_seq 
    START WITH 1 
    INCREMENT BY 1
    OWNED BY public.page_model.id; -- 表已存在，可正常绑定

-- 第三步：给表的id字段设置默认值（关联序列，实现自增）
ALTER TABLE public.page_model 
ALTER COLUMN id SET DEFAULT nextval('public.page_model_id_seq'::regclass);

-- =============================================
-- 3. 创建page_metadata从表（按指定结构）
-- =============================================
-- 第一步：创建从表（不设置序列默认值）
CREATE TABLE public.page_metadata (
    id bigint NOT NULL, -- 先不设置默认值
    model_id bigint NOT NULL,  -- 关联主表page_model的主键id
    title character varying(255) NOT NULL,  -- 页面标题
    description text NOT NULL,  -- 页面描述
    keywords text[] NOT NULL DEFAULT '{}',  -- 关键词数组
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- 更新时间
    -- 主键约束
    CONSTRAINT page_metadata_pkey PRIMARY KEY (id),
    -- 外键约束：关联主表page_model的主键id
    CONSTRAINT fk_page_metadata_page_model FOREIGN KEY (model_id)
        REFERENCES public.page_model (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    -- 标题唯一约束
    CONSTRAINT uk_page_metadata_title UNIQUE (title),
    -- 一对一关联约束
    CONSTRAINT uk_page_metadata_model_id UNIQUE (model_id)
);

-- 第二步：创建序列并绑定到从表主键列
CREATE SEQUENCE public.page_metadata_id_seq 
    START WITH 1 
    INCREMENT BY 1
    OWNED BY public.page_metadata.id;

-- 第三步：给从表的id字段设置默认值（补全原代码缺失步骤）
ALTER TABLE public.page_metadata 
ALTER COLUMN id SET DEFAULT nextval('public.page_metadata_id_seq'::regclass);

-- =============================================
-- 4. 插入主表page_model数据（组件树）
-- =============================================
INSERT INTO public.page_model (com_tree, zoom_ratio)
VALUES
-- 首页组件树
(
  '{
    "comSchemaId": 1,
    "metadata": {
      "componentId": 1,
      "componentName": "根节点",
      "componentType": "Root",
      "category": "root",
      "tags": [],
      "version": "1.0.0"
    },
    "config": [],
    "children": [
      {
        "comSchemaId": 2,
        "metadata": {
          "componentId": 2,
          "componentName": "弹性布局",
          "componentType": "Flex",
          "category": "layout",
          "tags": [],
          "version": "1.0.0"
        },
        "config": [
          {
            "areaName": "布局",
            "configItem": [
              {
                "field": "flexDirection",
                "label": "方向",
                "uiType": "Select",
                "defaultValue": "row",
                "currentValue": "row",
                "options": [
                  {"label": "水平", "value": "row"},
                  {"label": "垂直", "value": "column"}
                ]
              },
              {
                "field": "gap",
                "label": "间距",
                "uiType": "InputNumber",
                "defaultValue": 10,
                "currentValue": 20,
                "unit": "px",
                "min": 0,
                "max": 100,
                "step": 1
              }
            ]
          },
          {
            "areaName": "常规",
            "configItem": [
              {
                "field": "width",
                "label": "宽度",
                "uiType": "InputNumber",
                "defaultValue": 100,
                "currentValue": 80,
                "unit": "%",
                "min": 0,
                "max": 100,
                "step": 1
              },
              {
                "field": "backgroundColor",
                "label": "背景颜色",
                "uiType": "ColorPicker",
                "defaultValue": "#ffffff",
                "currentValue": "#f5f5f5"
              }
            ]
          },
          {
            "areaName": "文字",
            "configItem": [
              {
                "field": "text",
                "label": "文本内容",
                "uiType": "Input",
                "defaultValue": "",
                "currentValue": "低代码平台首页 - 一站式可视化开发"
              },
              {
                "field": "fontSize",
                "label": "字体大小",
                "uiType": "InputNumber",
                "defaultValue": 16,
                "currentValue": 18,
                "unit": "px",
                "min": 12,
                "max": 72,
                "step": 1
              }
            ]
          }
        ],
        "children": [],
        "parentId": 1,
        "isLocked": false,
        "isVisible": true
      }
    ],
    "parentId": 0,
    "isLocked": false,
    "isVisible": true
  }'::json,
  '16/9' -- zoom_ratio 默认值
),
-- 示例页面组件树
(
  '{
    "comSchemaId": 1766207985933,
    "metadata": {
      "componentId": 0,
      "componentName": "根节点",
      "componentType": "Root",
      "category": "root",
      "tags": [],
      "version": "1.0.0"
    },
    "config": [],
    "children": [
      {
        "comSchemaId": 1766208085778,
        "metadata": {
          "componentId": 1,
          "componentName": "Flex",
          "componentType": "Flex",
          "category": "layout",
          "tags": [
            "布局",
            "Flex"
          ],
          "version": "1.0.0",
          "description": "用于布局的Flex组件",
          "icon": "flex-icon"
        },
        "position": {
          "x": 0,
          "y": 0,
          "position": "static",
          "zIndex": 0
        },
        "config": [
          {
            "areaName": "布局",
            "configItem": [
              {
                "field": "backgroundColor",
                "label": "背景颜色",
                "uiType": "ColorPicker",
                "defaultValue": "#ffffff",
                "currentValue": "#ffffff"
              },
              {
                "field": "flexWrap",
                "label": "换行",
                "uiType": "Group",
                "defaultValue": "nowrap",
                "currentValue": "nowrap",
                "options": [
                  {
                    "label": "换行",
                    "value": "wrap"
                  },
                  {
                    "label": "不换行",
                    "value": "nowrap"
                  }
                ]
              },
              {
                "field": "flexDirection",
                "label": "主轴方向",
                "uiType": "Group",
                "defaultValue": "row",
                "currentValue": "row",
                "options": [
                  {
                    "label": "水平方向",
                    "value": "row"
                  },
                  {
                    "label": "垂直方向",
                    "value": "column"
                  }
                ]
              },
              {
                "field": "justifyContent",
                "label": "主轴对齐",
                "uiType": "Select",
                "defaultValue": "center",
                "currentValue": "center",
                "options": [
                  {
                    "label": "左对齐",
                    "value": "flex-start"
                  },
                  {
                    "label": "居中",
                    "value": "center"
                  },
                  {
                    "label": "右对齐",
                    "value": "flex-end"
                  },
                  {
                    "label": "均匀分布",
                    "value": "space-around"
                  },
                  {
                    "label": "两侧分布",
                    "value": "space-between"
                  }
                ]
              },
              {
                "field": "alignContent",
                "label": "多行对齐",
                "uiType": "Select",
                "defaultValue": "center",
                "currentValue": "center",
                "options": [
                  {
                    "label": "左对齐",
                    "value": "flex-start"
                  },
                  {
                    "label": "居中",
                    "value": "center"
                  },
                  {
                    "label": "右对齐",
                    "value": "flex-end"
                  },
                  {
                    "label": "均匀分布",
                    "value": "space-around"
                  },
                  {
                    "label": "两侧分布",
                    "value": "space-between"
                  }
                ]
              },
              {
                "field": "alignItems",
                "label": "侧轴对齐",
                "uiType": "Select",
                "defaultValue": "center",
                "currentValue": "center",
                "options": [
                  {
                    "label": "左对齐",
                    "value": "flex-start"
                  },
                  {
                    "label": "居中",
                    "value": "center"
                  },
                  {
                    "label": "右对齐",
                    "value": "flex-end"
                  },
                  {
                    "label": "基线对齐",
                    "value": "baseline"
                  },
                  {
                    "label": "拉伸",
                    "value": "stretch"
                  }
                ]
              },
              {
                "field": "gap",
                "label": "间距",
                "uiType": "DoubleInputNumber",
                "defaultValue": {
                  "one": 0,
                  "two": 0
                },
                "currentValue": {
                  "one": 0,
                  "two": 0
                },
                "min": 0,
                "max": 100,
                "step": 1,
                "unit": "px"
              },
              {
                "field": "MarginPadding",
                "label": "边距",
                "uiType": "MarginPadding",
                "defaultValue": {
                  "margin": {
                    "top": 0,
                    "right": 0,
                    "bottom": 0,
                    "left": 0
                  },
                  "padding": {
                    "top": 0,
                    "right": 0,
                    "bottom": 0,
                    "left": 0
                  }
                },
                "currentValue": {
                  "margin": {
                    "top": 0,
                    "right": 0,
                    "bottom": 0,
                    "left": 0
                  },
                  "padding": {
                    "top": 0,
                    "right": 0,
                    "bottom": 0,
                    "left": 0
                  }
                },
                "unit": "px"
              }
            ]
          },
          {
            "areaName": "常规",
            "configItem": [
              {
                "field": "width",
                "label": "宽度",
                "uiType": "InputNumber",
                "defaultValue": 100,
                "currentValue": 100,
                "step": 1,
                "currentUnit": "%",
                "units": [
                  {
                    "label": "px",
                    "value": "px"
                  },
                  {
                    "label": "%",
                    "value": "%"
                  }
                ],
                "mins": [
                  0,
                  0
                ],
                "maxs": [
                  1000,
                  100
                ]
              },
              {
                "field": "height",
                "label": "高度",
                "uiType": "InputNumber",
                "defaultValue": 60,
                "currentValue": 60,
                "step": 1,
                "currentUnit": "px",
                "units": [
                  {
                    "label": "px",
                    "value": "px"
                  },
                  {
                    "label": "%",
                    "value": "%"
                  }
                ],
                "mins": [
                  0,
                  0
                ],
                "maxs": [
                  1000,
                  100
                ]
              }
            ]
          },
          {
            "areaName": "边框",
            "configItem": [
              {
                "field": "borderColor",
                "label": "边框颜色",
                "uiType": "ColorPicker",
                "defaultValue": "#000000",
                "currentValue": "#000000"
              },
              {
                "field": "borderWidth",
                "label": "边框宽度",
                "uiType": "InputNumber",
                "defaultValue": 0,
                "currentValue": 0,
                "min": 0,
                "max": 100,
                "step": 1,
                "unit": "px"
              },
              {
                "field": "borderRadius",
                "label": "边框圆角",
                "uiType": "InputNumber",
                "defaultValue": 0,
                "currentValue": 0,
                "min": 0,
                "max": 100,
                "step": 1,
                "unit": "px"
              },
              {
                "field": "borderStyle",
                "label": "边框样式",
                "uiType": "Group",
                "defaultValue": "solid",
                "currentValue": "solid",
                "options": [
                  {
                    "label": "实线",
                    "value": "solid"
                  },
                  {
                    "label": "虚线",
                    "value": "dashed"
                  },
                  {
                    "label": "点线",
                    "value": "dotted"
                  }
                ]
              }
            ]
          }
        ],
        "children": [],
        "parentId": 1766207985933,
        "isLocked": false,
        "isVisible": true
      },
      {
        "comSchemaId": 1766208090099,
        "metadata": {
          "componentId": 1,
          "componentName": "Flex",
          "componentType": "Flex",
          "category": "layout",
          "tags": [
            "布局",
            "Flex"
          ],
          "version": "1.0.0",
          "description": "用于布局的Flex组件",
          "icon": "flex-icon"
        },
        "position": {
          "x": 0,
          "y": 0,
          "position": "static",
          "zIndex": 0
        },
        "config": [
          {
            "areaName": "布局",
            "configItem": [
              {
                "field": "backgroundColor",
                "label": "背景颜色",
                "uiType": "ColorPicker",
                "defaultValue": "#ffffff",
                "currentValue": "#ffffff"
              },
              {
                "field": "flexWrap",
                "label": "换行",
                "uiType": "Group",
                "defaultValue": "nowrap",
                "currentValue": "nowrap",
                "options": [
                  {
                    "label": "换行",
                    "value": "wrap"
                  },
                  {
                    "label": "不换行",
                    "value": "nowrap"
                  }
                ]
              },
              {
                "field": "flexDirection",
                "label": "主轴方向",
                "uiType": "Group",
                "defaultValue": "row",
                "currentValue": "row",
                "options": [
                  {
                    "label": "水平方向",
                    "value": "row"
                  },
                  {
                    "label": "垂直方向",
                    "value": "column"
                  }
                ]
              },
              {
                "field": "justifyContent",
                "label": "主轴对齐",
                "uiType": "Select",
                "defaultValue": "center",
                "currentValue": "center",
                "options": [
                  {
                    "label": "左对齐",
                    "value": "flex-start"
                  },
                  {
                    "label": "居中",
                    "value": "center"
                  },
                  {
                    "label": "右对齐",
                    "value": "flex-end"
                  },
                  {
                    "label": "均匀分布",
                    "value": "space-around"
                  },
                  {
                    "label": "两侧分布",
                    "value": "space-between"
                  }
                ]
              },
              {
                "field": "alignContent",
                "label": "多行对齐",
                "uiType": "Select",
                "defaultValue": "center",
                "currentValue": "center",
                "options": [
                  {
                    "label": "左对齐",
                    "value": "flex-start"
                  },
                  {
                    "label": "居中",
                    "value": "center"
                  },
                  {
                    "label": "右对齐",
                    "value": "flex-end"
                  },
                  {
                    "label": "均匀分布",
                    "value": "space-around"
                  },
                  {
                    "label": "两侧分布",
                    "value": "space-between"
                  }
                ]
              },
              {
                "field": "alignItems",
                "label": "侧轴对齐",
                "uiType": "Select",
                "defaultValue": "center",
                "currentValue": "center",
                "options": [
                  {
                    "label": "左对齐",
                    "value": "flex-start"
                  },
                  {
                    "label": "居中",
                    "value": "center"
                  },
                  {
                    "label": "右对齐",
                    "value": "flex-end"
                  },
                  {
                    "label": "基线对齐",
                    "value": "baseline"
                  },
                  {
                    "label": "拉伸",
                    "value": "stretch"
                  }
                ]
              },
              {
                "field": "gap",
                "label": "间距",
                "uiType": "DoubleInputNumber",
                "defaultValue": {
                  "one": 0,
                  "two": 0
                },
                "currentValue": {
                  "one": 0,
                  "two": 0
                },
                "min": 0,
                "max": 100,
                "step": 1,
                "unit": "px"
              },
              {
                "field": "MarginPadding",
                "label": "边距",
                "uiType": "MarginPadding",
                "defaultValue": {
                  "margin": {
                    "top": 0,
                    "right": 0,
                    "bottom": 0,
                    "left": 0
                  },
                  "padding": {
                    "top": 0,
                    "right": 0,
                    "bottom": 0,
                    "left": 0
                  }
                },
                "currentValue": {
                  "margin": {
                    "top": 0,
                    "right": 0,
                    "bottom": 0,
                    "left": 0
                  },
                  "padding": {
                    "top": 0,
                    "right": 0,
                    "bottom": 0,
                    "left": 0
                  }
                },
                "unit": "px"
              }
            ]
          },
          {
            "areaName": "常规",
            "configItem": [
              {
                "field": "width",
                "label": "宽度",
                "uiType": "InputNumber",
                "defaultValue": 100,
                "currentValue": 100,
                "step": 1,
                "currentUnit": "%",
                "units": [
                  {
                    "label": "px",
                    "value": "px"
                  },
                  {
                    "label": "%",
                    "value": "%"
                  }
                ],
                "mins": [
                  0,
                  0
                ],
                "maxs": [
                  1000,
                  100
                ]
              },
              {
                "field": "height",
                "label": "高度",
                "uiType": "InputNumber",
                "defaultValue": 60,
                "currentValue": 60,
                "step": 1,
                "currentUnit": "px",
                "units": [
                  {
                    "label": "px",
                    "value": "px"
                  },
                  {
                    "label": "%",
                    "value": "%"
                  }
                ],
                "mins": [
                  0,
                  0
                ],
                "maxs": [
                  1000,
                  100
                ]
              }
            ]
          },
          {
            "areaName": "边框",
            "configItem": [
              {
                "field": "borderColor",
                "label": "边框颜色",
                "uiType": "ColorPicker",
                "defaultValue": "#000000",
                "currentValue": "#000000"
              },
              {
                "field": "borderWidth",
                "label": "边框宽度",
                "uiType": "InputNumber",
                "defaultValue": 0,
                "currentValue": 0,
                "min": 0,
                "max": 100,
                "step": 1,
                "unit": "px"
              },
              {
                "field": "borderRadius",
                "label": "边框圆角",
                "uiType": "InputNumber",
                "defaultValue": 0,
                "currentValue": 0,
                "min": 0,
                "max": 100,
                "step": 1,
                "unit": "px"
              },
              {
                "field": "borderStyle",
                "label": "边框样式",
                "uiType": "Group",
                "defaultValue": "solid",
                "currentValue": "solid",
                "options": [
                  {
                    "label": "实线",
                    "value": "solid"
                  },
                  {
                    "label": "虚线",
                    "value": "dashed"
                  },
                  {
                    "label": "点线",
                    "value": "dotted"
                  }
                ]
              }
            ]
          }
        ],
        "children": [],
        "parentId": 1766207985933,
        "isLocked": false,
        "isVisible": true
      }
    ],
    "parentId": -1,
    "isLocked": false,
    "isVisible": true
  }'::json,
  '16/9' -- zoom_ratio 默认值
);

-- =============================================
-- 5. 插入从表page_metadata数据（关联主表）
-- =============================================
INSERT INTO public.page_metadata (model_id, title, description, keywords)
VALUES
-- 首页元数据（关联主表comSchemaId=1的记录）
(
  (SELECT id FROM public.page_model WHERE com_tree ->> 'comSchemaId' = '1'),
  '首页',
  '低代码平台首页，提供可视化拖拽开发、组件库、模板市场等功能',
  ARRAY['低代码', '首页', '可视化开发', '拖拽']::text[]
),
-- 示例页面元数据（关联主表comSchemaId=1766207985933的记录）
(
  (SELECT id FROM public.page_model WHERE com_tree ->> 'comSchemaId' = '1766207985933'),
  '示例页面',
  '低代码平台示例页面，展示嵌套布局、按钮组件、表单组件的使用方法',
  ARRAY['低代码', '示例页面', '组件演示', '嵌套布局']::text[]
)
-- 冲突处理：若model_id重复，更新元数据
ON CONFLICT (model_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  keywords = EXCLUDED.keywords,
  updated_at = CURRENT_TIMESTAMP;

-- =============================================
-- 6. 验证插入结果
-- =============================================
-- 6.1 主表数据
SELECT '主表page_model：' AS type, id, com_tree ->> 'comSchemaId' AS com_schema_id FROM public.page_model;

-- 6.2 从表数据
SELECT '从表page_metadata：' AS type, id, model_id, title FROM public.page_metadata;

-- 6.3 关联查询
SELECT 
  pm.id AS model_id,
  pmt.title,
  pm.com_tree ->> 'comSchemaId' AS com_schema_id
FROM public.page_model pm
JOIN public.page_metadata pmt ON pm.id = pmt.model_id;

-- =============================================
-- 7. 提交事务（所有操作生效）
-- =============================================
COMMIT;