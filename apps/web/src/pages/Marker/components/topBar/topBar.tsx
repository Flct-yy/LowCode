import React from 'react';
import { Button, Flex, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import useWebsContext from '@/context/WebsContext/useWebsContext';
import pageApi from '@/api/pageApi';



const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const { state, actions } = useWebsContext();
  const { metadata, comTree } = state;

  const handleSave = async () => {
    // 处理保存逻辑
    try {
      await pageApi.updatePage(metadata.id, { comTree });
      message.success('保存成功');
    } catch (error) {
      message.error('保存失败');
    }
  };

  const handleImport = () => {
    // 处理导入逻辑
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.click();
    fileInput.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importData = JSON.parse(e.target?.result as string);
            // 处理导入数据，例如更新页面元信息和组件树
            actions.import_page(importData.pageMetadata, importData.componentTree);
            console.log('导入成功');
          } catch (error) {
            console.error('导入文件格式错误', error);
          }
        };
        reader.readAsText(file);
      }
    });
    setTimeout(() => {
      document.body.removeChild(fileInput);
    }, 0);
  };

  // 导出页面配置和组件树为JSON文件
  const handleExport = () => {
    // 要导出的数据内容
    const exportData = {
      pageMetadata: metadata, // 页面元信息
      componentTree: comTree, // 组件树结构
      exportTime: new Date().toISOString(),
      version: '1.0.0'
    };

    // 转换为JSON字符串
    const jsonString = JSON.stringify(exportData, null, 2);

    // 创建Blob对象
    const blob = new Blob([jsonString], { type: 'application/json' });

    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lowcode-page-${metadata.title || 'untitled'}.json`;

    // 触发下载
    document.body.appendChild(a);
    a.click();

    // 清理
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <div>
      <Flex style={{
        width: '100%',
        height: '100%',
        padding: '10px 20px',
      }} justify={'space-between'} align={'center'}>
        <Button type="text" onClick={() => navigate(-1)}>返回</Button>
        <Flex justify={'space-between'} align={'center'} gap={10}>
          <Button onClick={() => navigate('/preview')}>预览</Button>
          <Button onClick={handleSave}>保存</Button>
          <Button type="primary" onClick={handleImport}>导入</Button>
          <Button type="primary" onClick={handleExport}>导出</Button>
        </Flex>
      </Flex>
    </div>
  );
}

export default TopBar;