<template>
  <div class="login">
    <div class="login-box">
      <h1>Sign in to BRProxy</h1>
      <Form size="large" :model="form" :rules="rules" layout="vertical" @submit="login">
        <FormItem label="" prop="key">
          <Input type="password" placeholder="Please input key..." theme="light" />
        </FormItem>
        <FormItem class="btn">
          <Button type="primary" :loading="loading" htmlType="submit">Sign in</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      form: { key: '' },
      rules: {
        key: [{ required: true, message: 'Please input key...' }]
      }
    }
  },
  methods: {
    login({ valid }) {
      // https://d1v25bs7gljqw0.cloudfront.net
      // br-NVKApACW2JsPSFdW04W7m90H51kVs
      this.loading = true
      this.$http.get('/user/api-key/mine', this.form).then(res => {

      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="less">
.login {
  width: 100%;
  height: 100%;
  position: relative;

  &::before {
    content: '';
    background: url(@/assets/img/back.avif);
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    display: table;
    z-index: 0;
  }

  &::after {
    display: table;
    content: '';
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    background-color: #46464647;
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .login-box {
    background-color: #ffffffb5;
    width: 500px;
    height: 200px;
    position: absolute;
    z-index: 100;
    top: 50%;
    border-radius: 16px;
    right: 20%;
    transform: translateY(-50%);
    padding: 30px;
  }

  .k-input[mult] .k-input-text {
    height: 38px;
  }

  .btn .k-form-item-content {
    justify-content: end;
  }
}
</style>