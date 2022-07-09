<template>
  <div class="main-menu">
    <LogoUnit :showMenu="showMenu"/>
    <Nuxt/>
    <div class="main-menu__container">
      <div class="main-menu__inner">
        <Cross :hideMenu="hideMenu"/>
        <LoggedOutMenu
          v-if="!$accessor.loggedIn"
          :hideMenu="hideMenu"
        />
        <LoggedInMenu
          v-if="$accessor.loggedIn"
          :hideMenu="hideMenu"
        />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Cross from '~/components/molecules/Icon/Cross.vue';
import LogoUnit from '~/components/molecules/Icon/Logo.vue';
import LoggedOutMenu from '~/components/organisms/Functional/LoggedOutMenu.vue';
import LoggedInMenu from '~/components/organisms/Functional/LoggedInMenu.vue';

export default Vue.extend({
  components: {
    Cross,
    LogoUnit,
    LoggedOutMenu,
    LoggedInMenu,
  },
  methods: {
    showMenu(): void {
      document.querySelector('.main-menu__container')?.classList.add('is-shown');
    },
    hideMenu(): void {
      document.querySelector('.main-menu__container')?.classList.remove('is-shown');
    },
  },
});
</script>

<style lang="scss">
.main-menu {
  padding: 30px 30px;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 20px;
  position: relative;

  &__container {
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

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  @include mq() {
    &__container {
      transform: translate(-100%, 0) perspective(0) rotateX(0);
      &.is-shown {
        transform: translateX(0) perspective(0) rotateX(0);
      }
    }
  }
}
</style>