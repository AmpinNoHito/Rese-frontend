<template>
  <div class="menu">
    <ClickableSpan
      class="menu__item"
      :text="'Home'"
      :clicked="() => {$accessor.clearSearchKeys(); $router.push('/'); hideMenu();}"
    />
    <ClickableSpan
      class="menu__item"
      :text="'Logout'"
      :clicked="() => {logout(); hideMenu();}"
    />
    <LinkAtom
      class="menu__item"
      :to="'/mypage'"
      :text="'Mypage'"
      @click.native="hideMenu"
    />
    <LinkAtom
      v-if="$accessor.user.group === 100"
      class="menu__item"
      :to="'/admin/register'"
      :text="'Create Representatives'"
      @click.native="hideMenu"
    />
    <LinkAtom
      v-if="$accessor.user.group === 10"
      class="menu__item"
      :to="'/admin'"
      :text="'Your Shops'"
      @click.native="hideMenu"
    />
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import LinkAtom from '~/components/atoms/Text/Link.vue';
import ClickableSpan from '~/components/atoms/Text/ClickableSpan.vue';

export default Vue.extend({
  components: {
    LinkAtom,
    ClickableSpan,
  },
  props: {
    hideMenu: Function,
  },
  methods: {
    async logout(): Promise<void> {
      try {
        await this.$service.auth.logout();
        this.$accessor.setUser({});
        this.$accessor.setToken(undefined);
        this.$router.push('/');
      } catch (error: any) {
        this.$alertErrorMessage(error.response);
      }
    },
  },
});
</script>
