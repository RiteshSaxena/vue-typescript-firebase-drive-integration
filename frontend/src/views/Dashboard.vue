<template>
  <navbar-logo />
  <h4 class="text-center" v-if="loading">Loading...</h4>
  <drive-connection v-else />
  <div class="container mt-3" v-if="files.length">
    <table class="table">
      <thead>
        <tr>
          <th colspan="3" scope="col">Filename</th>
          <th class="text-end" scope="col">Date Modified</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in files" :key="file.id">
          <td colspan="3">{{ file.name }}</td>
          <td class="text-end">{{ file.modifiedTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';

import NavbarLogo from '@/components/NavbarLogo.vue';
import LoginForm from '@/components/LoginForm.vue';
import DriveConnection from '@/components/dashboard/DriveConnection.vue';

@Options({
  components: {
    DriveConnection,
    NavbarLogo,
    LoginForm,
  },
})
export default class Dashboard extends Vue {
  loading = false;

  get files() {
    return this.$store.getters['files/getFiles'];
  }

  async mounted() {
    try {
      this.loading = true;
      await this.$store.dispatch('files/fetchFiles');
      if (this.$route.query.code) {
        await this.$store.dispatch('files/setToken', this.$route.query.code);
        alert('Account Connected Successfully');
        await this.$store.dispatch('files/fetchFiles');
        this.$router.replace({ name: 'Dashboard' });
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped lang="scss">
.status-text span {
  color: #666666;
}
</style>
