-- 如果有则先删除已存在的表（可选）
DROP TABLE IF EXISTS page_model CASCADE;
DROP SEQUENCE IF EXISTS page_model_id_seq;

-- 第一步：先创建表（此时不指定序列默认值）
CREATE TABLE public.page_model (
    id bigint NOT NULL, -- 先只定义主键字段，不设置默认值
    com_tree json NOT NULL,  -- 组件树JSON数据
    CONSTRAINT page_model_pkey PRIMARY KEY (id)
);
-- 第二步：创建序列（此时再绑定到表的主键列，表已存在）
CREATE SEQUENCE page_model_id_seq 
    START WITH 1 
    INCREMENT BY 1
    OWNED BY public.page_model.id; -- 现在表存在，可正常绑定

-- 第三步：给表的id字段设置默认值（关联序列）
ALTER TABLE public.page_model 
ALTER COLUMN id SET DEFAULT nextval('page_model_id_seq'::regclass);


-- 如果有则先删除已存在的表（可选，谨慎使用，会清空数据）
DROP TABLE IF EXISTS page_metadata CASCADE;
DROP SEQUENCE IF EXISTS page_metadata_id_seq;

-- 第一步：创建从表
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

-- 第二步：创建序列并绑定
CREATE SEQUENCE page_metadata_id_seq 
    START WITH 1 
    INCREMENT BY 1
    OWNED BY public.page_metadata.id;
