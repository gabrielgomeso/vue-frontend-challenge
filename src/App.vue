<template>
  <CalendarBody />
  <section class="calendar-actions">
    <ReminderForm />
    <RemindersList />
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import CalendarBody from './components/CalendarBody.vue'
import ReminderForm from './components/ReminderForm.vue'
import RemindersList from './components/RemindersList.vue'

export default defineComponent({
  name: 'App',
  components: {
    CalendarBody,
    ReminderForm,
    RemindersList
  }
})
</script>

<style>
.calendar-actions {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
