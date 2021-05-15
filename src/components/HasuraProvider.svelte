<script>
	import { createClient, setClient } from "@urql/svelte";

	export let url = "https://dev-project.hasura.app/v1/graphql";

	let fetchOptions = () => ({
		headers: {
			"content-type": "application/json",
			"x-hasura-admin-secret": ADMIN_SECRET,
		},
	});

	const client = createClient({
		url,
		fetchOptions,
	});
	setClient(client);
</script>

<slot {client} />
