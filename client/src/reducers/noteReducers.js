// reducers/noteReducer.js
import {
  NOTE_ADD_REQUEST,
  NOTE_ADD_SUCCESS,
  NOTE_ADD_FAIL,
  NOTES_REQUEST,
  NOTES_SUCCESS,
  NOTES_FAIL,
  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_SUCCESS,
  NOTE_UPDATE_FAIL,
  FETCH_NOTE_REQUEST,
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_FAIL,
  NOTE_DELETE_REQUEST,
  NOTE_DELETE_SUCCESS,
  NOTE_DELETE_FAIL,
} from "../constants/noteConstants";

const initialState = {
  adding: false,
  loading: false,
  notes: [],
  error: null,
  updating: false,
  note: null,
  deleting: false,
  deleteError: null,
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTE_ADD_REQUEST:
      return { ...state, adding: true };
    case NOTE_ADD_SUCCESS:
      return { ...state, adding: false };
    case NOTE_ADD_FAIL:
      return { ...state, adding: false, error: action.payload };
    case NOTES_REQUEST:
      return { ...state, loading: true };
    case NOTES_SUCCESS:
      return { ...state, loading: false, notes: action.payload, error: null };
    case NOTES_FAIL:
      return { ...state, loading: false, notes: [], error: action.payload };
      case NOTE_UPDATE_REQUEST:
        return { ...state, updating: true };
      case NOTE_UPDATE_SUCCESS:
        return { ...state, updating: false };
      case NOTE_UPDATE_FAIL:
        return { ...state, updating: false, error: action.payload };
        case FETCH_NOTE_REQUEST:
          return { ...state, loading: true, note: null };
        case FETCH_NOTE_SUCCESS:
          return { ...state, loading: false, note: action.payload, error: null };
        case FETCH_NOTE_FAIL:
          return { ...state, loading: false, note: null, error: action.payload };

          case NOTE_DELETE_REQUEST:
            return { ...state, deleting: true };
          case NOTE_DELETE_SUCCESS:
            return { ...state, deleting: false };
          case NOTE_DELETE_FAIL:
            return { ...state, deleting: false, deleteError: action.payload };
    default:
      return state;
  }
};

export default noteReducer;
