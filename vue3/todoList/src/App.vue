<template>
  <section id="app" class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autocomplete="off"
        autofocus
        v-model="input"
        @keyup.enter="addTodo"
        >
    </header>
    <section class="main" v-show="count">
      <input id="toggle-all" class="toggle-all" v-model="allDone" type="checkbox">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li
          v-for="todo in filterTodos"
          :key="todo"
          :class="{ editing: todo === editingTodo, completed: todo.completed }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label @dblclick="double(todo)">{{ todo.text }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
            class="edit"
            type="text"
            v-model="todo.text"
            v-edit-focus="todo === editingTodo"
            @keyup.esc="escClick(todo)"
            @keyup.enter="entryClick(todo)"
            >
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="count">
      <span class="todo-count">
        <strong>{{ remainingCount }}</strong> {{ remainingCount > 1 ? 'items' : 'item' }} left
      </span>
      <ul class="filters">
        <li><a href="#/all">All</a></li>
        <li><a href="#/active">Active</a></li>
        <li><a href="#/completed">Completed</a></li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-if="count > remainingCount">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
import './assets/index.css';
import useLocalStorage from './utils/useLocalStorage'
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';

const storage = useLocalStorage();

// 添加todo
const addTodos = (todos) => {
    const input = ref('');
    const addTodo = () => {
        console.log(input.value)
        const text = input.value.trim();
        if(text){
            todos.value.unshift({
                text,
                completed:false,
            })
            input.value = ''
        }
    };

    return {
        input,
        addTodo
    }
}

// 删除todo
const delTodo = (todos) => {
    const removeTodo = (todo) => {
        let index = todos.value.indexOf(todo);
        todos.value.splice(index,1)
    }

    const removeCompleted = () => {
        todos.value = todos.value.filter((item) => !item.completed)
    }
    return {
        removeTodo,
        removeCompleted
    }
}

// 编辑todo
const editTodo = (removeTodo) => {
    const editingTodo = ref(null);
    let beforeEditText = '';
    // 双击
    const double = (todo) => {
        editingTodo.value = todo;
        beforeEditText = todo.text;
    }
    // 退出编辑
    const escClick = (todo) => {
        editingTodo.value = null;
        todo.text = beforeEditText
    }
    // 编辑完成
    const entryClick = (todo) => {
        if(!todo.text){
            removeTodo(todo)
            return;
        }
        todo.text = todo.text.trim();
        editingTodo.value = null;
    }

    return {
        editingTodo,
        double,
        escClick,
        entryClick
    }
}

// 切换todos的状态
const changeStatus = (todos) => {
    const allDone = computed({
        get(){
            return todos.value.every((item) => item.completed)
        },
        set(value){
            todos.value.forEach((item) => {
                item.completed = value
            })
        }
    });
    
    const filter = {
        all:list => list,
        active:list => list.filter((item) => !item.completed),
        completed:list => list.filter((item) => item.completed)
    }
    const filterTodos = computed({
        get(){
            return filter[type.value](todos.value)
        }
    })
    const remainingCount = computed(() => filter.active(todos.value).length)
    const count = computed(() => todos.value.length)
    const type = ref('all');
    const hashChange = () => {
        let hash = window.location.hash.replace('#/','');
        console.log(hash)
        if(hash){
            type.value = hash
        }else{
            type.value = 'all'
        }
    }

    onMounted(() => {
        window.addEventListener('hashchange',hashChange)
    })

    onUnmounted(() => {
        window.removeEventListener('hashchange',hashChange)
    })

    return {
        allDone,
        filterTodos,
        remainingCount,
        count
    }
}

// 缓存todos
const saveTodos = () => {
    const todos = ref(storage.getItem('todos') || []);
    watchEffect(() => {
        storage.setItem('todos',todos.value)
    })

    return todos;
}

export default {
  name: 'App',
  setup(){
    const todos = saveTodos();
    const { removeTodo, removeCompleted } = delTodo(todos);
    return {
        todos,
        removeTodo,
        removeCompleted,
        ...addTodos(todos),
        ...editTodo(removeTodo),
        ...changeStatus(todos)
    }
  },
  directives:{
      editFocus:(el,binding) => {
          binding.value && el.focus()
      }
  }
}
</script>

<style>
</style>
