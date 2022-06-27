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

<script>
  export default {
    data(){
      return {
        form:{
          name:'',
          email:'',
          password:''
        },
        errors: {
          name: [],
          email: [],
          password: [],
        }
      }
    },
    methods:{
      async register(){
        try {
          /* 新規登録処理 */
          const res = await this.$axios.post('/api/auth/register', this.form);
          this.$router.push('/thanks');
        } catch (error) {
          this.errorHandling(error.response);
        }
      },
    }
  }
</script>
