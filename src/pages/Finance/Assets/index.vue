<template>
<div class="page-assets">
  <div class="flex-v-center tool-bar">
    <div class="flex-item"></div>
    <btn class="b" flat color="#008eff" @click="layer=true">添加设备</btn>
  </div>
  <div class="flex-item scroll-y">
    <data-list class="f-14" :param="param" ref="list" method="post" url="/haolifa/equipment/getList">
      <tr slot="header">
        <th style="width: 60px;">序号</th>
        <th>设备名称</th>
        <th>设备编号</th>
        <th>数量</th>
        <th>设备状态</th>
        <th>生产厂家</th>
        <th>服役年限</th>
        <th class="t-right" style="width: 80px;">操作</th>
      </tr>
      <template slot="item" slot-scope="{ item, index }">
        <td>{{index}}</td>
        <td>{{item.name}}</td>
        <td>{{item.equipmentNo}}</td>
        <td>{{item.number}}</td>
        <td>{{allStatus[item.equipmentStatus].text}}</td>
        <td>{{item.productFactory}}</td>
        <td>{{item.serviceYears}}</td>
        <td class="t-right">
          <icon-btn small @click="edit(item)">edit</icon-btn>
          <icon-btn small @click="remove(item)">delete</icon-btn>
        </td>
      </template>
    </data-list>
  </div>
  <layer v-if="layer" :title="form.id ? '编辑发票' : '新增发票'" width="450px">
    <div class="layer-text" style="padding-bottom: 50px;">
      <input-box v-model="form.name" label="设备名称" hint="必填"></input-box>
      <input-box v-model="form.equipmentNo" label="设备编号"></input-box>
      <div class="flex">
        <input-box class="flex-item mr-10" v-model="form.number" label="设备数量" hint="必填" type="number"></input-box>
        <select-box class="flex-item" :list="allStatus" v-model="form.equipmentStatus" hint="必填" label="设备状态"></select-box>
      </div>
      <input-box type="number" v-model="form.productFactory" label="生产厂家"></input-box>
      <input-box type="text" v-model="form.serviceYears" label="服役年限"/>
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
  name: 'page-assets',
  components: { DataList },
  data () {
    return {
      layer: false,
      param: {type: 2},
      allStatus: [
        { value: 0, text: '正常' },
        { value: 1, text: '损坏待处理' },
        { value: 2, text: '处理中' },
        { value: 3, text: '处理完成' }
      ],
      form: {
        id: '',
        name: '',
        number: '',
        equipmentNo: '',
        equipmentStatus: 0,
        productFactory: '',
        serviceYears: ''
      }
    }
  },
  methods: {
    edit (item) {
      for (let key in this.form) this.form[key] = item[key]
      this.layer = true
    },
    vertify () {
      const { form } = this
      if (!form.name || !form.number || form.equipmentStatus === '') {
        this.$toast('请输入必填信息')
        return false
      }
      return true
    },
    submit () {
      if (!this.vertify()) return
      const { form } = this
      this.$http.post('/haolifa/equipment/' + (form.id ? 'update' : 'save'), form).then(res => {
        this.$refs.list.update()
        this.cancel()
        this.$toast('保存成功')
      }).catch(e => {
        this.$toast(e.message || e.meg)
      })
    },
    cancel () {
      this.form = {
        id: '',
        name: '',
        number: '',
        equipmentNo: '',
        equipmentStatus: 0,
        productFactory: '',
        serviceYears: ''
      }
      this.layer = false
    },
    remove (item) {
      this.$confirm({
        title: '删除确认',
        text: `您确定要删除以下设备吗？<br>
               <b>${item.name}</b><br>`,
        color: 'red',
        btns: ['取消', '删除'],
        yes: () => {
          this.$http.get(`/haolifa/equipment/delete/${item.id}`).then(res => {
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
.page-assets{
  //
}
</style>
