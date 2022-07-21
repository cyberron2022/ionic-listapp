import {
  CONTACT_DELETE_FAIL,
  CONTACT_DELETE_SUCCESS,
  CREATE_CONTACT_FAIL,
  CREATE_CONTACT_SUCCESS,
  GET_CONTACTS_FAIL,
  GET_CONTACTS_SUCCESS,
  GET_CONTACT_DETAILS_FAIL,
  GET_CONTACT_DETAILS_SUCCESS,
  REQUEST_CONTACTS,
  REQUEST_CONTACT_DELETE,
  REQUEST_CONTACT_DETAILS,
  REQUEST_CREATE_CONTACT,
  REQUEST_UPDATE_CONTACT,
  UPDATE_CONTACT_FAIL,
  UPDATE_CONTACT_SUCCESS,
  UPLOAD_PICTURE_REQUEST,
  UPLOAD_PICTURE_SUCCESS,
  UPLOAD_PICTURE_FAIL,
  TAKE_PICTURE,
  UPLOAD_IMAGE,
  GET_IMAGE_URL,
} from "../types";

export const initialState = {
  getContacts: {
    data: [],
    action_type: "",
    loading: false,
    loadingMessage: null,
    errorMessage: null,
  },
  getContactsDetail: {
    data: {},
    action_type: "",
    loading: false,
    loadingMessage: null,
    errorMessage: null,
  },
  createContact: {
    data: {},
    action_type: "",
    loading: false,
    loadingMessage: null,
    errorMessage: null,
  },
  deleteContact: {
    data: {},
    action_type: "",
    loading: false,
    loadingMessage: null,
    errorMessage: null,
  },
  updateContact: {
    data: {},
    action_type: "",
    loading: false,
    loadingMessage: null,
    errorMessage: null,
  },
  uploadContactPicture: {
    data: {},
    action_type: "",
    loading: false,
    loadingMessage: null,
    errorMessage: null,
  },
  takePicture: {
    data: {},
    action_type: "",
    loading: true,
    errorMessage: null,
  },
  uploadImage: {
    data: {},
    action_type: "",
    loading: true,
    errorMessage: null,
  },
  getImageUrl: {
    data: {},
    action_type: "",
    loading: true,
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
          loadingMessage: "Please wait...",
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
          loadingMessage: null,
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
          loadingMessage: "Please wait...",
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
          loadingMessage: null,
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
          loadingMessage: "Deleting Contact...",
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
          loadingMessage: null,
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
          loadingMessage: "Creating Contact...",
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
          loadingMessage: null,
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
          loadingMessage: "Updating Contact...",
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
          loadingMessage: null,
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
    case UPLOAD_PICTURE_REQUEST:
      return {
        ...state,
        uploadContactPicture: {
          ...state.uploadContactPicture,
          action_type: action.type,
          loading: true,
          loadingMessage: "Uploading Picture...",
          errorMessage: "",
        },
      };
    case TAKE_PICTURE:
      return {
        ...state,
        takePicture: {
          ...state.takePicture,
          data: action.payload,
          loading: true,
          error: null,
        },
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        uploadImage: {
          ...state.uploadImage,
          data: action.payload,
          loading: true,
          error: null,
        },
      };
    case GET_IMAGE_URL:
      return {
        ...state,
        getImageUrl: {
          ...state.getImageUrl,
          data: action.payload,
          loading: true,
          error: null,
        },
      };
    case UPLOAD_PICTURE_SUCCESS:
      return {
        ...state,
        uploadContactPicture: {
          ...state.uploadContactPicture,
          data: action.payload,
          loading: false,
          loadingMessage: null,
          error: null,
        },
      };
    case UPLOAD_PICTURE_FAIL:
      return {
        ...state,
        uploadContactPicture: {
          ...state.uploadContactPicture,
          data: null,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};
export default contactReducer;
