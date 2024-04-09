<template>
  <div class="home">
    <Space class="items">
      <div class="item">
        <span class="key">总消费</span>
        <span class="value">{{ details.fee_total }}</span>
      </div>
      <div class="item">
        <span class="key">本月消费</span>
        <span class="value">{{ details.fee_month }}</span>
      </div>
      <div class="item">
        <span class="key">本月额度</span>
        <span class="value">{{ details.fee_total }}</span>
      </div>
      <div class="item">
        <span class="key">余额</span>
        <span class="value">{{ details.balance }}</span>
      </div>
    </Space>
    <Table :data="data" :columns="columns">

    </Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      details: {
        fee_total: 100,
        fee_month: 200,
        limit_month: 200,
        balance: 1200,
      },
      data: [],
      columns: [
        { title: 'Date', key: '' },
        { title: 'Amount', key: '' },
        { title: 'Type', key: '' }
      ]
    }
  }
}
</script>
<style lang="less">
.home {
  padding: 20px;

  .items {
    width: 100%;
  }

  .item {
    background: #f5f5f5;
    border-radius: 16px;
    flex: 1;
    padding: 20px;

    .key {
      font-weight: bold;
      margin-right: 10px;
    }
  }
}
</style>