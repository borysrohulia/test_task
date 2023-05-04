<template>
  <TicketList
    v-if="!loading && getOptimizeTickets"
    :tickets="getOptimizeTickets ? getOptimizeTickets?.slice(0, 5) : []"
  />
  <Loader v-else />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Loader from '../components/Loader.vue'
import { useTicketStore } from '../stores/ticket'
import TicketList from '../components/TicketList.vue';

const ticketStore = useTicketStore()
const { loading, getOptimizeTickets } = storeToRefs(ticketStore)
</script>