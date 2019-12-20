import Vue from 'vue'

import 'view-design/dist/styles/iview.css'
import { Button, Icon, Form, FormItem, Input, Message, Layout, Menu, MenuItem, Sider, Submenu, Breadcrumb, BreadcrumbItem, Modal } from 'view-design'

Vue.component('Button', Button)
Vue.component('Icon', Icon)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('Layout', Layout)
Vue.component('Menu', Menu)
Vue.component('MenuItem', MenuItem)
Vue.component('Sider', Sider)
Vue.component('Submenu', Submenu)
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('BreadcrumbItem', BreadcrumbItem)

Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
