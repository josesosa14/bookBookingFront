import { createStore } from "vuex";
import auth from "./auth";
import bookAuthor from "./bookAuthor";
import book from "./book";
import booking from "./booking";

export default createStore({
  state: {
    errors: [],
    alert_message: []
  },

  getters: {
    errors: state => state.errors,
    alert_message: state => state.alert_message
  },

  mutations: {
    setErrors(state, errors) {
      state.errors = errors;
    },
    setAlertMessage(state, alert_message) {
      state.alert_message = alert_message;
    }
  },

  actions: {},

  modules: {
    auth,
    bookAuthor,
    book,
    booking
  }
});
