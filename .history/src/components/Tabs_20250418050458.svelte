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
    right: 0;
    padding: 8px 48px;
    z-index: 3;
    pointer-events: auto;
    display: flex;
    justify-content: flex-end;
    width: 240px;
    flex-direction: column;
    align-items: flex-end;
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
    font-size: var(--font-size-XS);
    font-weight: 900;
    text-align: center;
    border-radius: 16px;
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
}

  .tab:hover {
    height: 48px;
    padding-top: 16px;
    color: var(--Verde);
    box-shadow: 2.64px 7.29px 0px 0px #BBBAE0;
    border: 2px solid var(--Verde);
  }
  
  .tab:active,
  .tab.active, .tab.active:hover {
    color: var(--blanco);
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
        right: -39px;
    }
  }
  
</style>
