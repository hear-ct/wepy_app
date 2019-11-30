import wepy from 'wepy' 

export default class extends wepy.mixin{
    data = {
        // 查询关键字
        query:'',
        // 商品分类ID
        cid:'',
        // 页码值
        pagenum:1,
        // 每页显示多少条数据
        pagesize:10,
        goodsList:[],
        total:0
    }
    onLoad(option){
        console.log(option)
        this.query = option.query ||''
        this.cid = option.cid || ''
        this.getGoodsList()
      }
    async getGoodsList(){
          const {data:res} = await wepy.get('/goods/search',{
              query:this.query,
              cid:this.cid,
              pagenum:this.pagenum,
              pagesize:this.pagesize
          })
        //   if(res.meta.sstatus !== 200){
        //       return wepy.basicToast()
        //   }
          console.log(res)
          this.goodsList = res.message.goods
          this.total = res.message.total
          this.$apply()
          console.log(this.goodsList)
          wepy.stopPullDownRefresh()
      }
      onReachBottom(){
          this.pagenum++
          this.getGoodsList()
      }
      onPullDownRefresh(){
        //   初始化必要的数据
        this.pagenum = 1,
        this.total = 0 ,
        this.goodsList = []
        this.getGoodsList()
      }
    
      methods = {
        goGoodsDetail(id){
            wepy.navigateTo({
                url: '/pages/goods_detail/main?goods_id='+id
            })
        }
      }
}