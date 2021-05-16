<script>
	import { navigate } from "svelte-routing";
	import { GraphQLSchema } from "graphql";

	/**
	 * @type {GraphQLSchema}
	 */
	export let schema;

	let contentTypes = [];

	$: contentTypes = Object.entries(schema?.getQueryType?.()?.getFields?.())
		.filter(
			([key, value]) =>
				!value.type?.ofType?._fields?.aggregate && value?.args?.length > 1
		)
		.map(([key]) => key);
	console.log(Object.values(schema.getTypeMap()));
	// $: contentTypes = schema.
</script>

<div class="p-2">
	<div class="font-bold text-4xl mb-4">Content types</div>
	<div class="text-sm">Pulled from introspection query</div>
	<br />
	<table class="w-full">
		<thead>
			<tr>
				<th class="text-left border-b-2 border-gray-700">Content types</th>
			</tr>
		</thead>
		<tbody>
			{#each contentTypes as contentType}
				<tr>
					<td
						class="py-4 px-2 border-b-2 border-gray-200 cursor-pointer text-blue-600 underline"
						on:click={() => navigate(`/${contentType}`)}
					>
						{contentType}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
