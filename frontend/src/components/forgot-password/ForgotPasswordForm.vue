<template>
  <div class="container forgot-form-container">
    <h1 class="forgot-heading">Forgot Password?</h1>
    <p class="forgot-text">Don't worry we got your back we will send you the <br />password link to your email.</p>
    <form class="forgot-password-form" @submit.prevent="forgotPassword">
      <input type="email" class="form-control" placeholder="Email Address" v-model="email" required />
      <button type="submit" class="btn btn-dark w-100 mt-3 text-uppercase" :disabled="loading">
        {{ loading ? '...' : 'Reset Password' }}
      </button>
    </form>
    <span class="error-text mt-3 d-block" v-if="error">{{ error }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';

@Options({
  emits: ['onSuccess'],
})
export default class ForgotPasswordForm extends Vue {
  loading = false;

  email = '';

  error = '';

  async forgotPassword() {
    try {
      this.loading = true;
      await this.$store.dispatch('user/forgotPassword', this.email);
      this.$emit('onSuccess', this.email);
      this.email = '';
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
      if (
        errorCode === 'auth/user-not-found' ||
        errorCode === 'auth/missing-email' ||
        errorCode === 'auth/invalid-email'
      ) {
        this.error = 'Email entered is invalid.';
      } else {
        this.error = errorMessage;
      }
    } finally {
      this.loading = false;
    }
  }
}
</script>
