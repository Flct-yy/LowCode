1. 创建page_metadata表（主表）
```sql
-- 如果有则先删除已存在的表（可选，谨慎使用，会清空数据）
DROP TABLE IF EXISTS page_metadata CASCADE;

-- 创建序列（可选，PostgreSQL的serial/bigserial会自动创建，这里显式创建便于管理）
DROP SEQUENCE IF EXISTS page_metadata_id_seq;
CREATE SEQUENCE page_metadata_id_seq START WITH 1 INCREMENT BY 1;

-- 创建page_metadata表
CREATE TABLE public.page_metadata (
    id bigint NOT NULL DEFAULT nextval('page_metadata_id_seq'::regclass),  -- 自增主键
    title character varying(255) NOT NULL,  -- 页面标题，非空
    description text,  -- 页面描述，可空
    keywords text[],  -- 关键词数组（text[]类型）
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- 创建时间，默认当前时间
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- 更新时间，默认当前时间
    -- 主键约束（PostgreSQL会自动为主键创建B树索引）
    CONSTRAINT page_metadata_pkey PRIMARY KEY (id)
);

-- 给title添加唯一约束（避免重复标题，根据业务需求添加）
ALTER TABLE public.page_metadata ADD CONSTRAINT uk_page_metadata_title UNIQUE (title);
```

2. 创建page_model表（从表，依赖 page_metadata）
```sql
-- 如果有则先删除已存在的表（可选）
DROP TABLE IF EXISTS page_model CASCADE;

-- 创建page_model表
CREATE TABLE public.page_model (
    metadata_id bigint NOT NULL,  -- 关联page_metadata的id，非空
    "comTree" json NOT NULL,  -- 组件树JSON数据（注意双引号保留大小写，若用小写则无需引号）
    -- 唯一约束（实现一对一关联，PostgreSQL会自动创建B树索引）
    CONSTRAINT uk_page_model_metadata_id UNIQUE (metadata_id),
    -- 外键约束（关联主表的id，级联更新/级联删除）
    CONSTRAINT fk_page_model_page_metadata FOREIGN KEY (metadata_id)
        REFERENCES public.page_metadata (id)
        ON UPDATE CASCADE  -- 主表id更新时，从表同步更新
        ON DELETE CASCADE  -- 主表记录删除时，从表关联记录自动删除
);
```