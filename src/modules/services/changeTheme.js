export default function changeTheme(obj) {
	Object.entries(obj.attributes).forEach(([key, val]) => {
		let  elements = document.getElementsByClassName("bodyContent");
		let  elementsBtn = document.getElementsByTagName("a");
		if(key !== "primary") {
			for (let i = 0; i < elements.length; i++) {
				if(key === "text"){
					key = "color";
				}
				elements[i].style[key]=val;
			}
		}else{
			for (let i = 0; i < elementsBtn.length; i++) {
				if(key === "primary"){
					key = "color";
					elementsBtn[i].style[key]=val;
				}
			}
		}
	});

}