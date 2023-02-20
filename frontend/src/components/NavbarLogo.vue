<template>
  <nav class="navbar-logo">
    <router-link :to="{ name: 'Login' }">
      <img src="../assets/img/logo.png" alt="Logo" />
    </router-link>
    <div class="user-account" v-if="currentUser">
      <add-marker />
      <span class="user-icon">
        <i class="fa-solid fa-user"></i>
      </span>
      <span class="user-name">{{ currentUser.email }}</span>
      <i class="fa-solid fa-right-from-bracket logout-icon" @click="signOut"></i>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import AddMarker from './dashboard/AddMarker.vue';

@Options({
  components: {
    AddMarker,
  },
})
export default class NavbarLogo extends Vue {
  get currentUser() {
    return this.$store.getters['user/getUser'];
  }

  async signOut() {
    const sure = confirm('Are you sure you want to sign out?');
    if (!sure) {
      return;
    }
    try {
      await this.$store.dispatch('user/logout');
      await this.$router.replace('/');
    } catch (err: any) {
      alert(err.message);
    }
  }
}
</script>

<style scoped lang="scss">
.navbar-logo {
  width: 100%;
  display: flex;
  padding: 30px 60px;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo img {
  height: 55px;
  object-fit: contain;
}

.user-account {
  display: flex;
  align-items: center;
  gap: 10px;

  .user-icon {
    background: #9cf373;
    height: 32px;
    width: 32px;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      font-size: 14px;
    }
  }
  span.user-name {
    font-size: 16px;
    line-height: 20px;
    color: #666666;
  }
  i.logout-icon {
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
