<template>
<div class="page-invoice">
  <div class="flex-v-center tool-bar">
    <div class="flex-item"></div>
    <btn class="b" flat color="#008eff" @click="layer=true">添加发票</btn>
  </div>
  <div class="flex-item scroll-y">
    <data-list class="f-14" ref="list" method="post" url="/haolifa/invoice/list">
      <tr slot="header">
        <th style="width: 60px;">序号</th>
        <th>发票编号</th>
        <th>合同编号</th>
        <th>合同类型</th>
        <th>合同状态</th>
        <th>合同金额</th>
        <th class="t-right" style="width: 80px;">操作</th>
      </tr>
      <template slot="item" slot-scope="{ item, index }">
        <td>{{index}}</td>
        <td>{{item.invoiceNo}}</td>
        <td>{{item.orderNo}}</td>
        <td>{{allTypes[item.type].text}}</td>
        <td>{{allStatus[item.status].text}}</td>
        <td>￥ {{item.totalAmount}}</td>
        <td class="t-right">
          <icon-btn small @click="edit(item)">edit</icon-btn>
          <icon-btn small @click="remove(item)">delete</icon-btn>
        </td>
      </template>
    </data-list>
  </div>
  <layer v-if="layer" :title="form.id ? '编辑发票' : '新增发票'" width="450px">
    <div class="layer-text" style="padding-bottom: 50px;">
      <input-box v-model="form.invoiceNo" label="发票编号"></input-box>
      <input-box v-model="form.orderNo" label="合同编号"></input-box>
      <select-box :list="allStatus" v-model="form.status" label="合同状态"></select-box>
      <select-box :list="allTypes" v-model="form.type" label="合同类型"></select-box>
      <input-box type="number" v-model="form.totalAmount" label="合同金额"></input-box>
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
  name: 'page-invoice',
  components: { DataList },
  data () {
    return {
      allStatus: [
        {value: 0, text: '未收款'},
        {value: 1, text: '未打款'},
        {value: 2, text: '打款中'},
        {value: 3, text: '收款中'},
        {value: 4, text: '处理完成'}
      ],
      allTypes: [
        {value: 0, text: '订单合同编号'},
        {value: 1, text: '采购编号'}
      ],
      layer: false,
      form: {
        id: '',
        invoiceNo: '',
        orderNo: '',
        status: null,
        totalAmount: '',
        type: null
      }
    }
  },
  methods: {
    edit (item) {
      for (let key in this.form) this.form[key] = item[key]
      this.layer = true
    },
    vertify () {
      for (let key in this.form) {
        let item = this.form[key]
        if (!item && item !== 0 && key !== 'id') {
          this.$toast('请输入完整信息')
          return false
        }
      }
      return true
    },
    submit () {
      if (!this.vertify()) return
      const { form } = this
      this.$http.post('/haolifa/invoice/' + (form.id ? 'update' : 'save'), form).then(res => {
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
        invoiceNo: '',
        orderNo: '',
        status: null,
        totalAmount: '',
        type: null
      }
      this.layer = false
    },
    remove (item) {
      this.$confirm({
        title: '删除确认',
        text: `您确定要删除以下发票吗？<br><b>${item.invoiceNo}</b>`,
        color: 'red',
        btns: ['取消', '删除'],
        yes: () => {
          this.$http.get(`/haolifa/invoice/delete/${item.id}`).then(res => {
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
.page-invoice{
  //
}
</style>
