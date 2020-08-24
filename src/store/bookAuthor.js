import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default {
  namespaced: true,
  state: {
    bookAuthor: null
  },
  getters: {
    bookAuthor: state => state.bookAuthor
  },
  mutations: {
    setBookAuthor(state, bookAuthor) {
      state.bookAuthor = bookAuthor;
    }
  },
  actions: {
    getAuthor({ commit }) {
      axios
        .get("/author")
        .then(res => {
          commit("setBookAuthor", res.data);
        })
        .catch(() => {
          commit("setBookAuthor", null);
        });
    }
  },
  modules: {}
};
