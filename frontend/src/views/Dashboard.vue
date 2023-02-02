<template>
  <navbar-logo />
  <h4 class="text-center" v-if="loading">Loading...</h4>
  <drive-connection v-else />
  <div class="container mt-4" v-if="files.length">
    <EasyDataTable :headers="headers" :items="files" :hide-footer="true">
      <template #item-modifiedTime="item">
        {{ new Date(item.modifiedTime) }}
      </template>
    </EasyDataTable>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';

import NavbarLogo from '@/components/NavbarLogo.vue';
import LoginForm from '@/components/LoginForm.vue';
import DriveConnection from '@/components/dashboard/DriveConnection.vue';
import EasyDataTable from 'vue3-easy-data-table';

@Options({
  components: {
    DriveConnection,
    NavbarLogo,
    LoginForm,
    EasyDataTable,
  },
})
export default class Dashboard extends Vue {
  loading = false;

  headers = [
    { text: 'Filename', value: 'name', sortable: true },
    { text: 'Date Modified', value: 'modifiedTime', sortable: true },
  ];

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
