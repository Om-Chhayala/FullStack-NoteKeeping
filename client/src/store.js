import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer , userSignupReducer} from "./reducers/userReducers";
import noteReducer from "./reducers/noteReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  notes: noteReducer,
  
});

const userInfoFromStorage = localStorage.getItem("token")
  ? localStorage.getItem("token") // Fix localStorage getItem
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userSignup: {} 
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
