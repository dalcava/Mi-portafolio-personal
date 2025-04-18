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
    top: -5px;
    right: 0;
    padding: 16px;
    z-index: 3; /* más alto que el overlay y loading */
    pointer-events: auto;
  }
  
  .tabs-carrusel {
    width: 174px;
    display: flex;
    gap: 8px;
    flex-direction: row;
    justify-content: flex-end;
    /* right: 10px; */
    padding-right: 39px;
  }

  .tab {
    background-color: var(--blanco);
    border: 2px solid var(--Verde-oscuro);
    font-family: 'Publica Sans', sans-serif;
    color: var(--Verde-oscuro);
    font-size: var(--font-size-M);
    font-weight: 900;
    text-align: center;
    padding: 16px;
    border-radius: 0px 0px 16px 16px;
    user-select: none;
    transform: translateY(-20px);
    height: 72px;
    transition: all 0.2s ease-out;
    cursor: pointer;
    backdrop-filter: blur(100px);
  }

  .tab:hover {
    height: 84px;
    padding-top: 16px;
    color: var(--Verde);
    box-shadow: 2.64px 7.29px 0px 0px #BBBAE0;
    border: 2px solid var(--Verde);
  }
  
  .tab:active,
  .tab.active, .tab.active:hover {
    height: 96px;
    color: var(--blanco);
    padding-top: 24px;
    background-color: var(--Verde-oscuro);
    border: 2px solid var(--Verde-oscuro);
  }

  @media (max-width: 1200px) {
    .tabs-carrusel-fixed {
        right: 17px;
    }
  }
  @media (max-width: 600px) {
    .tabs-carrusel-fixed {
        right: 1px;
    }
  }
  
</style>
