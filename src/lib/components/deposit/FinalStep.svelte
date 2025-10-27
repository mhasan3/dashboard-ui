<script lang="ts">
	export let selectedMethodTitle: string = '';
</script>

<h3 class="font-bold text-xl text-center mb-4">{selectedMethodTitle}</h3>
<div class="space-y-4 p-4 border rounded-lg bg-gray-50">
	<p>
		This is the final step where you would show specific instructions for depositing with
		<strong>{selectedMethodTitle}</strong>.
	</p>
	<button class="btn btn-primary w-full mt-4">Proceed</button>
</div>