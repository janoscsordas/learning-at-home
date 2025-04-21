<script setup lang="ts">
import { onMounted, ref } from 'vue';

const name = ref('John Doe');
const status = ref('active');
const tasks = ref(['Task One', 'Task Two', 'Task Three']);
const newTask = ref('')

const toggleStatus = () => {
  if (status.value === "active") {
    status.value = "pending";
  } else if (status.value === "pending") {
    status.value = "active";
  } else {
    status.value = "active";
  }
};

const addTask = () => {
  if (newTask.value.trim() !== "") {
    tasks.value.push(newTask.value)
    newTask.value = ''
  }
}

const deleteTask = (index: number) => {
  if (index !== null) {
    tasks.value.splice(index, 1)
  }
}

type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')

    const data = await response.json()

    tasks.value = data.map((task: Todo) => task.title)
  } catch (error) {
    console.error("Error fetching tasks")
  }
})
</script>

<template>
  <h1>{{ name }}</h1>
  <p v-if="status === 'active'">User is active</p>
  <p v-else-if="status === 'pending'">User is pending</p>
  <p v-else>User is inactive</p>

  <!-- this automatically prevents the default behaviour -->
  <form @submit.prevent="addTask">
    <label for="newTask">Add Task</label>
    <input type="text" id="newTask" name="newTask" v-model="newTask">
    <button type="submit">Submit</button>
  </form>

  <h3>Tasks:</h3>
  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <span>{{ task }}</span>
      <button @click="deleteTask(index)">X</button>
    </li>
  </ul>
  <br />
  <button @click="toggleStatus">Change Status</button>
</template>
