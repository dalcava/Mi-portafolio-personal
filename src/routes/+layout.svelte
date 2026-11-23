<script>
	import '../app.css';
	import { afterNavigate } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import { smoothWheel } from '$lib/smoothWheel';
	import "../app.css";
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import Header from '../components/Header.svelte';
	import CustomCursor from '../components/CustomCursor.svelte';
	import Contador from '../components/Contador.svelte';

	export const prerender = false;

	let { children } = $props();
  let stopWheel;
  afterNavigate(({ to }) => {
    stopWheel?.();
    const scroller = to?.route.id === '/' ? document.querySelector('.background') : document.scrollingElement;
    if (scroller) stopWheel = smoothWheel(scroller);
  });
  onDestroy(() => stopWheel?.());
</script>

{#if $page.route.id !== '/under-construction'}
  <CustomCursor />
{/if}
<Header />


{@render children()}

