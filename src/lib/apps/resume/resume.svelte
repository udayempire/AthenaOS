<script lang="ts">
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import WindowContent from "$lib/components/window/window-content.svelte";
  import { query } from "$lib/images";
  import { modifiers } from "$lib/meta.svelte";
  import ResumeRole from "./resume-role.svelte";
  import ResumeSection from "./resume-section.svelte";
  import TablerUser from "~icons/tabler/user";
</script>

<WindowContent>
  <header class="mb-6 border-b pb-4">
    <h1 class="text-2xl font-bold flex items-center gap-2">
      <TablerUser class="text-primary" />
      AthenaFOSS
    </h1>
    <p class="text-sm text-muted-foreground mt-1">Professional Experience & Skills</p>
  </header>
  <div class="flex-1 overflow-y-auto">
    <div class="mb-6 flex items-center gap-2">
      <a
        class="btn btn-accent"
        href="https://kennyhui.dev/"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Projects
      </a>
      <a class="btn" href="https://kennyhui.dev/resume.pdf" target="_blank" rel="noopener noreferrer">
        Full Resume
      </a>
    </div>
    <div class="mb-6">
      <p class="text-base-content/80 mb-2">Try some of my games in Launchpad</p>
      <div class="flex items-center gap-4">
        <div class="flex items-center justify-center">
          <AppIcon src={query("icons/launchpad.png").default} size="sm" />
        </div>
        <p class="text-sm">or</p>
        <p class="text-sm font-medium bg-muted px-2 py-1 rounded">{modifiers.command} L</p>
      </div>
    </div>
  <ResumeSection title="Experience">
    <ResumeRole title="Freelance Frontend Developer" date="Jan 2024 - Jun 2024">
      <ul class="text-base-content/75 list-disc pl-6 text-xs">
        <li>
          Delivered a fully responsive website for a client to manage posts and product listings.
        </li>
        <li>
          Integrated Decap CMS to enable non-technical users to update the site content easily.
        </li>
        <li>Used 11ty and Nunjucks to optimize performance and maintainability.</li>
      </ul>
    </ResumeRole>
  </ResumeSection>
  <ResumeSection title="Education">
    <ResumeRole title="Stony Brook University" date="Aug 2024 - May 2028">
      Bachelor of Science in Computer Science
    </ResumeRole>
  </ResumeSection>
  <ResumeSection title="Skills">
    <ul class="text-base-content/75 list-disc pl-6 text-xs">
      <li><b>Languages</b>: TypeScript, Java, SQL, HTML/CSS</li>
      <li><b>Frameworks</b>: Node.js, Svelte, SvelteKit, Tailwind, Astro, 11ty, Electron</li>
      <li><b>Libraries</b>: Express.js, Socket.IO, Zod</li>
      <li><b>Developer Tools</b>: VSCode, Git, Docker, Oracle Cloud</li>
    </ul>
  </ResumeSection>
  </div>
</WindowContent>
