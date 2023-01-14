1.引入vue.js
2.编写视图区 div
3.编写脚本区 js

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script type="text/javascript" charset="UTF-8" src="vue.js" ></script>		
	</head>
	<body>
		<!-- 视图区 -->
		<div id="app">
		  {{ message }} ----{{name}}
		</div>
		
		<!-- 脚本区 
		el== element  
		
		-->
		<script type="text/javascript">
			var app = new Vue({
				el: '#app',
				data: {
					message: 'Hello Vue!',
					name : "Vue"
				}
			});
			
		</script>
	</body>
</html>
```

