<script setup lang="ts">
import type { ITicketItem } from '../types/TicketItem';
import TicketItem from './TicketItem.vue';

interface TicketListProps {
  tickets: ITicketItem[] | null
}

const props = defineProps<TicketListProps>()
</script>

<template>
  <div class="ticket-list">
    <TicketItem
      v-for="(ticket, key) in props.tickets"
      :key="key"
      :ticket="ticket"
    />
  </div>
</template>