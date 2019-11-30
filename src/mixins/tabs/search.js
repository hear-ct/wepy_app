import wepy from 'wepy'
const STORAGE_KEY = "KW"
export default class extends wepy.mixin{
    data = {
        value:'',
        suggestList:[],
        kwList:[],
        timer:-1
    }
    methods= {
        // 当搜索关键词发生变化时触发
        onChange(e){
            this.value = e.detail
            console.log(this.value)
            clearTimeout(this.timer);
            if(this.value.trim().length === 0){
                this.suggestList = []
                return;
            }
            this.timer = setTimeout(()=>this.getSuggestlist(this.value),1000)
            
        },
        onSearch(e){
            if(e.detail.trim().length<=0){
                return
            }
            wepy.navigateTo({
                url:'/pages/goods_list?query='+e.detail.trim()
            })
            console.log(e.detail)
        },
        goGoodsDetail(id){
            wepy.navigateTo({
                url:'/pages/goods_detail/main?goods_id='+id
            })
        },
        onCancel(){
            this.suggestList = []
        }
    }
    async getSuggestlist(value){
      const {data:res} = await wepy.get('/goods/qsearch',{query:value}) ;
      if(res.meta.status !== 200){
          wepy.basicToast();
          return
      }
      this.suggestList = res.message;
      console.log(this.suggestList)
    }
}