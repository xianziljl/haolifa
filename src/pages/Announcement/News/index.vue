<template>
<div class="page-news">
  <data-list ref="list" url="/haolifa/message/news">
    <tr slot="header">
      <th style="width: 60px;">序号</th>
      <th>标题</th>
      <th>时间</th>
      <th>内容</th>
      <th class="t-right" style="width: 80px;">操作</th>
    </tr>
    <template slot="item" slot-scope="{ item, index }">
      <td>{{index}}</td>
      <td>{{item.title || '无标题'}}</td>
      <td>{{item.content || '无内容'}}</td>
      <td>{{item.showTime}}</td>
      <td class="t-right">
        <icon-btn small @click="edit(item)">edit</icon-btn>
        <icon-btn small @click="remove(item)">delete</icon-btn>
      </td>
    </template>
  </data-list>
  <layer v-if="layer" :title="form.id ? '编辑新闻' : '新增新闻'" width="450px">
    <div class="layer-text" style="padding-bottom: 50px;">
      <input-box v-model="form.title" label="标题"></input-box>
      <date-picker v-model="form.showTime" label="显示时间"></date-picker>
      <input-box v-model="form.content" multi-line label="内容"></input-box>
    </div>
    <div class="layer-btns">
      <btn flat @click="cancel">取消</btn>
      <btn flat color="#008eff" @click="submit">保存</btn>
    </div>
  </layer>
</div>
</template>

<script>
import DataList from '@/components/datalist'

export default {
  name: 'page-news',
  components: { DataList },
  data () {
    return {
      layer: false,
      form: {
        id: '',
        title: '',
        content: ''
      }
    }
  },
  methods: {
    submit () {
      const { id, title, content, showTime } = this.form
      if (!title || !content || !showTime) {
        this.$toast('请完整填写')
        return
      }
      this.$http[(id ? 'put' : 'post')]('/haolifa/message', {
        id,
        title,
        content,
        type: 1,
        showTime: showTime + ' 00:00:00'
      }).then(res => {
        this.$refs.list.update()
      })
    },
    cancel () {
      this.layer = false
      this.form = { id: '', title: '', content: '' }
    },
    edit (item) {
      for (let key in this.form) {
        this.form[key] = item[key]
      }
      this.layer = true
    },
    remove (item) {
      this.$confirm({
        title: '删除确认',
        text: `您确定要删除以下新闻吗？<br>
               <b>${item.name || '无标题'}</b><br>
               <span class="f-12">${item.content}</span>`,
        color: 'red',
        btns: ['取消', '删除'],
        yes: () => {
          this.$http.delete(`/haolifa/message?id=${item.id}`).then(res => {
            this.$toast('删除成功')
            this.$refs.list.update()
          }).catch(e => {
            this.$toast(e.msg || e.message)
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.page-news{
  //
}
</style>
