<template>
  <div class="container d-flex justify-content-between align-items-center">
    <div class="d-flex justify-content-between align-items-center gap-4">
      <img src="../../assets/img/logos_google-drive.png" alt="Google Drive" />
      <p class="m-0">Google Drive</p>
    </div>
    <div class="d-flex justify-content-between align-items-center gap-3">
      <p class="m-0 status-text">
        Status: <span>{{ isConnected ? 'Connected' : 'Disconnected' }}</span>
      </p>
      <button
        class="btn"
        :class="{ 'btn-dark': !isConnected, 'btn-outline-dark': isConnected }"
        data-bs-toggle="modal"
        data-bs-target="#connectModal"
      >
        {{ isConnected ? 'Reconnect' : 'Connect Account' }}
      </button>
    </div>
  </div>
  <div
    class="modal fade"
    id="connectModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="connectModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header justify-content-center border-0">
          <h1 class="modal-title fs-5" id="connectModalLabel">Google Authentication popup</h1>
        </div>
        <div class="modal-body text-center">Please give access so that we can connect your google drive account</div>
        <div class="modal-footer justify-content-center border-0">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-dark" @click="connectDrive">Allow</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class DriveConnection extends Vue {
  get isConnected() {
    return this.$store.getters['files/isConnected'];
  }

  async connectDrive() {
    try {
      const data = await this.$store.dispatch('files/connectDrive');
      window.location.href = data.authorizationUrl;
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
        alert('Invalid Email / Password');
      } else {
        alert(errorMessage);
      }
    }
  }
}
</script>

<style scoped>
.status-text span {
  color: #666666;
}
</style>
