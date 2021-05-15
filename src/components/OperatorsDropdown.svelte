<script>
	import { createEventDispatcher } from "svelte";
	import Dropdown from "./Dropdown.svelte";
	import DropdownItem from "./DropdownItem.svelte";

	export let selectedItem = "";

	let dropdown;

	const dispatch = createEventDispatcher();

	const operators = [
		"_eq",
		"_neq",
		"_gt",
		"_lt",
		"_gte",
		"_lte",
		"_in",
		"_nin",
		"_like",
		"_nlike",
		"_ilike",
		"_nilike",
		"_similar",
		"_nsimilar",
		"_regex",
		"_iregex",
		"_nregex",
		"_niregex",
		"_is_null",
		"_cast",
	];

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
