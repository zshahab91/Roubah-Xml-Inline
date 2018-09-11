import * as actionType from "./../types/index";
import Api from "../config/api";
import xmlToHtmlFunc from  "../services/xmltoHtml";
import getTokenList from  "../services/getTokenList";

// const sample = `<page>
//  <divider/>
//    <list token="2" path="categories">
//         <card elevated="true" action="detail/679573">
//             <image aspectRatio="1:1" src="http://cdn.bartarinha.ir/files/fa/news/1396/12/1/1588681_512_MQ.jpg"/>
//             <text>
//                 <b>اینفوگرافی: سال‌های سقوط</b>
//             </text>
//             <text>
//                 <small>
//                     <font color="gray">۱۳۹۶/۱۲/۰۱ ۰۷:۲۲</font>
//                 </small>
//             </text>
//         </card>
//         <card elevated="true" action="detail/678467">
//             <image aspectRatio="1:1" src="http://cdn.bartarinha.ir/files/fa/news/1396/12/1/1588680_438_MQ.jpg"/>
//             <text>
//                 <b>فساد دیوانی، امتناعِ گفت‌و‌گو و اعتماد عمومی</b>
//             </text>
//             <text>
//                 <small>
//                     <font color="gray">۱۳۹۶/۱۲/۰۱ ۰۷:۲۱</font>
//                 </small>
//             </text>
//         </card>
//         </list>
//
// </page>`
export function getDataInline(data) {
	return (dispatch) => {
		dispatch({type: actionType.fetchedStartGetData});
		return  Api.get({url: "/"+data}).then(
			res => dispatch({type: actionType.fetchedGetData, data:  xmlToHtmlFunc(res.data)}),
			err => {
				throw err;
			}
		);
	};
}
export function getDataInlineList(data) {
	// console.log('data in getDataInlineList is: ', data)
	let formData = new FormData();
	let dataSend = {
		"token" : data.token
	};
	formData.append("payload", JSON.stringify(dataSend));
	return (dispatch) => {
		dispatch({type: actionType.fetchedStartGetDataList});
		return  Api.post({url:data.path,data: formData}).then(
			res => {
				// console.log('res is:', res.data)
				let result = getTokenList(data.token,data.oldData,res.data);
				return dispatch({type: actionType.fetchedGetDataList, data: result.data ,xml:res.data,attr: result.attr});
			},
			err => {
				throw err;
			}
		);
	};
}