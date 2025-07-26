<script lang="ts">
  export let fileCount: number;
  export let availableSpace: string;
</script>

<footer class="px-4 py-2 border-t border-gray-600 text-xs text-gray-600 dark:text-gray-400 flex justify-between items-center">
  <span>{fileCount} items</span>
  <span>Available: {availableSpace}</span>
</footer>