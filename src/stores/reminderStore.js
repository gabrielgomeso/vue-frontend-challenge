import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useReminderStore = defineStore('reminder', () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const totalDaysInCurrentMonth = new Date(currentYear, currentMonth+1, 0).getDate();

  const reminders = ref([
    {
      date: new Date(2023, 2, 31),
      time: '12:00',
      text: 'Gabriel Gomes gets the job',
      city: 'Caraguatatuba',
      color: 'green'
    },
    {
      date: new Date(2023, 2, 2),
      time: '12:00',
      text: 'Gabriel Gomes makes the test',
      city: 'Sao Paulo',
      color: 'black'
    },
  ]);

  const selectedDay = ref(currentDate);

  function addReminder(reminder) {
    reminders.value.push(reminder);
  }

  function remindersOfDate(date) {
    const remindersOfDay = reminders.value.filter((reminder) => new Date(reminder.date).getTime() === date.getTime());
    return remindersOfDay
  }

  return { reminders, selectedDay, addReminder, totalDaysInCurrentMonth, remindersOfDate }
})