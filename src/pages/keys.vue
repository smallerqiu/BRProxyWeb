<template>
  <div class="my-keys">
    <Space>
      <Input />
      <Button @click="get_data">Query</Button>
      <Button @click="add">New</Button>
    </Space>
    <Table :data="items" :columns="columns" :loading="loading">
      <template v-slot:action="c, row">
        <Space>
          <!-- <Button size="small" @click="del(row)">Del</Button> -->
          <Button size="small" @click="recharge(row)">Recharge</Button>
          <Button size="small" @click="edit(row)">Edit</Button>
        </Space>
      </template>
    </Table>
    <Page :current="page" :total="total" @change="change" />
    <Modal :title="title" v-model="show" @ok="save" :loading="saving">
      <Form :model="form" :rules="rules" layout="vertical" ref="form">
        <FormItem label="Name" prop="name">
          <Input placeholder="name" theme="light" />
        </FormItem>
        <FormItem label="Email" prop="email" readonly="action == 'recharge'">
          <Input theme="light" />
        </FormItem>
        <FormItem label="Role" prop="role"  v-if="action != 'recharge'">
      <Select :width="200" v-model="select">
        <Option  value="user" label="普通用户" />
        <Option  value="admin" label="管理员"  />
      </Select>
        </FormItem>
        <!-- <FormItem label="Balance" prop="balance">
          <Input theme="light" />
        </FormItem> -->
        <FormItem label="Balance" prop="balance" v-if="action=='recharge'">
          <Input theme="light" />
        </FormItem>
        <FormItem label="Month Quota" prop="month_quota" v-if="action != 'recharge'">
          <Input theme="light" />
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
      title: '',
      columns: [
        { key: 'name', title: 'Name' },
        { key: 'api_key', title: 'Key' },
        { key: 'email', title: 'Email' },
        { key: 'role', title: 'Role' },
        { key: 'total_fee', title: '总消费' },
        { key: 'balance', title: '余额' },
        { key: 'month_fee', title: '本月消费' },
        { key: 'month_quota', title: '本月额度' },
        // { key: 'created_at', title: 'Date' },
        { key: 'action', title: 'Action' },
      ],
      form: { name: '', email: '', role: 'user', month_quota: '' ,balance:0},
      rules: {
        name: [{ required: true, message: 'Please input name...' }],
      },
      action: "add",
      show: false,
      page: 1,
      size: 2,
      total: 0,
      loading: false,
      saving: false,
    }
  },
  mounted() {
    this.get_data()
  },
  methods: {
    change(page) {
      this.page = page
      this.get_data()
    },
    get_data() {
      // const host = localStorage.getItem("host");
      // const key = localStorage.getItem("key");
      this.loading = true
      let { page, size } = this
      this.$http.get('/admin/api-key/list', { limit: size, offset: (page - 1) * size }).then(res => {
        let items = res.data.items
        this.total = parseInt(res.data.total)
        items.map(item => {
          item.total_fee = parseFloat(item.total_fee)
          item.balance = parseFloat(item.balance)
          item.month_fee = parseFloat(item.month_fee)
          item.month_quota = parseFloat(item.month_quota)
          return item
        });
        this.total = ~~res.data.total;
        this.items = items
      }).finally(() => {
        this.loading = false
      })
    },
    del({ id }) {
      // this.$http.delete('/xxx', { id }).then(res => {

      // })
    },
    edit(row) {
      this.form = row
      this.title = 'Edit'
      this.action = 'edit'
      this.show = true
    },
    recharge(row) {
      this.form = row
      this.title = "Recharge"
      this.action = 'recharge'
      this.show = true
    },
    add() {
      this.action = 'new'
      this.title = 'New'
      this.show = true
      this.form.id = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    save() {
      this.$refs.form.validate(v => {
        if (v) {
          this.saving = true
          if (this.action == 'recharge') {
            let { id, balance } = this.form
            this.$http.post('/admin/api-key/recharge', { id, balance }).then(res => {
              this.show = false
              this.$Message.success("Save successfuly.")
            }).finally(() => {
              this.saving = false
            })
            return
          }
          this.$http.post('/admin/api-key/update', this.form).then(res => {
            this.show = false
            this.$Message.success("Save successfuly.")
          }).finally(() => {
            this.saving = false
          })
        }
      })

    }
  }
}
</script>
<style lang="less">
.my-keys {
  padding: 20px;
}
</style>