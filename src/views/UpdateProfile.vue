<template>
  <div class="login mt-5">
    <div class="card">
      <div class="card-header">Edit Profile</div>
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
            <div class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</div>
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
            <div class="invalid-feedback" v-if="errors.last_name">{{ errors.last_name[0] }}</div>
          </div>
          <button type="button" @click="updateProfile" class="btn btn-primary">Edit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
export default {
  created() {
    this.fetchAuthenticatedUser();
  },
  data: function() {
    return {
      userForm: {
        name: null,
        last_name: null
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
    ...mapActions("auth", ["sendUpdateProfile"]),
    fetchAuthenticatedUser() {
      axios.get("/api/user").then(res => {
        this.userForm.name = res.data.name;
        this.userForm.last_name = res.data.last_name;
      });
    },
    async updateProfile() {
      let res = await this.sendUpdateProfile(this.userForm);
      if (res.data.sucess)
        this.$router.push({
          name: "Home",
          params: { success: res.data.sucess }
        });
      else this.$router.push({ name: "Home" });
    }
  }
};
</script>
