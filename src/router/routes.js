import Mysite from '../pages/Mysite/Mysite.vue'
import Order from '../pages/Order/Order.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

export default[
	{
		path:'/mysite',
		component:Mysite,
		// 可以动态设置底部导航栏显示不显示
		meta:{
			isShowFooter:true
		}
	},
	{
		path:'/order',
		component:Order,
		meta:{
			isShowFooter:true
		}
	},
	{
		path:'/search',
		component:Search,
		meta:{
			isShowFooter:true
		}
	},
	{
		path:'/profile',
		component:Profile,
		meta:{
			isShowFooter:true
		}
	},
	{
		path: '/login',
		component: Login
	},
	{
		path:'/',
		redirect:'/mysite'
	}
]
