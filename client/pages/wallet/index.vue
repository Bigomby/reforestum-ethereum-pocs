<template>
  <div class="container">
    <token-request-form />

    <b-table :data="tokenList">
      <template slot-scope="props">
        <b-table-column label="ID">
          {{ props.row.id }}
        </b-table-column>

        <b-table-column label="Issue date">
          {{ new Date(props.row.issued * 1000).toLocaleDateString('es') }}
        </b-table-column>

        <b-table-column label="Base unit">
          {{ props.row.baseUnit }} sqm
        </b-table-column>

        <b-table-column label="Amount">
          {{ props.row.amount }}
        </b-table-column>

        <b-table-column label="Total">
          {{ props.row.baseUnit * props.row.amount }} sqm
        </b-table-column>

        <b-table-column label="Status">
          <span
            :class="{ 'is-warning': !props.row.geoJson, 'is-success': !!props.row.geoJson }"
            class="tag"
          >
            {{ props.row.geoJson ? 'Planted' : 'Pending' }}
          </span>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import TokenRequestForm from '~/components/TokenRequestForm';

export default {
  components: {
    TokenRequestForm,
  },

  data() {
    return {
      columns: [
        {
          field: 'id',
          label: 'ID',
          numeric: true,
        },
        {
          field: 'issued',
          label: 'Issue date',
          centered: true,
        },
        {
          field: 'baseUnit',
          label: 'Base unit',
          format: input => new Date(input * 1000),
        },
        {
          field: 'amount',
          label: 'Amount',
        },
      ],
    };
  },

  computed: {
    ...mapState({
      tokenList: state => state.rft.tokenList,
      account: state => state.rft.account,
    }),
  },

  async mounted() {
    this.$store.dispatch('rft/updateTokenList', {
      address: this.account,
    });
  },
};
</script>
