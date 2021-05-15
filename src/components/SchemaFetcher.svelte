<script>
	import { buildClientSchema, getIntrospectionQuery } from "graphql";

	const promise = fetch("https://dev-project.hasura.app/v1/graphql", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"x-hasura-admin-secret": ADMIN_SECRET,
		},
		body: JSON.stringify({
			query: getIntrospectionQuery(),
		}),
	}).then((res) => res.json());
</script>

{#await promise then schemaJSON}
	<slot schema={buildClientSchema(schemaJSON.data)} />
{/await}
