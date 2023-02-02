<template>
  <navbar-logo />
  <drive-connection />
  <div class="container mt-3" v-if="files.length">
    <table class="table">
      <thead>
        <tr>
          <th colspan="3" scope="col">Filename</th>
          <th scope="col">Date Modified</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in files" :key="file.id">
          <td colspan="3">{{ file.name }}</td>
          <td>{{ file.modifiedTime }}</td>
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
  get files() {
    return this.$store.getters['files/getFiles'];
  }

  mounted() {
    this.$store.dispatch('files/fetchFiles');
    if (this.$route.query.code) {
      this.$store.dispatch('files/setToken', this.$route.query.code).then(() => {
        alert('Account Connected Successfully');
        this.$store.dispatch('files/fetchFiles');
      });
    }
  }
}
</script>

<style scoped lang="scss">
.status-text span {
  color: #666666;
}
</style>
