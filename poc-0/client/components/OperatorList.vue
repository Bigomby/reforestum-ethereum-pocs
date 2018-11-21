<template>
  <div>
    <operator
      v-for="operator in operators"
      :key="operator.address"
      :alias="operator.alias"
      :address="operator.address"
      class="entry"
      @remove-operator="$emit('remove-operator', $event)"
    />
  </div>
</template>

<script>
import Operator from '~/components/Operator';

export default {
  components: {
    Operator,
  },

  props: {
    operators: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.entry {
  margin-bottom: 0.75em !important;
}
</style>
