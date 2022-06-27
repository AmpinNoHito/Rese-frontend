<template>
  <div class="container">
    <div class="menu" @click="showHiddenMenu">
      <div class="menu__icon">
        <div class="menu__bar menu__bar--top"></div>
        <div class="menu__bar menu__bar--middle"></div>
        <div class="menu__bar menu__bar--bottom"></div>
      </div>
      <span class="menu__logo">Rese</span>
    </div>
    <Nuxt/>
    <div class="menu__hidden">
      <div class="menu__hidden-inner">
        <div class="menu__icon menu__icon--hidden" @click="hideHiddenMenu">
          <span class="menu__icon-cross">×</span>
        </div>
        <div class="menu__links" v-if="!$store.state.user">
          <nuxt-link
            class="menu__link"
            to="/" @click.native="hideHiddenMenu">
            Home
          </nuxt-link>
          <nuxt-link
            class="menu__link"
            to="/register"
            @click.native="hideHiddenMenu">
            Registration
          </nuxt-link>
          <nuxt-link
            class="menu__link"
            to="/login"
            @click.native="hideHiddenMenu">
            Login
          </nuxt-link>
        </div>
        <div class="menu__links" v-if="$store.state.user">
          <span
            class="menu__link"
            @click="$store.dispatch('clearState'); $router.push('/'); hideHiddenMenu();">
            Home
          </span>
          <span
            class="menu__link"
            @click="logout(); hideHiddenMenu();">
            Logout
          </span>
          <nuxt-link
            class="menu__link"
            to="/mypage"
            @click.native="hideHiddenMenu">
            Mypage
          </nuxt-link>
          <nuxt-link
            v-if="$store.state.user.group === 100"
            class="menu__link"
            to="/admin/administrator"
            @click.native="hideHiddenMenu">
            Create Representatives
          </nuxt-link>
          <nuxt-link
            v-if="$store.state.user.group === 10"
            class="menu__link"
            to="/admin/representative"
            @click.native="hideHiddenMenu">
            Your Shops
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      showHiddenMenu() {
        const hiddenMenu = document.querySelector('.menu__hidden');
        hiddenMenu.classList.add('is-shown');
      },
      hideHiddenMenu() {
        const hiddenMenu = document.querySelector('.menu__hidden');
        hiddenMenu.classList.remove('is-shown');
      },
      async logout() {
        try {
          this.$store.commit('setUser', '');
          await this.$axios.post('/api/auth/logout');
          localStorage.setItem('auth._token.laravelSanctum', null);
          alert('ログアウトしました。');
          this.$router.push('/');
        } catch (error) {
          this.alertErrorMessage(error.response);
        }
      },
    },
  };
</script>

<style lang="scss">
  .container {
    padding: 30px 30px;
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 20px;
    position: relative;
  }

  .menu {
    cursor: pointer;
    position: absolute;
    top: 30px;
    left: 30px;
    width: fit-content;
    z-index: 10;
    @include flex($jc: flex-start);

    &__icon {
      width: 30px;
      height: 30px;
      background-color: $c-blue;
      border-radius: 5px;
      padding: 8px;
      margin-right: 10px;
      @include shadow(2);
      @include flex(column, space-between, flex-start);
    }

    &__bar {
      height: 1px;
      background-color: #fff;
      &--top {
        width: 60%;
      }
      &--middle {
        width: 100%;
      }
      &--bottom {
        width: 30%;
      }
    }

    &__logo {
      font-weight: bold;
      font-size: $fz-large;
      color: $c-blue;
    }

    &__hidden {
      transform: translateY(-100%) perspective(1000px) rotateX(100deg);
      visibility: hidden;
      opacity: 0;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: #fff;
      transition: $tr-04;
      z-index: 10;

      &.is-shown {
        transform: translateY(0) rotateX(0);
        visibility: visible;
        opacity: 1;
      }
    }

    &__hidden-inner {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
    }

    &__icon--hidden {
      cursor: pointer;
      position: absolute;
      top: 30px;
      left: 30px;
      padding: 0;
      font-size: $fz-large;
      @include flex();
    }

    &__icon-cross {
      color: #fff;
      text-align: center;
    }

    &__links {
      @include flex(column);
      padding-top: 100px;
    }

    &__link {
      cursor: pointer;
      text-align: center;
      color: $c-blue--dark;
      font-size: $fz-mid-large;
      margin: 10px 0;
      padding: 0 30px;
      @include hoverEffect();
    }
  }

  /* レスポンシブ */
  @include mq() {
    .menu {
      &__icon {
        width: 40px;
        height: 40px;
        padding: calc(8px * 4/3);
      }
      &__logo {
        font-size: $fz-largest;
      }

      &__links {
        @include flex(column);
        height: 100vh;
        padding-top: 0;
      }

      &__link {
        font-size: $fz-larger;
        margin: 30px 0;
      }

      &__hidden {
      transform: translate(-100%, 0) perspective(0) rotateX(0);

      &.is-shown {
        transform: translateX(0) perspective(0) rotateX(0);
      }
    }
    }
  }
</style>