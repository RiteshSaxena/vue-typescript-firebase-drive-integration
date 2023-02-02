<template>
  <navbar-logo />
  <forgot-password-form @onSuccess="onSuccess" v-if="!isDone" />
  <forgot-password-success :email="email" v-else />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';

import NavbarLogo from '@/components/NavbarLogo.vue';
import ForgotPasswordForm from '@/components/forgot-password/ForgotPasswordForm.vue';
import ForgotPasswordSuccess from '@/components/forgot-password/ForgotPasswordSuccess.vue';

@Options({
  components: {
    ForgotPasswordSuccess,
    NavbarLogo,
    ForgotPasswordForm,
  },
})
export default class ForgotPassword extends Vue {
  isDone = false;

  email = '';

  onSuccess(email: string) {
    this.isDone = true;
    this.email = email;
  }
}
</script>
