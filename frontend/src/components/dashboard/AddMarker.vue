<template>
  <button type="button" class="btn btn-light" @click="onClick">
    <i class="fa-solid fa-copy"></i>
    Copy
  </button>
  <div class="modal fade" id="addMarkerModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header justify-content-center border-0">
          <h1 class="modal-title fs-5">Add Reference (Marker)</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label class="form-label">Reference Name</label>
              <input type="text" class="form-control" placeholder="Enter reference name" v-model="referenceName" />
            </div>
            <button type="submit" class="btn btn-dark w-100" :disabled="loading">
              {{ loading ? '...' : 'Submit and Copy' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import store from '@/store';

export default {
  name: 'CopyComponent',
  data: () => ({
    modal: null,
    referenceName: '',
    loading: false,
  }),
  mounted() {
    this.modal = new Modal(document.getElementById('addMarkerModal'));
    console.log(`${window.location.origin}/application/uid?reference=referenceId`);
  },
  methods: {
    onClick() {
      if (this.modal) {
        this.modal.show();
        this.referenceName = '';
      }
    },
    async onSubmit() {
      try {
        this.loading = true;
        const db = getFirestore();

        const currentUser = await store.dispatch('user/getUser');

        const markerRef = await addDoc(collection(db, 'references'), {
          userId: currentUser.uid,
          referenceName: this.referenceName,
        });

        const markerUrl = `${window.location.origin}/application/${currentUser.uid}?reference=${markerRef.id}`;
        await navigator.clipboard.writeText(markerUrl);
        alert('URL is copied to clipboard');
        if (this.modal) {
          this.modal.hide();
        }
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

<style scoped></style>
