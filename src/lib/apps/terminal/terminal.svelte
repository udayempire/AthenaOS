<script lang="ts">
  import { executeCommand } from "./terminal";
  import { remove, windows, stackOrder } from "$lib/components/window/windows.svelte";
  import { onMount } from "svelte";

  type HistoryEntry = { input: string; output: string };

  let input = "";
  let history: HistoryEntry[] = [];
  let terminalRef: HTMLDivElement;
  let inputEl: HTMLInputElement;

  function focusInput() {
    // Use setTimeout to ensure the focus command executes after the current event cycle.
    setTimeout(() => inputEl?.focus(), 0);
  }

  onMount(() => {
    
    // Execute banner command by default without showing it in history
    const bannerOutput = executeCommand("banner", history);
    // Add only the output to history without showing the command
    if (bannerOutput) {
      history = [...history, { input: "", output: bannerOutput }];
    }
    focusInput();
  });

  function onEnter() {
    if (input.trim() === "") return;

    const commandToExecute = input.trim();
    const output = executeCommand(commandToExecute, history);

    if (output === "__EXIT__") {
      // Find terminal windows in the windows array
      const terminalWindows = windows.filter(
        (w) =>
          w.name === "Terminal" ||
          w.id.includes("terminal") ||
          w.id.includes("dev.kennyhui.terminal")
      );

      if (terminalWindows.length > 0) {
        // Close the most recently active terminal window
        const activeTerminalIds = terminalWindows
          .map((w) => w.id)
          .filter((id) => stackOrder.includes(id));

        if (activeTerminalIds.length > 0) {
          // Get the topmost (most recently active) terminal window
          const topmostTerminalId = activeTerminalIds.sort(
            (a, b) => stackOrder.indexOf(b) - stackOrder.indexOf(a)
          )[0];

          remove(topmostTerminalId);
          return;
        }
      }
    }

    if (commandToExecute === "clear") {
      history = [];
    } else {
      history = [...history, { input: commandToExecute, output }];
    }

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
  aria-label="Terminal"
>
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div class="flex-1 overflow-y-auto" bind:this={terminalRef} on:click={focusInput}>
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
      data-autofocus
      autocomplete="off"
      spellcheck="false"
    />
  </form>
</div>
