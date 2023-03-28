<template>
  <section class="reminder-list__body">
    <div>
      <h2>Reminders from {{ selectedDay.toDateString() }}</h2>
      <div class="reminder-list__list">
        <span class="reminder-list__reminder" v-for="(reminder, index) in reminders" :key="index" @click="editReminder(reminder)">
          <span
            class="reminder-list__reminder--color"
            :style="{ backgroundColor: reminder.color }"
          ></span>
          {{ reminder.text }} - {{ reminder.time }} - {{ reminder.date.toLocaleDateString() }} At
          {{ reminder.city }}
          <!-- {{ reminderCityWeather(reminder.city, reminder.date) }} -->
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useReminderStore } from '../stores/reminderStore'

export default defineComponent({
  name: 'ReminderList',
  computed: {
    selectedDay() {
      const { selectedDay } = useReminderStore()
      return selectedDay
    },
    reminders() {
      const { remindersOfDate } = useReminderStore()

      return remindersOfDate(this.selectedDay)
    },
  },
  methods: {
    editReminder(reminder) {
      const { reminderToEdit } = storeToRefs(useReminderStore())
      reminderToEdit.value = reminder
    },
  //   async reminderCityWeather(city, date) {
  //     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_OPEN_WEATHER_KEY}&dt=${date}`;

  //     let weather;
  //     await fetch(apiUrl)
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log(data);
  //         weather = data.weather[0].description;
  //       })
  //       .catch(error => console.error(error));

  //     return weather;
  //   }
  },
})
</script>

<style>
.reminder-list__body {
  padding: 1rem;
}
.reminder-list__list {
  display: flex;
  flex-direction: column;
}

.reminder-list__reminder {
  text-align: justify;
}

.reminder-list__reminder--color {
  display: inline-block;
  width: 10px;
  height: 10px;
}

.reminder-list__reminder:hover:after {
  content: "- Edit";
  cursor: pointer;
}
</style>
