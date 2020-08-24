<template>
  <div class="login mt-5">
    <div class="card">
      <div class="card-header">Change Password</div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="password">Current password</label>
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.current_password }"
              id="current_password"
              v-model="passwordForm.current_password"
              placeholder="Password"
            />
            <div class="invalid-feedback" v-if="errors.current_password">
              {{ errors.current_password[0] }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">New password</label>
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.new_password }"
              id="new_password"
              v-model="passwordForm.new_password"
              placeholder="New password"
            />
            <div class="invalid-feedback" v-if="errors.new_password">
              {{ errors.new_password[0] }}
            </div>
          </div>
          <div class="form-group">
            <label for="new_password_confirmation">Confirm password</label>
            <input
              type="password"
              class="form-control"
              id="new_password_confirmation"
              v-model="passwordForm.new_password_confirmation"
              placeholder="Confirm password"
            />
          </div>
          <button type="button" @click="changePassword" class="btn btn-primary">
            Change Password
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: function() {
    return {
      passwordForm: {
        current_password: null,
        new_password: null,
        new_password_confirmation: null
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
    ...mapActions("auth", ["sendChangePassword"]),
    async changePassword() {
      let res = await this.sendChangePassword(this.passwordForm);
      if (res.sucess)
        this.$router.push({
          name: "Home",
          params: { success: res.success }
        });
      else this.$router.push({ name: "Home" });
    }
  }
};
</script>
