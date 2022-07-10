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
        :inputValue="form.name"
        :image="require('~/assets/images/icon-user.png')"
        :type="'text'"
        :placeholder="admin ? 'representative\'s name': 'Username'"
        :errors="errors.name"
        :atInput="nameInput"
      />
      <AuthInput
        :id="'email'"
        :inputValue="form.email"
        :image="require('~/assets/images/icon-email.png')"
        :type="'email'"
        :placeholder="admin ? 'Representative\'s email' : 'Email'"
        :errors="errors.email"
        :atInput="emailInput"
      />
      <AuthInput
        :id="'password'"
        :inputValue="form.password"
        :image="require('~/assets/images/icon-password.png')"
        :type="'password'"
        :placeholder="'Password'"
        :errors="errors.password"
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
import AuthInput from '~/components/molecules/Input/AuthInput.vue';

export default Vue.extend({
  components: {
    ParagraphAtom,
    ButtonAtom,
    AuthInput,
  },
  props: {
    form: Object,
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
    nameInput: Function,
    emailInput: Function,
    passwordInput: Function,
    buttonClicked: Function,
    errors: Object,
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