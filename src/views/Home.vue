<template>
  <div class="container">
    <AlertMessage :alert_message="alert_message" v-if="alert_message.message" />
    <div class="row">
      <BookList component_title="Book List" :books="getAllBooks" v-if="getAllBooks" />
    </div>
    <div class="row">
      <BookList
        component_title="Your Bookings"
        :my_list="1"
        :books="getUserBookings"
        v-if="getUserBookings.length"
      />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import BookList from "@/components/BookList.vue";
import AlertMessage from "@/components/AlertMessage.vue";

import store from "@/store";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    BookList,
    AlertMessage
  },
  created() {
    store.dispatch("book/getBooks");
    store.dispatch("booking/getUserBookings");
    if (this.$route.params && this.$route.params.success) {
      store.commit("setAlertMessage", {
        type: "success",
        message: this.$route.params.success
      });
    }
  },
  mounted() {
    this.$store.commit("setAlertMessage", {});
  },
  computed: {
    ...mapGetters("book", ["books"]),
    ...mapGetters(["alert_message"]),
    getAllBooks() {
      return store.getters["book/books"];
    },
    getUserBookings() {
      return store.getters["booking/bookings"];
    }
  }
};
</script>
<style scoped>
</style>
