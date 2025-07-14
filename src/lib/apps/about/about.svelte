<script lang="ts">
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import { query } from "$lib/images";
  import SimpleIconsGithub from "~icons/simple-icons/github";
  import SimpleIconsX from "~icons/simple-icons/x";
</script>

<div class="flex h-full flex-col gap-2.5 p-5 text-center">
  <section class="mx-auto mt-12 mb-6 text-center">
    <AppIcon src={query("icons/desktop.png").default} alt="Desktop icon" size="xl" />
  </section>
  <section>
    <!-- <p class="text-base-content/30">
      {dayjs().format("MMMM YYYY")}
    </p> -->
    <p class="mt-1 font-mono">while(true) &#123; build(); &#125;</p>
    <p class="text-2xl font-bold">AthenaFOSS</p>
  </section>
  <section class="flex flex-1 flex-col justify-center gap-2">
    <div class="flex items-center justify-center gap-2 text-sm">
      <span class="font-semibold">About</span>
      <span class="text-muted-foreground">community of elite developers</span>
    </div>
    <div class="flex items-center justify-center gap-2 text-sm">
      <span class="font-semibold">Spartans</span>
      <span class="text-muted-foreground">195</span>
    </div>
  </section>
  <section class="my-2 mt-auto flex flex-wrap justify-center gap-2">
    <a
      data-nodrag
      class="btn"
      aria-label="GitHub"
      href="https://github.com/AthenaFOSS"
      target="_blank"
      rel="noopener noreferrer"
    >
      <SimpleIconsGithub></SimpleIconsGithub>
    </a>
    <a
      data-nodrag
      class="btn"
      aria-label="X"
      href="https://x.com/AthenaF0SS"
      target="_blank"
      rel="noopener noreferrer"
    >
      <SimpleIconsX></SimpleIconsX>
    </a>
  </section>
  <section class="text-base-content/30 text-center text-[11px] leading-tight">
    <p>&copy; 2024 AthenaFOSS</p>
  </section>
</div>
