import XMLParser from "react-xml-parser";
import mapingObjFunc from "./mapingObj";
export default function xmlToHtmlFunc(xml) {
	let htmlTags = null;
	let json = new XMLParser().parseFromString(xml);
	for (let i =0; i < json.children.length; i++){
		if (json.children[i].name.slice(0,1) === "/") {
			json.children.splice(i,1);
		}
		if(json.children[i].name === "list"){
			htmlTags = mapingObjFunc(json.children[i]);
		}

	}
	htmlTags = mapingObjFunc(json);
	return htmlTags;

}