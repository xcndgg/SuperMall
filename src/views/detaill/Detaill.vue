<template>
  <div id="detail">
    <detaill-bar class="detail-nav"></detaill-bar>
    <scroll class="content" ref="scroll">
      <detaill-swiper :top-images="topImages"></detaill-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detaill-shop-info :shop="shop"></detaill-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imgLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detaill-common :common-info="commonInfo"></detaill-common>
    </scroll>
  </div>
</template>

<script>
import DetaillBar from "@/views/detaill/ChildrenDetaill/DetaillBar";
import DetaillSwiper from "@/views/detaill/ChildrenDetaill/DetaillSwiper";
import DetailBaseInfo from "@/views/detaill/ChildrenDetaill/DetailBaseInfo";
import DetaillShopInfo from "@/views/detaill/ChildrenDetaill/DetaillShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailGoodsInfo from "@/views/detaill/ChildrenDetaill/DetailGoodsInfo";
import DetailParamInfo from "@/views/detaill/ChildrenDetaill/DetailParamInfo";
import DetaillCommon from "@/views/detaill/ChildrenDetaill/DetaillCommon";
import {getDetaillMultidata} from "@/network/detaill";
import {Goods,Shop,GoodsParam} from "@/network/detaill";

export default {
  name: "Detaill",
  components:{
    DetaillCommon,
    DetailParamInfo,
    DetaillShopInfo,
    DetaillBar,
    DetaillSwiper,
    DetailBaseInfo,
    Scroll,
    DetailGoodsInfo,
    GoodsParam
  },
  data(){
    return{
      id:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commonInfo:{},
    }
  },
  created() {
    this.id = this.$route.params.iid
    getDetaillMultidata(this.id).then(res => {
      // 1.获取顶部的图片轮播数据
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages

      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
      console.log(this.shop);
      this.detailInfo = data.detailInfo;
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      if(data.rata.cRate !==0){
        this.commonInfo = data.rate.list;
        console.log(this.commonInfo);
      }
    })
  },
  methods:{
    imgLoad(){
      this.$refs.scroll.scroll.refresh;
    }
  }
  }

</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height:1000vh;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
  </style>