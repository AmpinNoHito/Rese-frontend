<template>
  <div class="default-template">
    <Logo :showMenu="showMenu"/>
    <Nuxt/>
    <MainMenu/>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/molecules/Icon/Logo.vue';
import MainMenu from '~/components/organisms/Composition/MainMenu.vue';

export default Vue.extend({
  components: {
    Logo,
    MainMenu,
  },
  methods: {
    showMenu(): void {
      document.querySelector('.main-menu')?.classList.add('is-shown');
    },
  },
});
</script>

<style lang="scss">
.default-template {
  padding: 30px 30px;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 20px;
  position: relative;
}
</style>