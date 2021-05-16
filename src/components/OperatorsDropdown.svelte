<script>
	import { createEventDispatcher } from "svelte";
	import Dropdown from "./Dropdown.svelte";
	import DropdownItem from "./DropdownItem.svelte";

	export let selectedItem = "";
	export let whereArgs;

	let dropdown;

	const dispatch = createEventDispatcher();

	console.log(whereArgs)

	$: operators = Object.keys(whereArgs);

	export function clear() {
		dropdown.clear();
	}
</script>

<Dropdown bind:this={dropdown} placeholder="Filter operator" {selectedItem}>
	<div class="py-1" role="none">
		{#each operators as op}
			<DropdownItem
				value={op}
				on:click={(e) => {
					dispatch("change", op);
				}}
			>
				{op}
			</DropdownItem>
		{/each}
	</div>
</Dropdown>
