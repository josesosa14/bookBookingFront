import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default {
  namespaced: true,
  state: {
    books: []
  },
  getters: {
    books: state => state.books
  },
  mutations: {
    setBooks(state, books) {
      state.books = books;
    },
    substractBookStock(state, book) {
      const newList = state.books.map( element => {
        if (element.id == book.id) {
          element.stock--;
        }
        return element;
      });
      state.books = newList;
      console.log(state.books);
    },
    addBookStock(state, book) {
      const newList = state.books.map( element => {
        if (element.id == book.id) {
          element.stock++;
        }
        return element;
      });
      state.books = newList;
    }
  },
  actions: {
    sendCreate({ commit }, data) {
      commit("setErrors", {}, { root: true });
      return axios.post("/book", data).then(() => { });
    },
    getBooks({ commit }) {
      axios
        .get("/book")
        .then(res => {
          commit("setBooks", res.data);
        })
        .catch(() => {
          commit("setBooks", null);
        });
    }
  },
  modules: {}
};
