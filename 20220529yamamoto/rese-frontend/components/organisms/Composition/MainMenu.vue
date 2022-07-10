<template>
  <div class="main-menu">
    <div class="main-menu__inner">
      <CrossIcon :hideMenu="hideMenu"/>
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
</template>

<script lang="ts">
import Vue from "vue";
import CrossIcon from '~/components/molecules/Icon/Cross.vue';
import LoggedOutMenu from '~/components/organisms/Functional/LoggedOutMenu.vue';
import LoggedInMenu from '~/components/organisms/Functional/LoggedInMenu.vue';

export default Vue.extend({
  components: {
    CrossIcon,
    LoggedOutMenu,
    LoggedInMenu,
  },
  methods: {
    hideMenu(): void {
      document.querySelector('.main-menu')?.classList.remove('is-shown');
    },
  },
});
</script>

<style lang="scss">
.main-menu {
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

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  @include mq() {
    transform: translate(-100%, 0) perspective(0) rotateX(0);
    &.is-shown {
      transform: translateX(0) perspective(0) rotateX(0);
    }
  }
}
</style>