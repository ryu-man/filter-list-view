<script>
	import Filter from "./components/Filter.svelte";

	import { operationStore, query } from "@urql/svelte";
	import { GET_POST_TYPE_1_SCHEMA, QUERY, queryBuilder } from "./gql";
	import { onDestroy } from "svelte";
	import { GraphQLSchema } from "graphql";

	export let entity = "";

	/**
	 * @type {GraphQLSchema}
	 */
	export let schema;
	console.log(schema.getQueryType().getFields()[entity].args[4]);
	let whereArgs = schema
		.getQueryType()
		.getFields()
		[entity].args[4].type.getFields();
	let fields = schema
		? Object.entries(
				schema
					.getQueryType()
					.getFields()
					[entity].type.ofType.ofType.ofType.getFields() ?? {}
		  )
		: [];

	let where = {};
	let data = [];
	const dataQuery = operationStore(
		queryBuilder(
			entity,
			fields.map(([f]) => f)
		),
		{ where },
		{ requestPolicy: "cache-and-network" }
	);

	const unsubscribeDataStore = query(dataQuery).subscribe((res) => {
		data = res?.data?.[entity] ?? [];
		console.log(res);
	});


	onDestroy(() => {
		unsubscribeDataStore();
	});

	let filters = {};
</script>

<div class="filters w-full mb-8">
	<div class="font-bold text-4xl mb-2">{entity}</div>
	<div class="mb-8">Fields and input types pulled from introspection query</div>
	<div class="bg-gray-100 border-2 border-gray-200 p-2 rounded">
		<table class="w-full">
			<thead class="text-left">
				<tr>
					<th colspan="3">Filters</th>
				</tr>
				<tr>
					<th>Field</th>
					<th>Operator</th>
					<th>Value</th>
				</tr>
			</thead>

			<tbody>
				{#if schema}
					{#each fields as [field, { type: { ofType: { name } } }]}
						<Filter
							bind:this={filters[field]}
							name={field}
							type={name}
							whereArgs={whereArgs[field].type.getFields()}
							placeholder=""
							on:block={({ detail }) => {
								where = { ...where, ...detail };
							}}
						/>
					{/each}
				{/if}
			</tbody>

			<tfoot>
				<tr>
					<td colspan="8" class="">
						<div class="flex justify-end w-full py-2 space-x-2">
							<button
								class="p-2 text-gray-700 rounded bg-gray-200"
								on:click={(e) => {
									Object.entries(filters).forEach(([key, component]) => {
										component.clear();
									});
									where = {};
									$dataQuery.variables = {
										where,
									};
								}}>Clear Filters</button
							>
							<button
								class="p-2 bg-blue-700 text-white rounded"
								on:click={() => {
									$dataQuery.variables = {
										where,
									};
									// $dataQuery.context = { requestPolicy: "network-only" };
								}}>Apply Filters</button
							>
						</div>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>

<slot {data} {fields} />

<style>
</style>
