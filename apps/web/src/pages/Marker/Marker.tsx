import React from "react";
import { Flex, Splitter, Layout, Divider } from 'antd';
import WebsProvider from '@context/WebsContext/WebsProvider';
import TopBar from "./components/topBar/topBar";
import ComList from "./components/comList/comList";
import Editor from "./components/editor/editor";
import Preview from "./components/preview/preview";
const { Header, Content } = Layout;

const Marker: React.FC = () => {
  
  return (
    <WebsProvider>
      <Layout>
        <Header style={{ height: 'auto', padding: '0', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
          <TopBar />
        </Header>
        <Divider style={{ margin: '0' }} />
        <Content>
          <Flex vertical gap={20}>
            <Splitter style={{ height: 'calc(100vh - 50px)' }}>
              <Splitter.Panel collapsible={{ start: true, end: true, showCollapsibleIcon: 'auto' }} defaultSize="12%">
                <ComList />
              </Splitter.Panel>
              <Splitter.Panel style={{ scrollbarWidth: 'auto' }} collapsible={{ start: true, end: true, showCollapsibleIcon: 'auto' }} defaultSize="60%" min="40%">
                <Preview />
              </Splitter.Panel>
              <Splitter.Panel collapsible={{ start: true, end: true, showCollapsibleIcon: 'auto' }} defaultSize="28%">
                <Editor />
              </Splitter.Panel>
            </Splitter>
          </Flex>
        </Content>
      </Layout>
    </WebsProvider>
  );
}

export default Marker;