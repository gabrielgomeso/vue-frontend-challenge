<template>
  <div class="reminder-form">
    <h2>Create new reminder</h2>
    <label class="reminder-form__label" for="reminder">
      Reminder Date
      <input type="date" name="reminder-date" v-model="reminderDate">
    </label>

    <label class="reminder-form__label" for="reminder">
      Reminder Time
      <input type="time" name="reminder-time" v-model="reminderTime">
    </label>

    <label class="reminder-form__label" for="reminder">
      Reminder
      <input type="text" name="reminder" v-model="reminderText" placeholder="Write what you want to remind!" maxlength="30">
    </label>

    <label class="reminder-form__label" for="city">
      City
      <input type="text" name="city" v-model="reminderCity" placeholder="Write the city you want to add a reminder for!">
    </label>

    <label class="reminder-form__label" for="reminder-color">
      Reminder Color
      <input type="color" name="reminder-color" v-model="reminderColor">
    </label>

    <button type="button" @click="addReminder()">Add reminder</button>
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
      const { addReminder } = useReminderStore();
      let newReminder = {
        date: this.reminderDate,
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
    },
  },
});
</script>

<style>
.reminder-form,
.reminder-form__label
{
  display: flex;
  flex-direction: column;
}


</style>