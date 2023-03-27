import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useReminderStore = defineStore('reminder', () => {
  const reminders = ref([
    {
      date: new Date(2023, 2, 31),
      time: '12:00',
      text: 'Gabriel Gomes gets the job',
      city: 'Caraguatatuba',
      color: 'green'
    }
  ]);

  function addReminder(reminder) {
    reminders.value.push(reminder);
  }

  return { reminders, addReminder }
})