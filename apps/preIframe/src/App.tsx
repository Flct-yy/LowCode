import './App.css'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>PreIframe 预览应用</h1>
      </header>
      <main className="app-main">
        <div className="content-card">
          <h2>欢迎使用 PreIframe</h2>
          <p>这是一个通过 iframe 嵌入到主应用中的独立应用。</p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">✨</span>
              <span>独立开发和部署</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚀</span>
              <span>高性能渲染</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>安全隔离</span>
            </div>
          </div>
        </div>
      </main>
      <footer className="app-footer">
        <p>© 2026 PreIframe 应用</p>
      </footer>
    </div>
  )
}

export default App
