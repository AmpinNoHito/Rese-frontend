<template>
  <div class="auth">
    <form class="auth__form">
      <p class="auth__form-title">Login</p>
      <div class="auth__form-inner">
        <InputAuth
          :labelImage="require('~/assets/images/icon-email.png')"
          inputType="email"
          inputId="email"
          inputPlaceholder="Email"
          v-model="form.email"
          :errors="errors.email"/>
        <InputAuth
          :labelImage="require('~/assets/images/icon-password.png')"
          inputType="password"
          inputId="password"
          inputPlaceholder="Password"
          v-model="form.password"
          :errors="errors.password"/>
        <ButtonBasic class="auth__button" @clicked="login">ログイン</ButtonBasic>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { user } from '~/types/api';
import { RawLocation } from 'vue-router';
import { authData } from '~/types/pageData';

export default Vue.extend({
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
      try {
        const [token, user, location]: [string, user, RawLocation] = await this.$service.auth.login(this.form, this.$route.query);
        this.$accessor.setToken(`Bearer ${token}`);
        this.$accessor.setUser(user);
        this.$router.push(location);
      } catch (error: any) {
        this.errors = this.$handleError(Object.keys(this.errors), error.response);
      }
    },
  },
});
</script>