import wepy from 'wepy'

export default class extends wepy.mixin{
    data = {
        catelist:[],
        secondCateList:[],
        active:0,
        windowHeight:0
    }

    onLoad(){
        this.getWindowHeight()
        this.getCatesList()
    }
    async getCatesList(){
        const {data:res} = await wepy.get('/categories')
        if(res.meta.status !== 200 ){
            wepy.basicToast()
            return
        }
        this.catelist = res.message
        console.log(this.catelist)
        this.$apply()
    }
    async getWindowHeight(){
        const res = await wepy.getSystemInfo();
        console.log(res)
        this.windowHeight = res.windowHeight;
        this.$apply()
        
    }
    methods={
        onChange({detail:active}){
            this.active = active
            this.secondCateList = this.catelist[active].children
            console.log(this.secondCateList)
        },
        goGoodsList(id){
            wepy.navigateTo({
                url:'/pages/goods_list?cid=' + id
            })
        }
    }
}