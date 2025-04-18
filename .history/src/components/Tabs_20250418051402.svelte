<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { page } from '$app/stores';
  import gsap from 'gsap';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';

  export let tabs = ['UX', '3D'];
  let activeTab = 'UX';

  const dispatch = createEventDispatcher();

  const setActiveTab = (tab) => {
    activeTab = tab;
    dispatch('tabChange', tab);
  };

  onMount(() => {

      setActiveTab('UX');

  });
</script>



<div class="tabs-carrusel-fixed">
  <div class="tabs-carrusel">
    {#each tabs as tab}
      <div
        class="tab {tab === activeTab ? 'active' : ''}"
        class:active={tab === activeTab}
        on:click={() => setActiveTab(tab)}
      >
        {tab}
      </div>
    {/each}
  </div>
</div>

<style>
.tabs-carrusel-fixed {
    position: absolute;
    right: 48px;
    top: 16px;
    z-index: 3;
    pointer-events: auto;
    display: flex;
    justify-content: flex-end;
    width: 240px;
    flex-direction: column;
    align-items: flex-end;
}
  
.tabs-carrusel {
    width: 100%;
    display: flex;
    gap: 8px;
    flex-direction: row;
    justify-content: flex-end;
}

  .tab {
    border-bottom: 2px solid var(--Verde-oscuro);
    font-family: 'Publica Sans', sans-serif;
    color: var(--Verde-oscuro);
    font-size: var(--font-size-XS);
    font-weight: 900;
    text-align: center;
    user-select: none;
    height: 48px;
    width: 80px;
    transition: all 0.2s ease-out;
    cursor: pointer;
    backdrop-filter: blur(100px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 16px 16px 0 0;
}

  .tab:hover {
    height: 48px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--Verde);
    color: var(--Verde);
  }
  
  .tab:active,
  .tab.active, .tab.active:hover {
    color: var(--blanco);
    background-color: var(--Verde-oscuro);
    border: 2px solid var(--Verde-oscuro);
    border-radius: 16px 16px 4px 16px;
  }

  @media (max-width: 1200px) {
    .tabs-carrusel-fixed {
        right: 17px;
    }
  }
  @media (max-width: 600px) {
    .tabs-carrusel-fixed {
        right: -39px;
    }
  }
  
</style>
