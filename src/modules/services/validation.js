export default function validateForm(key,val) {
	let patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let patternPhone = /^0[1-9]\d{7,9}$/g;
	if(key === "phone") {
		return patternPhone.test(val);

	}else if(key === "email"){
		return patternEmail.test(String(val).toLowerCase());
	}
}