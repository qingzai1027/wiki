```html
 <div  			
		v-bind:class="[ isRed ? 'activeRed' : '' , isGreen ? 'activeGreen': '']"
		style="width: 50px; height: 50px; background-color: aquamarine;">
			hi vue 
		</div>
```

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script type="text/javascript" charset="UTF-8" src="vue.js">
			
		</script>
	</head>
	
	<!--
	v-bind class 对象形式
	v-bind:class="{activeRed:isRed,activeGreen:isGreen}" 
	v-bind class 数组形式1 2 3
	v-bind:class='["activeRed","activeGreen"]'
	v-bind:class="[ isRed ? 'activeRed' : '' , isGreen ? 'activeGreen': '']"
	v-bind:class='[ isRed ? "activeRed" :"" , isGreen ? "activeGreen": ""]'
	
	-->
	<body>
		<div id="app">
			{{ a }}		
			<div 
			class="commClass"
			
			v-bind:class="[ isRed ? 'activeRed' : '' , isGreen ? 'activeGreen': '']"
			style="width: 50px; height: 50px; background-color: aquamarine;">
				hi vue 
			</div>
			<div :style="{ color: styColorRed, fontSize: stySize }">
				 hi i am style 
			</div>
		</div>
		
		<script type="text/javascript">
			var vmdata={
				a:1,
				isRed: true ,
				isGreen: true,
				styColorRed: '#FF0000',
				stySize: '50px',
				
			};
				
			var vm=new Vue({
				el: '#app',
				data:vmdata
			})
		</script>
		<style>
			.commClass{ font-weight: 900;}
			.activeRed{ color: #FF0000;}
			.activeGreenBack{ background-color: green;}
		</style>
		
	</body>
</html>
```















