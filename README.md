# jssilder  
## 自己写的轮播图  
### 使用方法 如下
```
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
```
### 小提示
* 此轮播库不依赖任何其他库哦
* 真的不用，连开发也不依赖任何库，纯手工
* 轮播图的结构要像上面那样，一个爷爷，包裹着一个爸爸，再包裹他的儿子们，三代同堂必须有
* var superdom=createSlider('#slider') 函数返回一个被本人加强版过的dom 节点,简称superdom
* 默认一旦调用createSlider('#slider') 就会调用初始化 并调用runSlider() 开始轮播  

### 此superdom的api：
* superdom.topSlider() 停止轮播
* superdom.runSlider() 开始轮播
* superdom.preShow() 上一张
* superdom.nextShow() 下一张
* superdom.showIndex() 指定序号展示
* 还可指定爷爷的样式font-size 改变左右按钮大小， color 指定按钮和下面的点列表的颜色,(默认是颜色，大小是根据爷爷的font-size,和color的)
