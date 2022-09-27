import { useState, useEffect, useDeferredValue } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

	const [char, setChar] = useState(null);
	const { loading, error, getCharacterInfo, clearError } = useMarvelService();

	useEffect(() => updateChar(), [props.charId]);

	const updateChar = () => {
		const { charId } = props;
		if (!charId) {
			return;
		}
		clearError();
		getCharacterInfo(charId)
			.then(onCharLoaded)
	}

	const onCharLoaded = (char) => {
		setChar(char);
	}

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

				{(comics.length > 0) ? null : "There is no comics with this characters"}
				{comics.slice(0, 9).map((item, i) => {
					return (
						<li key={i} className="char__comics-item">
							<Link to={`/comics/${item.resourceURI.slice(43)}`}>
								{item.name}
							</Link>
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