<template>
  <div class="login mt-5">
    <div class="card">
      <div class="card-header">
        Register
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="email">Name</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.name }"
              id="name"
              v-model="userForm.name"
              placeholder="Enter name"
            />
            <div class="invalid-feedback" v-if="errors.name">
              {{ errors.name[0] }}
            </div>
          </div>
          <div class="form-group">
            <label for="last_name">Last name</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.last_name }"
              id="last_name"
              v-model="userForm.last_name"
              placeholder="Enter last name"
            />
            <div class="invalid-feedback" v-if="errors.last_name">
              {{ errors.last_name[0] }}
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
              id="email"
              v-model="userForm.email"
              placeholder="Enter email"
            />
            <div class="invalid-feedback" v-if="errors.email">
              {{ errors.email[0] }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
              id="password"
              v-model="userForm.password"
              placeholder="Password"
            />
            <div class="invalid-feedback" v-if="errors.password">
              {{ errors.password[0] }}
            </div>
          </div>
          <div class="form-group">
            <label for="password_confirmation">Confirm password</label>
            <input
              type="password"
              class="form-control"
              id="password_confirmation"
              v-model="userForm.password_confirmation"
              placeholder="Confirm password"
            />
          </div>
          <button type="button" @click="register" class="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  data: function() {
    return {
      userForm: {
        name: null,
        last_name: null,
        email: null,
        password: null,
        password_confirmation: null
      }
    };
  },
  computed: {
    ...mapGetters(["errors"])
  },
  mounted() {
    this.$store.commit("setErrors", {});
  },
  methods: {
    ...mapActions("auth", ["sendRegister"]),
    register: function() {
      this.sendRegister(this.userForm).then(() => {
        this.$router.push({ name: "Home" });
      });
    }
  }
};
</script>
