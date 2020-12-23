<script>
	import { format } from "date-fns";

	import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

	import Year from "./Year.svelte";

	import { loadMarkedDays, saveMarkedDays } from "./utils";

	let markedDays = loadMarkedDays();

	$: {
		saveMarkedDays(markedDays);
	}

	let year = parseInt(format(new Date(), "yyyy"));
</script>

<style>
	.main {
		text-align: center;
	}
	.container {
		max-width: 700px !important;
	}
</style>

<div class="main">
	<div class="container">
		<Year {year} bind:markedDays />
	</div>
</div>
