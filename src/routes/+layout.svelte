<script>
	import '../app.css';
	import "../app.css";
	import Header from '../components/Header.svelte';
	import CustomCursor from '../components/CustomCursor.svelte';

	let { children } = $props();
</script>

<CustomCursor />
<Header />

{@render children()}

