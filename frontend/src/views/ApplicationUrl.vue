<template>
  <h4 class="text-center" v-if="loading">Loading...</h4>
</template>

<script>
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';

export default {
  name: 'ApplicationUrl',
  data: () => ({
    loading: false,
  }),
  mounted() {
    if (this.$route.query.reference) {
      this.sendNotification();
    } else {
      this.$router.replace({ name: 'Applications' });
    }
  },
  methods: {
    async sendNotification() {
      try {
        this.loading = true;
        const referenceId = this.$route.query.reference;
        const userId = this.$route.params.userId;
        const isSent = localStorage.getItem(referenceId);
        if (isSent && isSent === 'true') {
          return;
        }
        const functions = getFunctions(this.$firebase, 'us-central1');
        // connectFunctionsEmulator(functions, '127.0.0.1', 5001);
        const sendNotification = httpsCallable(functions, 'sendNotification');
        await sendNotification({
          referenceId,
          userId,
          url: window.location.href,
        });
        localStorage.setItem(referenceId, 'true');
      } catch (err) {
        console.log(err);
        alert(`Something went wrong: ${err.message}`);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
