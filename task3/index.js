
import Vue from 'vue';

var app = new Vue({
	el: '#app',
	data: {
		newTodo:'',
		todoList:[],
		getTime:function () {
			var dt = new Date()
			var year = dt.getFullYear()
			var month = dt.getMonth()
			var date = dt.getDate()
			var hours = dt.getHours()
			var min = dt.getMinutes()
			return year+'-'+month+'-'+date+' '+hours+':'+min
		}
	},
	// created: function(){
	// 	let i = 0
	// 	setInterval(()=>{
	// 	// 	this.newTodo = i // this.newTodo 就是 data.newTodo，实际上 this.newTodo 是 data.newTodo 的代理
	// 	// i+= 1
	// 		console.log('input = ' + this.newTodo)
	// 	console.log(2)
	//  },1000)
	// }
	created: function(){
		window.onbeforeunload = ()=>{
			var dataString = JSON.stringify(this.todoList)
			window.localStorage.setItem('Todos', dataString)
			var inputString = JSON.stringify(this.newTodo)
			window.localStorage.setItem('inputData',inputString)
		}
		var stringData = window.localStorage.getItem('Todos')
		var stringInput = window.localStorage.getItem('inputData')
		if (stringData !== 'undefined'){
			var JSONData = JSON.parse(stringData)
		}
		var inputData = JSON.parse(stringInput)
		this.todoList = JSONData || []
		this.newTodo = inputData || ''
		console.log('newTodo='+this.newTodo)

	},
	// created: function(){
	// 	// onbeforeunload文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload
	// 	window.onbeforeunload = ()=>{
	// 		let dataString = JSON.stringify(this.todoList) // JSON 文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
	// 		window.localStorage.setItem('myTodos', dataString) // 看文档https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage
	// 	}
	//
	// 	let oldDataString = window.localStorage.getItem('myTodos')
	// 	let oldData = JSON.parse(oldDataString)
	// 	this.todoList = oldData || []
	//
	// },
	methods:{
		addTodo:function () {
			this.todoList.push({
				title: this.newTodo,
				createTime: this.getTime().toString(),
				done:'false'
			})
			this.newTodo = ''
		},
		removeTodo:function (todo) {
			let index = this.todoList.indexOf(todo)
			this.todoList.splice(index,1)
		}
	}
})

