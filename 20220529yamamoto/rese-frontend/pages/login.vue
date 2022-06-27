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

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        errors: {
          email: '',
          password: '',
        }
      };
    },
    methods: {
      async login() {
        try {
          /* ログイン処理 */
          await this.$auth.loginWith('laravelSanctum', {
            data: this.form,
          });

          const resUser = await this.$axios.get('/api/auth/user');
          this.$store.commit('setUser', resUser.data.user);
          /** 予約画面から遷移してきた場合は予約画面に戻る 
           *  入力情報を復元できるようにクエリパラメータを渡す
           */
          const query = this.$route.query;
          if (Object.keys(query).length) {
            this.$router.push({
              path: `/shops/${query.sh}`,
              query: {
                dt: query.dt,
                tm: query.tm,
                nm: query.nm,
                sc: query.sc,
              }
            });
          } else {
            this.$router.push('/');
          }
        } catch (error) {
          this.errorHandling(error.response);
        }
      },
    },
  };
</script>