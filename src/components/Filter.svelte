<script>
	import { createEventDispatcher } from "svelte";
	import OperatorsDropdown from "./OperatorsDropdown.svelte";

	export let name = "";
	export let placeholder = "";
	export let type = "String";

	let value = "";
	let op = "";

	let block = {};
	let operatorsDropdown;

	let TYPES = {
		String: "text",
		Int: "number",
		date: "date",
		timestamptz: "datetime-local",
	};

	const dispatch = createEventDispatcher();
	$: {
		if (name && value) {
			if (op) {
				block = {
					[name]: { [op]: value },
				};
			} else {
				block = {
					[name]: value,
				};
			}
		} else {
			block = {};
		}
		dispatch("block", block);
	}

	export function clear() {
		value = "";
		operatorsDropdown?.clear();
	}
</script>

<tr>
	<td class="py-1">{name}</td>
	<td class="py-1 px-1">
		<OperatorsDropdown
			bind:this={operatorsDropdown}
			on:change={({ detail }) => {
				op = detail;
			}}
		/>
	</td>
	<td class="py-1">
		<input
			class="border-2 border-gray-200 rounded p-1 w-full"
			type={TYPES[type]}
			{placeholder}
			{value}
			on:change={(e) => {
				if (TYPES[type] === "number") {
					value = e.currentTarget.valueAsNumber;
					return true;
				}

				value = e.currentTarget.value;
			}}
		/>
	</td>
</tr>

<style>
</style>
