<template>
  <section class="reminder-card__body" :style="{ backgroundColor: reminder.color }">
    <h3 class="reminder-card__title">{{ reminder.text }}</h3>
    <div class="reminder-card__time-and-place">
      <span>{{ reminder.time }} - {{ reminder.date.toLocaleDateString() }}</span>
      <span>{{ reminder.city }} ({{ reminder.weather }})</span>
    </div>
    <span class="reminder-card__edit-button" @click="editReminder(reminder)">✏️ Edit</span>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useReminderStore } from '../stores/reminderStore'

export default defineComponent({
  name: 'ReminderCard',
  props: ['reminder'],
  methods: {
    editReminder(reminder) {
      const { reminderToEdit } = storeToRefs(useReminderStore())
      reminderToEdit.value = reminder
    }
  }
})
</script>

<style>
.reminder-card__body {
  padding: 10px;
  border-radius: 5px;
  color: white;
}

.reminder-card__title {
  text-align: justify;
}

.reminder-card__time-and-place {
  display: flex;
  justify-content: space-between;
}

.reminder-card__edit-button {
  cursor: pointer;
  align-self: flex-end;
}
</style>
