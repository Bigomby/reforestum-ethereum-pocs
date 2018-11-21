import { storiesOf } from '@storybook/vue';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import Operator from '../components/Operator';
import OperatorList from '../components/OperatorList';

storiesOf('Admin/Operator', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)

  .add('Single', () => ({
    components: { Operator },

    methods: {
      removeOperator: action('Remove operator'),
    },

    data() {
      return {
        alias: text('Alias', 'Diego Fernández'),
        address: text('Address', '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'),
      };
    },

    async mounted() {},
    template: `
      <div>
        <operator
          :alias="alias"
          :address="address"
          @remove-operator="removeOperator"
        />
      </div>`,
  }))
  .add('Multiple', () => ({
    components: { OperatorList },

    methods: {
      removeOperator: action('Remove operator'),
    },

    data() {
      return {
        operators: [
          {
            alias: 'Vitalik Buterin',
            address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          },
          {
            alias: 'Gavin Wood',
            address: '0x281055Afc982d96fAB65b3a49cAc8b878184Cb16',
          },
          {
            alias: 'Joseph Lubin',
            address: '0x6F46CF5569AEfA1acC1009290c8E043747172d89',
          },
          {
            alias: 'John McAfee',
            address: '0x90e63c3d53E0Ea496845b7a03ec7548B70014A91',
          },
        ],
      };
    },

    async mounted() {},
    template: `
      <div>
        <operator-list
          :operators="operators"
          @remove-operator="removeOperator"
        />
      </div>`,
  }));
