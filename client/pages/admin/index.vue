<template>
  <div class="container">
    {{ name }}
  </div>
</template>

<script>
import OperatorList from '~/components/OperatorList';

export default {
  components: {
    OperatorList,
  },

  data() {
    return {
      name: 'Diego',
    };
  },

  mounted() {
    setTimeout(() => {
      this.name = 'Ismael';
    }, 3000);
  },
};
</script>

<style>
.container {
  background-color: red;
}
</style>
