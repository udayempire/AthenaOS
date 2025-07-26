<script lang="ts">
  import { onMount } from "svelte";
  import loader from "@monaco-editor/loader";
  import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
  import { parsedTheme } from "$lib/theme";
  import { get } from "svelte/store";

  let editor: Monaco.editor.IStandaloneCodeEditor;
  let monaco: typeof Monaco;
  let editorContainer: HTMLElement;
  
  let sidebarOpen = $state(true);
  let currentFile = $state("app.js");
  
  let files = $state([
    { name: "app.js", content: "console.log('Hello VS Code!');\n\nfunction greet() {\n  return 'Welcome to VS Code!';\n}", language: "javascript" },
    { name: "styles.css", content: "body {\n  background: #1e1e1e;\n  color: white;\n  font-family: monospace;\n}", language: "css" },
    { name: "index.html", content: "<html>\n<head><title>VS Code</title></head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>", language: "html" },
    { name: "README.md", content: "# VS Code Demo\n\nA simple VS Code editor demo.\n\n## Features\n- Syntax highlighting\n- File tabs\n- Sidebar", language: "markdown" }
  ]);
  
  let currentFileContent = $derived(files.find(f => f.name === currentFile)?.content || "");
  let currentLanguage = $derived(files.find(f => f.name === currentFile)?.language || "plaintext");

  onMount(async () => {
    const monacoEditor = await import("monaco-editor");
    loader.config({ monaco: monacoEditor.default });
    monaco = await loader.init();
    createEditor();
  });

  function createEditor() {
    if (!monaco || !editorContainer) return;
    
    editor = monaco.editor.create(editorContainer, {
      theme: get(parsedTheme) === "dark" ? "vs-dark" : "vs-light",
      language: currentLanguage,
      value: currentFileContent,
      fontSize: 14,
      lineNumbers: "on",
      minimap: { enabled: true },
      automaticLayout: true,
    });

    editor.onDidChangeModelContent(() => {
      const fileIndex = files.findIndex(f => f.name === currentFile);
      if (fileIndex !== -1) {
        files[fileIndex].content = editor.getValue();
      }
    });
  }

  function selectFile(fileName: string) {
    currentFile = fileName;
    if (editor) {
      const file = files.find(f => f.name === fileName);
      if (file) {
        const model = monaco.editor.createModel(file.content, file.language);
        editor.setModel(model);
      }
    }
  }

  function getFileIcon(fileName: string) {
    if (fileName.endsWith('.js')) return '📄';
    if (fileName.endsWith('.css')) return '🎨';
    if (fileName.endsWith('.html')) return '🌐';
    if (fileName.endsWith('.md')) return '📝';
    return '📄';
  }

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }

  let width: number | undefined = $state();
  let height: number | undefined = $state();

  $effect(() => {
    width;
    height;
    if (editor) {
      setTimeout(() => editor.layout(), 0);
    }
  });
</script>

<div 
  class="flex h-full w-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <!-- Activity Bar -->
  <div class="flex flex-col w-12 bg-[#333333] border-r border-[#555555]">
    <button 
      class="p-3 hover:bg-[#3c3c3c] border-l-2 {sidebarOpen ? 'border-[#007acc] bg-[#3c3c3c]' : 'border-transparent'}"
      onclick={toggleSidebar}
      title="Explorer"
    >
      📁
    </button>
    <button class="p-3 hover:bg-[#3c3c3c] border-l-2 border-transparent" title="Search">
      🔍
    </button>
    <button class="p-3 hover:bg-[#3c3c3c] border-l-2 border-transparent" title="Extensions">
      🧩
    </button>
  </div>

  <!-- Sidebar -->
  {#if sidebarOpen}
    <div class="flex flex-col w-64 bg-[#252526] border-r border-[#555555]">
      <div class="flex items-center justify-between p-2 border-b border-[#555555]">
        <span class="text-xs font-semibold uppercase text-[#cccccc]">Explorer</span>
      </div>
      
      <div class="flex-1 overflow-y-auto">
        <div class="p-1">
          <div class="text-xs font-semibold mb-2 text-[#cccccc]">MY PROJECT</div>
          {#each files as file}
            <button
              class="flex items-center w-full p-1 px-2 text-left hover:bg-[#3c3c3c] rounded {currentFile === file.name ? 'bg-[#3c3c3c]' : ''}"
              onclick={() => selectFile(file.name)}
            >
              <span class="mr-2">{getFileIcon(file.name)}</span>
              <span class="text-sm">{file.name}</span>
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Main Content -->
  <div class="flex flex-col flex-1">
    <!-- Tab Bar -->
    <div class="flex bg-[#2d2d30] border-b border-[#555555] min-h-[35px]">
      {#each files as file}
        <button
          class="flex items-center px-3 py-2 text-sm border-r border-[#555555] hover:bg-[#3c3c3c] {currentFile === file.name ? 'bg-[#1e1e1e] text-white' : 'text-[#cccccc]'}"
          onclick={() => selectFile(file.name)}
        >
          <span class="mr-2">{getFileIcon(file.name)}</span>
          <span>{file.name}</span>
        </button>
      {/each}
    </div>

    <!-- Editor Area -->
    <div class="flex-1 relative">
      <div 
        bind:this={editorContainer}
        class="h-full w-full"
        data-nodrag
      ></div>
    </div>

    <!-- Status Bar -->
    <div class="flex items-center justify-between px-3 py-1 bg-[#007acc] text-white text-xs min-h-[22px]">
      <div class="flex items-center space-x-4">
        <span>🌳 main</span>
        <span>✓ Ready</span>
      </div>
      <div class="flex items-center space-x-4">
        <span>Ln 1, Col 1</span>
        <span>{currentLanguage.toUpperCase()}</span>
      </div>
    </div>
  </div>
</div> 