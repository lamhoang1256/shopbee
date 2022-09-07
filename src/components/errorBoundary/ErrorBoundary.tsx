import React, { Component, ErrorInfo } from "react";

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Lỗi: ", error);
    console.error("Thông tin lỗi: ", errorInfo);
  }

  public render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <p className='p-4 text-base font-medium text-center text-red-500 bg-red-100'>
          Đã xảy ra lỗi
        </p>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
