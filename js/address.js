/**
 * Created by suyu on 2017/6/19.
 */
var vue = new Vue({
    el:".address",
    data:{
        addressList:[],
        limitNum:3,
        currentIndex:0,
        delItem:null,
        shippingMethod:1
    },

    //生命周期函数
    mounted:function(){
        var that = this;
        this.$nextTick(function(){
            that.getCartData();
        })
    },

    //实时计算
    computed:{
        filterAddress:function(){
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{
        getCartData:function(){
            var that = this;
            this.$http.get("data/address.json").then(res => {
                that.addressList = res.data.result;
                //console.log(that.addressList);
            })
        },

        //点击more显示更多地址
        loadMore:function(){
            this.limitNum = this.addressList.length;
        },

        //设为默认地址
        setDefault:function(addressId){
            this.addressList.forEach(function(address,index){
                if(address.addressId==addressId){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            })
        },

        //删除地址
        delAddress:function(){
            var addr=this.delItem;
            var index=this.addressList.indexOf(addr);
            this.addressList.splice(index,1);
        },
    }
})
