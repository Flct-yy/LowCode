import React from 'react';
import { Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const boxStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    padding: '10px 20px',
  };
  return (
    <div>
      <Flex style={boxStyle} justify={'space-between'} align={'center'}>
        <Button type="text" onClick={() => navigate(-1)}>返回</Button>
        <Flex justify={'space-between'} align={'center'} gap={10}>
          <Button>预览</Button>
          <Button>保存</Button>
          <Button type="primary">导入</Button>
          <Button type="primary">导出</Button>
        </Flex>
      </Flex>
    </div>
  );
}

export default TopBar;