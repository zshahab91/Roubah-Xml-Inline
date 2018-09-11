export default function createRating(tag) {
	let nodeStar = document.createElement("span");
	nodeStar.setAttribute("class", "star-cb-group");
	for ( let i=5; i>0; i--){
		let inputStar= document.createElement("input");
		let labelStar= document.createElement("label");

		labelStar.setAttribute("for","rating-"+i);
		inputStar.setAttribute("type","radio");
		inputStar.setAttribute("id","rating-"+i);
		inputStar.setAttribute("name","rating");
		inputStar.setAttribute("value",i);
		inputStar.setAttribute("class","star-input");
		nodeStar.appendChild(inputStar);
		nodeStar.appendChild(labelStar);

	}
	tag.appendChild(nodeStar);
	return tag;
}