<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import gsap from 'gsap';

  export let tabs = ['3D', 'UX'];
  let activeTab = tabs[0];

  const dispatch = createEventDispatcher();

  const setActiveTab = (tab) => {
    activeTab = tab;
    dispatch('tabChange', tab); // ← Dispara el evento al padre
  };
</script>


<div class="tabs-carrusel-fixed">
  <div class="tabs-carrusel">
    {#each tabs as tab}
      <div
        class="tab {tab === activeTab ? 'active' : ''}"
        on:click={() => setActiveTab(tab)}
      >
        {tab}
      </div>
    {/each}
  </div>
</div>

<style>
  .tabs-carrusel-fixed {
    position: fixed;
    top: 0;
    right: 0;
    padding: 16px;
    z-index: 1; /* más alto que el overlay y loading */
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
    background-color: var(--Verde-claro);
    font-family: 'Thunder extra';
    color: white;
    font-size: var(--font-size-XL);
    font-weight: 900;
    text-align: center;
    padding: 16px;
    border-radius: 0px 0px 12px 12px;
    box-shadow: 2.64px 5.29px 0px 0px #D1D1D6;
    user-select: none;
    transform: translateY(-20px);
    height: 72px;
    transition: all 0.2s ease-out;
    cursor: pointer;
  }

  .tab:hover {
    height: 84px;
    padding-top: 16px;
  }
  
  .tab:active,
  .tab.active {
    height: 96px;
    padding-top: 24px;
    background-color: var(--Verde-oscuro);
    box-shadow: 4.49px -2.24px 0px 0px #09A186;
  }
</style>
