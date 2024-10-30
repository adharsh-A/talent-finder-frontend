import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Store the error and error info in the state
    this.setState({ error, errorInfo });
    console.error("Error occurred:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className=" text-slate-50 text-center mt-20 text-3xl font-bold h-full flex flex-col items-center justify-center">
          <div className="p-20 border border-slate-700 dark:border-red-700">
            <h1>Something went wrong. Please try again later.</h1>
            {/* Displaying the error message and stack trace */}
            <div className="mt-4 text-red-500">
              <h2>Error: {this.state.error && this.state.error.toString()}</h2>
            <button
              className="mt-4 bg-gradient-to-r from-red-500 to-red-900 dark:from-slate-900 dark:to-slate-700 border border-slate-700 dark:border-red-700 px-4 py-2 rounded-md shadow-md hover:shadow-lg transition duration-200"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
              <details className="whitespace-pre-wrap">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </details>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
