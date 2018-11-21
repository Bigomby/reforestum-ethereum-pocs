<template>
  <div class="box">
    <div class="columns">
      <div class="column">
        <p><strong>{{ alias }}</strong></p>
        <p class="address">{{ address }}</p>
      </div>

      <div class="column is-narrow center" >
        <button
          class="button"
          @click="$emit('remove-operator', address)"
        >
          <b-icon
            icon="delete"
            type="is-danger"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
      default: '0x0000000000000000000000000000000000000000',
    },
    alias: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .address {
    font-size: 3vw;
  }
}

.center {
  margin: auto;
  text-align: center;
}
</style>

<style lang="scss">
// Import Bulma's core
@import '~bulma/sass/utilities/_all';

// Set your colors
$primary: #37b877;
$primary-invert: findColorInvert($primary);
$danger: #fa675c;
$danger-invert: findColorInvert($danger);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
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
