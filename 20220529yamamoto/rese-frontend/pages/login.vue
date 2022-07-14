<template>
  <AuthTemplate>
    <AuthCard
      :form="form"
      :register="false"
      :emailInput="value => this.form.email = value"
      :passwordInput="value => this.form.password = value"
      :buttonClicked="login"
      :errors="errors"
    />
  </AuthTemplate>
</template>

<script lang="ts">
import Vue from 'vue';
import AuthCard from '~/components/organisms/Card/Auth.vue';
import AuthTemplate from '~/layouts/templates/Auth.vue';
import { AuthData } from '~/types/pageData';

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
    } as AuthData;
  },
  methods: {
    async login(): Promise<void> {
      const res = await this.$service.auth.login(this.form, this.$route.query)
        .catch(error => {
          throw this.$handleError(this.errors, error.response);
        });
      
      this.$accessor.setToken(`Bearer ${res[0]}`);
      this.$accessor.setUser(res[1]);
      this.$router.push(res[2]);
    },
  },
});
</script>