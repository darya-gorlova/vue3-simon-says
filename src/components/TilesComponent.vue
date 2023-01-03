<template>
  <div :class="[{ disabled: isDisabledTileContainer }, 'tile-container']">
    <div
      v-for="tile in tiles"
      :key="tile.id"
      :class="['tile', tile.color, { activated: tile.isActivated }]"
      @click="humanPlays(tile)"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useGameState } from "../composables/useGameState.js";
export default defineComponent({
  setup() {
    return {
      ...useGameState(),
    };
  },
});
</script>

<style scoped>
.tile-container {
  display: grid;
  grid-template-rows: 10rem 10rem;
  grid-template-columns: 10rem 10rem;
  grid-gap: 1rem;
  margin: 2rem 0;
}
.disabled {
  pointer-events: none;
}
.tile {
  box-shadow: 0 0 0 1px lightgrey inset, 0 0 0 2px rgb(255 255 255 / 15%) inset,
    0 8px 0 0 lightgrey, 0 8px 0 1px rgb(0 0 0 / 40%),
    0 8px 8px 1px rgb(0 0 0 / 50%);
  transition: 1s;
}
.tile:hover,
.activated {
  transform: translateY(2px);
  box-shadow: 0 0 0 1px grey inset, 0 0 0 2px rgba(255, 255, 255, 0.15) inset,
    0 10px 0 0 grey, 0 10px 0 1px rgba(0, 0, 0, 0.4),
    0 10px 8px 1px rgba(0, 0, 0, 0.6);
}

/******tile colors*********************/
.red {
  background-color: red;
}
.green {
  background-color: green;
}
.blue {
  background-color: blue;
}
.yellow {
  background-color: yellow;
}

.activated {
  background-color: black;
}
/******************************** */
</style>
