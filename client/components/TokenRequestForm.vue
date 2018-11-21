<template>
  <div>
    <button
      class="button field is-primary is-pulled-right"
      @click="isModalActive = true"
    >
      <b-icon icon="plus" />
      <span>Seed new token</span>
    </button>

    <br>

    <b-modal
      :active.sync="isModalActive"
      @close="baseUnit = ''; amount= ''"
    >
      <section class="card">
        <header class="card-header">
          <p class="card-header-title is-centered">
            Request new RFT
          </p>
        </header>

        <div class="card-content">
          <b-field
            horizontal
            label="Token info"
          >
            <b-input
              v-model="baseUnit"
              placeholder="Base unit"
            />
            <b-input
              v-model="amount"
              placeholder="Amount"
            />
          </b-field>

          <br>

          <b-message>
            <strong>Total area: </strong> {{ baseUnit * amount }} sqm
          </b-message>

          <b-field>
            <p class="control">
              <button
                class="button is-fullwidth is-primary"
                @click="requestToken()"
              >
                Request token
              </button>
            </p>
          </b-field>
        </div>
      </section>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalActive: false,
      baseUnit: '',
      amount: '',
    };
  },

  methods: {
    requestToken() {
      this.$store.dispatch('rft/requestToken', {
        baseUnit: this.baseUnit,
        amount: this.amount,
      });

      this.isModalActive = false;
    },
  },
};
</script>
