/*
 
  使用方法
 <div class="wrap-banner" >
    <ul class="banner-list" id="slider">
      <li>
        <img src="./img/b1.png"> 
      </li>
      <li>
        <img src="./img/b1.png"> 
        
      </li>
      <li>
        <img src="./img/b1.png"> 
      </li>
      <li>
        <img src="./img/b1.png"> 
      </li>
    </ul>
  </div>

  <script>createSlider('#slider'); //选择要轮播的元素,返回此元素的dom节点</script> 

*/


//polyfill
if(!DOMTokenList.prototype.replace){

  console.log('DOMTokenList.prototype','兼容');

  DOMTokenList.prototype.replace=function(class1,class2){
    this.remove(class1);
    this.add(class2)
  }
}



function createSlider(selector){

  //确定 #slider  对象
	var silder=document.querySelector(selector);
	  
	silder.itemIndex=0; //显示项的下标
	silder.interval=0; //循环定时器的code
	silder.timeout=0; //延时定时器的code
	silder.pointList=null; //DOM 

  	/**
   	* 创建点列表的DOM
   	* @param  {number} length 子节点的数量
   	* @return {DOM}        创建的点列表DOM
   	*/ 
    function createPointList(length,sliderDOM){

        if( isNaN(length)){
          console.error('length is NaN');
          return
        }

        var pointList=document.createElement('div');
        pointList.classList.add('point-list');


        for(var i=0;i<length;i++){
            pointList.innerHTML+=i==0? '<div class="showPoint"></div>':'<div class="hidePoint"></div>'
        }


        pointList.showIndex=function(index){

          this.querySelector('.showPoint').classList.replace('showPoint','hidePoint');
          this.children[index].classList.replace('hidePoint','showPoint');

        }


        //点列表添加点击事件
        pointList.addEventListener('click',function(e){ 
            
            var children=this.children;

            for(var i=0;i<children.length;i++){
              if(children[i]===e.target){
                break;
              }
            }

            if(i==children.length){
              return
            }


            sliderDOM.stopSlider().showIndex(i).runSlider();
            this.showIndex(i);

            //console.log(i);

        })


        return pointList;

    }//createPointList end





    /**
     * 初始化
     * @return {DOM} this 
     */
    silder.init=function(){

        var children= this.children; //子标签列表
        var length=children.length;  //子标签长度
        var parent=this.parentNode;  //父标签
        var self=this; //自己


        if(!length){
          return 
        }

        if(self.hasInit){
          return 
        }

        parent.style.position="relative"

        //添加左右按钮
        var leftButton=document.createElement('div');
        var rightButton=document.createElement('div');

        leftButton.classList.add('slider-left');
        rightButton.classList.add('slider-right');

        leftButton.addEventListener('click',function(){

            self.stopSlider().preShow().runSlider();
            
        });

        rightButton.addEventListener('click',function(){

            self.stopSlider().nextShow().runSlider();
        });


        parent.appendChild(leftButton);
        parent.appendChild(rightButton);
        //添加左右按钮
        
           
        self.pointList=createPointList(length,self); //调用createPointList 添加点列表
        parent.appendChild(self.pointList);


        for(var i=0;i<length;i++){ //图片项添加样式

          i===0?children[i].classList.add('showItem'):children[i].classList.add('hideItem');
            
        }

        self.hasInit=true;

        return self

    }//silder.init end

      

    /**
   	* 对指定下标的项进行显示
   	* @param  {number} index  下标
   	* @return {DOM} this 
   	* 
   	*/
    silder.showIndex=function (index){ 

        if(isNaN(index) || index>=this.children.length ){
          return 
        }

        this.itemIndex=index;
   
        this.querySelector('.showItem').classList.replace('showItem','hideItem'); //隐藏 .showItem

        this.children[index].classList.replace('hideItem','showItem'); //显示 指定index的子标签 

        return this;
       
    }


    /**
     * 显示下一个
     * @return {DOM} this 
     */
    silder.nextShow=function(){ 

 
        this.children[this.itemIndex].classList.replace('showItem','hideItem'); //隐藏 当前项

        this.itemIndex++
        this.itemIndex%=this.children.length;
        
        this.children[this.itemIndex].classList.replace('hideItem','showItem'); //显示下一项

        this.pointList.showIndex(this.itemIndex);   //对应的点变亮

        return this;

    }




    /**
     * 显示上一个
     * @return {DOM} this 
     */
    silder.preShow=function(){

        this.children[this.itemIndex].classList.replace('showItem','hideItem'); //显示下一项

        this.itemIndex===0? (this.itemIndex=this.children.length-1) : this.itemIndex--;

        this.children[this.itemIndex].classList.replace('hideItem','showItem'); //显示下一项

        this.pointList.showIndex(this.itemIndex);  //对应的点变亮

        return this;
    }

    /**
     * 幻灯片暂停
     * @return {DOM} this 
     */
    silder.stopSlider=function(){

        clearInterval(this.interval);
        clearTimeout(this.timeout);

        return this;
    }


    /**
     * 幻灯片开始
     * @return {DOM} this 
     */
    silder.runSlider=function(){

        var self=this;

        self.timeout=setTimeout(function(){


          self.interval=setInterval(function(){

            self.preShow();

          },5000)

        },5000);

        return self

    }


    silder.init().runSlider();


    return silder


}





//加样式<style>
(function(){

      
      var styleEl=document.createElement('style');

      styleEl.innerText=".showItem {z-index:10;opacity:1} .hideItem {opacity:0;}";  
      styleEl.innerText+='.hidePoint {opacity:0.3;} .showPoint {opacity:1;}'    //点列表样式

      //左右按钮
     styleEl.innerHTML+=`.slider-left {
          left: 2%;
      }
      .slider-right {
          right: 2%;
      }
      .slider-left, .slider-right {
          position: absolute;
          top: 50%;
          z-index: 20;
          width: 5em;
          height: 5em;
          transform: translateY(-50%);
          display: flex;
          justify-content: center;
          align-items: center;
          color:inherit;
          cursor: pointer;
          opacity: 0.3;
          transition: opacity 0.3s;
      }
      .slider-left:before, .slider-right:before {
          content: ' ';
          display: block;
          transform: rotate(45deg);
          width: 3em;
          height: 3em;
          border-color: currentColor;
          border-style: solid;
          border-width: 0;
      }
      .slider-left:before {
          border-bottom-width: 4px;
          border-left-width: 4px;
      }
      .slider-right:before {
          border-right-width: 4px;
          border-top-width: 4px;
      }
      .slider-left:hover, .slider-right:hover {
          opacity: 1;
      }`;

      //点列表样式
      styleEl.innerText+=`.point-list {
          position: absolute;
          left: 50%;
          bottom: 5%;
          z-index: 20;
          transform: translateX(-50%);
          height: 30px;
          display: flex;
          justify-content: center;
      }
      .point-list > * {
          color:inherit;
          cursor: pointer;
          width: 3em;
          border-bottom: currentColor 3px solid;
          margin: 0 10px;
      }
      .hidePoint {
          opacity: 0.3;
      }
      .showPoint{
        opacity: 1;
      }`


      document.head.append(styleEl);

})()