<script lang="ts">
  import { onMount } from "svelte";
  import TablerPhoto from "~icons/tabler/photo";
  import TablerPhotoPlus from "~icons/tabler/photo-plus";
  import TablerLoader2 from "~icons/tabler/loader-2";
  import TablerAlertCircle from "~icons/tabler/alert-circle";
  import WindowContent from "$lib/components/window/window-content.svelte";
  
  interface MomentItem {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
    location?: string;
    participants?: string[];
  }
  
  // This will be replaced by actual backend data
  let moments = $state<MomentItem[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);
  
  // In the future, this will fetch data from the backend
  onMount(() => {
    // Placeholder for future backend integration
    // Currently empty as per requirements
    loading = false;
  });
</script>

<WindowContent>
  <header class="mb-6 border-b pb-4">
    <h1 class="text-2xl font-bold flex items-center gap-2">
      <TablerPhoto class="text-primary" />
      Hacker House Moments
    </h1>
    <p class="text-sm text-muted-foreground mt-1">Memories from our hacker house events</p>
  </header>
  
  <div class="flex-1 overflow-y-auto">
    {#if loading}
      <div class="flex items-center justify-center h-full flex-col gap-4">
        <TablerLoader2 class="w-10 h-10 text-primary animate-spin" />
        <p class="text-lg">Loading moments...</p>
      </div>
    {:else if error}
      <div class="flex items-center justify-center h-full flex-col gap-4">
        <TablerAlertCircle class="w-10 h-10 text-destructive" />
        <p class="text-lg text-destructive">Error: {error}</p>
      </div>
    {:else if moments.length === 0}
      <div class="flex items-center justify-center h-full flex-col gap-6 max-w-md mx-auto text-center">
        <div class="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
          <TablerPhotoPlus class="w-12 h-12 text-primary" />
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-2">No moments available yet</h2>
          <p class="text-muted-foreground">Hacker House moments will appear here once they're added via the backend integration.</p>
        </div>
        <div class="border border-border rounded-lg p-4 bg-card w-full mt-2">
          <p class="text-sm">Coming soon: Upload and share your favorite hacker house memories with the community.</p>
        </div>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each moments as moment (moment.id)}
          <div class="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div class="aspect-video bg-muted relative">
              {#if moment.imageUrl}
                <img 
                  src={moment.imageUrl} 
                  alt={moment.title} 
                  class="w-full h-full object-cover"
                  onerror={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.jpg';
                  }}
                />
              {:else}
                <div class="w-full h-full flex items-center justify-center bg-muted">
                  <span class="text-muted-foreground">No image</span>
                </div>
              {/if}
            </div>
            
            <div class="p-4">
              <h3 class="font-medium text-lg">{moment.title}</h3>
              <p class="text-sm text-muted-foreground mt-1">{moment.description}</p>
              
              {#if moment.location}
                <div class="mt-2 text-xs">
                  <span class="font-medium">Location:</span> {moment.location}
                </div>
              {/if}
              
              {#if moment.participants && moment.participants.length > 0}
                <div class="mt-2 text-xs">
                  <span class="font-medium">Participants:</span> {moment.participants.join(', ')}
                </div>
              {/if}
              
              <div class="mt-3 text-xs text-muted-foreground">{new Date(moment.date).toLocaleDateString()}</div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</WindowContent>
