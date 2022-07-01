<template>
  <div class="container">
    <div class="default-layout" @click="showMenu">
      <div class="default-layout__icon">
        <div class="default-layout__bar default-layout__bar--top"></div>
        <div class="default-layout__bar default-layout__bar--middle"></div>
        <div class="default-layout__bar default-layout__bar--bottom"></div>
      </div>
      <span class="default-layout__logo">Rese</span>
    </div>
    <Nuxt/>
    <div class="default-layout__menu">
      <div class="default-layout__menu-inner">
        <div class="default-layout__icon default-layout__icon--menu" @click="hideMenu">
          <span class="default-layout__icon-cross">×</span>
        </div>
        <div class="default-layout__links" v-if="!$accessor.loggedIn">
          <nuxt-link
            class="default-layout__link"
            to="/" @click.native="hideMenu">
            Home
          </nuxt-link>
          <nuxt-link
            class="default-layout__link"
            to="/register"
            @click.native="hideMenu">
            Registration
          </nuxt-link>
          <nuxt-link
            class="default-layout__link"
            to="/login"
            @click.native="hideMenu">
            Login
          </nuxt-link>
        </div>
        <div class="default-layout__links" v-if="$accessor.loggedIn">
          <span
            class="default-layout__link"
            @click="$accessor.clearState(); $router.push('/'); hideMenu();">
            Home
          </span>
          <span
            class="default-layout__link"
            @click="logout(); hideMenu();">
            Logout
          </span>
          <nuxt-link
            class="default-layout__link"
            to="/mypage"
            @click.native="hideMenu">
            Mypage
          </nuxt-link>
          <nuxt-link
            v-if="$accessor.loggedIn.group === 100"
            class="default-layout__link"
            to="/admin/administrator"
            @click.native="hideMenu">
            Create Representatives
          </nuxt-link>
          <nuxt-link
            v-if="$accessor.loggedIn.group === 10"
            class="default-layout__link"
            to="/admin/representative"
            @click.native="hideMenu">
            Your Shops
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    showMenu(): void {
      const menu = document.querySelector('.default-layout__menu') as HTMLElement;
      menu.classList.add('is-shown');
    },
    hideMenu(): void {
      const menu = document.querySelector('.default-layout__menu') as HTMLElement;
      menu.classList.remove('is-shown');
    },
    async logout(): Promise<void> {
      try {
        await this.$repositories.user.logout();
        this.$accessor.setUser({});
        this.$accessor.setToken(undefined);
        alert('ログアウトしました。');
        this.$router.push('/');
      } catch (error: any) {
        this.$alertErrorMessage(error.response);
      }
    },
  },
});
</script>

<style lang="scss">
.container {
  padding: 30px 30px;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 20px;
  position: relative;
}

.default-layout {
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

  &__menu {
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

  &__menu-inner {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  &__icon--menu {
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

    &__menu {
    transform: translate(-100%, 0) perspective(0) rotateX(0);

    &.is-shown {
      transform: translateX(0) perspective(0) rotateX(0);
    }
  }
  }
}
</style>