import { Component } from "react/cjs/react.development";

//    Ловить помилки тільки в методі рендер, методах життєвого циклу і конструкторах дочірніх компонентів

class ErrorBoundary extends Component {
	state = {
		error: false
	}

	// static getDerivedStateFromError(error) {
	// 	return { error: true };
	// }

	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo);
		this.setState({ error: true })
	}

	render() {
		if (this.state.error) {
			return <h2>Sonething wrong</h2>
		}

		return this.props.children;
	}

}

export default ErrorBoundary;