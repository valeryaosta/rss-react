'use client';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

interface State {
  errorInfo: ErrorInfo | null;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    errorInfo: null,
    error: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      errorInfo: errorInfo,
      error: error,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
