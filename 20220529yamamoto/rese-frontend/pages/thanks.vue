<template>
  <ThanksCard :toLogin="() => $router.push('/login')"/>
</template>

<script lang="ts">
import Vue from 'vue';
import ThanksCard from '~/components/organisms/Card/Thanks.vue';

export default Vue.extend({
  components: {
    ThanksCard,
  },
});
</script>