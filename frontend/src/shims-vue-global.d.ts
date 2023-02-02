/* eslint-disable */
import Store from '@/store';
import { FirebaseApp } from '@firebase/app'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store;
    $firebase: FirebaseApp
  }
}
