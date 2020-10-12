<template>
  <div class="order-detail-table">
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            <span style="font-size: 17px;">Title</span>
          </th>
          <th class="text-right">
            <span style="font-size: 17px;">Amount</span>
          </th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Payble </td>
          <td>{{ data.price }}</td>
        </tr>
        <tr>
          <td>Paid </td>
          <td>{{ data.paid }}</td>
        </tr>
        <tr>
          <td>Charge </td>
          <td>{{ data.loss }}</td>
        </tr>
        <tr>
          <td style="color: #009688;">Profit </td>
          <td style="font-size: 20px; color: #009688;">{{ profit() }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </div>
</template>

<script>
  export default {
    name: 'simple-table',
    methods: {
      profit() {
        return this.data.paid - this.data.loss
      }
    },
    props: {
      data: {required:true}
    }
  }
</script>

<style lang="scss">
  .order-detail-table{
    padding: 0 20px;
    td:last-child{
      text-align: right !important;
    }
  }
</style>
