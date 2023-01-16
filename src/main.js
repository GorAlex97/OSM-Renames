// import { encodeQueryData } from "./f.js";
const encodeQueryData = data => {
	let ret = [];
	for (let d in data)
		ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
	return ret.join('&');
}

const searchStreet = street => {
	const basemap = 'https://nominatim.openstreetmap.org/search.php?';
	// const search = document.querySelector("#street-search");
	// const result = document.querySelector(".result");

	const url = {
		street: street,
		city: 'Київ',
		format: 'jsonv2',
		addressdetails: 1,
		namedetails: 1,
		extratags: 1,
		'accept-language': 'uk',
		limit: 15,
		email: '5267720@gmail.com',
		dedupe: 1
	};

	fetch(basemap + encodeQueryData(url))
		.then(response => response.json())
		.then(data => {
			const resultContent = document.querySelector('.result-content');

			// console.log(data);
			if (data !== '') {
				data.forEach((e) => {
					resultContent.innerHTML = '<div class="res-item">' +
						'<span class="s-name">' + e['namedetails']['name'] + '</span>' +
						'<span class="s-divider"> - </span>' +
						'<span class="s-old_name">' + (e['namedetails']['old_name'] ?? 'Nevidomo') + '</span>' +
						'<span class="s-district"> (' + e['address']['borough'] + ')</span>'
					'</div>';
				});
			} else {
				resultContent.innerHTML = '<span style="color:red">Error search</span>';
			}
		});

	// console.log(basemap + encodeQueryData(url));
};

searchStreet("героїв Маріуполя");
