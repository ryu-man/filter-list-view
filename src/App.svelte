<script>
	import Entities from "./Entities.svelte";
	import Filters from "./Filters.svelte";
	import HasuraProvider from "./components/HasuraProvider.svelte";
	import ListView from "./components/ListView.svelte";
	import Navbar from "./Navbar.svelte";
	import SchemaFetcher from "./components/SchemaFetcher.svelte";
	import { Router, Route } from "svelte-routing";
</script>

<Navbar />
<Router url="/" basepath="/">
	<HasuraProvider>
		<SchemaFetcher let:schema>
			<div class="container mx-auto px-32 pt-8">
				<Route path="/">
					<Entities {schema} />
				</Route>

				<Route path="/:entity" let:params>
					<Filters {schema} entity={params.entity} let:data let:fields>
						<ListView {data} {fields} />
					</Filters>
				</Route>
			</div>
		</SchemaFetcher>
	</HasuraProvider>
</Router>
