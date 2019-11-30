import wepy from 'wepy'
export default class extends wepy.mixin {
    data = {
      //轮播图数组
        swiperList: [],
        // 分类列表数组
        cateItems:[],
        floorData:[]
    }
    onLoad() {
        this.getSwiperData();
        this.getCateItems();
        this.getFloorList();
    }
    async getSwiperData() {
        // 通过get请求，向服务器请求轮播图数据
        const { data: res } = await wepy.get('/home/swiperdata')
        console.log(res)
        // 判断请求是否成功
        if (res.meta.status !== 200) {
            console.log('轮播图请求失败')
            wepy.basicToast()
            return 
        }
        this.swiperList = res.message
        console.log(this.swiperList)
    }
    // 请求分类列表数据
    async getCateItems(){
      const {data:res} = await wepy.get('/home/catitems')
      console.log(res)
      if(res.meta.status !== 200){
        wepy.basicToast()
        return 
      }
      this.cateItems = res.message
      console.log(this.cateItems)
    }
    async getFloorList(){
        const {data:res} = await wepy.get('/home/floordata')
        console.log(res)
        this.floorData = res.message
        console.log(this.floorData)
    }
    methods = {
      goto:url =>wepy.navigateTo({url})
    }
}