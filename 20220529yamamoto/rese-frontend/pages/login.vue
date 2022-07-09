<template>
  <AuthTemplate>
    <AuthCard
      :register="false"
      :emailErrors="errors.email"
      :emailInput="value => this.form.email = value"
      :passwordErrors="errors.password"
      :passwordInput="value => this.form.password = value"
      :buttonClicked="login"
    />
  </AuthTemplate>
</template>

<script lang="ts">
import Vue from 'vue';
import AuthCard from '~/components/organisms/Card/Auth.vue';
import AuthTemplate from '~/layouts/templates/Auth.vue';
import { authData } from '~/types/pageData';

export default Vue.extend({
  components: {
    AuthCard,
    AuthTemplate,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: {
        email: [],
        password: [],
      },
    } as authData;
  },
  methods: {
    async login(): Promise<void> {
      await this.$service.auth.login(this.form, this.$route.query)
        .then(res => {
          this.$accessor.setToken(`Bearer ${res[0]}`);
          this.$accessor.setUser(res[1]);
          this.$router.push(res[2]);
        })
        .catch(error => this.$handleError(this.errors, error.response));
    },
  },
});
</script>