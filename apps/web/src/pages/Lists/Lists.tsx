import React, { useState, useEffect } from 'react';
import { Button, Table, Tag, Flex, Spin, message } from 'antd';
import type { TableColumnsType } from 'antd';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import pageApi from '@/api/pageApi';
import {ComTree} from '@wect/type';

// 页面数据接口
interface PageData {
  key: number;
  id: number;
  metaID: number;
  title: string;
  description: string;
  keywords: string[];
  createTime: string;
  updateTime: string;
  operation: string[];
}

const Lists: React.FC = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<PageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 获取页面列表
  const fetchPages = async () => {
    setLoading(true);
    try {
      const pages = await pageApi.getPages();
      const formattedPages = pages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((page: any, index) => ({
        key: page.id,
        id: index + 1,
        metaID: page.id,
        title: page.title,
        description: page.description || '',
        keywords: page.keywords || [],
        createTime: new Date(page.createdAt).toLocaleString(),
        updateTime: new Date(page.updatedAt).toLocaleString(),
        operation: ['编辑', '删除'],
      }));
      setList(formattedPages);
    } catch (error) {
      console.error('获取页面列表失败:', error);
      message.error('获取页面列表失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取页面列表
  useEffect(() => {
    fetchPages();
  }, []);

  const columns: TableColumnsType<PageData> = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      key: 'title',
      title: '页面标题',
      dataIndex: 'title',
    },
    {
      key: 'description',
      title: '页面描述',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      key: 'keywords',
      title: '关键词',
      dataIndex: 'keywords',
      render: (_, { keywords }) => (
        <Flex gap="small" align="center" wrap>
          {keywords.map((keyword) => (
            <Tag color="geekblue" key={keyword}>
              {keyword}
            </Tag>
          ))}
        </Flex>
      ),
    },
    {
      key: 'createTime',
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      key: 'updateTime',
      title: '更新时间',
      dataIndex: 'updateTime',
    },
    {
      key: 'operation',
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => {
        const handleClick = (item: string) => {
          if (item === '编辑') {
            navigate('/marker', { state: { pageId: record.metaID } });
          } else if (item === '删除') {
            handleDeletePage(record.metaID);
          }
        };
        return (
          <Flex gap="small" align="center" wrap>
            {record.operation.map((item) => (
              <Button key={item} onClick={() => handleClick(item)}>{item}</Button>
            ))}
          </Flex>
        );
      },
    },
  ];
  // 添加新页面
  const handleAddPage = async () => {
    try {
      // 使用时间戳确保标题唯一性
      const uniqueTitle = `新页面_${Date.now()}`;
      const newPage = await pageApi.createPage({
        title: uniqueTitle,
        description: '这是一个新创建的页面',
        keywords: ['新页面'],
        comTree: ComTree.getInstance(),
        aspect_ratio: '16/9',
      });
      message.success('页面创建成功');
      fetchPages(); // 重新获取页面列表
    } catch (error) {
      console.error('创建页面失败:', error);
      message.error('创建页面失败，请稍后重试');
    }
  };

  // 删除页面
  const handleDeletePage = async (id: number) => {
    try {
      await pageApi.deletePage(id);
      message.success('页面删除成功');
      fetchPages(); // 重新获取页面列表
    } catch (error) {
      console.error('删除页面失败:', error);
      message.error('删除页面失败，请稍后重试');
    }
  };

  return (
    <div className="container">
      <Button
        type="primary"
        style={{ marginBottom: '16px' }}
        onClick={handleAddPage}
      >添加页面</Button>
      <Spin spinning={loading} tip="加载中...">
        <Table<PageData> columns={columns} dataSource={list} />
      </Spin>
    </div>
  )
}

export default Lists;