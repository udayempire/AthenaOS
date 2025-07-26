<script lang="ts">
  import { executeCommand } from "./terminal";
  import { onMount } from "svelte";

  type HistoryEntry = { input: string; output: string };

  let input = "";
  let history: HistoryEntry[] = [];
  let terminalRef: HTMLDivElement;
  let inputEl: HTMLInputElement;

  function focusInput() {
    inputEl?.focus();
  }

  onMount(() => {
    focusInput();
  });

  function onEnter() {
    if (input.trim() === "") return;
    const output = executeCommand(input, history);
    if (input.trim() === "clear") {
      history = [];
      input = "";
      return;
    }
    history = [...history, { input, output }];
    input = "";
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnter();
    }
  }

  // Move this to the top level:
  $: if (terminalRef) terminalRef.scrollTop = terminalRef.scrollHeight;
</script>

<!-- on:click={focusInput}
  on:keydown={(e) => {
    if (e.key === "Enter" || e.key === " ") focusInput();
  }}

  The error it's giving is:
  `<div>` should not be assigned mouse or keyboard event listeners
  Adding FocusTrap to the div is not working as expected.
  Need to work with the window manager to make this work.
  -->
<div
  class="flex h-full flex-col rounded bg-black p-4 font-mono text-green-400"
  role="region"
  aria-label="Terminal"
  on:click={focusInput}
>
  <div class="flex-1 overflow-y-auto" bind:this={terminalRef}>
    {#each history as entry}
      <div><span class="text-blue-400">$</span> {entry.input}</div>
      {#if entry.output}
        <pre class="pl-4">{entry.output}</pre>
      {/if}
    {/each}
  </div>
  <form class="mt-2 flex" on:submit|preventDefault={onEnter}>
    <span class="text-blue-400">$</span>
    <input
      bind:this={inputEl}
      class="ml-2 flex-1 border-none bg-transparent text-green-400 outline-none"
      bind:value={input}
      on:keydown={onKeydown}
      autocomplete="off"
      spellcheck="false"
    />
  </form>
</div>
