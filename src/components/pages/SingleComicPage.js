import './singleComicPage.scss';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SingleComicPage = () => {

	const smth = useParams();
	console.log(smth);
	const { comicId123 } = smth;

	const [comic, setComic] = useState([]);

	const { loading, error, getComicsById, clearError } = useMarvelService();

	useEffect(() => updateComic(comicId123), []);

	const updateComic = (comicId123) => {
		clearError();
		getComicsById(comicId123)
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
			<Link to="/comics" className="single-comic__back">Back to all</Link>
		</>

	)
}

export default SingleComicPage;