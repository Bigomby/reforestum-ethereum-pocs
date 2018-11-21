<template>
  <main>
    <div class="content">
      <nav class="navbar is-light">
        <div class="navbar-brand">
          <router-link
            to="/"
            class="navbar-item"
          >
            <img src="/logo.svg">
          </router-link>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <b-taglist attached>
                <b-tag
                  type="is-dark"
                  size="is-medium"
                >
                  Account
                </b-tag>
                <b-tag
                  type="is-primary"
                  size="is-medium"
                >
                  {{ account || "No account selected" }}
                </b-tag>
              </b-taglist>
            </div>
          </div>
        </div>
      </nav>

      <section class="section">
        <nuxt />
      </section>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <b-taglist attached>
          <b-tag
            type="is-dark"
            size="is-medium"
          >
            Contract
          </b-tag>
          <b-tag
            size="is-medium"
          >
            {{ contractAddress || "No account selected" }}
          </b-tag>
        </b-taglist>
      </div>
    </footer>
  </main>
</template>

<script>
import { mapState } from 'vuex';

const RFT_CONTRACT_ADDRESS = process.env.RFT_CONTRACT_ADDRESS;

export default {
  computed: {
    ...mapState({
      account: state => state.rft.account,
      contractAddress: state => state.rft.contractAddress,
    }),
  },

  created() {
    this.$store.commit('rft/SET_ACCOUNT', window.web3.eth.defaultAccount);
    this.$store.commit('rft/SET_CONTRACT_ADDRESS', RFT_CONTRACT_ADDRESS);
  },
};
</script>

<style>
main {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.content {
  flex: 1;
}

.footer {
  display: flex;
  background-color: #37b877 !important;
}

.footer-content {
  margin: auto;
}

.account {
  margin: auto;
  padding: 1em;
}

.brand {
  color: white;
}
</style>

<style lang="scss">
@import '~bulma/sass/utilities/_all';

$primary: #37b877;
$primary-invert: findColorInvert($primary);
$danger: #fa675c;
$danger-invert: findColorInvert($danger);

$colors: (
  'white': (
    $white,
    $black,
  ),
  'black': (
    $black,
    $white,
  ),
  'light': (
    $light,
    $light-invert,
  ),
  'dark': (
    $dark,
    $dark-invert,
  ),
  'primary': (
    $primary,
    $primary-invert,
  ),
  'info': (
    $info,
    $info-invert,
  ),
  'success': (
    $success,
    $success-invert,
  ),
  'warning': (
    $warning,
    $warning-invert,
  ),
  'danger': (
    $danger,
    $danger-invert,
  ),
);

@import '~bulma';
@import '~buefy/src/scss/buefy';
</style>
