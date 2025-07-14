<script lang="ts">
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import { query } from "$lib/images";
  // import { version } from "$lib/meta.svelte";
  import dayjs from "dayjs";
  import SimpleIconsGithub from "~icons/simple-icons/github";
  import SimpleIconsLinkedin from "~icons/simple-icons/linkedin";
  import SimpleIconsX from "~icons/simple-icons/x";
  import FormGroup from "$lib/components/ui/form-group.svelte";
  import FormRow from "$lib/components/ui/form-row.svelte";
</script>

<div class="flex h-full flex-col gap-2.5 text-center">
  <section class="mx-auto mt-10 mb-2 text-start">
    <AppIcon src={query("icons/desktop.png").default} alt="Desktop icon" size="lg" />
  </section>
  <section class="mb-2">
    <p class="mt-1 font-mono">while(true) &#123; build(); &#125;</p>
    <p class="text-2xl font-bold">AthenaFOSS</p>
    <!-- <p class="text-base-content/30">
      {dayjs().format("MMMM YYYY")}
    </p> -->
  </section>
  <FormGroup>
    <FormRow label="Email">
      <span class="text-base-content/50 px-1">
        <a href="mailto:onboarding@athenafoss.com"> onboarding@athenafoss.com </a>
      </span>
    </FormRow>
    <FormRow label="Spartans">
      <span class="text-base-content/50 px-1">
        <p>195</p>
      </span>
    </FormRow>
  </FormGroup>
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
