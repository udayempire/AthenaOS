<script lang="ts">
  type FileItem = { // Re-define or import the type here for prop type safety
    id: string;
    name: string;
    type: 'folder' | 'file';
    icon: string;
    color?: string;
    children?: FileItem[];
  };

  export let files: FileItem[];
  export let selectedFileId: string | null; // Allow null
  export let selectFile: (file: FileItem) => void; // Updated function signature
  export let getFileColorClasses: (color: string, isSelected: boolean) => string;
</script>

<div class="flex-1 shrink-0 p-6 overflow-y-auto min-w-2xl bg-white dark:bg-gray-800">
  <div class="space-y-2">
    {#each files as file (file.id)}
      <button
        class={`w-full flex items-center justify-start gap-4 px-4 py-3 rounded-md transition-all duration-200 cursor-pointer
          ${file.id === selectedFileId
            ? 'bg-black/10 dark:bg-white/10 backdrop-blur-md ring-2 ring-blue-500 shadow-lg'
            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm'}`}
        on:click={() => selectFile(file)} >
        <div class={getFileColorClasses(file.color || '', file.id === selectedFileId)}>
          {@html file.icon}
        </div>

        <span class="text-sm text-gray-700 dark:text-gray-300 truncate">{file.name}</span>
      </button>
    {/each}
  </div>
</div>