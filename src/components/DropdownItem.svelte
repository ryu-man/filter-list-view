<script>
	import { createEventDispatcher, getContext } from "svelte";
	import { menuStatus, selected } from "./Dropdown.svelte";

	const dispatch = createEventDispatcher();

	const show = getContext(menuStatus);
	const selectionStore = getContext(selected);

	export let value = "";
</script>

<div
	class="text-gray-700 block px-4 py-2 text-sm  cursor-pointer hover:bg-gray-100"
    class:text-gray-900={value === $selectionStore}
	class:font-bold={value === $selectionStore}
	role="menuitem"
	tabindex="-1"
	on:click|preventDefault={(e) => {
		$selectionStore = value;
		$show = false;
		dispatch("click");
	}}
>
	<slot></slot>
</div>
