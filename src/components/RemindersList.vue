<template>
  <section class="reminder-list__body">
    <h2>Reminders from {{ selectedDay.toDateString() }}</h2>
    <div v-if="isLoading" class="loading">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div v-else class="reminder-list__list">
      <ReminderCard
        v-for="(reminder, index) in fetchedReminders"
        :key="index"
        :reminder="reminder"
      />

      <button
        type="button"
        class="reminder-list__delete-all-button"
        @click="deleteAllRemindersFromDate(fetchedReminders)"
        v-if="fetchedReminders.length > 0"
      >
        Delete all
      </button>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useReminderStore } from '../stores/reminderStore'
import ReminderCard from './ReminderCard.vue'

export default defineComponent({
  name: 'ReminderList',
  components: {
    ReminderCard,
  },
  data() {
    return {
      fetchedReminders: [],
      isLoading: true
    }
  },
  computed: {
    selectedDay() {
      const { selectedDay } = useReminderStore()
      return selectedDay
    },
    remindersOfDate() {
      const { remindersOfDate } = useReminderStore()
      const reminders = remindersOfDate(this.selectedDay)

      return reminders
    }
  },
  methods: {
    async fetchReminderWeather(reminder) {
      this.isLoading = true
      const { city, date } = reminder
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_KEY
      }&dt=${date}`

      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.weather[0].description
      } catch (error) {
        console.error(error)
        return 'No weather info for this city'
      }
    },
    async remindersWithWeather() {
      const reminders = this.remindersOfDate
      for (const reminder of reminders) {
        const weather = await this.fetchReminderWeather(reminder)
        reminder.weather = weather
      }
      this.fetchedReminders = reminders
      this.isLoading = false
    },
    deleteAllRemindersFromDate(remindersToDelete) {
      const { reminders } = storeToRefs(useReminderStore())

      reminders.value = reminders.value.filter((reminder) => {
        return !remindersToDelete.some((deleteReminder) => {
          return deleteReminder.id === reminder.id
        })
      })

      this.fetchedReminders = []
    }
  },
  async beforeMount() {
    await this.remindersWithWeather()
  },
  watch: {
    async selectedDay() {
      await this.remindersWithWeather()
    }
  }
})
</script>

<style>
.reminder-list__body {
  padding: 1rem;
}
.reminder-list__list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.reminder-list__delete-all-button {
  width: 200px;
  margin: 15px auto;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.loading div {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #000;
  margin: 0 5px;
  animation: loading 1s ease-in-out infinite;
}

.loading div:nth-child(2) {
  animation-delay: 0.2s;
}

.loading div:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loading {
  0% {
    transform: scale(0);
    opacity: 0.7;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0.7;
  }
}
</style>
