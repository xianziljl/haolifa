<template>
<div class="page-home scroll-y">
  <div class="home-row flex">
    <div class="home-card flex-item flex-col relative">
      <div class="home-tab flex-v-center">
        <a class="home-tab-item a" :class="{'on': tab1}" @click="tab1=true">待办事项</a>
        <a class="home-tab-item a" :class="{'on': !tab1}" @click="tab1=false">已办事项</a>
      </div>
      <div class="home-list flex-item scroll-y" v-if="tab1">
        <div class="home-list-item a flex-v-center" v-for="item in todo" :key="item.id">
          <i class="icon f-16 c-a">hourglass_full</i>
          <div class="c-8 date-time">{{item.date}}</div>
          <div class="flex-item text-ellipsis">{{item.title}}</div>
        </div>
        <div v-if="!todo.length" style="pointer-events:none;" class="abs flex-center"><no-data></no-data></div>
      </div>
      <div class="home-list flex-item scroll-y" v-else>
        <div class="home-list-item a flex-v-center" v-for="item in done" :key="item.id">
          <i class="icon f-16 c-a">hourglass_full</i>
          <div class="c-8 date-time">{{item.date}}</div>
          <div class="flex-item text-ellipsis">{{item.title}}</div>
        </div>
        <div v-if="!done.length" style="pointer-events:none;" class="abs flex-center"><no-data></no-data></div>
      </div>
    </div>
    <div class="home-card flex-item flex-col relative">
      <div class="home-tab flex-v-center">
        <a class="home-tab-item a" :class="{'on': tab2}" @click="tab2=true">通知</a>
        <a class="home-tab-item a" :class="{'on': !tab2}" @click="tab2=false">公告</a>
      </div>
      <div class="home-list flex-item scroll-y" v-if="tab2">
        <div class="home-list-item a flex-v-center" v-for="item in notice" :key="item.id">
          <i class="icon f-16 c-a">hourglass_full</i>
          <div class="c-8 date-time">{{item.showTime}}</div>
          <div class="flex-item text-ellipsis">{{item.content}}</div>
        </div>
        <div v-if="!notice.length" style="pointer-events:none;" class="abs flex-center"><no-data></no-data></div>
      </div>
      <div class="home-list flex-item scroll-y" v-else>
        <div class="home-list-item a flex-v-center" v-for="item in news" :key="item.id">
          <i class="icon f-16 c-a">hourglass_full</i>
          <div class="c-8 date-time">{{item.showTime}}</div>
          <div class="flex-item text-ellipsis">{{item.content}}</div>
        </div>
        <div v-if="!news.length" style="pointer-events:none;" class="abs flex-center"><no-data></no-data></div>
      </div>
    </div>
  </div>
  <div class="home-row flex">
    <div class="home-card flex-item flex-col">
      <div class="home-tab flex-v-center">
        <a class="home-tab-item a on">最新上传文件/图纸</a>
      </div>
      <div class="flex-item scroll-y flex-center">
        <no-data></no-data>
      </div>
    </div>
    <div class="home-card flex-item flex-col">
      <div class="home-tab flex-v-center">
        <a class="home-tab-item a on">快捷入口</a>
      </div>
      <div class="flex-item flex scroll-y quick-start">
        <div class="quick-item a"
          :title="item.description"
          @click="$router.push(`/${quickIcons[item.flowId].path}/add/`)"
          v-for="(item) in quick" :key="item.flowId">
          <div class="quick-icon" :style="{background: quickIcons[item.flowId].color}">
            <i class="icon">{{quickIcons[item.flowId].icon || 'people'}}</i>
          </div>
          <div class="f-12 quick-label">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'page-home',
  data () {
    return {
      tab1: true,
      tab2: true,
      quickIcons: [
        {},
        { color: '#21d0b8', icon: 'directions_walk', path: 'applybuy' },
        { color: '#ffa114', icon: 'shopping_cart', path: '' },
        { color: '#ca83dc', icon: 'check_circle', path: '' },
        { color: '#e2c223', icon: 'local_shipping', path: '' },
        { color: '#51c4e6', icon: 'receipt', path: '' },
        { color: '#e86db7', icon: 'build', path: '' },
        { color: '#6d89e8', icon: 'add_shopping_cart', path: 'applybuy' },
        { color: '#e86d6d', icon: 'check_box', path: '' }
      ],
      todo: [],
      done: [],
      notice: [],
      news: [],
      quick: []
    }
  },
  created () {
    this.getTodo()
    this.getNews()
    this.getQuickStart()
  },
  methods: {
    getTodo () {
      this.$http.get('/haolifa/todo').then(res => {
        this.todo = res
      })
    },
    getNews () {
      this.$http.get('/haolifa/message/notice').then(res => {
        this.notice = res.list
      })
      this.$http.get('/haolifa/message/news').then(res => {
        this.news = res.list
      })
    },
    getQuickStart () {
      this.$http.get('/haolifa/quick-start').then(res => {
        this.quick = res
      })
    }
  }
}
</script>

<style lang="less">
.page-home{
  height: 100%;padding: 10px 0;width: 100%;
  .home-row{padding: 10px;}
  .home-card{margin: 0 10px;border: 1px solid #ddd;min-height: 280px;border-radius: 4px;width: 0;max-height: 300px;}
  .home-tab{border-bottom: 1px solid #eee;padding: 0 10px;overflow: hidden;
    .home-tab-item{display: inline-block;padding:12px 10px 10px 10px;border-bottom: 2px solid transparent;margin-bottom: -1px;
      &:hover{background: #f3f3f3;}
      &.on{border-color: #008eff;color: #008eff;background: transparent;}
    }
  }
  .home-list{padding: 8px 0;}
  .home-list-item{padding: 7px 10px;white-space: nowrap;line-height: 1em;box-sizing:border-box;
    &:hover{background: #f2f2f2;}
    .icon{margin-right: 10px;}
    .date-time{margin-right: 20px;}
  }
  .quick-start{flex-wrap: wrap;padding: 10px;}
  .quick-item{text-align: center;padding: 10px;max-width: 100px;}
  .quick-icon{padding: 15px;background: orange;display: inline-block;border-radius: 12px;
    .icon{font-size: 40px;color: #fff;}
  }
  .quick-label{padding: 5px 0;}
}
</style>
