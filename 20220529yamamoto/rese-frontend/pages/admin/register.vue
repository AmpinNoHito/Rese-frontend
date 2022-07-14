<template>
  <AuthTemplate>
    <AuthCard
      :admin="true"
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
import administrator from '~/middleware/administrator';
import AuthCard from '~/components/organisms/Card/Auth.vue';
import AuthTemplate from '~/layouts/templates/Auth.vue';
import { AuthData } from '~/types/pageData';

export default Vue.extend({
  middleware: [administrator],
  components: {
    AuthCard,
    AuthTemplate,
  },
  data(){
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
      const res = await this.$service.auth.registerRepresentative(this.form)
        .catch(error => {
          throw this.$handleError(this.errors, error.response);
        });

      this.form = res;
    },
  }
});
</script>