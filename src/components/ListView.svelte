<script>
	import { format, parse } from "date-fns";

	export let data = [];
	export let fields = [];

	console.log(data);
</script>

<div>
	<table class="w-full text-left">
		<thead>
			<tr>
				{#each fields as [field, { type }]}
					<th
						class="py-2 px-3 border-b-2 border-gray-700"
						class:text-right={(type?.ofType?.name ?? type?.name) === "Int"}
						>{field}</th
					>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as item}
				<tr>
					{#each fields as [field, { type }]}
						<td
							class="py-4 px-3 border-b-2 border-gray-200"
							class:text-right={(type?.name ?? type?.ofType?.name) === "Int"}
						>
							{#if (type?.name ?? type?.ofType?.name) === "timestamptz"}
								{format(new Date(item[field]), "MM/dd/yyyy hh:mm ss")}
							{:else if (type?.name ?? type?.ofType?.name) === "date"}
								{format(
									parse(item[field], "yyyy-MM-dd", new Date()),
									"MM/dd/yyyy"
								)}
							{:else}
								{item[field]}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
</style>
