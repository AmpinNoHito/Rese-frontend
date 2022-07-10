<template>
  <div class="menu">
    <LinkAtom
      class="menu__item"
      :to="'/'"
      :text="'Home'"
      @click.native="hideMenu"
    />
    <LinkAtom
      class="menu__item"
      :to="'/register'"
      :text="'Registration'"
      @click.native="hideMenu"
    />
    <LinkAtom
      class="menu__item"
      :to="'/login'"
      :text="'Login'"
      @click.native="hideMenu"
    />
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import LinkAtom from '~/components/atoms/Text/Link.vue';

export default Vue.extend({
  components: {
    LinkAtom,
  },
  props: {
    hideMenu: Function,
  },
});
</script>

<style lang="scss">
.menu {
  @include flex(column);
  padding-top: 100px;

  &__item {
    cursor: pointer;
    text-align: center;
    color: $c-blue--dark;
    font-size: $fz-mid-large;
    margin: 10px 0;
    padding: 0 30px;
    @include hoverEffect();
  }

  @include mq() {
    @include flex(column);
    height: 100vh;
    padding-top: 0;

    &__item {
      font-size: $fz-larger;
      margin: 30px 0;
    }
  }
}
</style>