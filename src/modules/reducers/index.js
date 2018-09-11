import { combineReducers } from "redux";
import {reducer as formReducer} from "redux-form";
import {dataInline} from "./dataInline";

export default combineReducers({form: formReducer, dataInline});
