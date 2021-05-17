<script>
	import { createEventDispatcher } from "svelte";
	import OperatorsDropdown from "./OperatorsDropdown.svelte";

	export let name = "";
	export let placeholder = "";
	export let type = "String";
	export let whereArgs;

	let value = "";
	let op = "";

	let block = {};
	let operatorsDropdown;

	console.log(type);

	let TYPES = {
		String: "text",
		Int: "number",
		date: "date",
		timestamptz: "datetime-local",
	};

	const typeMapper = (type) => {
		switch (type) {
			case "String":
				return "text";
			case "Int":
				return "number";
			case "date":
				return "date";
			case "timestamptz":
				return "datetime-local";

			default:
				return "text";
		}
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

	$: console.log(value);

	export function clear() {
		value = "";
		operatorsDropdown?.clear();
	}
</script>

<tr>
	<td class="py-1">{name}</td>
	<td class="py-1 px-1">
		<OperatorsDropdown
			{whereArgs}
			bind:this={operatorsDropdown}
			on:change={({ detail }) => {
				op = detail;
			}}
		/>
	</td>
	<td class="py-1">
		<input
			class="border-2 border-gray-200 rounded p-1 w-full"
			type={typeMapper(type)}
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
