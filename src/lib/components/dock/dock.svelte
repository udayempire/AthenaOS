<script lang="ts">
  import { applications } from "$lib/applications.svelte";
  import { type App } from "$lib/core";
  import { windows } from "../window/windows.svelte";
  import DockItem from "./dock-item.svelte";

  let dockItems = $derived([
    ...applications.filter((app) => app.showInDock),
    ...windows
      .map((window) => applications.find((app) => window.id.startsWith(app.id)))
      .filter((app) => app && !app.showInDock),
  ]) as App[];

  let dockWidth: number = $state(0);
  let itemWidth: number[] = $state([]);

  let maxItemCount: number = $derived(Math.floor((dockWidth - 12 * 2) / itemWidth[0]));

  // Magnification effect state
  let mouseX: number = $state(0);
  let mouseY: number = $state(0);
  let isHovering: boolean = $state(false);
  let dockElement: HTMLElement;
  let itemElements: HTMLElement[] = $state([]);

  // Configuration for magnification effect
  const MAGNIFICATION_RANGE = 120; // pixels
  const MAX_SCALE = 1.6;
  const MIN_SCALE = 1.0;
  const BASE_SCALE = 1.0;

  function handleMouseMove(event: MouseEvent) {
    if (!dockElement) return;
    
    const rect = dockElement.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
  }

  function handleMouseEnter() {
    isHovering = true;
  }

  function handleMouseLeave() {
    isHovering = false;
  }

  function getScaleForItem(index: number): number {
    if (!isHovering || !itemElements[index]) return BASE_SCALE;
    
    const itemRect = itemElements[index].getBoundingClientRect();
    const dockRect = dockElement.getBoundingClientRect();
    
    // Calculate item center relative to dock
    const itemCenterX = itemRect.left + itemRect.width / 2 - dockRect.left;
    const itemCenterY = itemRect.top + itemRect.height / 2 - dockRect.top;
    
    // Calculate distance from mouse to item center
    const distance = Math.sqrt(
      Math.pow(mouseX - itemCenterX, 2) + Math.pow(mouseY - itemCenterY, 2)
    );
    
    // Calculate scale based on distance
    if (distance > MAGNIFICATION_RANGE) return BASE_SCALE;
    
    const normalizedDistance = distance / MAGNIFICATION_RANGE;
    const scale = MAX_SCALE - (MAX_SCALE - MIN_SCALE) * normalizedDistance;
    
    return Math.max(MIN_SCALE, scale);
  }
</script>

<div
  bind:clientWidth={dockWidth}
  class="fixed bottom-0 z-40 flex h-17.5 w-full shrink-0 items-start justify-center px-2"
>
  <div
    bind:this={dockElement}
    on:mousemove={handleMouseMove}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    data-dock
    class="bg-dock flex min-h-15.5 w-fit max-w-full shrink-0 items-start rounded-[18px] bg-[F6F6F6]/36 px-1 py-2.5 shadow-xl backdrop-blur-[135px] transition-all duration-300"
    style="padding-bottom: {isHovering ? '16px' : '10px'}; padding-top: {isHovering ? '16px' : '10px'};"
  >
    {#each dockItems as app, i (app.id)}
      <div
        bind:this={itemElements[i]}
        bind:clientWidth={itemWidth[i]}
        class={{
          "z-50 flex shrink-0 transition-all duration-200 ease-out": true,
          hidden: i >= maxItemCount,
        }}
        style="transform: scale({getScaleForItem(i)}); transform-origin: center bottom;"
      >
        <DockItem {app} scale={getScaleForItem(i)} />
      </div>
    {/each}
  </div>
</div>
