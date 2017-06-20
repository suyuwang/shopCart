/**
 * Created by matrix on 2017/6/14.
 */
var vue = new Vue({
    el: "#app",
    data: {
        productList: [],
        maskShow:false,
        checkFlag:false,
        delItem:null,
        totalMoney:0
    },
    mounted: function () {
        var that = this;
        this.$nextTick(function () {
            that.getCartData();
        })
    },
    //添加过滤器
    filters:{
    	filterMoney(item){
    		return '¥ '+ item.toFixed(2) +' 元';
    	}
    },
    methods: {
        getCartData: function () {
            var that = this;
            this.$http.get("data/cartData.json").then(res => {
                that.productList = res.data.result.list;
        })
},

//        遮罩显示
        delStatus:function(item){
            this.maskShow = true;
            this.delItem=item;
        },

//        删除
        delProduct:function(){
            var item=this.delItem;
            var index=this.productList.indexOf(item);
            this.productList.splice(index,1);
            this.maskShow = false;
        },

//        遮罩隐藏
        cancleMask:function(){
            this.maskShow = false;
        },

//        点击加减改变数量
        changeProductNum:function(item,num){
            if(num>=1){
              item.productQuantity++;
            }else{
              item.productQuantity--;
              if(item.productQuantity<=1){
                  item.productQuantity=1;
              }
            }
            this.calcPrice();
        },

//        单选
        checkProduct:function(item){
            if(typeof item.checked=="undefined"){
                vue.$set(item,'checked',true);
            }else{
                item.checked=!item.checked;
            }
            this.calcPrice();
        },

//        全选
        checkAll:function(flag){
            var that=this;
            that.checkFlag=flag;
            that.productList.forEach(function(item,index){
                if(typeof item.checked=="undefined"){
                    vue.$set(item,'checked',flag);
                }else{
                    item.checked=flag;
                }
            }),
            this.calcPrice();
        },

//        计算总价
        calcPrice:function(){
            var that=this;
            that.totalMoney=0;  //取消选择时，总价清空
            that.productList.forEach(function(item,index){
                if(item.checked){
                    that.totalMoney += item.productQuantity*item.productPrice;
                }

            })
        }
}
})
