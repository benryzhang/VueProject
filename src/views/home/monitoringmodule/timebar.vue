<template>
        <div class="cc-time">{{nowTime}}</div>
</template>
<script>
export default {
        name: 'Timebar',
        components: {
            
        },
         data () {
            return {
                nowTime:''
            }
        },
        mounted() {
            this.nowTimes();
            //const { createData } = this
            this.createData();
            //setInterval(this.createData, 30000)
             //this.initMap();
        },
        
        methods: {
            timeFormate(timeStamp) {
                let year = new Date(timeStamp).getFullYear();
                let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
                let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
                let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
                let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
                let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
                const myDate = new Date()
                let week = myDate.getDay() // 星期
                let weekArr = [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ]

                
                //this.week = '星期' + '日一二三四五六'.charAt(myDate.getDay())
                this.nowTime = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm+':'+ss + ' ' + weekArr[week];
            },
            nowTimes(){
                    this.timeFormate(new Date());
                    setInterval(this.nowTimes,1000);
                    this.clear()
            },
            clear(){
                    clearInterval(this.nowTimes)
                    this.nowTimes = null;
            },
            createData () {
         
            }
            
            

        }
    }
</script>
<style lang="less">
.cc-time{line-height: 24px;font-size: 16px; font-weight:bold;color:#fff;position: absolute;left: 7%;align-items:center;}

</style>