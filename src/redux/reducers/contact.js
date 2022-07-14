import { trophyOutline } from "ionicons/icons";
import {
  REQUEST_CONTACTS,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  REQUEST_CONTACT_DETAILS,
  GET_CONTACT_DETAILS_SUCCESS,
  GET_CONTACT_DETAILS_FAIL,
  REQUEST_CONTACT_DELETE,
  CONTACT_DELETE_SUCCESS,
  CONTACT_DELETE_FAIL,
  REQUEST_CREATE_CONTACT,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAIL,
  REQUEST_UPDATE_CONTACT,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAIL,
} from "../types";

export const initialState = {
  getContacts: {
    data: [],
    action_type: "",
    loading: false,
    errorMessage: null,
  },
  getContactsDetail: {
    data: {},
    action_type: "",
    loading: false,
    errorMessage: null,
  },
  createContact: {
    data: {},
    action_type: "",
    loading: false,
    errorMessage: null,
  },
  deleteContact: {
    data: {},
    action_type: "",
    loading: false,
    errorMessage: null,
  },
  updateContact: {
    data: {},
    action_type: "",
    loading: false,
    errorMessage: null,
  },
};

const contactReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_CONTACTS:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          action_type: action.type,
          loading: true,
          errorMessage: "",
        },
      };
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          data: action.payload,
          action_type: action.type,
          loading: false,
          errorMessage: "",
        },
      };
    case GET_CONTACTS_FAIL:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          action_type: action.type,
          loading: false,
          errorMessage: action.payload,
        },
      };
    case REQUEST_CONTACT_DETAILS:
      return {
        ...state,
        getContactsDetail: {
          ...state.getContactsDetail,
          action_type: action.type,
          loading: true,
          errorMessage: "",
        },
        getContacts: {
          ...state.getContacts,
        },
      };
    case GET_CONTACT_DETAILS_SUCCESS:
      return {
        ...state,
        getContactsDetail: {
          ...state.getContactsDetail,
          data: action.payload,
          action_type: action.type,
          loading: false,
          errorMessage: "",
        },
      };
    case GET_CONTACT_DETAILS_FAIL:
      return {
        ...state,
        getContactsDetail: {
          ...state.getContactsDetail,
          action_type: action.type,
          loading: false,
          errorMessage: action.payload,
        },
      };
    case REQUEST_CONTACT_DELETE:
      return {
        ...state,
        deleteContact: {
          ...state.deleteContact,
          action_type: action.type,
          loading: true,
          errorMessage: "",
        },
      };
    case CONTACT_DELETE_SUCCESS:
      return {
        ...state,
        deleteContact: {
          ...state.deleteContact,
          action_type: action.type,
          data: parseInt(action.payload),
          loading: false,
          errorMessage: "",
        },
        getContacts: {
          ...state.getContacts,
          data: state.getContacts.data.filter(
            (item) => item.id !== parseInt(action.payload)
          ),
          action_type: "GET_CONTACTS_SUCCESS",
          loading: false,
          errorMessage: "",
        },
      };
    case CONTACT_DELETE_FAIL:
      return {
        ...state,
        deleteContact: {
          ...state.deleteContact,
          action_type: action.type,
          loading: false,
          errorMessage: action.payload,
        },
      };
    case REQUEST_CREATE_CONTACT:
      return {
        ...state,
        createContact: {
          ...state.createContact,
          action_type: action.type,
          loading: true,
          errorMessage: "",
        },
      };
    case CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        createContact: {
          ...state.createContact,
          data: action.payload,
          loading: false,
          error: null,
        },
        getContacts: {
          ...state.getContacts,
          data: [action.payload, ...state.getContacts.data],
          loading: false,
          error: null,
        },
      };
    case CREATE_CONTACT_FAIL:
      return {
        ...state,
        createContact: {
          ...state.createContact,
          error: action.payload,
          loading: false,
        },
      };
    case REQUEST_UPDATE_CONTACT:
      return {
        ...state,
        updateContact: {
          ...state.updateContact,
          action_type: action.type,
          loading: true,
          errorMessage: "",
        },
      };
    case UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        updateContact: {
          ...state.updateContact,
          action_type: action.type,
          data: parseInt(action.payload.id),
          loading: false,
          errorMessage: "",
        },
        getContacts: {
          ...state.getContacts,
          data: state.getContacts.data.map((item) => {
            if (item.id === parseInt(action.payload.id)) {
              return action.payload;
            } else {
              return item;
            }
          }),
          action_type: GET_CONTACTS_SUCCESS,
          loading: false,
          errorMessage: "",
        },
        getContactsDetail: {
          ...state.getContactsDetail,
          data: action.payload,
          action_type: GET_CONTACT_DETAILS_SUCCESS,
          loading: false,
          errorMessage: "",
        },
      };
    case UPDATE_CONTACT_FAIL:
      return {
        ...state,
        updateContact: {
          ...state.updateContact,
          error: action.payload,
          loading: false,
        },
      };
    default:
      return state;
  }
};
export default contactReducer;
