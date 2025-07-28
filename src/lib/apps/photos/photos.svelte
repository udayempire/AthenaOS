<script lang="ts">
  import { onMount } from "svelte";
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import ToolbarButton from "$lib/components/ui/toolbar-button.svelte";
  import Toolbar from "$lib/components/ui/toolbar.svelte";
  import WindowContent from "$lib/components/window/window-content.svelte";
  import TablerPhoto from "~icons/tabler/photo";
  import TablerGrid from "~icons/tabler/grid";
  import TablerList from "~icons/tabler/list";
  import TablerSearch from "~icons/tabler/search";
  import TablerPlus from "~icons/tabler/plus";
  import TablerHeart from "~icons/tabler/heart";
  import TablerFolder from "~icons/tabler/folder";
  import TablerCalendar from "~icons/tabler/calendar";

  interface Photo {
    id: string;
    title: string;
    url: string;
    date: string;
    favorite: boolean;
    folder: string;
  }

  let photos = $state<Photo[]>([]);
  let selectedPhotos = $state<Set<string>>(new Set());
  let viewMode = $state<"grid" | "list">("grid");
  let searchQuery = $state("");
  let loading = $state(true);
  let selectedTab = $state<"all" | "favorites" | "recent" | string>("all");
  let selectedPhoto = $state<Photo | null>(null);
  let showModal = $state(false);

  onMount(() => {
    setTimeout(() => {
      photos = [
        {
          id: "1",
          title: "Sunset at the Beach",
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
          date: "2024-01-15",
          favorite: true,
          folder: "athena_hh",
        },
        {
          id: "2",
          title: "Mountain Hike",
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
          date: "2024-01-10",
          favorite: false,
          folder: "athena_hh",
        },
        {
          id: "3",
          title: "City Lights",
          url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=300&fit=crop",
          date: "2024-01-05",
          favorite: true,
          folder: "vacation",
        },
        {
          id: "4",
          title: "Forest Path",
          url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
          date: "2024-01-03",
          favorite: false,
          folder: "nature",
        },
        {
          id: "5",
          title: "Ocean Waves",
          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
          date: "2024-01-01",
          favorite: true,
          folder: "vacation",
        },
        {
          id: "6",
          title: "Desert Landscape",
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
          date: "2023-12-28",
          favorite: false,
          folder: "nature",
        },
        {
          id: "7",
          title: "Office Building",
          url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
          date: "2023-12-25",
          favorite: true,
          folder: "work",
        },
        {
          id: "8",
          title: "Family Portrait",
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
          date: "2023-12-20",
          favorite: true,
          folder: "family",
        },
      ];
      loading = false;
    }, 1000);
  });

  // Get unique folders for dynamic folder creation
  let folders = $derived(() => {
    const folderSet = new Set(photos.map(p => p.folder));
    return Array.from(folderSet).sort() as string[];
  });

  let filteredPhotos = $derived(() => {
    let filtered = photos;

    if (selectedTab === "favorites") {
      filtered = filtered.filter((p) => p.favorite);
    } else if (selectedTab === "recent") {
      filtered = filtered.slice(0, 3); // Show only recent 3
    } else if (selectedTab !== "all") {
      // Filter by specific folder
      filtered = filtered.filter((p) => p.folder === selectedTab);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(query));
    }

    return filtered;
  });

  function togglePhotoSelection(photoId: string) {
    if (selectedPhotos.has(photoId)) {
      selectedPhotos.delete(photoId);
    } else {
      selectedPhotos.add(photoId);
    }
    selectedPhotos = new Set(selectedPhotos);
  }

  function toggleFavorite(photoId: string) {
    const photo = photos.find((p) => p.id === photoId);
    if (photo) {
      photo.favorite = !photo.favorite;
      photos = [...photos];
    }
  }

  function openPhotoModal(photo: Photo) {
    selectedPhoto = photo;
    showModal = true;
  }

  function closePhotoModal() {
    showModal = false;
    selectedPhoto = null;
  }
</script>

<WindowContent>
  <div class="flex h-full bg-black/20 backdrop-blur-md "style="background: rgba(35, 35, 35, 0.1); backdrop-filter: blur(100px); border-color: rgba(255, 255, 255, 0.1); color: white;">
    <!-- Sidebar -->
    <div class="w-64 border-r border-white/20 bg-white/30 backdrop-blur-[50px] shadow-lg rounded-r-xl dark:border-gray-300/20 dark:bg-black/30">
      <div class="p-8">
        <h1 class="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Photos</h1>
        <!-- Navigation -->
        <nav class="space-y-1">
          <button
            class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors {selectedTab ===
            'all'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}"
            onclick={() => (selectedTab = "all")}
          >
            <div class="flex items-center gap-6">
              <TablerPhoto class="h-5 w-5" />
              <span class="text-sm font-medium">All Photos</span>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">{photos.length}</span>
          </button>

          <!-- Dynamic Folder Buttons -->
          {#each folders() as folder}
            <button
              class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors {selectedTab ===
              folder
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}"
              onclick={() => (selectedTab = folder)}
            >
              <div class="flex items-center gap-6">
                <TablerFolder class="h-5 w-5" />
                <span class="text-sm font-medium">{folder.charAt(0).toUpperCase() + folder.slice(1).replace('_', ' ')}</span>
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400">{photos.filter((p) => p.folder === folder).length}</span>
            </button>
          {/each}

          <button
            class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors {selectedTab ===
            'favorites'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}"
            onclick={() => (selectedTab = "favorites")}
          >
            <div class="flex items-center gap-6">
              <TablerHeart class="h-5 w-5" />
              <span class="text-sm font-medium">Favorites</span>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400"
              >{photos.filter((p) => p.favorite).length}</span
            >
          </button>

          <button
            class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors {selectedTab ===
            'recent'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}"
            onclick={() => (selectedTab = "recent")}
          >
            <div class="flex items-center gap-3">
              <TablerCalendar class="h-5 w-5" />
              <span class="text-sm font-medium">Recent</span>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">3</span>
          </button>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex flex-1 flex-col">
      <!-- Toolbar -->
      <div class="border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80">
        <div class="flex items-center justify-between px-6 py-3">
          <!-- Left side -->
          <div class="flex items-center gap-2">
            <button
              class="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 {viewMode ===
              'grid'
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'}"
              onclick={() => (viewMode = "grid")}
            >
              <TablerGrid class="h-5 w-5" />
            </button>
            <button
              class="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 {viewMode ===
              'list'
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'}"
              onclick={() => (viewMode = "list")}
            >
              <TablerList class="h-5 w-5" />
            </button>
          </div>

          <!-- Center - Search -->
          <div class="mx-auto max-w-md flex-1">
            <div class="relative">
              <TablerSearch
                class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400"
              />
              <input
                bind:value={searchQuery}
                type="text"
                placeholder="Search photos..."
                class="w-full rounded-lg border border-gray-200 bg-gray-100 py-2 pr-4 pl-10 text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          <!-- Right side -->
          <div class="flex items-center gap-2">
            {#if selectedPhotos.size > 0}
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >{selectedPhotos.size} selected</span
              >
            {/if}
          </div>
        </div>
      </div>

      <!-- Photo Grid/List -->
      <div class="flex-1 overflow-auto p-6">
        {#if loading}
          <div class="flex h-full items-center justify-center">
            <div class="text-center">
              <div
                class="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"
              ></div>
              <p class="text-gray-500 dark:text-gray-400">Loading photos...</p>
            </div>
          </div>
        {:else if filteredPhotos().length === 0}
          <div class="flex h-full items-center justify-center">
            <div class="text-center">
              <TablerPhoto class="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
              <h3 class="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                No photos found
              </h3>
              <p class="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
            </div>
          </div>
        {:else if viewMode === "grid"}
          <div
            class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            {#each filteredPhotos() as photo (photo.id)}
              <div
                role="button"
                tabindex="0"
                onclick={() => openPhotoModal(photo)}
                onkeydown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openPhotoModal(photo);
                }}
                class={`group relative aspect-square cursor-pointer overflow-hidden rounded-lg transition-all duration-200 hover:shadow-lg ${
                  selectedPhotos.has(photo.id) ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <!-- Image -->
                <img
                  src={photo.url}
                  alt={photo.title}
                  class="h-full w-full object-cover"
                  loading="lazy"
                />

                <!-- Overlay -->
                <div
                  class="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/20"
                ></div>

                <!-- Selection indicator -->
                {#if selectedPhotos.has(photo.id)}
                  <div
                    class="absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500"
                  >
                    <div class="h-3 w-3 rounded-full bg-white"></div>
                  </div>
                {/if}

                <!-- Favorite button -->
                <div
                  class="absolute top-2 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  <button
                    onclick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(photo.id);
                    }}
                    class="rounded-full bg-black/50 p-1.5 transition-colors hover:bg-black/70"
                  >
                    <TablerHeart
                      class={`h-4 w-4 ${photo.favorite ? "fill-red-500 text-red-500" : "text-white"}`}
                    />
                  </button>
                </div>

                <!-- Photo info -->
                <div
                  class="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  <p class="truncate text-sm font-medium text-white">{photo.title}</p>
                  <p class="text-xs text-white/70">{new Date(photo.date).toLocaleDateString()}</p>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div class="space-y-2">
            {#each filteredPhotos() as photo (photo.id)}
              <div
                role="button"
                tabindex="0"
                onkeydown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openPhotoModal(photo);
                }}
                onclick={() => openPhotoModal(photo)}
                class={`flex cursor-pointer items-center gap-4 rounded-lg p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                  selectedPhotos.has(photo.id) ? "bg-blue-50 dark:bg-blue-900/20" : ""
                }`}
              >
                <div class="relative">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    class="h-20 w-20 rounded-lg object-cover"
                    loading="lazy"
                  />
                  {#if selectedPhotos.has(photo.id)}
                    <div
                      class="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500"
                    >
                      <div class="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                  {/if}
                </div>

                <div class="flex-1">
                  <h3 class="font-medium text-gray-900 dark:text-white">{photo.title}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(photo.date).toLocaleDateString()}
                  </p>
                </div>

                <div class="flex items-center gap-2">
                  {#if photo.favorite}
                    <TablerHeart class="h-4 w-4 fill-red-500 text-red-500" />
                  {/if}

                  <button
                    onclick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(photo.id);
                    }}
                    class="rounded p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <TablerHeart
                      class={`h-4 w-4 ${
                        photo.favorite ? "fill-red-500 text-red-500" : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Photo Modal -->
  {#if showModal && selectedPhoto}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      tabindex="-1"
    >
      <!-- Backdrop button for closing -->
      <button
        class="absolute inset-0 z-10"
        onclick={closePhotoModal}
        onkeydown={(e) => {
          if (e.key === "Escape") closePhotoModal();
        }}
        aria-label="Close photo modal"
      ></button>
      
      <div
        class="relative z-20 max-h-[110vh] max-w-[110vw] overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
        role="document"
      >
        <!-- Close button -->
        <button
          onclick={closePhotoModal}
          class="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
          aria-label="Close photo modal"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Photo -->
        <img
          src={selectedPhoto.url}
          alt={selectedPhoto.title}
          class="h-auto w-full object-contain"
          loading="lazy"
        />

        <!-- Photo info -->
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h3 class="text-xl font-semibold text-white">{selectedPhoto.title}</h3>
          <p class="text-sm text-white/80">{new Date(selectedPhoto.date).toLocaleDateString()}</p>
          
          <!-- Favorite button -->
                      <button
              onclick={(e) => {
                e.stopPropagation();
                if (selectedPhoto) toggleFavorite(selectedPhoto.id);
              }}
              class="mt-3 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <TablerHeart
                class={`h-5 w-5 ${selectedPhoto?.favorite ? "fill-red-500 text-red-500" : "text-white"}`}
              />
            </button>
        </div>
      </div>
    </div>
  {/if}
</WindowContent>
