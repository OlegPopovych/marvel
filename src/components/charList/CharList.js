import React, { Component } from 'react/cjs/react.development';
import PropTypes from 'prop-types';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
	constructor(prop) {
		super(prop);
		this.state = {
			chars: [],
			loading: true,
			error: false,
			newItemLoading: false,
			offset: 210,
			charEnded: false
		}
		this.focus = React.createRef();
	}

	marvelService = new MarvelService();

	componentDidMount() {  // спрацьовує коли відбувся рендер класа
		this.updateChar();
		//this.timerId = setInterval(this.updateChar, 10000)
	}

	updateChar = (offset) => {
		this.onCharListLoading();
		this.marvelService.getAllCharacters(offset)  	//повертає масив з необхідним нам вмістом через проміс
			.then(this.onCharLoaded)// якщо у функію then передати посиланя (без виклику) на функцію то 
			.catch(this.onError)
	}

	onCharLoaded = (newChars) => {
		let end = false;
		if (newChars.length < 9) {
			end = true;
		}
		this.setState(({ chars, offset }) => ({   //деструкторизований state, берем обёэкти окремо
			chars: [...chars, ...newChars], // if page load - chars is empti, or concate chars with newChars if load new items
			loading: false,
			newItemLoading: false,
			offset: (offset + 9),
			charEnded: end
		}));
	}

	onCharListLoading = () => {
		this.setState({
			newItemLoading: true
		})
	}

	onError = (error) => {
		this.setState({
			loading: false,
			error: true
		})
	}

	onRender = (arr) => {
		const items = arr.map(item => {
			let randomCharInlineClasses = {};
			if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
				randomCharInlineClasses = { objectFit: "contain" };
			} else {
				randomCharInlineClasses = {};
			}

			return (
				<li>
					<a className={item.id === this.props.selectedChar ? "char__item char__item_selected" : "char__item"}
						tabindex={'0'}
						key={item.id}
						onClick={() => this.props.onCharSelected(item.id)}>
						<img
							style={randomCharInlineClasses} src={item.thumbnail} alt="abyss" />
						<div className="char__name">{item.name}</div>
					</a>
				</li>
			)
		});
		return (
			<ul className="char__grid">
				{items}
			</ul>
		)

	}

	render() {
		const { chars, loading, error, offset, newItemLoading, charEnded } = this.state;

		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? this.onRender(chars) : null

		return (
			<div className="char__list">
				{content}
				{spinner}
				{errorMessage}
				<button className="button button__main button__long"
					style={{ "display": charEnded ? 'none' : 'block' }}
					onClick={() => this.updateChar(offset)}
					disabled={newItemLoading}>
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}

}

CharList.propTypes = {
	onCharSelected: PropTypes.func
}

export default CharList;












/*
	updateChar = () => {
		const offset = Math.floor(Math.random() * (700 - 210) + 700);
	
		this.marvelService
			.getAllCharacters(offset)  	//повертає масив з необхідним нам вмістом через проміс
			.then(this.onCharLoaded)// якщо у функію then передати посиланя (без виклику) на функцію то 
			.catch(this.onError)
	}
	onCharLoaded = (chars) => {
		this.setState({ 
			chars: chars, 
			loading: false, 
			error: false });
	
	}
	
	
	loadMoreChar = () => {
		const offset = Math.floor(Math.random() * (700 - 210) + 700);
		this.onCharListLoading();
		this.marvelService
			.getAllCharacters(offset)
			.then(this.onCharConcat)
			.catch(this.onError)
	
	}
	onCharConcat = (loadChars) => {
		this.setState(({ chars }) => {
			return {
				chars: chars.concat(loadChars)
			}
		});
	}
	*/