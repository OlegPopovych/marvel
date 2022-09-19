import { useState } from "react/cjs/react.development";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from	"../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";


import decoration from '../../resources/img/vision.png';

const App = () => {

	const [selectedChar, setChar] = useState(null);

	const onCharSelected = (id) => {
		setChar(id)
	}

	return (
		<div className="app">
			<AppHeader />
			<main>
				<RandomChar
					onCharSelected={onCharSelected}
				/>
				<div className="char__content">
					<CharList
						selectedChar={selectedChar}
						onCharSelected={onCharSelected} />
					<ErrorBoundary>
						<CharInfo charId={selectedChar} />
					</ErrorBoundary>
				</div>
				<br/><br/><br/>
				<ComicsList/><br/><br/><br/>
				<SingleComic/>
				<img className="bg-decoration" src={decoration} alt="vision" />
			</main>
		</div>
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