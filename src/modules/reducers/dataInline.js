import * as actionType from "../types";

const initial = {
	data: null,
	list: null
};
export function dataInline(state = initial, action) {
	switch (action.type) {
	case actionType.fetchedGetData:
		state = {...state, data: action.data};
		return state;
	case actionType.fetchedGetDataList:
		state = {...state, data: action.data};
		return state;
	default:
		return state;
	}
}
