<template>
  <div class="auth-card">
    <ParagraphAtom
      class="auth-card__title"
      :text="register ? admin ? 'Representative Registration': 'Registration': 'Login'"
    />
    <div class="auth-card__inner">
      <AuthInput
        v-if="register"
        :id="'name'"
        :image="require('~/assets/images/icon-user.png')"
        :type="'text'"
        :placeholder="admin ? 'representative\'s name': 'Username'"
        :errors="nameErrors"
        :atInput="nameInput"
      />
      <AuthInput
        :id="'email'"
        :image="require('~/assets/images/icon-email.png')"
        :type="'email'"
        :placeholder="admin ? 'Representative\'s email' : 'Email'"
        :errors="emailErrors"
        :atInput="emailInput"
      />
      <AuthInput
        :id="'password'"
        :image="require('~/assets/images/icon-password.png')"
        :type="'password'"
        :placeholder="'Password'"
        :errors="passwordErrors"
        :atInput="passwordInput"
      />
      <ButtonAtom
        class="auth-card__button"
        :text="register ? '登録' : 'ログイン'"
        :clicked="buttonClicked"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ParagraphAtom from '~/components/atoms/Text/Paragraph.vue';
import ButtonAtom from '~/components/atoms/Button/Button.vue';
import AuthInput from '~/components/molecules/InputUnit/AuthInput.vue';

export default Vue.extend({
  components: {
    ParagraphAtom,
    ButtonAtom,
    AuthInput,
  },
  props: {
    admin: {
      type: Boolean,
      required: false,
      default: false,
    },
    register: {
      type: Boolean,
      required: false,
      default: true,
    },
    nameErrors: Array,
    nameInput: Function,
    emailErrors: Array,
    emailInput: Function,
    passwordErrors: Array,
    passwordInput: Function,
    buttonClicked: Function,
  }
});
</script>

<style lang="scss">
.auth-card {
  background-color: #fff;
  @include flex(column);
  border-radius: 5px;
  @include shadow(2);
  
  &__title {
    width: 100%;
    color: #fff;
    background-color: $c-blue;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-weight: bold;
    padding: 10px 15px;
  }

  &__inner {
    width: 100%;
    padding: 20px 5%;
    text-align: right;
  }

  @include mq() {
    &__button {
      width: 100%;
    }
  }
}
</style>