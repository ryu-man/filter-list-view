<script context="module">
	export const menuStatus = {};
	export const selected = {};
</script>

<script>
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

	export let selectedItem = "";

	let show = writable(false);

	let selectionStore = writable(selectedItem);

	$: $selectionStore = selectedItem;

	export let placeholder = "";

	setContext(menuStatus, show);

	setContext(selected, selectionStore);

	function lossFocusHandler(node) {
		/**
		 *
		 * @param e {MouseEvent}
		 */
		const handler = (e) => {
			if ($show) {
				//@ts-ignore
				if (!e.path.includes(node)) {
					$show = false;
				}
			}
		};
		document.addEventListener("click", handler);

		return {
			destroy() {
				document.removeEventListener("click", handler);
			},
		};
	}

	export function clear() {
		$selectionStore = "";
	}
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="relative inline-block text-left w-full" use:lossFocusHandler>
	<div>
		<button
			type="button"
			class="inline-flex justify-between w-full rounded border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-gray-100"
			id="menu-button"
			aria-expanded="true"
			aria-haspopup="true"
			on:click={(e) => {
				$show = true;
			}}
		>
			<span>
				{#if $selectionStore}
					{$selectionStore}
				{:else}
					{placeholder}
				{/if}
			</span>
			<span>
				<!-- Heroicon name: solid/chevron-down -->
				<svg
					class="-mr-1 ml-2 h-5 w-5 float-right"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</button>
	</div>

	<!--
		Dropdown menu, show/hide based on menu state.
		
		Entering: "transition ease-out duration-100"
		From: "transform opacity-0 scale-95"
		To: "transform opacity-100 scale-100"
		Leaving: "transition ease-in duration-75"
		From: "transform opacity-100 scale-100"
		To: "transform opacity-0 scale-95"
	-->
	{#if $show}
		<div
			class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10 w-full"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabindex="-1"
		>
			<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
			<slot />
		</div>
	{/if}
</div>
