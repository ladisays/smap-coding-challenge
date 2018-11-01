<template>
  <div class="consumer container">
    <div class="jumbotron">
      <h1 class="display-4">Consumer Detail</h1>
      <hr>
      <div v-if="!consumer">
        <spinner></spinner>
      </div>
      <div class="row consumer-detail" v-if="consumer">
        <div class="col-6">
          <small>Name: </small>
          <p>{{ consumer.name }}</p>
        </div>
        <div class="col-6">
          <small>Voltage Type: </small>
          <p>{{ consumerTypes[consumer.consumer_type] }}</p>
        </div>
      </div>
    </div>
    <div v-if="!stats">
      <spinner></spinner>
    </div>
    <transition name="fade">
      <div v-if="stats">
        <div class="filters">
          <span>Year:</span>
          <div class="btn-group">
            <button type="button" class="btn btn-secondary" v-for="year in years" @click="_filter(year)" :class="{active: activeYear === year }">
              <span class="filter-text">
                {{ year }}
                <span v-if="loading && activeYear === year">
                  <spinner></spinner>
                </span>
              </span>
            </button>
          </div>
        </div>
        <consumption-chart :data="stats"></consumption-chart>
      </div>
    </transition>
  </div>
</template>

<script>
  import ConsumptionChart from './ConsumptionChart';
  import Spinner from './Spinner';
  import { consumers } from 'js/utils/api';
  import * as Notify from 'js/utils/notify';

  export default {
    name: 'consumer',
    components: {
      ConsumptionChart,
      Spinner
    },
    data() {
      return {
        consumer: null,
        consumerTypes: {
          'low': 'Low',
          'high': 'High',
          'extra_high': 'Extra High'
        },
        stats: null,
        years: [2016, 2017],
        activeYear: 2017,
        loading: false
      };
    },
    beforeCreate() {
      if (isNaN(this.$route.params.id)) {
        return this.$router.push({ name: 'Consumers' });
      }      
    },
    created() {
      const { id } = this.$route.params;
      this.getConsumer(id);
      this.getStatistics(id, this.activeYear);
    },
    methods: {
      getConsumer(id) {
        const vm = this;

        consumers.get(id)
          .then(response => {
            vm.consumer = response.data;
          }).catch(() => {
            Notify.error('There was an error fetching consumer. Please, try again later!');
          });
      },
      getStatistics(id, year = undefined) {
        const vm = this;

        vm.loading = true;
        consumers.getStats(id, year)
          .then(response => {
            vm.loading = false;
            vm.stats = {
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              datasets: [
                {
                  label: 'Consumption',
                  borderColor: 'rgb(149,220,196)',
                  backgroundColor: 'rgb(149,220,196)',
                  fill: false,
                  data: response.data.map(item => item.consumption.toFixed(2)),
                  type: 'line',
                  id: 'y-axis-0'
                },
                {
                  label: 'Bill',
                  backgroundColor: '#f87979',
                  data: response.data.map(item => item.total_bill.toFixed(2)),
                  id: 'y-axis-1'
                },
                {
                  label: 'Cost',
                  backgroundColor: 'rgb(100,161,223)',
                  data: response.data.map(item => item.total_cost.toFixed(2)),
                  id: 'y-axis-1'
                }
              ]
            };
          })
          .catch(() => {
            vm.loading = false;
            Notify.error('There was an error fetching statistics. Please, try again later!');
          });
      },
      _filter(year) {
        this.getStatistics(this.$route.params.id, year);
        this.activeYear = year;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  h1 {
    font-size: 3rem;
  }
  .consumer .jumbotron {
    margin-top: 1.25rem;
  }
  .consumer-detail {
    p {
      font-weight: 300;
      font-size: 1.25rem;
    }
  }
  .filters {
    .filter-text {
      display: inline-flex;
      align-items: center;

      span {
        margin-left: 5px;
      }
    }
  }
</style>
