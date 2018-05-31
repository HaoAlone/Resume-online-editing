import Vue from 'vue';
import AV from 'leancloud-storage';

//初始化
var APP_ID = 'tvi1wPjAGeGBCJNDP8BWnPRG-gzGzoHsz';
var APP_KEY = 'TSL8ebB8DKC2TMq6trJQLDJR';

AV.init({
	appId: APP_ID,
	appKey: APP_KEY
});

var app = new Vue({
	el: '#app',
	data: {
		newTodo: '',
		todoList: [],
		actionType: 'signUp',
		formData: {
			username: '',
			password: ''
		},
		currentUser: null
	},
	created: function () {
		window.onbeforeunload = ()=>{
			var dataString = JSON.stringify(this.todoList)//input输入未提交的内容
			// window.localStorage.setItem('Todos', dataString)
			var inputString = JSON.stringify(this.newTodo)
			window.localStorage.setItem('inputData', inputString)
		}
		// var stringData = window.localStorage.getItem('Todos')
		var stringInput = window.localStorage.getItem('inputData')
		// if (stringData !== 'undefined'){
		// 	var JSONData = JSON.parse(stringData)
		// }
		var inputData = JSON.parse(stringInput)
		// this.todoList = JSONData || []
		this.newTodo = inputData || ''
		this.currentUser = this.getCurrentUser()
		if (this.currentUser) {
			var query = new AV.Query('AllTodos');
			query.find()
				.then((todos) => {
				let avAllTodos = todos[0] // 因为理论上 AllTodos 只有一个，所以我们取结果的第一项
				this.todoList = JSON.parse(avAllTodos.attributes.content) // 为什么有个 attributes？因为我从控制台看到的
				this.todoList.id = avAllTodos.id // 为什么给 todoList 这个数组设置 id？因为数组也是对象啊
			}, function(error){
				console.error(error)
			})
		}
		localStorage.setItem('debug','leancloud')
		console.log('newTodo=' + this.newTodo + ';User=' + this.currentUser + 'id:'+ this.todoList.id)
	},
	methods: {
		saveTodo: function () {
			let dataString = JSON.stringify(this.todoList)
			var AVTodos = AV.Object.extend('AllTodos')//创建一个对象AllTodos存储输入的todo内容
			var avTodos = new AVTodos()//建一个实例对象
			var acl = new AV.ACL()//权限设置实例对象
			avTodos.set('content', dataString)
			//读写权限设置,只有现在登录的用户有读写权限
			acl.setReadAccess(AV.User.current(), true)
			acl.setWriteAccess(AV.User.current(), true)
			avTodos.setACL(acl)
			avTodos.save()
				.then((todo) => {
				this.todoList.id = todo.id
		},function (error) {
				console.log('保存失败')
			})
		},
		updateTodo:function () {
			let dataString = JSON.stringify(this.todoList)
			let todoUpdate = AV.object.createWithoutData('Alltodos',this.todoList.id)
			todoUpdate.set('content',dataString)
			todoUpdate.save().then(function (){
				console.log('更新成功')
			})
		},
		saveOrUpdate: function () {
			console.log(this.todoList.id)
			if (this.todoList.id) {
				this.updateTodo()
			} else {
				this.saveTodo()
			}
		},
		addTodo: function () {
			this.todoList.push({
				title: this.newTodo,
				createTime: this.getTime().toString(),
				done: 'false'
			})
			this.newTodo = ''
			this.saveOrUpdate()
			// this.saveTodo()
		},
		removeTodo: function (todo) {
			var index = this.todoList.indexOf(todo)
			this.todoList.splice(index, 1)
			this.saveOrUpdate()
		},
		signUp: function () {
			var user = new AV.User()
			user.setUsername(this.formData.username)
			user.setPassword(this.formData.password)
			user.signUp().then((loginedUser) => {
				this.currentUser = this.getCurrentUser()
		},(error)=>{
				console.log('注册失败')
			});
		},
		logIn: function () {
			AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
				this.currentUser = this.getCurrentUser()
				this.todoList.id = this.currentUser.id
			  console.log(this.currentUser)
		},function (error) {
				console.log('登录失败')
			});
		},
		logOut: function () {
			AV.User.logOut()
			this.currentUser = null
			window.location.reload()
		},
		getCurrentUser: function () {
			let current = AV.User.current()
			if (current) {
				let {id, createdAt, attributes: {username}} = AV.User.current()
				// this.todoList.id = current.id
				return {id, username, createdAt}
			} else {
				return null
			}
			
		},
		getTime: function () {
			var dt = new Date()
			var year = dt.getFullYear()
			var month = dt.getMonth() + 1
			var date = dt.getDate()
			var hours = dt.getHours()
			var min = dt.getMinutes()
			return year + '-' + month + '-' + date + ' ' + hours + ':' + min
		}
		
	}
})

