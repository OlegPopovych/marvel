import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import { useState, useEffect } from "react";
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SingleComic = () => {

	const [comic, setComic] = useState([]);
	const { loading, error, getComicsById, clearError } = useMarvelService();

	useEffect(() => updateComic(1332), []);

	const updateComic = (comicId) => {
		clearError();
		getComicsById(comicId)
			.then(onCharLoaded)
	}

	const onCharLoaded = (comic) => {
		setComic(comic);
	}

	// const errorMessage = error ? <ErrorMessage /> : null;
	// const spinner = loading ? <Spinner /> : null;
	// const content = !(loading || error || !comic) ? <View comic={comic} /> : null
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = View(comic);

	return (
		<div className="single-comic">
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

const View = (comic) => {
	return (
		<>
			<img src={comic.thumbnail} alt="x-men" className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{comic.title}</h2>
				<p className="single-comic__descr">{comic.disc}</p>
				<p className="single-comic__descr">{comic.pageCount} pages</p>
				<p className="single-comic__descr">Language: {comic.language}</p>
				<div className="single-comic__price">{comic.prices}$</div>
			</div>
			<a href="#" className="single-comic__back">Back to all</a>
		</>

	)
}

export default SingleComic;