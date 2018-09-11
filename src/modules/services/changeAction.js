export default function setValueHref(url) {
	let firstChar = url.slice(0,1);
	let newUrl = url;
	if(firstChar === "w"){
		let part_url = url.split("web:");
		newUrl = part_url[1];
	}
	if(url ==="@back"){
		newUrl = "javascript:history.back()";
	}
	if(url === "@exit"){
		newUrl = "/";
	}
	return newUrl;
}