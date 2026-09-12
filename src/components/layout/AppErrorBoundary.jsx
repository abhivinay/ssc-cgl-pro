import { Component } from "react";
export default class AppErrorBoundary extends Component {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() {
    if (!this.state.error) return this.props.children;
    return <main className="error-screen"><h1>This screen could not load.</h1><p>Your saved data has not been reset. Reload the app, or return to the dashboard.</p><button className="primary-btn" onClick={() => window.location.reload()}>Reload</button><a href="/dashboard">Dashboard</a></main>;
  }
}
