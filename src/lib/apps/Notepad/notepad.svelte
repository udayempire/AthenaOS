<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  import Window from '$lib/components/window/window.svelte';

  
  type MemberDetailsData = {
    id: string;
    name: string;
    type: 'folder' | 'file';
    icon: string;
    color?: string;
    github?: string;
    level?: string;
    description?: string;
  };

  export let member: MemberDetailsData; 
  export let windowId: string; 
  export let position: { x: number; y: number } = { x: 50, y: 50 }; 
  export let size: { x: number; y: number } = { x: 450, y: 350 };  
  export let minSize: { x: number; y: number } = { x: 300, y: 150 }; 

  const dispatch = createEventDispatcher(); 

  
  function formatDetails(member: MemberDetailsData): string {
    let details = `Member Details: ${member.name}\n`;
    details += `-----------------------------------\n`;
    details += `ID: ${member.id}\n`;
    details += `Type: ${member.type === 'file' ? 'File' : 'Folder'}\n`;
    if (member.level) {
      details += `Level: ${member.level}\n`;
    }
    if (member.github) {
      details += `GitHub: https://github.com/${member.github}\n`;
    }
    details += `\n`; 
    if (member.description) {
      details += `Description:\n${member.description}\n`;
    } else {
      details += `Description: No description provided.\n`;
    }
    details += `\n`; // Add a blank line
    details += `Last Modified: ${new Date().toLocaleDateString()}\n`; // Dummy data
    details += `Size: ${(Math.random() * 10).toFixed(2)} MB\n`; // Dummy data
    return details;
  }

  
  let content: string = formatDetails(member);

  
</script>

<Window id={windowId} {position} {size} {minSize} title={`Notepad - ${member.name}.txt`}>
  <div class="flex flex-col h-full w-full bg-gray-900 border border-gray-700 rounded-md overflow-hidden">
    <textarea
      class="flex-1 p-4 bg-gray-800 text-gray-200 font-mono text-sm resize-none focus:outline-none"
      value={content}
      readonly
    ></textarea>

    <div class="flex items-center justify-between p-2 bg-gray-700 text-gray-400 text-xs">
      <span>Line: 1, Col: 1</span> <span>UTF-8</span>
    </div>
  </div>
</Window>

<style>
 
</style>