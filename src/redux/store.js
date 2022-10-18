import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { compose } from "redux";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
