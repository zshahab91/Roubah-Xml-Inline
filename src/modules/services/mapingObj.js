import local from "./locales/tag";
import setValueHref from "./changeAction";
import changeTheme from "./changeTheme";
import createRating from "./createRating";
export default function mapingObjFunc(obj) {
	let tag = null;
	let classes = "";
	Object.entries(obj).forEach(([key, val]) => {
		if(key === "name") {
			if( val === "footer" ){
				if(obj.children.length !== 0){
					val = "div";
				}
				classes += "footer";
			}
			tag = document.createElement(local[val]!== undefined ? local[val] : val);
			if(val === "rating"){
				classes += " stars";
			}
			if(val === "ratingInput"){
				classes += "rating";
				createRating(tag);
			}
			if(val === "divider"){
				classes += " vr";
			}
			if(val === "dualbuttons") {
				classes += " dualBtn";
			}
			if(val === "card"){
				classes += " card clearfix";
			}
			if(local[val]  === "a") {
				classes += " btn btn-lg btn-outline-primary";
			}
			if( val === "header") {
				classes += "header";
			}
			if( val === "theme"){
				changeTheme(obj);
			}
			if( val === "list"){
				tag.setAttribute("id","lists");
			}
			if( val === "image"){
				classes += "imgNormal";
			}
			if( val === "checkbox") {
				tag = document.createElement("div");
				tag.setAttribute("isCheckBox","true");
				classes += "checkbox";
			}
			if( val === "button" ) {
				tag.setAttribute("type","submit");
				classes += " btn btn-lg btn-outline-primary";
			}
			if(val === "imagePicker"){
				tag.setAttribute("type", "file");
				classes += "uploader";
			}
		}
		if(key === "attributes" && Object.keys(val).length!== 0){
			Object.entries(val).forEach(([keyAttr, valAttr]) => {
				if(keyAttr === "action") {
					// classes += ' btn-primary'
				}
				if(valAttr === "centeredTitle"){
					tag.style["font-weight"] = "bold";
				}
				if(keyAttr==="value"){
					tag.setAttribute("data-percent", valAttr*10);
				}
				if(keyAttr === "style"){
					if(valAttr === "secondary"){
						classes += " btn-outline-primary";
					}else if(valAttr === "primary") {
						classes = classes.replace("btn-outline-primary", "btn-primary");
						// classes += ' btn-primary'
					}else if(valAttr === "avatar"){
						classes += " avatar";
					}else if(valAttr=== "normal"){
						classes += " fullWidth";
					}else if(valAttr === "small") {
						classes += " cardSmall";
					}else if(valAttr === "large") {
						classes += " cardLarge";
					}
				}
				if(keyAttr === "width"){
					tag.style["width"] = valAttr;
				}
				if(keyAttr === "direction"){
					if(valAttr === "reverse"){
						classes +=  " cardReverse";
					}
				}
				if(keyAttr === "elevated"){
					if(valAttr){
						classes += " cardElevated";
					}
				}
				if(keyAttr === "aspectratio"){
					// tag.style[]
				}
				if(keyAttr === "field"){
					tag.setAttribute("required",true);
					if(valAttr === "phone"){
						classes += "phone";
						tag.setAttribute("maxlength",11);
					}
				}
				let keyAttrLocal = local[keyAttr] !== undefined ? local[keyAttr] : keyAttr;
				valAttr = local[valAttr] !== undefined ? local[valAttr] : valAttr;
				let att = document.createAttribute(keyAttrLocal);
				tag.setAttributeNode(att);
				if(keyAttrLocal === "href"){
					att.value = setValueHref(valAttr);
				}else{
					att.value = valAttr ;
				}
				tag.style[keyAttrLocal] = valAttr;
			});
		}
		if(key === "children" && val.length !== 0 && tag !== null){
			for(let i = 0; i< val.length; i++){
				if(val[i].name === "validation"){
					tag.setAttribute("isValidate" , true);
				}
				let child = mapingObjFunc(val[i]);
				tag.appendChild(child);
			}
		}

		if(key === "value" && val.length !== 0 && tag !== null){
			let txt = document.createTextNode(val);
			tag.appendChild(txt);

			if(tag.hasAttribute("isCheckBox")) {
				let label = document.createElement("label");
				let checkbox = document.createElement("input");
				checkbox.setAttribute("type", "checkbox");
				checkbox.setAttribute("value", true);
				checkbox.setAttribute("field", tag.getAttribute("field"));
				checkbox.setAttribute("id", tag.getAttribute("field"));
				label.appendChild(txt);
				tag.appendChild(label);
				tag.appendChild(checkbox);
			}

		}
	});
	if(classes !== "") {
		tag.setAttribute("class",classes);
	}

	return tag;
}