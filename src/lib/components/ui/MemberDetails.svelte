<script lang="ts">
import { createEventDispatcher } from 'svelte';

type Member = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  icon: string;
  github?: string;
  linkedIn?: string;
  twitter?: string;
  baseapp?: string;
  discord?: string;
  levelInCommunity?: string;
  description?: string;
};

export let member: Member;

const dispatch = createEventDispatcher();

function handleClose() {
  dispatch('close');
}

function openLink(url: string) {
  window.open(url, '_blank');
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

// Social platform configurations
const getSocialPlatforms = (member: Member) => {
  const platforms = [];
  
  if (member.github) {
    platforms.push({
      key: 'github',
      name: 'GitHub',
      value: member.github,
      url: `https://github.com/${member.github}`,
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>`,
      color: 'text-gray-300 hover:text-white',
      bgColor: 'hover:bg-gray-700',
      displayValue: `@${member.github}`,
      isClickable: true
    });
  }
  
  if (member.linkedIn) {
    platforms.push({
      key: 'linkedIn',
      name: 'LinkedIn',
      value: member.linkedIn,
      url: member.linkedIn,
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>`,
      color: 'text-blue-400 hover:text-blue-300',
      bgColor: 'hover:bg-blue-900/30',
      displayValue: member.linkedIn.includes('linkedin.com') ? 'LinkedIn Profile' : member.linkedIn,
      isClickable: true
    });
  }
  
  if (member.twitter) {
    platforms.push({
      key: 'twitter',
      name: 'Twitter',
      value: member.twitter,
      url: member.twitter,
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>`,
      color: 'text-sky-400 hover:text-sky-300',
      bgColor: 'hover:bg-sky-900/30',
      displayValue: member.twitter.includes('twitter.com') ? 'Twitter Profile' : member.twitter,
      isClickable: true
    });
  }
  
  if (member.baseapp) {
    platforms.push({
      key: 'baseapp',
      name: 'BaseApp',
      value: member.baseapp,
      url: member.baseapp,
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>`,
      color: 'text-purple-400 hover:text-purple-300',
      bgColor: 'hover:bg-purple-900/30',
      displayValue: member.baseapp.includes('baseapp.com') ? 'BaseApp Profile' : member.baseapp,
      isClickable: true
    });
  }
  
  if (member.discord) {
    platforms.push({
      key: 'discord',
      name: 'Discord',
      value: member.discord,
      url: null,
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0003 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
      </svg>`,
      color: 'text-indigo-400 hover:text-indigo-300',
      bgColor: 'hover:bg-indigo-900/30',
      displayValue: member.discord,
      isClickable: false
    });
  }
  
  return platforms;
};
</script>

<div class="w-[395px] border-l overflow-y-scroll flex-shrink-0 z-[100] flex flex-col relative "
     >
  
  <!-- Animated background elements -->
  <div class="absolute inset-0 opacity-10">
    
  </div>

  <!-- Header -->
  <div class="relative z-10 flex justify-between items-center p-6 border-b border-slate-700/50">
    <h2 class="text-xl font-bold bg-gradient-to-r dark:text-gray-400 text-gray-800">
      Member Details
    </h2>
    <button on:click={handleClose} 
            class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200 group" aria-label="close">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover:rotate-90 transition-transform duration-200">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>

  <!-- Profile Section -->
  <div class="relative z-10 flex flex-col items-center p-6 border-b border-slate-700/50">
    <div class="relative mb-4">
      <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl shadow-2xl">
        {@html member.icon}
      </div>
      <div class="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
    </div>
    
    <h3 class="text-2xl font-bold dark:text-white text-gray-800 mb-1">{member.name}</h3>
    
    {#if member.levelInCommunity}
      <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r dark:from-blue-500/20 from-blue-800/80 dark:to-purple-500/20 to-gray-900 text-blue-300 border border-blue-500/30 mb-2">
        <div class="w-2 h-2 bg-blue-400  rounded-full mr-2 animate-pulse"></div>
        {member.levelInCommunity}
      </div>
    {/if}
    
    <p class="text-sm dark:text-slate-400 text-slate-800">ID: <span class="font-mono dark:text-slate-300 text-slate-700">#{member.id}</span></p>
  </div>

  <!-- Description -->
  {#if member.description}
    <div class="relative z-10 p-6 border-b border-slate-700/50">
      <h4 class="text-sm font-semibold dark:text-slate-300 text-slate-700 mb-3 uppercase tracking-wider">About</h4>
      <p class="dark:text-slate-300 text-slate-800 leading-relaxed text-sm">{member.description}</p>
    </div>
  {/if}

  
  <div class="relative z-10 p-6 border-b border-slate-700/50">
    <h4 class="text-sm font-semibold dark:text-slate-300 text-slate-700 mb-4 uppercase tracking-wider">Connect</h4>
    <div class="space-y-3">
      {#each getSocialPlatforms(member) as platform}
        <div class="flex items-center justify-between p-3 rounded-xl bg-slate-400 dark:bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-200 group cursor-pointer border border-slate-700/30 hover:border-slate-600/50 ">
          <div class="flex items-center space-x-3">
            <div class="p-2 rounded-lg {platform.bgColor} {platform.color} transition-all duration-200">
              {@html platform.icon}
            </div>
            <div>
              <p class="dark:text-slate-300 text-slate-800 font-medium text-sm">{platform.name}</p>
              <p class="dark:text-slate-500 text-gray-700 text-xs truncate max-w-32">{platform.displayValue}</p>
            </div>
          </div>
          <button on:click={() => platform.isClickable && platform.url ? openLink(platform.url) : copyToClipboard(platform.value)}
                  class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-600/50 transition-all duration-200 opacity-0 group-hover:opacity-100">
            {#if platform.isClickable}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15,3 21,3 21,9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="m5 15-4-4 4-4"></path>
              </svg>
            {/if}
          </button>
        </div>
      {/each}
    </div>
  </div>

  <!-- Actions -->
  <div class="relative z-10 p-6 mt-auto">
    <div class="space-y-3">
      <button class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg shadow-blue-500/25">
        View Profile
      </button>
      
    </div>
  </div>
</div>

<style>
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
</style>