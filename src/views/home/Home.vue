<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banner="banner"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <TabControl :res="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></TabControl>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isBack"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabcontrol/TabControl";
import {getHomeMultidata,getHomeGoods} from "@/network/home";
import HomeSwiper from "./homeswiper/HomeSwiper";
import RecommendView from "@/views/home/homeswiper/RecommendView";
import FeatureView from './homeswiper/FeatureView'
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";
export default {
  name: "Home",
  components:{
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return{
      banner :[],
      recommend :[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:"pop",
      isBack: false
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')


  },
  mounted() {
    let refresh =this. debunce(this.$refs.scroll.refresh,200)
    this.$bus.$on("imgLode",()=>{
     refresh()
    })
  },
  methods:{
    tabClick(type){
      switch (type){
        case 0:{
          this.currentType = 'pop';
          break;
        }
        case 1:{
          this.currentType = 'new';
          break;
        }
        case 2:{
          this.currentType = 'sell'
          break;
        }
      }
    },
    debunce(func,delay){
      let time = null
      return function (...args){
        if(time) clearTimeout(time)
        time = setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }
    },
    backTop(){
      this.$refs.scroll.scrollTo(0,0)

    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
        this.isBack = (-position.y>1000)
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page +=1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++;
      })
      }
    },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  }


}
</script>

<style scoped>
/*#home {*/
/*  padding-top: 44px;*/
/*  height: 100vh;*/
/*  position: relative;*/
/*}*/

/*.home-bar {*/
/*  background-color: var(--color-tint);*/
/*  color: #fff;*/

/*  position: fixed;*/
/*  left: 0;*/
/*  right: 0;*/
/*  top: 0;*/
/*  z-index: 9;*/
/*}*/

/*.tab-control {*/
/*  position: sticky;*/
/*  top: 44px;*/
/*  z-index: 9;*/
/*}*/
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-bar{
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/

</style>