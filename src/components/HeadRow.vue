<template>
  <b-switch v-model="darkMode" passive-type="is-dark" type="is-warning" class="custom-switch-dark">
    {{ darkMode ? 'Dark Mode' : 'Light Mode' }}
  </b-switch>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'

// window.matchMedia("(prefers-color-scheme: dark)").matches
document.querySelector('#app').classList.add('darkMode')
const darkMode = ref(true)

watch(darkMode, (newState) => {
  const mainAppClass = document.querySelector('#app').classList
  if (newState) mainAppClass.add('darkMode')
  else mainAppClass.remove('darkMode')
})
</script>
