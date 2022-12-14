import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public';
	const _apiKey = 'apikey=954e0faeb40bcec171686d3e5d72febf';
	const _baseOffset = 210;
	const _baseComicsOffset = 0;

	const getComics = async (offset = _baseComicsOffset) => {
		const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComics);
	}

	const getComicsById = async (id) => {
		const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	}

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformCharacter) // тут колбек функція, яка буде підставляти в себе об1єкти з масиву
	}

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);  //повертаємо об'єкт з необхідним нам вмістом
	}

	const getCharacterInfo = async (id) => {
		const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
		//console.log(this._transformCharacterInfo(res.data.results[0]));
		return _transformCharacterInfo(res.data.results[0]);  //повертаємо об'єкт з необхідним нам вмістом
	}



	const _transformCharacter = (char) => {
		if (char.description.length) {
			if (char.description.length >= 200) {
				char.description = char.description.slice(0, 200) + "...";
			}
		} else {
			char.description = "Someone super hero!"
		}

		return {                       		  //повертаємо об'єкт з необхідним нам вмістом
			id: char.id,
			name: char.name,
			description: char.description,
			thumbnail: `${char.thumbnail.path}.` + char.thumbnail
				.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url
		}
	}

	const _transformComics = (comics) => {
		let lang;
		if (comics.textObjects.length === 0) {
			lang = "no data";
		} else {
			lang = comics.textObjects[0].language;
		}

		return {
			disc: comics.description,
			id: comics.id,
			title: comics.title,
			pageCount: comics.pageCount,
			language: lang,
			prices: comics.prices[0].price,
			thumbnail: `${comics.thumbnail.path}.` + comics.thumbnail.extension
		}
	}

	const _transformCharacterInfo = (char) => {
		if (char.description.length) {
			if (char.description.length >= 200) {
				char.description = char.description.slice(0, 200) + "...";
			} else return char.description;
		} else {
			char.description = "Someone super hero!"
		}

		return {                       		  //повертаємо об'єкт з необхідним нам вмістом
			id: char.id,
			name: char.name,
			description: char.description,
			thumbnail: `${char.thumbnail.path}.` + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		}
	}

	return { loading, error, getCharacter, getCharacterInfo, getAllCharacters, clearError, getComics, getComicsById }
}

export default useMarvelService;






/*



function getSpeedStatistic(testResults) {

	let small = testResults[0],
		summ = testResults[0],
		medium = 0,
		higth = 0,
		arr = [];

	if (testResults.length === 1) {
		small = testResults[0];
		medium = testResults[0];
		higth = testResults[0];
		arr = [small, higth, medium];
		console.log(`arr of start:   ${arr}`);
		return arr;
	}

	if (testResults.length < 1) {
		arr = [0, 0, 0];
		return arr;
	}


	for (let i = 1; i < testResults.length; i++) {

		summ += testResults[i];

		if (small > testResults[i]) {
			small = testResults[i]
		}

		if (higth < testResults[i]) {
			higth = testResults[i]
		}
		medium = Math.floor(summ / testResults.length);
	}
	arr = [small, higth, medium];
	return arr;
}
getSpeedStatistic([]);

[1, 2, 2, 3, 3, 3, 3, 18]




function splitString(str) {
	let arr = [];

	if (str.length % 2 !== 0) {
		str += "_";
	}
	console.log(str);

	for (let i = 0, k = 1; i < str.length; (i = i + 2), (k = k + 2)) {
		arr.push(str[i] + str[k]);
	}


	console.log(arr);
	return arr;
}

splitString("");


function scrollingText(word) {

	let arr = [word.toUpperCase()];

	for (let i = 0; i < word.length - 1; i++) {
		arr.push(
			arr[i].slice(1, word.length) + arr[i][0]
		)
	}

	console.log(arr);
	return arr;
}

scrollingText('ROboT');





function isSpecialNumber(n) {

	let str = n.toString();
	let toggle = true;

	for (let i = 0; i < str.length; i++) {
		if (str[i] > 5) {
			toggle = false;
		}
	}

	if (toggle) {
		console.log('Special!!');
		return ('Special!!');
	} else {
		console.log('NOT!!');
		return ('NOT!!');
	}
}

isSpecialNumber(243242385);



function isTidy(number) {

	let str = number.toString();
	let toggle = true;

	for (let i = 0, k = 1; i < str.length; i++, k++) {
		if (Number(str[k]) < Number(str[i])) {
			toggle = false;
		}
	}

	console.log(toggle);
	return toggle;

}

isTidy(1124);


function isJumping(number) {

	let str = number.toString();
	let toggle = true;

	if (str.length > 1) {

		for (let i = 0, k = 1; i < str.length, k < str.length; i++, k++) {

			console.log(`str_k - ${str[k]}`);
			console.log(`str_i - ${str[i]}`);
			console.log(`k - ${k}`);
			console.log(`i - ${i}`);
			
			let diff = Number(str[k]) - Number(str[i]);
			console.log(`diff - ${diff}`);
			if (Number(str[k]) - Number(str[i]) !== 1 && Number(str[k]) - Number(str[i]) !== -1) {
				toggle = false;
				console.log(`toggle - ${toggle}`);
			}
		}
	}

	if (toggle) {
		console.log('JUMPING');
		return ('JUMPING');
	} else {
		console.log('NOT JUMPING');
		return ('NOT JUMPING');
	}
}

isJumping(12945);
*/