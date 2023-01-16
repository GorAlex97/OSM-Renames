// import { encodeQueryData } from "./f.js";
function encodeQueryData(data) {
	let ret = [];
	for (let d in data)
		ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));

	return ret.join("&");
}

const searchStreet = (street) => {
	const basemap = "https://nominatim.openstreetmap.org/search.php?",
		// search = document.querySelector("#street-search"),
		// result = document.querySelector(".result"),
		resultContent = document.querySelector(".result-content");

	const url = {
		street: street,
		city: "Київ",
		format: "jsonv2",
		addressdetails: 1,
		namedetails: 1,
		extratags: 1,
		"accept-language": "uk",
		limit: 15,
		email: "5267720@gmail.com",
		dedupe: 1
	};

	fetch(basemap + encodeQueryData(url))
		.then((response) => response.json())
		.then((data) => {
			// console.log(data);
			if (data !== "") {
				data.forEach((e) => {
					resultContent.append =
						'<div class="res-item">' +
						e["namedetails"]["name"] + " - " + e["namedetails"]["old_name"]
					'</div>';
				});
			} else {
				resultContent.innerHTML = '<span style="color:red">Error search</span>';
			}
		});

	// console.log(basemap + encodeQueryData(url));
};

searchStreet("героїв Маріуполя");

  // console.log("test 123");

/*console.log(
  encodeQueryData({
	street: "test",
	city: "Київ",
	format: "jsonv2",
	addressdetails: 1,
	namedetails: 1
  })
);*/
