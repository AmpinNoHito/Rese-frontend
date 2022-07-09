<template>
  <div class="code-reader-modal code-reader-modal" @click.self="hideCodeReader">
    <CodeReader :startingUp="startingUp" :decode="decode" :init="init"/>
    <ButtonAtom class="code-reader-modal__button" :text="'戻る'" :clicked="hideCodeReader"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ButtonAtom from '~/components/atoms/Button.vue';
import CodeReader from '~/components/molecules/Utils/CodeReader.vue';

export default Vue.extend({
  components: {
    ButtonAtom,
    CodeReader,
  },
  props: {
    startingUp: Boolean,
    decode: Function,
    init: Function,
    hideCodeReader: Function,
  },
});
</script>

<style lang="scss">
.code-reader-modal {
  @include modal();
  flex-direction: column;

  &__button {
    margin: 0 auto;
  }
}
</style>
