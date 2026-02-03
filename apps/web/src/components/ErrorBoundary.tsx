import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Result } from 'antd';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  // 初始化状态
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  // 当子组件抛出错误时调用
  static getDerivedStateFromError(error: Error) {
    // 更新状态，下次渲染时显示降级UI
    return { hasError: true, error };
  }

  // 记录错误信息到日志服务
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 记录错误信息
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });

    // 可以在这里添加错误日志服务
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };
  render() {
    if (this.state.hasError) {

      // 自定义降级UI
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Result
            status="error"
            title="应用出错了"
            subTitle={this.state.error?.message || '发生了未知错误'}
            extra={[
              <Button
                type="primary"
                key="refresh"
                onClick={this.handleReset}
              >
                重新加载
              </Button>,
              <Button
                key="home"
                onClick={() => window.location.href = '/'}
              >
                返回首页
              </Button>,
            ]}
          />
          {/* 仅在开发环境显示错误详情 */}
          {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
            <div style={{ marginTop: '20px', textAlign: 'left' }}>
              <h4>错误详情：</h4>
              <pre style={{
                background: '#f5f5f5',
                padding: '10px',
                borderRadius: '4px',
                overflow: 'auto',
                maxHeight: '300px'
              }}>
                {this.state.error?.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </div>
          )}
        </div>
      );
    }

    // 正常渲染子组件
    return this.props.children;
  }
}

export default ErrorBoundary;