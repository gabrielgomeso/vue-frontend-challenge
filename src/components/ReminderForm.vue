<template>
  <div class="reminder-form">
    <h2>Create new reminder</h2>
    <label class="reminder-form__label" for="reminder">
      Reminder
      <input type="text" name="reminder" v-model="reminderText" placeholder="Write the reminder you want to add." maxlength="30">
    </label>

    <label class="reminder-form__label" for="city">
      City
      <input type="text" name="city" v-model="reminderCity" placeholder="Write the city you want to add a reminder for.">
    </label>

    <label class="reminder-form__label" for="reminder-color">
      Reminder Color
      <input type="color" name="reminder-color" v-model="reminderColor" placeholder="Select the reminder color.">
    </label>

    <button type="button" @click="addReminder()">Add reminder</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ReminderForm',
  data() {
    return {
      reminderText: '',
      reminderCity: '',
      reminderColor: '',
    };
  },
  methods: {
    addReminder() {
      let newReminder = {
        date: new Date(this.selectedYear, this.selectedMonth, this.selectedDay),
        reminder: this.reminderText,
        city: this.reminderCity,
        color: this.reminderColor
      };

      this.reminders.push(newReminder);
      console.log(this.reminders.length);
    },
  }
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