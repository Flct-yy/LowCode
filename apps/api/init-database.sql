-- 初始化配置选项表数据
INSERT INTO config_option (label, value) VALUES
('水平', 'row'),
('垂直', 'column'),
('居中', 'center'),
('左对齐', 'flex-start'),
('右对齐', 'flex-end'),
('两端对齐', 'space-between'),
('等距分布', 'space-around'),
('等宽分布', 'space-evenly'),
('上对齐', 'flex-start'),
('下对齐', 'flex-end'),
('拉伸', 'stretch'),
('换行', 'wrap'),
('不换行', 'nowrap'),
('正向换行', 'wrap-reverse'),
('实线', 'solid'),
('虚线', 'dashed'),
('点线', 'dotted'),
('正常', 'normal'),
('粗体', 'bold'),
('更粗', 'bolder'),
('细体', 'lighter')
ON CONFLICT DO NOTHING;

-- 初始化配置项表数据
INSERT INTO config_item (field, label, ui_type, default_value, current_value, placeholder, unit, min, max, step, current_unit, mins, maxs, option_ids)
VALUES
-- 布局相关配置
('flexDirection', '方向', 'Select', '"row"', NULL, '选择布局方向', NULL, NULL, NULL, 1, NULL, NULL, NULL, (SELECT array_agg(option_id) FROM config_option WHERE value IN ('"row"', '"column"'))),
('flexWrap', '换行', 'Select', '"nowrap"', NULL, '选择换行方式', NULL, NULL, NULL, 1, NULL, NULL, NULL, (SELECT array_agg(option_id) FROM config_option WHERE value IN ('"nowrap"', '"wrap"', '"wrap-reverse"'))),
('justifyContent', '主轴对齐', 'Select', '"flex-start"', NULL, '选择主轴对齐方式', NULL, NULL, NULL, 1, NULL, NULL, NULL, (SELECT array_agg(option_id) FROM config_option WHERE label IN ('左对齐', '居中', '右对齐', '两端对齐', '等距分布', '等宽分布'))),
('alignItems', '交叉轴对齐', 'Select', '"stretch"', NULL, '选择交叉轴对齐方式', NULL, NULL, NULL, 1, NULL, NULL, NULL, (SELECT array_agg(option_id) FROM config_option WHERE label IN ('上对齐', '居中', '下对齐', '拉伸'))),
('gap', '间距', 'InputNumber', '10', NULL, '设置元素间距', 'px', 0, 100, 1, 'px', NULL, NULL, NULL),
('width', '宽度', 'InputNumber', '100', NULL, '设置宽度', '%', 0, 100, 1, '%', NULL, NULL, NULL),
('height', '高度', 'InputNumber', 'auto', NULL, '设置高度', NULL, NULL, NULL, 1, NULL, NULL, NULL),
('MarginPadding', '边距', 'MarginPadding', '{"margin": [0, 0, 0, 0], "padding": [0, 0, 0, 0]}', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL),

-- 边框相关配置
('borderWidth', '边框宽度', 'InputNumber', '0', NULL, '设置边框宽度', 'px', 0, 20, 1, 'px', NULL, NULL, NULL),
('borderColor', '边框颜色', 'ColorPicker', '"#000000"', NULL, '选择边框颜色', NULL, NULL, NULL, 1, NULL, NULL, NULL),
('borderStyle', '边框样式', 'Select', '"solid"', NULL, '选择边框样式', NULL, NULL, NULL, 1, NULL, NULL, NULL, (SELECT array_agg(option_id) FROM config_option WHERE label IN ('实线', '虚线', '点线'))),
('borderRadius', '圆角', 'InputNumber', '0', NULL, '设置圆角大小', 'px', 0, 50, 1, 'px', NULL, NULL, NULL),

-- 常规相关配置
('backgroundColor', '背景颜色', 'ColorPicker', '"#ffffff"', NULL, '选择背景颜色', NULL, NULL, NULL, 1, NULL, NULL, NULL),

-- 文字相关配置
('text', '文本内容', 'Input', '""', NULL, '输入文本内容', NULL, NULL, NULL, 1, NULL, NULL, NULL),
('fontSize', '字体大小', 'InputNumber', '16', NULL, '设置字体大小', 'px', 12, 72, 1, 'px', NULL, NULL, NULL),
('fontWeight', '字体粗细', 'Select', '"normal"', NULL, '选择字体粗细', NULL, NULL, NULL, 1, NULL, NULL, NULL, (SELECT array_agg(option_id) FROM config_option WHERE label IN ('正常', '粗体', '更粗', '细体'))),
('lineHeight', '行高', 'InputNumber', '1.5', NULL, '设置行高', NULL, 0.5, 5, 0.1, NULL, NULL, NULL, NULL),
('color', '文字颜色', 'ColorPicker', '"#000000"', NULL, '选择文字颜色', NULL, NULL, NULL, 1, NULL, NULL, NULL)
ON CONFLICT DO NOTHING;

-- 初始化配置区域表数据
INSERT INTO config_area (area_name, config_item_ids)
VALUES
('布局', (SELECT array_agg(config_item_id) FROM config_item WHERE field IN ('flexDirection', 'flexWrap', 'justifyContent', 'alignItems', 'gap', 'width', 'height', 'MarginPadding'))),
('边框', (SELECT array_agg(config_item_id) FROM config_item WHERE field IN ('borderWidth', 'borderColor', 'borderStyle', 'borderRadius'))),
('常规', (SELECT array_agg(config_item_id) FROM config_item WHERE field IN ('backgroundColor'))),
('文字', (SELECT array_agg(config_item_id) FROM config_item WHERE field IN ('text', 'fontSize', 'fontWeight', 'lineHeight', 'color')))
ON CONFLICT DO NOTHING;

-- 初始化组件元信息表数据
INSERT INTO component_metadata (component_name, component_type, category, tags, version, description, icon)
VALUES
('根容器', 'ROOT', 'ROOT', '{"基础组件", "布局组件"}', '1.0.0', '页面根容器组件', 'container'),
('弹性布局', 'FLEX', 'LAYOUT', '{"布局组件"}', '1.0.0', '弹性布局容器', 'layout')
ON CONFLICT DO NOTHING;

-- 初始化页面元信息表数据
INSERT INTO page_metadata (title, description, keywords)
VALUES
('首页', '低代码平台首页', '{"首页", "低代码", "示例"}'),
('示例页面', '示例页面，展示各种组件', '{"示例", "组件", "演示"}')
ON CONFLICT DO NOTHING;

-- 初始化组件布局表数据
-- 为首页添加根容器
INSERT INTO component_schema (component_id, parent_id, page_id, is_locked, is_visible, pos_x, pos_y, position, z_index, config_area_ids)
VALUES
((SELECT component_id FROM component_metadata WHERE component_name = '根容器'), 0, (SELECT id FROM page_metadata WHERE title = '首页'), false, true, 0, 0, 'relative', 0, (SELECT array_agg(area_id) FROM config_area)),
((SELECT component_id FROM component_metadata WHERE component_name = '弹性布局'), (SELECT com_schema_id FROM component_schema WHERE page_id = (SELECT id FROM page_metadata WHERE title = '首页') AND component_id = (SELECT component_id FROM component_metadata WHERE component_name = '根容器')), (SELECT id FROM page_metadata WHERE title = '首页'), false, true, 20, 20, 'relative', 1, (SELECT array_agg(area_id) FROM config_area))
ON CONFLICT DO NOTHING;

-- 初始化关联表数据
-- 配置项与选项的关联
INSERT INTO config_item_option (config_item_id, option_id)
SELECT ci.config_item_id, co.option_id
FROM config_item ci, config_option co
WHERE (ci.field = 'flexDirection' AND co.label IN ('水平', '垂直'))
   OR (ci.field = 'flexWrap' AND co.label IN ('换行', '不换行', '正向换行'))
   OR (ci.field = 'justifyContent' AND co.label IN ('居中', '左对齐', '右对齐', '两端对齐', '等距分布', '等宽分布'))
   OR (ci.field = 'alignItems' AND co.label IN ('上对齐', '居中', '下对齐', '拉伸'))
   OR (ci.field = 'borderStyle' AND co.label IN ('实线', '虚线', '点线'))
   OR (ci.field = 'fontWeight' AND co.label IN ('正常', '粗体', '更粗', '细体'))
ON CONFLICT DO NOTHING;

-- 配置区域与配置项的关联
INSERT INTO config_area_item (area_id, config_item_id, sort_num)
SELECT ca.area_id, ci.config_item_id, ROW_NUMBER() OVER (PARTITION BY ca.area_id ORDER BY ci.config_item_id)
FROM config_area ca, config_item ci
WHERE (ca.area_name = '布局' AND ci.field IN ('flexDirection', 'flexWrap', 'justifyContent', 'alignItems', 'gap', 'width', 'height', 'MarginPadding'))
   OR (ca.area_name = '边框' AND ci.field IN ('borderWidth', 'borderColor', 'borderStyle', 'borderRadius'))
   OR (ca.area_name = '常规' AND ci.field IN ('backgroundColor'))
   OR (ca.area_name = '文字' AND ci.field IN ('text', 'fontSize', 'fontWeight', 'lineHeight', 'color'))
ON CONFLICT DO NOTHING;

-- 组件布局与配置区域的关联
INSERT INTO component_schema_area (com_schema_id, area_id)
SELECT cs.com_schema_id, ca.area_id
FROM component_schema cs, config_area ca
ON CONFLICT DO NOTHING;

-- 显示初始化结果
SELECT '配置选项初始化数量: ' || (SELECT COUNT(*) FROM config_option);
SELECT '配置项初始化数量: ' || (SELECT COUNT(*) FROM config_item);
SELECT '配置区域初始化数量: ' || (SELECT COUNT(*) FROM config_area);
SELECT '组件元信息初始化数量: ' || (SELECT COUNT(*) FROM component_metadata);
SELECT '页面元信息初始化数量: ' || (SELECT COUNT(*) FROM page_metadata);
SELECT '组件布局初始化数量: ' || (SELECT COUNT(*) FROM component_schema);
SELECT '配置项选项关联初始化数量: ' || (SELECT COUNT(*) FROM config_item_option);
SELECT '配置区域配置项关联初始化数量: ' || (SELECT COUNT(*) FROM config_area_item);
SELECT '组件布局配置区域关联初始化数量: ' || (SELECT COUNT(*) FROM component_schema_area);