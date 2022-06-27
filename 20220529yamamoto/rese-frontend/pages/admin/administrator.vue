<template>
  <div class="auth">
    <form class="auth__form">
      <p class="auth__form-title">Representative Registration</p>
      <div class="auth__form-inner">
        <InputAuth
          :labelImage="require('~/assets/images/icon-user.png')"
          labelFor="name"
          inputType="text"
          inputId="name"
          inputPlaceholder="Representative's name"
          v-model="form.name"
          :errors="errors.name"/>
        <InputAuth
          :labelImage="require('~/assets/images/icon-email.png')"
          labelFor="email"
          inputType="email"
          inputId="email"
          inputPlaceholder="Representative's Email"
          v-model="form.email"
          :errors="errors.email"/>
        <InputAuth
          :label-image="require('~/assets/images/icon-password.png')"
          label-for="password"
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
  import administrator from '~/middleware/administrator';
  export default {
    middleware: [administrator],
    data(){
      return {
        form:{
          name:'',
          email:'',
          password:''
        },
        errors: {
          name: '',
          email: '',
          password: '',
        }
      }
    },
    methods:{
      async register(){
        try {
          /* 新規店舗代表者登録処理 */
          await this.$axios.post('/api/admin/representatives', this.form);
          alert('新規店舗代表者が登録されました。\nアドレス検証用のメールをご確認いただくよう、代表者にお伝えください。');
          Object.keys(this.form).forEach(key => this.form[key] = '');
        } catch (error) {
          this.errorHandling(error.response);
        }
      },
    }
  };
</script>