import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default {
  namespaced: true,
  state: {
    user: null,
    userBooks: [],
    auth: false
  },
  getters: {
    user: state => state.user,
    userBooks: state => state.userBooks
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.auth = Boolean(user);
    },
    setUserBooks(state, userBooks) {
      state.userBooks = userBooks;
    }
  },
  actions: {
    async sendLogin({ commit, dispatch }, credentials) {
      commit("setErrors", {}, { root: true });
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/login", credentials);
      return dispatch("getUser");
    },
    async sendLogout({ dispatch }) {
      await axios.post("/logout");
      return dispatch("getUser");
    },
    sendRegister({ commit }, data) {
      commit("setErrors", {}, { root: true });
      return axios.post("/register", data).then(res => {
        commit("setUser", res.data.user);
      });
    },
    async sendUpdateProfile({ commit, state }, data) {
      commit("setErrors", {}, { root: true });
      let res = await axios.put(`/updateProfile/${state.user.id}`, data);
      commit("setUser", res.data.user);
      return res;
    },
    async sendChangePassword({ commit }, data) {
      commit("setErrors", {}, { root: true });
      let res = await axios.put("/changePassword", data);
      return res.data;
    },
    getUser({ commit }) {
      axios
        .get("/api/user")
        .then(res => {
          commit("setUser", res.data);
        })
        .catch(() => {
          commit("setUser", null);
        });
    }
  },
  modules: {}
};
