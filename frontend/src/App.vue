<script setup>
import { ref, onMounted } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const todos = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    const res = await fetch("/api/todos");
    if (!res.ok) throw new Error(res.statusText);
    todos.value = await res.json();
  } catch (e) {
    error.value = e.message;
  }
});
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <section class="todos">
    <h2>Todos</h2>
    <p v-if="error" class="error">{{ error }}</p>
    <ul v-else-if="todos.length">
      <li v-for="t in todos" :key="t.id">
        <input type="checkbox" :checked="t.done" readonly />
        {{ t.title }}
      </li>
    </ul>
    <p v-else>Loading…</p>
  </section>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.todos {
  margin-top: 1.5rem;
  text-align: left;
}
.todos ul {
  list-style: none;
  padding: 0;
}
.todos li {
  margin: 0.5rem 0;
}
.error {
  color: #c00;
}
</style>
