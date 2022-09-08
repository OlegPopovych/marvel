import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';
import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {

	state = {
		char: null,
		loading: false,
		error: false,
		offset: 210
	}


	componentDidMount() {
		this.updateChar()
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.charId !== prevProps.charId) {
			this.updateChar();
		}
	}

	marvelService = new MarvelService();

	updateChar = () => {
		const { charId } = this.props;
		if (!charId) {
			return;
		}
		this.onCharLoading();
		this.marvelService
			.getCharacterInfo(charId)
			.then(this.onCharLoaded)
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




	render() {

		const { char, loading, error } = this.state;

		const skeleton = error || loading || char ? null : <Skeleton />;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error || !char) ? <View char={char} /> : null

		return (
			<div className="char__info">
				{skeleton}
				{errorMessage}
				{spinner}
				{content}
			</div>
		)
	}

}

const View = ({ char }) => {
	const { thumbnail, name, homepage, wiki, description, comics } = char;

	let randomCharInlineClasses = {};
	if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
		randomCharInlineClasses = { objectFit: "contain" };
	} else {
		randomCharInlineClasses = {};
	}

	return (
		<>
			<div className="char__basics">
				<img style={randomCharInlineClasses} src={thumbnail} alt="abyss" />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length > 0 ? null : "There is no comics with this characters"}
				{comics.slice(0, 9).map((item, i) => {
					return (
						<li key={i} className="char__comics-item">
							{item.name}
						</li>
					)
				})}
			</ul>
		</>
	)


}

CharInfo.propTypes = {
	charId: PropTypes.number
}

export default CharInfo;