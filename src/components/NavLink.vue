<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})



const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>

<template>
  <RouterLink
    :to="to"
    class="border border-blue-400 rounded-3xl py-2 px-4 hover:bg-blue-400 hover:text-white"
    :class="{ 'bg-blue-400 text-white': isActive, 'text-blue-500': !isActive }"
  >
    {{ label }}
  </RouterLink>
</template>
