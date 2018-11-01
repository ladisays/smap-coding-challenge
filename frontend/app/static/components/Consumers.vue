<template>
  <div class="consumers container">
    <div class="consumers-list-title">
      <h1 class="display-4">Consumers List</h1>
    </div>

    <div class="filter-actions">
      <div class="add-action">
        <button class="btn btn-primary" @click="showForm = !showForm">New Consumer</button>
      </div>
      <div class="filters">
        <span>Filter:</span>
        <div class="btn-group">
          <button type="button" class="btn btn-secondary" v-for="type in consumerTypes" @click="_filter(type.id)" :class="{active: activeFilter === type.id }">{{ type.label }}</button>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showForm" class="s-consumer-form">
        <form @submit="addConsumer" method="post">
          <div class="form-group">
            <label for="c_name">Name:</label>
            <input type="text" name="c_name" class="form-control" placeholder="Full Name" v-model="name" required>
          </div>
          <div class="form-group">
            <label for="c_type">Voltage Type:</label>
            <select name="c_type" class="form-control" v-model="consumer_type" required>
              <option v-for="type in consumerTypes" :value="type.id">{{ type.id ? type.label : 'Select...' }}</option>
            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-success">Add Consumer</button>
          </div>
        </form>
      </div>
    </transition>

    <table class="table table-bordered">
      <thead class="thead-light">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Voltage Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-if="consumers.length">
        <tr v-for="consumer in consumers">
          <td>{{ consumer.id }}</td>
          <td>{{ consumer.name }}</td>
          <td>{{ getType(consumer.consumer_type) }}</td>
          <td>
            <button type="button" @click="viewConsumer(consumer.id)" class="btn btn-primary">View</button>
            <button type="button" @click="deleteConsumer(consumer.id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
       </tbody>
       <tbody v-if="!consumers.length">There are no consumers available</tbody>
    </table>
  </div>
</template>
<script>
  import { consumers } from 'js/utils/api';
  import * as Notify from 'js/utils/notify';

  export default {
    name: 'consumers',
    data() {
      return {
        activeFilter: '',
        consumers: [],
        consumerTypes: [
          { id: '', label: 'All' },
          { id: 'low', label: 'Low' },
          { id: 'high', label: 'High' },
          { id: 'extra_high', label: 'Extra High' }
        ],
        name: '',
        consumer_type: '',
        showForm: false
      };
    },
    created() {
      this.getConsumers();
    },
    methods: {
      getConsumers() {
        const vm = this;
        consumers.list()
          .then(response => vm.consumers = response.data)
          .catch(() => {
            Notify.error('There was an error fetching consumers. Please, try again later!');
          });
      },
      addConsumer(e) {
        e.preventDefault();

        if (!this.name || !this.consumer_type) {
          return;
        }

        const vm = this;
        consumers.add({ name: this.name, consumer_type: this.consumer_type})
          .then(() => {
            vm.name = '';
            vm.consumer_type = '';
            vm.showForm = false;
            Notify.success('Consumer has been successfully added!');
            vm.getConsumers();
          })
          .catch(() => {
            Notify.error('There was an error creating this consumer. Please, try again later!');
          });
      },
      deleteConsumer(id) {
        const vm = this;

        if (id) {
          consumers.delete(id)
            .then(response => {
              vm.getConsumers();
              Notify.success('Consumer has been successfully deleted!');
            })
            .catch(() => {
              Notify.error('There was an error deleting this consumer. Please, try again later!');
            });
        }
      },
      viewConsumer(id) {
        this.$router.push({ name: 'Consumer', params: { id } });
      },
      getType(id) {
        const _type = this.consumerTypes.find(type => type.id === id);

        return _type.label;
      },
      _filter(type) {
        const vm = this;

        consumers.listByType(type)
          .then(response => vm.consumers = response.data)
          .catch(() => {
            Notify.error('There was an error fetching consumers. Please, try again later!');
          });

        vm.activeFilter = type || '';
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
  .consumers-list-title {
    padding: 1.25rem 0;
    h1 { font-size: 3rem; }
  }
  .filter-actions {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.25rem;
  }
  .s-consumer-form {
    padding-bottom: 1.25rem;
  }
</style>
