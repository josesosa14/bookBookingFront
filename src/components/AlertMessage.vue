<template>
  <div
    v-bind:class="[isSuccess ? 'alert-success' : 'alert-danger']"
    class="alert alert-dismissible fade show"
  >
    <strong>{{ alert_message.type }} !</strong>
    {{ alert_message.message }} {{ alert_message.link }}
  </div>
</template>
<script>
export default {
  props: {
    alert_message: []
  },
  created() {
    this.isSuccess = this.alert_message.type == "success" ? true : false;
  },
  data: function() {
    return {
      isSuccess: true
    };
  }
};
</script>
