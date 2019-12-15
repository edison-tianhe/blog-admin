import Vue from 'vue'

import 'view-design/dist/styles/iview.css'
import { Button, Icon, Form, FormItem, Input, Message } from 'view-design'

Vue.component('Button', Button)
Vue.component('Icon', Icon)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)

Vue.prototype.$Message = Message
