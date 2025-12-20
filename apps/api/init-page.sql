-- 事务包裹：确保主从表数据关联一致
BEGIN;

-- 清空表并重置自增ID（核心修改：添加CASCADE处理外键，后续手动重置序列）
TRUNCATE TABLE page_model, page_metadata CASCADE; -- 先清空数据（CASCADE处理外键）
-- 强制重置序列：将序列的当前值设为1，下次从1开始自增
ALTER SEQUENCE page_metadata_id_seq RESTART WITH 1;
ALTER SEQUENCE page_model_id_seq RESTART WITH 1;

-- 第一步：插入主表page_metadata数据（首页+示例页面）
INSERT INTO public.page_metadata (title, description, keywords)
VALUES
(
  '首页',
  '低代码平台首页，提供可视化拖拽开发、组件库、模板市场等功能',
  ARRAY['低代码', '首页', '可视化开发', '拖拽']::text[]
),
(
  '示例页面',
  '低代码平台示例页面，展示嵌套布局、按钮组件、表单组件的使用方法',
  ARRAY['低代码', '示例页面', '组件演示', '嵌套布局']::text[]
);

-- 第二步：插入从表page_model数据（关联主表id）
INSERT INTO public.page_model (metadata_id, com_tree)
VALUES
(
  (SELECT id FROM public.page_metadata WHERE title = '首页'),
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
}'::json
),
(
  (SELECT id FROM public.page_metadata WHERE title = '示例页面'),
  '{
  "comSchemaId": 3,
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
      "comSchemaId": 4,
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
              "currentValue": "column",
              "options": [
                {"label": "水平", "value": "row"},
                {"label": "垂直", "value": "column"}
              ]
            },
            {
              "field": "justifyContent",
              "label": "主轴对齐",
              "uiType": "Select",
              "defaultValue": "flex-start",
              "currentValue": "center",
              "options": [
                {"label": "左对齐", "value": "flex-start"},
                {"label": "居中", "value": "center"},
                {"label": "右对齐", "value": "flex-end"}
              ]
            }
          ]
        },
        {
          "areaName": "常规",
          "configItem": [
            {
              "field": "height",
              "label": "高度",
              "uiType": "InputNumber",
              "defaultValue": 300,
              "currentValue": 400,
              "unit": "px",
              "min": 0,
              "max": 1000,
              "step": 1
            },
            {
              "field": "backgroundColor",
              "label": "背景颜色",
              "uiType": "ColorPicker",
              "defaultValue": "#ffffff",
              "currentValue": "#e8f4f8"
            }
          ]
        }
      ],
      "children": [
        {
          "comSchemaId": 5,
          "metadata": {
            "componentId": 3,
            "componentName": "按钮",
            "componentType": "Button",
            "category": "basic",
            "tags": [],
            "version": "1.0.0"
          },
          "config": [
            {
              "areaName": "常规",
              "configItem": [
                {
                  "field": "text",
                  "label": "按钮文字",
                  "uiType": "Input",
                  "defaultValue": "点击按钮",
                  "currentValue": "查看示例代码"
                },
                {
                  "field": "size",
                  "label": "按钮大小",
                  "uiType": "Select",
                  "defaultValue": "middle",
                  "currentValue": "middle",
                  "options": [
                    {"label": "小", "value": "small"},
                    {"label": "中", "value": "middle"},
                    {"label": "大", "value": "large"}
                  ]
                },
                {
                  "field": "type",
                  "label": "按钮类型",
                  "uiType": "Select",
                  "defaultValue": "primary",
                  "currentValue": "primary",
                  "options": [
                    {"label": "主按钮", "value": "primary"},
                    {"label": "次按钮", "value": "default"},
                    {"label": "危险按钮", "value": "danger"}
                  ]
                }
              ]
            }
          ],
          "children": [],
          "parentId": 4,
          "isLocked": false,
          "isVisible": true
        }
      ],
      "parentId": 4,
      "isLocked": false,
      "isVisible": true
    }
  ],
  "parentId": 0,
  "isLocked": false,
  "isVisible": true
}'::json
)
ON CONFLICT (metadata_id) DO UPDATE SET  -- 修复点：移除对updated_at的更新
  com_tree = EXCLUDED.com_tree;

-- 验证插入结果
SELECT '主表数据：' AS type, id, title FROM public.page_metadata;
SELECT '从表数据：' AS type, pm.id, pm.metadata_id, pmt.title FROM public.page_model pm
JOIN public.page_metadata pmt ON pm.metadata_id = pmt.id;

-- 提交事务
COMMIT;