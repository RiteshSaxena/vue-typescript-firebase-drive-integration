<template>
  <div class="container login-form-container">
    <h1 class="login-heading">Login</h1>
    <form class="login-form" @submit.prevent="signIn">
      <input type="email" class="form-control" placeholder="Email Address" v-model="email" required />
      <input type="password" class="form-control mt-2" placeholder="Password" v-model="password" required />
      <button type="submit" class="btn btn-dark w-100 mt-3 text-uppercase" :disabled="loading">
        {{ loading ? '...' : 'Login' }}
      </button>
    </form>
    <span class="error-text mt-3 d-block" v-if="error">{{ error }}</span>
    <router-link :to="{ name: 'ForgotPassword' }" class="mt-4 text-dark forgot-password-link">
      Forgot Password?
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class LoginForm extends Vue {
  loading = false;

  email = '';

  password = '';

  error = '';

  async signIn() {
    try {
      this.loading = true;
      this.error = '';
      await this.$store.dispatch('user/login', {
        email: this.email,
        password: this.password,
      });
      await this.$store.dispatch('user/getUser');
      await this.$router.replace('/dashboard');
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
      if (
        errorCode === 'auth/wrong-password' ||
        errorCode === 'auth/user-not-found' ||
        errorCode === 'auth/missing-email' ||
        errorCode === 'auth/invalid-email'
      ) {
        this.error = 'Invalid Email / Password';
      } else {
        this.error = errorMessage;
      }
    } finally {
      this.loading = false;
    }
  }
}
</script>
