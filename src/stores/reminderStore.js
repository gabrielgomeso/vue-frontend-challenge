import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReminderStore = defineStore('reminder', () => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const reminders = ref([
    {
      id: 1,
      date: new Date(2023, 2, 31),
      time: '12:00',
      text: 'Gabriel Gomes gets the job',
      city: 'Caraguatatuba',
      color: 'green'
    },
    {
      id: 2,
      date: new Date(2023, 2, 2),
      time: '12:00',
      text: 'Gabriel Gomes makes the test',
      city: 'Sao Paulo',
      color: 'black'
    }
  ])

  const selectedDay = ref(currentDate)
  const selectedMonth = ref(currentMonth)
  const totalDaysInSelectedMonth = new Date(currentYear, selectedMonth.value + 1, 0).getDate()

  const reminderToEdit = ref(null);

  function addReminder(reminder) {
    reminders.value.push(reminder)
  }
  
  function editReminder(editedReminder) {
    const index = reminders.value.findIndex(reminder => reminder.id === editedReminder.id);
    if (index !== -1) {
      reminders.value[index] = editedReminder;
    }
  }

  function remindersOfDate(date) {
    const remindersOfDay = reminders.value.filter(
      (reminder) => new Date(reminder.date).getTime() === date.getTime()
    )
    return remindersOfDay
  }

  return {
    reminders,
    selectedDay,
    selectedMonth,
    addReminder,
    editReminder,
    totalDaysInSelectedMonth,
    remindersOfDate,
    reminderToEdit
  }
})
