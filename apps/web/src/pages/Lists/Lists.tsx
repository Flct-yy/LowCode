import React from 'react';
import { Button, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import 'antd/dist/reset.css';

interface User {
  key: number;
  name: string;
}

const columns: TableColumnsType<User> = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
  },
];

const data: User[] = [
  {
    key: 0,
    name: 'Jack',
  },
];

const Lists: React.FC = () => {

  return (
    <div>
      <Button>添加组件</Button>
      <Table<User> columns={columns} dataSource={data} />
    </div>
  )
}

export default Lists;