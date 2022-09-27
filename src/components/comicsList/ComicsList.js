import './comicsList.scss';
import { useState, useEffect } from "react";
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useRef } from "react";
import { Link } from 'react-router-dom';

import { flushSync } from 'react-dom';

const ComicsList = () => {

	const [comics, setComics] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(8);
	const [comicsEnded, setComicsEnded] = useState(false);

	const { loading, error, getComics, clearError } = useMarvelService();

	useEffect(() => {
		updateComics(offset, true);
	}, []);

	const updateComics = (offset, initial) => {
		flushSync(() => {
			initial ? setNewItemLoading(false) : setNewItemLoading(true);
			//clearError();
			getComics(offset)  	//повертає масив з необхідним нам вмістом через проміс
				.then(onComicsLoaded)// якщо у функію then передати посиланя (без виклику) на функцію то 
		})
	}

	const onComicsLoaded = (newComics) => {
		let end = false;
		if (newComics.length < 8) {
			end = true;
		}
		setComics(comics => [...comics, ...newComics]);
		setNewItemLoading(false);
		setOffset(offset => offset + 8);
		setComicsEnded(end);
	}

	const itemRefs = useRef([]);

	const focusOnItem = (id) => {
		itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	}

	const onRender = (arr) => {
		console.log("render offset: ", offset)
		const items = arr.map((item, i) => {
			let randomComicsInlineClasses = {};
			if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
				randomComicsInlineClasses = { objectFit: "contain" };
			} else {
				randomComicsInlineClasses = {};
			}

			return (
				<li className="comics__item"
					tabIndex={0}
					ref={el => itemRefs.current[i] = el}
					key={item.id}
					onClick={() => {
						focusOnItem(i);
					}}>
					<Link to={`/comics/${item.id}`}>
						<img src={item.thumbnail} style={randomComicsInlineClasses} alt="ultimate war" className="comics__item-img" />
						<div className="comics__item-name">{item.title}</div>
						<div className="comics__item-price">{item.price}</div>
					</Link>
				</li>
			)
		});
		return (
			<ul className="comics__grid">
				{items}
			</ul>
		)
	}

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;
	const content = onRender(comics);

	return (
		<div className="comics__list">
			{content}
			{spinner}
			{errorMessage}
			<button className="button button__main button__long"
				style={{ "display": comicsEnded ? 'none' : 'block' }}
				onClick={() => updateComics(offset)}
				disabled={newItemLoading}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}


// return (
// 	<div className="comics__list">
// 		<ul className="comics__grid">

// 			<li className="comics__item">
// 				<a href="#">
// 					<img src={xMen} alt="x-men" className="comics__item-img" />
// 					<div className="comics__item-name">X-Men: Days of Future Past</div>
// 					<div className="comics__item-price">NOT AVAILABLE</div>
// 				</a>
// 			</li>
// 			<li className="comics__item">
// 				<a href="#">
// 					<img src={uw} alt="ultimate war" className="comics__item-img" />
// 					<div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
// 					<div className="comics__item-price">9.99$</div>
// 				</a>
// 			</li>
// 			<li className="comics__item">
// 				<a href="#">
// 					<img src={xMen} alt="x-men" className="comics__item-img" />
// 					<div className="comics__item-name">X-Men: Days of Future Past</div>
// 					<div className="comics__item-price">NOT AVAILABLE</div>
// 				</a>
// 			</li>
// 			<li className="comics__item">
// 				<a href="#">
// 					<img src={uw} alt="ultimate war" className="comics__item-img" />
// 					<div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
// 					<div className="comics__item-price">9.99$</div>
// 				</a>
// 			</li>
// 			<li className="comics__item">
// 				<a href="#">
// 					<img src={xMen} alt="x-men" className="comics__item-img" />
// 					<div className="comics__item-name">X-Men: Days of Future Past</div>
// 					<div className="comics__item-price">NOT AVAILABLE</div>
// 				</a>
// 			</li>
// 			<li className="comics__item">
// 				<a href="#">
// 					<img src={uw} alt="ultimate war" className="comics__item-img" />
// 					<div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
// 					<div className="comics__item-price">9.99$</div>
// 				</a>
// 			</li>
// 			<li className="comics__item">
// 				<a href="#">
// 					<img src={xMen} alt="x-men" className="comics__item-img" />
// 					<div className="comics__item-name">X-Men: Days of Future Past</div>
// 					<div className="comics__item-price">NOT AVAILABLE</div>
// 				</a>
// 			</li>
// 		</ul>
// 		<button className="button button__main button__long">
// 			<div className="inner">load more</div>
// 		</button>
// 	</div>
// )
// }

export default ComicsList;