import { useState, useEffect } from "react/cjs/react.development";
import './randomChar.scss';
import useMarvelService from '../../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';



const RandomChar = (props) => {

	const [char, setChar] = useState({});
	const { loading, error, getCharacter, clearError } = useMarvelService();

	useEffect(() => updateChar(), []);

	const updateChar = () => {
		clearError();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		getCharacter(id)  		 //повертає об'єкт з необхідним нам вмістом через проміс
			.then(onCharLoaded)// якщо у функію then передати посиланя (без виклику) на функцію то 
	}

	const onCharLoaded = (char) => {    // в неї підставиться аргумент який приходить в then
		setChar(char);
	}

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error) ? <ViewCharacter char={char} onCharSelected={props.onCharSelected} /> : null

	return (
		<div className="randomchar">
			{errorMessage}
			{spinner}
			{content}
			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!<br />
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">
					Or choose another one
				</p>
				<button className="button button__main">
					<div className="inner"
						onClick={updateChar}>try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
			</div>
		</div>
	)

}

const ViewCharacter = ({ char, onCharSelected }) => {
	const { id, name, description, thumbnail, homepage, wiki } = char;
	let randomCharInlineClasses = {};
	if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
		randomCharInlineClasses = { objectFit: "contain" };
	} else {
		randomCharInlineClasses = {};
	}

	return (
		<div className="randomchar__block">
			<img style={randomCharInlineClasses} src={thumbnail} alt="Random character" className="randomchar__img"
				onClick={() => onCharSelected(id)} />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">{description}
				</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">Homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}



export default RandomChar;


/*
import { useState, useEffect } from "react/cjs/react.development";
import './randomChar.scss';
import MarvelService from '../../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';



const RandomChar = () => {

	state = {
		char: {},
		loading: true,
		error: false
	}

	marvelService = new MarvelService();

	componentDidMount() {  // спрацьовує коли відбувся рендер класа
		this.updateChar();
		//this.timerId = setInterval(this.updateChar, 15000);
	}

	componentDidUpdate() {

	}

	componentWillUnmount() {
		//clearInterval(this.timerId);

	}



	updateChar = () => {

		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		this.onCharLoading();
		this.marvelService
			.getCharacter(id)  		 //повертає об'єкт з необхідним нам вмістом через проміс
			.then(this.onCharLoaded)// якщо у функію then передати посиланя (без виклику) на функцію то 
			.catch(this.onError)
	}

	onCharLoading = (char) => {
		this.setState({
			loading: true
		})
	}

	onCharLoaded = (char) => {    // в неї підставиться аргумент який приходить в then
		this.setState({
			char: char,
			loading: false,
			error: false
		})
	}

	onError = (error) => {
		this.setState({
			loading: false,
			error: true
		})
	}

		const { char, loading, error } = this.state;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? <ViewCharacter char={char} onCharSelected={this.props.onCharSelected} /> : null

		return (
			<div className="randomchar">
				{errorMessage}
				{spinner}
				{content}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!<br />
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">
						Or choose another one
					</p>
					<button className="button button__main">
						<div className="inner"
							onClick={this.updateChar}>try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		)

}

const ViewCharacter = ({ char, onCharSelected }) => {
	const { id, name, description, thumbnail, homepage, wiki } = char;

	let randomCharInlineClasses = {};
	if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
		randomCharInlineClasses = { objectFit: "contain" };
	} else {
		randomCharInlineClasses = {};
	}

	return (
		<div className="randomchar__block">
			<img style={randomCharInlineClasses} src={thumbnail} alt="Random character" className="randomchar__img"
				onClick={() => onCharSelected(id)} />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">{description}
				</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">Homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}


*/