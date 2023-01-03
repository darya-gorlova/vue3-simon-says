<template>
  <p class="message">{{ msg }}</p>
</template>

<script>
import { defineComponent } from "vue";
import { useGameState } from "../composables/useGameState.js";
export default defineComponent({
  setup() {
    const { msg } = useGameState();
    return { msg };
  },
});
</script>

<style scoped>
.message {
  font-weight: 800;
  font-size: xx-large;
}
</style>
