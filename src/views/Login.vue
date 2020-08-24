<template>
  <div class="login mt-5">
    <div class="card">
      <div class="card-header">Login</div>
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
              id="email"
              v-model="formLogin.email"
              placeholder="Enter email"
            />
            <div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
              id="password"
              v-model="formLogin.password"
              placeholder="Password"
            />
            <div class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }}</div>
          </div>
          <button class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import store from "@/store";
export default {
  data: () => ({
    formLogin: {
      email: "",
      password: ""
    }
  }),
  computed: {
    ...mapGetters(["errors"])
  },
  mounted() {
    this.$store.commit("setErrors", {});
  },
  methods: {
    ...mapActions("auth", ["sendLogin"]),
    login() {
      this.sendLogin(this.formLogin).then(() => {
        let errors = store.getters["errors"];
        if (!errors.password && !errors.email) {
          this.$router.push({ name: "Home" });
        }
      });
    }
  }
};
</script>

<style></style>
