<template>
  <AuthTemplate>
    <AuthCard
      :admin="true"
      :nameErrors="errors.name"
      :nameInput="value => this.form.name = value"
      :emailErrors="errors.email"
      :emailInput="value => this.form.email = value"
      :passwordErrors="errors.password"
      :passwordInput="value => this.form.password = value"
      :buttonClicked="register"
    />
  </AuthTemplate>
</template>


<script lang="ts">
import Vue from 'vue';
import administrator from '~/middleware/administrator';
import AuthCard from '~/components/organisms/Card/Auth.vue';
import AuthTemplate from '~/layouts/templates/Auth.vue';
import { authData } from '~/types/pageData';

export default Vue.extend({
  middleware: [administrator],
  components: {
    AuthCard,
    AuthTemplate,
  },
  data(){
    return {
      form:{
        name: '',
        email: '',
        password: '',
      },
      errors: {
        name: [],
        email: [],
        password: [],
      },
    } as authData;
  },
  methods:{
    async register(): Promise<void> {
      await this.$service.auth.registerRepresentative(this.form)
        .then(res => this.form = res)
        .then(error => this.$handleError(this.errors, error.response));
    },
  }
});
</script>