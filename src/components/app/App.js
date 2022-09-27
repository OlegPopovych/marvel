import { lazy, Suspense } from "react";

import AppHeader from "../appHeader/AppHeader";
//import { MainPage, ComicsPage, SingleComicPage } from '../pages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Spinner from "../spiner/Spiner";

const Page404 = lazy(() => (import('../pages/page404')));
const MainPage = lazy(() => (import('../pages/MainPage')));
const ComicsPage = lazy(() => (import('../pages/ComicsPage')));
const SingleComicPage = lazy(() => (import('../pages/SingleComicPage')));

const App = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path="/" element={<MainPage />} />
							<Route path="/comics" element={<ComicsPage />} />
							<Route path="/comics/:comicId123" element={<SingleComicPage />} />
							<Route path="*" element={<Page404 />} />
						</Routes>
					</Suspense>
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