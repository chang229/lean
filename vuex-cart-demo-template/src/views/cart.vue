<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物车</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="cartList"
      style="width: 100%"
    >
      <el-table-column
        width="55">
        <template v-slot:header>
          <el-checkbox size="mini" v-model="checkedAll">
          </el-checkbox>
        </template>
        <!--
          @change="updateProductChecked"  默认参数：更新后的值
          @change="updateProductChecked(productId, $event)"  123, 原来那个默认参数
            当你传递了自定义参数的时候，还想得到原来那个默认参数，就手动传递一个 $event
         -->
        <template v-slot="scope">
          <el-checkbox
            size="mini"
            @change="checkItem({checked:$event,id:scope.row.id,})"
            :value="scope.row.checked"
          >
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="商品">
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="count"
        label="数量">
        <template v-slot="scope">
          <el-input-number :value="scope.row.count" @change="updateCart({id:scope.row.id,count:$event})" size="mini"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="小计">
      </el-table-column>
      <el-table-column
        label="操作">
        <template>
          <el-button size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <p>已选 <span>{{ checkCount }}</span> 件商品，总价：<span>{{ checkPrice }}</span></p>
      <el-button type="danger">结算</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'Cart',
  computed:{
      ...mapState('cart',['cartList']),
      ...mapGetters('cart',['checkCount','checkPrice']),
      checkedAll:{
          get(){
              return this.cartList.every((item) => item.checked)
          },
          set(value){
              this.checkAllProd(value)
          }
      }
  },
  methods:{
      ...mapMutations('cart',['checkAllProd','checkItem','updateCart'])
  }
}
</script>

<style></style>
