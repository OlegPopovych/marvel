import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from '../pages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



const App = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/comics" element={<ComicsPage />} />
					</Routes>
				</main>
			</div>
		</Router>

	)
}

export default App;




/*
import { Component } from "react/cjs/react.production.min";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {
	state = {
		selectedChar: null
	}

	onCharSelected = (id) => {
		this.setState({
			selectedChar: id
		})
	}

	render() {
		return (
			<div className="app">
				<AppHeader />
				<main>
					<RandomChar
						onCharSelected={this.onCharSelected}
					/>
					<div className="char__content">
						<CharList
							selectedChar={this.state.selectedChar}
							onCharSelected={this.onCharSelected} />
						<ErrorBoundary>
							<CharInfo charId={this.state.selectedChar} />
						</ErrorBoundary>
					</div>
					<img className="bg-decoration" src={decoration} alt="vision" />
				</main>
			</div>
		)
	}
}
*/