<template>
  <navbar-logo />
  <login-form />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';

import NavbarLogo from '@/components/NavbarLogo.vue';
import LoginForm from '@/components/LoginForm.vue';

@Options({
  components: {
    NavbarLogo,
    LoginForm,
  },
})
export default class Login extends Vue {}
</script>
