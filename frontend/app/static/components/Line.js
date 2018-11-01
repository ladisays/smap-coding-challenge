import { Bar, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
	extends: Bar,
	mixins: [reactiveProp],
	props: ['chartData'],
	data() {
		return {
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
		      xAxes: [{
		        stacked: false
		      }],
		      yAxes: [{
		        stacked: false,
		        position: "left",
		        id: "y-axis-0",
		      }, {
		        stacked: false,
		        position: "right",
		        id: "y-axis-1",
		      }]
		    }
			}
		}
	},
	mounted() {
		this.renderChart(this.chartData, this.options);
	}
}