<template>
<div class="page-product-add abs scroll-y">
  <div class="form-content">
    <div class="title b f-18">{{form.id ? '编辑' : '新增'}}成品</div>
    <div class="flex-v-center">
      <input-box v-model="form.name" class="flex-item mr-10" label="成品名称"></input-box>
      <input-box v-model="form.productNo" class="flex-item mr-10" label="成品编号（全局唯一）"></input-box>
    </div>
    <div class="flex-v-center">
      <input-box v-model="form.fitComponent" class="flex-item mr-10" label="适配组件"></input-box>
      <input-box v-model="form.specifications" class="flex-item mr-10" label="成品规格（如：DN65，DN80）"></input-box>
    </div>
    <div class="flex-v-center">
      <input-box v-model="form.remark" class="flex-item mr-10" multi-line label="备注"></input-box>
    </div>
    <div class="flex-v-center" style="margin: 20px 0;">
      <btn big class="mr-20" @click="submit" :disabled="!canSubmit">提交</btn>
      <btn big flat bg class="mr-20" @click="cancel">取消</btn>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'page-product-add',
  data () {
    return {
      form: {
        id: '',
        name: '',
        productNo: '',
        specifications: '',
        fitComponent: '',
        remark: ''
      }
    }
  },
  computed: {
    canSubmit () {
      const { form } = this
      return form.name && form.productNo
    }
  },
  created () {
    let { id } = this.$route.query
    if (id !== undefined && this.$route.name === 'storeproduct-edit') this.getInfo(id)
  },
  methods: {
    getInfo (id) {
      this.$http.get(`/haolifa/product/getInfo/${id}`).then(res => {
        for (let key in this.form) {
          if (this.form[key] !== undefined) this.form[key] = res[key]
        }
        console.dir(res)
      }).catch(e => {
        this.$toast(e.msg || e.message)
      })
    },
    cancel () {
      this.$confirm({
        title: '您确定要离开此页面吗？',
        text: '您的表单将不会保存',
        color: 'red',
        btns: ['取消', '离开'],
        yes: () => {
          this.$router.back()
        }
      })
    },
    submit () {
      const { form } = this
      this.loading = true
      const method = form.id ? 'put' : 'post'
      this.$http[method](`/haolifa/product/${form.id ? 'update' : 'save'}`, form).then(res => {
        this.loading = false
        this.$router.replace('/product')
      }).catch(e => {
        this.loading = false
        this.$toast(e.msg || e.message)
      })
    }
  }
}
</script>

<style lang="less">
.page-product-add{
  padding: 30px 20px;
  .title{margin-bottom: 20px;}
}
</style>
