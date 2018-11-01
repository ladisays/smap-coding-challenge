<template>
	<div>
		<line-chart :chartData="data"></line-chart>
	</div>
</template>

<script>
	import LineChart from './Line';
	export default {
		name: 'ConsumptionChart',
		props: ['data'],
		components: {
			LineChart
		}
	}
</script>