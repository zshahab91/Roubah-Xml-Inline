import XMLParser from "react-xml-parser";
import mapingObjFunc from "./mapingObj";

export default function getTokenList(token,oldData,obj) {
	let dataAttributeList = null;
	let json = new XMLParser().parseFromString(obj);
	for (let i =0; i < json.children.length; i++){
		if(json.children[i].name === "list"){
			dataAttributeList  = json.children[i].attributes;
		}
		if(oldData !== null){
			let jsonOld = new XMLParser().parseFromString(oldData);
			json.children[i].children = jsonOld.children[0].children.concat(json.children[i].children);
		}
	}
	let htmlTags = mapingObjFunc(json);
	return {
		attr :dataAttributeList,
		data: htmlTags
	};
}