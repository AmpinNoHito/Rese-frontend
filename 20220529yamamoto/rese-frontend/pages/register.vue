<template>
  <AuthTemplate>
    <AuthCard
      :form="form"
      :nameInput="value => this.form.name = value"
      :emailInput="value => this.form.email = value"
      :passwordInput="value => this.form.password = value"
      :buttonClicked="register"
      :errors="errors"
    />
  </AuthTemplate>
</template>

<script lang="ts">
import Vue from 'vue';
import { AuthData } from '~/types/pageData';
import AuthCard from '~/components/organisms/Card/Auth.vue';
import AuthTemplate from '~/layouts/templates/Auth.vue';

export default Vue.extend({
  components: {
    AuthCard,
    AuthTemplate,
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
      errors: {
        name: [],
        email: [],
        password: [],
      },
    } as AuthData;
  },
  methods:{
    async register(): Promise<void> {
      await this.$service.auth.register(this.form)
        .catch(error => {
          throw this.$handleError(this.errors, error.response);
        });
      
      this.$router.push('/thanks');
    },
  }
});
</script>
