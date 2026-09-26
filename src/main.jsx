import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { LanguageProvider } from './i18n/LanguageContext';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '30px', fontFamily: 'monospace', background: '#fff', color: '#b91c1c', minHeight: '100vh' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>⚠️ 렌더링 중 오류가 발생했습니다</h2>
          <pre style={{ background: '#fef2f2', padding: '16px', borderRadius: '8px', border: '1px solid #f87171', whiteSpace: 'pre-wrap', overflowX: 'auto', fontSize: '12px' }}>
            {this.state.error?.toString()}
            {'\n\n'}
            {this.state.error?.stack}
            {'\n\n'}
            {this.state.errorInfo?.componentStack}
          </pre>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
            style={{ marginTop: '16px', padding: '10px 18px', background: '#0B3C26', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            로컬 캐시 초기화 후 홈으로 이동
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
