<template>
  <div class="my-keys">
    <Space>
      <Input />
      <Button @click="get_data">Query</Button>
      <Button @click="add">New</Button>
    </Space>
    <Table :data="items" :columns="columns">
      <template v-slot:action="c, row">
        <Space>
          <Button size="small" type="danger" @click="del(row)">Del</Button>
          <Button size="small" @click="edit(row)">Edit</Button>
        </Space>
      </template>
    </Table>
    <Modal :title="action == 'new' ? 'New' : 'Edit'" v-model="show">
      <Form :model="form" :rules="rules" layout="vertical" @submit="save">
        <FormItem label="Host" prop="host">
          <Input placeholder="https://" theme="light" />
        </FormItem>
        <FormItem label="API Key" prop="key">
          <Input placeholder="Please input api key..." theme="light" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      columns: [
        { key: 'name', title: 'Name' },
        // { key: 'api_key', title: 'Key' },
        { key: 'email', title: 'Email' },
        { key: 'role', title: 'Role' },
        { key: 'total_fee', title: '总消费' },
        { key: 'balance', title: '余额' },
        { key: 'month_fee', title: '本月消费' },
        { key: 'month_quota', title: '本月额度' },
        // { key: 'created_at', title: 'Date' },
        { key: 'action', title: 'Action' },
      ],
      form: { key: '', host: '' },
      rules: {
        key: [{ required: true, message: 'Please input key...' }],
        host: [{ required: true, message: 'Please input Host...' }]
      },
      action: "add",
      show: false
    }
  },
  mounted() {
    this.get_data()
  },
  methods: {
    get_data() {

      const host = localStorage.getItem("host");
      const key = localStorage.getItem("key");
      this.$http.get(host + '/admin/api-key/list',null, key).then(res => {
        this.items = res.data.items;
      })
    },
    del({ id }) {
      this.$http.delete('/xxx', { id }).then(res => {

      })
    },
    edit(row) {
      this.form = row
      this.actino = 'edit'
      this.show = true
    },
    add() {
      this.action = 'add'
      this.show = true
    },
    save() {
      this.$http.post('/xxx', this.form).then(res => {

      })
    }
  }
}
</script>