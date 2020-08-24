import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default {
  namespaced: true,
  state: {
    bookings: []
  },
  getters: {
    bookings: state => state.bookings
  },
  mutations: {
    setBookings(state, bookings) {
      state.bookings = bookings;
    },
    addBooking(state, booking) {
      state.bookings.push(booking);
    },
    substractBooking(state, booking){
      const newList = state.bookings.filter( element => element.pivot.id != booking.pivot.id);
      state.bookings = newList;
    }
  },
  actions: {
    async sendBooking({ commit }, data) {
      commit("setErrors", {}, { root: true });
      let res = await axios.post("/booking", data);
      if(this.getters["alert_message"].type != "danger"){
        commit("addBooking", res.data.book);
        this.commit("book/substractBookStock", res.data.book);
      }
      return res.data.book;
    },
    async sendCancelBooking({ commit }, data) {
      console.log(data);
      let res = await axios.post("/cancelBooking", data);
      if(this.getters["alert_message"].type != "danger"){
        commit("substractBooking", data);
        this.commit("book/addBookStock", data);
      }
      return res.data.book;
    },
    getUserBookings({ commit }) {
      axios.get("/userBooks").then(res => {
        commit("setBookings", res.data);
      });
    }
  },
  modules: {}
}
