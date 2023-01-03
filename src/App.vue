<template>
  <div id="#app">
    <main>
      <message-component />
      <tiles-component />
      <button :disabled="isDisabledBtn" class="button" @click="startGame">
        start
      </button>
    </main>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TilesComponent from "./components/TilesComponent.vue";
import MessageComponent from "./components/MessageComponent.vue";
import { useGameState } from "./composables/useGameState";
export default defineComponent({
  name: "App",
  components: {
    TilesComponent,
    MessageComponent,
  },
  setup() {
    return {
      ...useGameState(),
    };
  },
});
</script>

<style>
html {
  box-sizing: border-box;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button {
  width: 100px;
  font-size: large;
}
</style>
