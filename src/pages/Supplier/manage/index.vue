<template>
<div class="page-supplier-manage flex-col">
  <div class="flex-v-center tool-bar">
    <div class="flex-v-center search-bar" style="margin-right: 20px;">
      <i class="icon f-20 c-8">search</i>
      <input type="text" class="flex-item" placeholder="供应商名称" style="width: 200px;">
    </div>
    <div class="flex-item"></div>
    <router-link to="/supplier/add">
      <btn class="b" flat color="#008eff">新增供应商</btn>
    </router-link>
  </div>
  <div class="flex-item scroll-y">
    <data-list ref="list" method="post" url="/haolifa/supplier/list">
      <tr slot="header">
        <th style="width: 60px;">序号</th>
        <th>企业名称</th>
        <th>编号</th>
        <th>网址</th>
        <th>企业性质</th>
        <th>法人</th>
        <th>电话</th>
        <th class="t-right" style="width: 80px;">操作</th>
      </tr>
      <template slot="item" slot-scope="{ item, index }">
        <td>{{index}}</td>
        <td>
          <router-link class="c-4" :to="'/supplier/'+item.id">{{item.suppilerName}}</router-link>
        </td>
        <td>{{item.suppilerNo}}</td>
        <td>{{item.website}}</td>
        <td>{{natureList[item.nature]}}</td>
        <td>{{item.legalPerson}}</td>
        <td>{{item.phone}}</td>
        <td class="t-right">
          <icon-btn small @click="edit(item)">edit</icon-btn>
          <icon-btn small @click="remove(item)">delete</icon-btn>
        </td>
      </template>
    </data-list>
  </div>
</div>
</template>

<script>
import DataList from '@/components/datalist'
// import obj2FormData from '@/utils/obj2FormData'
export default {
  name: 'page-supplier-manage',
  components: { DataList },
  data () {
    return {
      natureList: ['国有', '三资', '集体', '联营', '私营']
    }
  },
  methods: {
    edit (item) {
      this.$router.push(`/supplier/edit?id=${item.id}`)
    },
    remove (item) {
      this.$confirm({
        title: '删除确认',
        text: `您确定要删除以下供应商吗？<br><b>${item.suppilerName}</b>`,
        color: 'red',
        btns: ['取消', '删除'],
        yes: () => {
          this.$http.get(`/haolifa/supplier/delete?id=${item.id}`).then(res => {
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
.page-supplier-manage{
  height: 100%;
}
</style>
