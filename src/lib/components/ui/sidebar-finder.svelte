<script lang="ts">
  export const Icons = {
    Clock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-blue-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    Airplay: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share2 lucide-share-2 h-4 w-4 text-purple-500"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>`,
    SquareStack: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grid2x2 lucide-grid-2x2 h-4 w-4 text-gray-500"><path d="M12 3v18"></path><path d="M3 12h18"></path><rect x="3" y="3" width="18" height="18" rx="2"></rect></svg>`,
    Desktop: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder h-4 w-4 text-blue-500"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>`,
    Document: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder h-4 w-4 text-blue-500"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>`,
    Download: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download h-4 w-4 text-blue-500"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>`,
    Laptop: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hard-drive h-4 w-4 text-gray-500"><line x1="22" x2="2" y1="12" y2="12"></line><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" x2="6.01" y1="16" y2="16"></line><line x1="10" x2="10.01" y1="16" y2="16"></line></svg>`,
    Cloud: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud h-4 w-4 text-blue-400"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>`,
    Network: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-gray-500"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    File: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file h-4 w-4 text-red-500"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path></svg>`
  };

  export let searchQuery: string = ''; // Initialize searchQuery
  export let favorites: { name: string; icon: string; color: string; active?: boolean }[] = [
    { name: 'Recent', icon: Icons.Clock, color: 'text-blue-500', active: true },
    { name: 'Shared', icon: Icons.Airplay, color: 'text-purple-500' },
    { name: 'Projects', icon: Icons.SquareStack, color: 'text-gray-500' },
    { name: 'Desktop', icon: Icons.Desktop, color: 'text-blue-500' },
    { name: 'Documents', icon: Icons.Document, color: 'text-blue-500' },
    { name: 'Downloads', icon: Icons.Download, color: 'text-blue-500' }
  ];
  export let locations: { name: string; icon: string; color: string }[] = [
    { name: 'My Laptop', icon: Icons.Laptop, color: 'text-gray-500' },
    { name: 'iCloud', icon: Icons.Cloud, color: 'text-blue-400' },
    { name: 'Network', icon: Icons.Network, color: 'text-gray-500' }
  ];
  export let tags: { name: string; color: string }[] = [
    { name: 'Personal', color: 'bg-red-500' },
    { name: 'Work', color: 'bg-blue-500' },
    { name: 'Ideas', color: 'bg-yellow-500' },
    { name: 'Clients', color: 'bg-green-500' },
    { name: 'Archive', color: 'bg-gray-500' }
  ];

  function selectFavorite(selectedIndex: number) {
    favorites = favorites.map((item, index) => ({
      ...item,
      active: index === selectedIndex
    }));
  }
</script>

<aside class="min-w-64 border-r border-gray-700 flex flex-col p-4 mt-10 overflow-scroll" style="background: rgba(35, 35, 35, 0.1); backdrop-filter: blur(100px); border-color: rgba(255, 255, 255, 0.1); color: white;">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-blue-600 dark:text-blue-700">Files</h1>
    </div>

    <div class="mb-6">
      <div class="relative">
        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          type="text"
          placeholder="Search"
          bind:value={searchQuery}
          class="w-full pl-10 pr-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
    </div>

    <div class="mb-6">
      <h2 class="text-xs font-semibold uppercase text-gray-700 dark:text-gray-400 mb-3 tracking-wider">Favorites</h2>
      <ul class="space-y-1">
        {#each favorites as item, index (item.name)}
          <li>
            <button
              on:click={() => selectFavorite(index)}
              class="flex items-center w-full text-left p-2 rounded-md transition-colors duration-200 {item.active ? 'bg-blue-600' : 'hover:bg-gray-700'}"
            >
              <span class="mr-3 {item.color}">{@html item.icon}</span>
              <span class="text-md font-light text-gray-800 dark:text-gray-300">{item.name}</span>
            </button>
          </li>
        {/each}
      </ul>
    </div>

    <div class="mb-6">
      <h2 class="text-xs font-semibold uppercase  text-gray-700 dark:text-gray-400 mb-3 tracking-wider">Locations</h2>
      <ul class="space-y-1">
        {#each locations as item}
          <li>
            <button class="flex items-center w-full text-left p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
              <span class="mr-3 {item.color}">{@html item.icon}</span>
              <span class="text-sm  text-gray-800 dark:text-gray-300">{item.name}</span>
            </button>
          </li>
        {/each}
      </ul>
    </div>

    <div>
      <h2 class="text-xs font-semibold uppercase text-gray-700 dark:text-gray-400 mb-3 tracking-wider">Tags</h2>
      <ul class="space-y-1">
        {#each tags as tag}
          <li>
            <button class="flex items-center w-full text-left p-2 rounded-md hover:bg-gray-700 transition-colors duration-200 ">
              <span class="w-3 h-3 rounded-full {tag.color} mr-3"></span>
              <span class="text-sm  text-gray-800 dark:text-gray-300" >{tag.name}</span>
            </button>
          </li>
        {/each}
      </ul>
    </div>
</aside>