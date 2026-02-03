import React from 'react';
import { Button, Flex, message, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import useWebsContext from '@/context/WebsContext/useWebsContext';
import pageApi from '@/api/pageApi';
import { ComTree, ComponentSchema, PageMetadata, ComponentTypeEnum } from '@wect/type';
import { PageData } from '@/context/WebsContext/WebsProvider';
import { stringToAspectRatioEnum } from '@/utils/stringToAspectRatioEnum';
import { wholeHtml } from '@/utils/componentToHtml';


interface pageFileData {
  pageMetadata: PageMetadata,
  componentTree: ComponentSchema,
  comCount: number,
  aspectRatio: string,
  exportTime: string,
  version: string
}

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const { state, actions } = useWebsContext();
  const { metadata, comTree } = state;

  const handlePreview = () => {
    // 先保存当前页面配置
    handleSave();
    // 处理预览逻辑
    navigate(`/preview/${metadata.id}`);
  };

  // 保存页面配置和组件树
  const handleSave = async () => {
    // 处理保存逻辑
    try {
      await pageApi.updatePage(metadata.id, { comTree, aspectRatio: `${state.aspectRatio}`, comCount: comTree.getCount() });
      message.success('保存成功');
    } catch (error) {
      message.error('保存失败');
    }
  };

  // 导入页面配置和组件树
  const handleImport = () => {
    // 处理导入逻辑
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    // 将fileInput添加到DOM中，确保后续可以安全移除
    document.body.appendChild(fileInput);
    fileInput.click();
    fileInput.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importData: pageFileData = JSON.parse(e.target?.result as string);
            console.log(importData);
            // 添加默认值和类型检查，避免undefined错误
            const aspectRatio = importData.aspectRatio || '16/9';
            const comCount = importData.comCount || 1;
            const pageData: PageData = {
              metadata: importData.pageMetadata,
              comTree: new ComTree(importData.componentTree, comCount),
              aspectRatio: stringToAspectRatioEnum(aspectRatio),
            };
            // 处理导入数据，例如更新页面元信息和组件树
            actions.set_page(pageData);
            console.log('导入成功');
            message.success('导入成功');
          } catch (error) {
            console.error('导入文件格式错误', error);
            message.error('导入文件格式错误');
          } finally {
            // 在finally块中安全移除元素
            if (document.body.contains(fileInput)) {
              document.body.removeChild(fileInput);
            }
          }
        };
        reader.readAsText(file);
      } else {
        // 如果没有选择文件，也需要移除元素
        if (document.body.contains(fileInput)) {
          document.body.removeChild(fileInput);
        }
      }
    });
  };


  // 导出页面为HTML文件
  const handleExportHtml = async () => {
    try {
      const progress = message.loading('正在导出 HTML...', 0);
      
      // 验证数据
      const rootComponent = comTree.getRoot();
      if (!rootComponent) {
        throw new Error('没有可导出的组件');
      }

      // 生成完整的HTML文件
      const contentHtml = wholeHtml(metadata.title, rootComponent);

      // 验证生成的HTML
      if (!contentHtml || contentHtml.length < 100) {
        throw new Error('生成的 HTML 内容无效');
      }

      // 创建Blob对象
      const blob = new Blob([contentHtml], { type: 'text/html' });

      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lowcode-page-${metadata.title || 'untitled'}.html`;

      // 触发下载
      document.body.appendChild(a);
      a.click();

      // 清理
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);

      // 关闭进度提示
      setTimeout(() => {
        progress();
        message.success('导出为HTML成功');
      }, 500);
    } catch (error) {
      console.error('导出HTML失败', error);
      message.error(`导出HTML失败：${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  // 导出页面配置和组件树为JSON文件
  const handleExportJson = async () => {
    try {
      const progress = message.loading('正在导出 JSON...', 0);
      
      // 验证数据
      const rootComponent = comTree.getRoot();
      if (!rootComponent) {
        throw new Error('没有可导出的组件');
      }

      // 要导出的数据内容
      const exportData: pageFileData = {
        pageMetadata: metadata, // 页面元信息
        componentTree: rootComponent, // 组件树结构
        comCount: comTree.getCount(),
        aspectRatio: state.aspectRatio,
        exportTime: new Date().toISOString(),
        version: '1.0.0'
      };

      // 转换为JSON字符串
      const jsonString = JSON.stringify(exportData, null, 2);

      // 验证生成的JSON
      if (!jsonString || jsonString.length < 100) {
        throw new Error('生成的 JSON 内容无效');
      }

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

      // 关闭进度提示
      setTimeout(() => {
        progress();
        message.success('导出为JSON成功');
      }, 500);
    } catch (error) {
      console.error('导出JSON失败', error);
      message.error(`导出JSON失败：${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  // 导出菜单选项
  const exportMenuOptions: MenuProps['items'] = [
    {
      key: 'json',
      label: '导出为JSON',
      onClick: handleExportJson,
    },
    {
      key: 'html',
      label: '导出为HTML',
      onClick: handleExportHtml,
    },
  ];

  return (
    <div>
      <Flex style={{
        width: '100%',
        height: '100%',
        padding: '10px 20px',
      }} justify={'space-between'} align={'center'}>
        <Button type="text" onClick={() => navigate(-1)}>返回</Button>
        <Flex justify={'space-between'} align={'center'} gap={10}>
          <Button onClick={handlePreview}>预览</Button>
          <Button onClick={handleSave}>保存</Button>
          <Button type="primary" onClick={handleImport}>导入</Button>
          <Dropdown menu={{ items: exportMenuOptions }}>
            <Button type="primary" onClick={(e) => e.preventDefault()}>
              导出 <span className="anticon anticon-down"></span>
            </Button>
          </Dropdown>
        </Flex>
      </Flex>
    </div>
  );
}

export default TopBar;