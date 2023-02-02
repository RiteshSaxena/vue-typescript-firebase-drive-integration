<template>
  <div class="container forgot-form-container">
    <div class="forgot-success">
      <i class="fa-solid fa-xmark" @click="closeSuccess"></i>
      <i class="fa-solid fa-circle-check"></i>
      <h1>Password Reset Link sent</h1>
      <p>
        Password reset link sent successfully to the email "{{ email }}" please check your inbox for further
        instructions to set your new password.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator';

export default class ForgotPasswordSuccess extends Vue {
  @Prop({ required: true, default: '' })
  email?: string;

  closeSuccess() {
    this.$router.push({ name: 'Login' });
  }
}
</script>

<style scoped lang="scss">
.forgot-success {
  width: 550px;
  border: 1px solid #d9d9d9;
  padding: 60px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  i.fa-xmark {
    position: absolute;
    top: 10px;
    right: 15px;
    color: #666666;
    font-size: 14px;
    cursor: pointer;
  }

  i.fa-circle-check {
    font-size: 42px;
  }

  h1 {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #1a1a1a;
    margin-top: 24px;
    margin-bottom: 8px;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #666666;
    margin: 0;
    text-align: center;
  }
}
</style>
