import React, { useState, useRef, useEffect } from "react";
import { type PageMetadata } from "@/type/PageModel";
import { Input, Tag,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import pageApi from '@/api/pageApi';

const PageConfig: React.FC<{ metadata?: PageMetadata }> = ({ metadata }) => {
  const [title, setTitle] = useState(metadata?.title || '');
  const [description, setDescription] = useState(metadata?.description || '');
  const [tags, setTags] = useState(metadata?.keywords || []);

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<any>(null);

  // 处理标题输入变化
  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if(metadata?.id){
      try {
        await pageApi.updatePage(metadata.id,{
          title: e.target.value,
        });
      } catch (error) {
        message.error('更新页面标题失败');
      }
    }
  };
  // 处理描述输入变化
  const handleDescriptionChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if(metadata?.id){
      try {
        await pageApi.updatePage(metadata.id,{
          description: e.target.value,
        });
      } catch (error) {
        message.error('更新页面描述失败');
      }
    }
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = async (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    if(metadata?.id){
      try {
        await pageApi.updatePage(metadata.id,{
          keywords: newTags,
        });
      } catch (error) {
        message.error('更新页面标签失败');
      }
    }
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = async () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
    if(metadata?.id){
      try {
        await pageApi.updatePage(metadata.id,{
          keywords: [...tags, inputValue],
        });
      } catch (error) {
        message.error('更新页面标签失败');
      }
    }
  };

  return (
    <div className="page-config">
      <div className="page-config-item">
        <div className="page-config-item__label">标题</div>
        <Input showCount value={title} maxLength={20} placeholder="请输入标题" onChange={handleTitleChange} />
      </div>
      <div className="page-config-item">
        <div className="page-config-item__label">描述</div>
        <Input.TextArea showCount value={description} rows={4} placeholder="请输入描述..." maxLength={100} onChange={handleDescriptionChange} />
      </div>
      <div className="page-config-item">
        <div className="page-config-item__label">标签</div>
        <div className="page-config-item__tag-container">
          {tags.map((tag) => (
            <Tag
              className="page-config-item__tag"
              key={tag}
              closable
              onClose={(e) => {
                e.preventDefault();
                handleClose(tag);
              }}
            >
              {tag}
            </Tag>

          ))}
          {inputVisible ? (
            <Input
              className="page-config-item__tag"
              ref={inputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          ) : (
            <Tag className="page-config-item__tag" onClick={showInput}>
              <PlusOutlined /> New Tag
            </Tag>)}
        </div>
      </div>
    </div>
  )
}

export default PageConfig;