<template>
  <TicketList
    v-if="!loading && getFasterTickets"
    :tickets="getFasterTickets ? getFasterTickets?.slice(0, 5) : []"
  />
  <Loader v-else />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Loader from '../components/Loader.vue'
import { useTicketStore } from '../stores/ticket'
import TicketList from '../components/TicketList.vue';

const ticketStore = useTicketStore()
const { loading, getFasterTickets } = storeToRefs(ticketStore)
</script>