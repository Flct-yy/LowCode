import React, { useState } from 'react';
import { Button, Table, Tag, Flex } from 'antd';
import type { TableColumnsType } from 'antd';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';

interface User {
  key: number;
  name: string;
  status: string;
  createTime: string;
  remark: string;
  tags: string[];
  operation: string[];
}



const data: User[] = [
  {
    key: 0,
    name: 'Jack',
    status: 'active',
    createTime: '2023-01-01',
    remark: '这是一个备注',
    tags: ['active', 'loser'],
    operation: ['编辑', '删除'],
  },
];


const Lists: React.FC = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<User[]>(data);

  const columns: TableColumnsType<User> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
    },
    {
      key: 'createTime',
      title: 'Create Time',
      dataIndex: 'createTime',
    },
    {
      key: 'remark',
      title: 'Remark',
      dataIndex: 'remark',
    },
    {
      key: 'tags',
      title: 'Tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <Flex gap="small" align="center" wrap>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </Flex>
      ),
    },
    {
      key: 'operation',
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, { operation }) => {
        const handleClick = (item: string) => {
          if (item === '编辑') {
            // window.location.href = `/marker`;
            navigate('/marker');
          }
        }
        return (
          <Flex gap="small" align="center" wrap>
            {operation.map((item) => (
              <Button key={item} onClick={() => handleClick(item)}>{item}</Button>
            ))}
          </Flex>
        )
      },
    },
  ];
  const handleClick = () => {
    setList([
      ...list,
      {
        key: list.length,
        name: '新用户',
        status: 'active',
        createTime: '2023-01-01',
        remark: '这是一个备注',
        tags: ['active', 'loser'],
        operation: ['编辑', '删除'],
      },
    ]);
  }

  return (
    <div className="container">
      <Button
        type="primary"
        style={{ marginLeft: '16px', marginBottom: '16px' }}
        onClick={handleClick}
      >添加组件</Button>
      <Table<User> columns={columns} dataSource={list} />
    </div>
  )
}

export default Lists;