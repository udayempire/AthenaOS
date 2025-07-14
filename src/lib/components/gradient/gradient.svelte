<script lang="ts">
  import { onMount } from "svelte";
  import { Gradient } from "./gradient";
  import { theme } from "$lib/theme";

  const init = () => {
    new Gradient().initGradient("#gradient-canvas");
  };

  onMount(() => {
    init();
    theme.subscribe(init);
  });
</script>

<div class="relative h-full w-full">
  <canvas id="gradient-canvas"></canvas>
  <div class="absolute inset-0 flex items-center justify-center mix-blend-overlay">
    <p class="text-[5vw] font-bold text-white select-none">BUILD BUILD BUILD</p>
  </div>
</div>

<style>
  #gradient-canvas {
    width: 100%;
    height: 100%;
  }

  :global([data-theme="kennyhui-light"] #gradient-canvas) {
    --gradient-color-1: #7780f8;
    --gradient-color-2: #5661d9;
    --gradient-color-3: #ffffff;
    --gradient-color-4: #a279f4;
  }

  :global([data-theme="kennyhui-dark"] #gradient-canvas) {
    --gradient-color-1: #00032a;
    --gradient-color-2: #060e60;
    --gradient-color-3: #000000;
    --gradient-color-4: #600cae;
  }
</style>
