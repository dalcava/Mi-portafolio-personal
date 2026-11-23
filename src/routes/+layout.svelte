<script>
	import '../app.css';
	import "../app.css";
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import Header from '../components/Header.svelte';
	import CustomCursor from '../components/CustomCursor.svelte';
	import Contador from '../components/Contador.svelte';

	export const prerender = false;

	let { children } = $props();
</script>

{#if $page.route.id !== '/under-construction'}
  <CustomCursor />
{/if}
<Header />


{@render children()}

