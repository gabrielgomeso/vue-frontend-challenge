<template>
  <div class="reminder-form">
    <h2>Create new reminder</h2>
    <form @submit.prevent>
      <label class="reminder-form__label" for="reminder">
        Reminder Date
        <input type="date" name="reminder-date" v-model="reminderDate" required>
      </label>

      <label class="reminder-form__label" for="reminder">
        Reminder Time
        <input type="time" name="reminder-time" v-model="reminderTime" required>
      </label>

      <label class="reminder-form__label" for="reminder">
        Reminder
        <input type="text" name="reminder" v-model="reminderText" placeholder="Write what you want to remind!" maxlength="30" required>
      </label>

      <label class="reminder-form__label" for="city">
        City
        <input type="text" name="city" v-model="reminderCity" placeholder="Write the city you want to add a reminder for!" required>
      </label>

      <label class="reminder-form__label" for="reminder-color">
        Reminder Color
        <input type="color" name="reminder-color" v-model="reminderColor">
      </label>

      <button type="submit" @click="addReminder()">Add reminder</button>
    </form>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useReminderStore } from '../stores/reminderStore';

export default defineComponent({
  name: 'ReminderForm',
  data() {
    return {
      reminderText: '',
      reminderCity: '',
      reminderColor: 'green',
      reminderDate: null,
      reminderTime: null,
    };
  },
  methods: {
    addReminder() {
      if(this.reminderTime != null && this.reminderText != '' && this.reminderCity != '' && this.reminderDate != null) {
        const { addReminder } = useReminderStore();
        const [year, month, day] = this.reminderDate.split('-');
        const date = new Date(year, month - 1, day);

        let newReminder = {
        date: date,
        time: this.reminderTime,
        text: this.reminderText,
        city: this.reminderCity,
        color: this.reminderColor
      };

        addReminder(newReminder)

        this.reminderText = ''
        this.reminderCity = ''
        this.reminderColor = 'green'
        this.reminderDate = null
        this.reminderTime = null
      }
    },
  },
});
</script>

<style>
.reminder-form {
  padding: 1rem;
}

.reminder-form,
.reminder-form__label
{
  display: flex;
  flex-direction: column;
}


</style>