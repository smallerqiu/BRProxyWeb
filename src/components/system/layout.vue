<template>
  <div class="k-sys-layout">
    <Layout class="layout-back">
      <Sider />
      <Content class="k-sys-main">
        <Row type="flex" align="middle" class="header-nav">
          <Col flex="1" style="width: 0;">
          <Tab />
          </Col>
          <Col>
          <Space :size="10">
            <Dropdown show-placement-arrow placement="top">
              <Button :icon="NotificationsOutline" theme="normal" size="small" />
              <!-- <Status slot="content" /> -->
            </Dropdown>
            <Button :icon="theme != 'dark' ? Moon : Sunny" theme="normal" size="small" @click="switchMode" />
            <!-- <Input :icon="Search" theme="light" shape="circle" placeholder="搜索" style="width:200px" /> -->
            <Avatar style="background:#3a95ff" :size="25">C</Avatar>
            <span>Cloudbeer</span>
          </Space>
          </Col>
        </Row>
        <div class="container">
          <Main />
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
import { NotificationsOutline, Search, Sunny, Moon } from "kui-icons";
import Status from '../status.vue'
import Sider from './sider.vue'
import Tab from './tab.vue'
import Main from './main.vue'
// import dayjs from 'dayjs'
const monitor = window.matchMedia('(prefers-color-scheme: dark)');

function matchMode(e) {
  const body = document.documentElement;
  if (e.matches) {
    if (!body.hasAttribute('theme-mode')) {
      body.setAttribute('theme-mode', 'dark');
    }
  } else {
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode');
    }
  }
}
monitor.addEventListener('change', matchMode)
// matchMode(monitor)
import Websocket from "@/utils/websocket";
export default {
  name: 'layout',
  data() {
    return {
      timer: null,
      loading: false,
      Search, NotificationsOutline, Sunny, Moon,
      theme: localStorage.getItem('theme')
    };
  },
  components: { Status, Tab, Sider, Main },
  beforeDestroy() {
  },
  created() {
    if (this.theme) {
      document.documentElement.setAttribute('theme-mode', this.theme);
    }
    let token = localStorage.getItem('token')
    if (!token) {
      this.$router.push('/login')
    }
  },
  mounted() {
  },
  methods: {
    switchMode() {
      const body = document.documentElement;
      if (body.hasAttribute('theme-mode')) {
        body.removeAttribute('theme-mode');
        localStorage.removeItem('theme')
        this.theme = 'light'
      } else {
        body.setAttribute('theme-mode', 'dark');
        localStorage.setItem('theme', 'dark')
        this.theme = 'dark'
      }
    },
  },
}
</script>

<style scoped lang="less">
.k-sys-layout {
  height: 100%;

  .layout-back {
    height: 100%;
  }

  .container {
    padding: 0;
    height: calc(100% - 47px);
    overflow: auto;
  }

  .header-nav {
    // border-bottom: 1px solid var(--kui-color-border);
    padding: 0px 10px 4px 0px;
    background-color: var(--kui-color-nav-header);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      height: 6px;
      background-color: var(--kui-color-back);
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}

.k-sys-layout .k-sys-main .nav {
  padding: 16px 0 0 16px;
}

.k-sys-layout .if-top-menu {
  line-height: 61px;
}

.k-sys-layout .k-sys-main {
  overflow: auto;
}

.k-sys-layout .k-layout-footer {
  text-align: center;
  color: #999;
}
</style>
