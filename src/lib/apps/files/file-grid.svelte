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

<div class="flex-1 p-6 overflow-y-auto bg-gray-200 dark:bg-gray-800" style="min-width: 500px;">
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
    {#each files as file (file.id)}
      <button
        class="flex flex-col items-center p-3 rounded-lg transition-all duration-200 cursor-pointer
          {file.id === selectedFileId
            ? 'bg-black/10 dark:bg-white/10 backdrop-blur-md ring-2 ring-blue-500 shadow-lg'
            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm'}"
        on:click={() => selectFile(file)} >
        <div class={getFileColorClasses(file.color || '', file.id === selectedFileId)}>
          {@html file.icon}
        </div>
        <span class="text-xs text-center truncate w-full mt-2 text-gray-700 dark:text-gray-300">
          {file.name}
        </span>
      </button>
    {/each}
  </div>
</div>