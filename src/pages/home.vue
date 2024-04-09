<template>
  <div class="home">
    <Space class="items">
      <div class="item">
        <span class="value"></span>
        <span class="key">总消费</span>
      </div>
      <div class="item">
        <span class="value"></span>
        <span class="key">本月消费</span>
      </div>
      <div class="item">
        <span class="value"></span>
        <span class="key">本月额度</span>
      </div>
      <div class="item">
        <span class="value"></span>
        <span class="key">余额</span>
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
      data: [],
      columns: []
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
  }
}
</style>