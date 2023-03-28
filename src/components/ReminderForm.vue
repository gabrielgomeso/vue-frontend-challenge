<template>
  <div class="reminder-form">
    <h2 v-if="reminderToEdit == null">Create new reminder</h2>
    <h2 v-else>Edit reminder {{ reminderToEdit.text }}</h2>
    <form @submit.prevent>
      <div class="reminder-form__date-input">
        <label class="reminder-form__label" for="reminder-date">
          Reminder Date
          <input type="date" name="reminder-date" v-model="reminderDate" required />
        </label>

        <label class="reminder-form__label" for="reminder-time">
          Reminder Time
          <input type="time" name="reminder-time" v-model="reminderTime" required />
        </label>
      </div>

      <label class="reminder-form__label" for="reminder-text">
        Reminder
        <input
          type="text"
          name="reminder-text"
          v-model="reminderText"
          placeholder="Write what you want to remind!"
          maxlength="30"
          required
        />
      </label>

      <label class="reminder-form__label" for="reminder-city">
        City
        <input
          type="text"
          name="reminder-city"
          v-model="reminderCity"
          placeholder="Write the city you want to add a reminder for!"
          required
        />
      </label>

      <label class="reminder-form__label" for="reminder-color">
        Reminder Color
        <input type="color" name="reminder-color" v-model="reminderColor" />
      </label>

      <div class="reminder-form__actions">
        <button v-if="reminderToEdit == null" type="submit" @click="addReminder()">
          Add reminder
        </button>
        <button
          v-if="reminderToEdit != null"
          type="submit"
          @click="editReminder(reminderToEdit.id)"
        >
          Edit reminder
        </button>
        <button v-if="reminderToEdit != null" type="submit" @click="cancelEdit()">Cancel</button>
        <button
          v-if="reminderToEdit != null"
          type="submit"
          @click="deleteReminder(reminderToEdit.id)"
        >
          Delete reminder
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useReminderStore } from '../stores/reminderStore'

export default defineComponent({
  name: 'ReminderForm',
  data() {
    return {
      reminderText: '',
      reminderCity: '',
      reminderColor: 'black',
      reminderDate: null,
      reminderTime: null
    }
  },
  computed: {
    reminderToEdit() {
      const { reminderToEdit } = storeToRefs(useReminderStore())
      return reminderToEdit.value
    }
  },
  methods: {
    addReminder() {
      if (
        this.reminderTime != null &&
        this.reminderText != '' &&
        this.reminderCity != '' &&
        this.reminderDate != null
      ) {
        const { addReminder, reminders } = useReminderStore()
        const [year, month, day] = this.reminderDate.split('-')
        const date = new Date(year, month - 1, day)

        let newReminder = {
          id: reminders.length + 1,
          date: date,
          time: this.reminderTime,
          text: this.reminderText,
          city: this.reminderCity,
          color: this.reminderColor
        }

        addReminder(newReminder)

        this.resetForm()
      }
    },
    editReminder() {
      const { editReminder } = useReminderStore()
      const { reminderToEdit } = storeToRefs(useReminderStore())
      const [year, month, day] = this.reminderDate.split('-')
      const date = new Date(year, month - 1, day)

      let editedReminder = {
        id: this.reminderToEdit.id,
        date: date,
        time: this.reminderTime,
        text: this.reminderText,
        city: this.reminderCity,
        color: this.reminderColor
      }

      editReminder(editedReminder)
      this.resetForm()
      reminderToEdit.value = null
    },
    deleteReminder(id) {
      const { deleteReminder } = useReminderStore()
      const { reminderToEdit } = storeToRefs(useReminderStore())

      deleteReminder(id)
      this.resetForm()
      reminderToEdit.value = null
    },
    cancelEdit() {
      const { reminderToEdit } = storeToRefs(useReminderStore())
      reminderToEdit.value = null
      this.resetForm()
    },
    resetForm() {
      this.reminderText = ''
      this.reminderCity = ''
      this.reminderColor = 'black'
      this.reminderDate = null
      this.reminderTime = null
    }
  },
  watch: {
    reminderToEdit(newValue) {
      if (newValue !== null) {
        this.reminderText = this.reminderToEdit.text
        this.reminderCity = this.reminderToEdit.city
        this.reminderColor = this.reminderToEdit.color
        this.reminderDate = this.reminderToEdit.date.toISOString().slice(0, 10)
        this.reminderTime = this.reminderToEdit.time
      }
    }
  }
})
</script>

<style>
.reminder-form {
  padding: 1rem;
}

.reminder-form,
.reminder-form__label {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.reminder-form__label {
  padding: 5px;
}

.reminder-form__date-input {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.reminder-form__actions {
  display: flex;
  gap: 5px;
  justify-content: center;
  padding: 1rem;
}
</style>
