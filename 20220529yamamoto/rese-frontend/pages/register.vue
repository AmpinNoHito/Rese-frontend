<template>
  <div class="auth">
    <form class="auth__form">
      <p class="auth__form-title">Registration</p>
      <div class="auth__form-inner">
        <InputAuth
          :labelImage="require('~/assets/images/icon-user.png')"
          inputType="text"
          inputId="name"
          inputPlaceholder="Username"
          v-model="form.name"
          :errors="errors.name"/>
        <InputAuth
          :labelImage="require('~/assets/images/icon-email.png')"
          inputType="email"
          inputId="email"
          inputPlaceholder="Email"
          v-model="form.email"
          :errors="errors.email"/>
        <InputAuth
          :label-image="require('~/assets/images/icon-password.png')"
          inputType="password"
          inputId="password"
          inputPlaceholder="Password"
          v-model="form.password"
          :errors="errors.password"/>
        <ButtonBasic class="auth__button" @clicked="register">登録</ButtonBasic>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { sendData } from '~/types/api';
import { errorsObject } from '~/types/errors';

export default Vue.extend({
  data(){
    return {
      form:{
        name:'' as string,
        email:'' as string,
        password:'' as string,
      } as sendData,
      errors: {
        name: [],
        email: [],
        password: [],
      } as errorsObject,
    }
  },
  methods:{
    async register(): Promise<void> {
      try {
        /* 新規登録処理 */
        await this.$repositories.user.register(this.form);
        this.$router.push('/thanks');
      } catch (error: any) {
        this.errors = this.$errorHandling(Object.keys(this.errors), error.response);
      }
    },
  }
});
</script>
