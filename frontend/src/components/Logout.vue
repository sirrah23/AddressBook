<template>
  <span @click="logout" style="cursor:pointer">Logout</span>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit("user/logoff");
      this.$router.replace({ path: "/" });
    }
  }
};
</script>
