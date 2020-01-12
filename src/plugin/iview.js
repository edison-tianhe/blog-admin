import Vue from 'vue'
import mavonEditor from 'mavon-editor'

import '@/assets/style/base.less'
import 'mavon-editor/dist/css/index.css'

import { Button, Switch, Icon, Form, FormItem, Input, Message, Layout,
  Menu, MenuItem, Sider, Submenu, Breadcrumb, BreadcrumbItem, Modal, Table,
  RadioGroup, Radio, Upload, Avatar, Poptip, Card, Row, Col, InputNumber,
  Select, Option } from 'view-design'

Vue.use(mavonEditor)

Vue.component('Button', Button)
Vue.component('i-switch', Switch)
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
Vue.component('Table', Table)
Vue.component('Modal', Modal)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('Upload', Upload)
Vue.component('Avatar', Avatar)
Vue.component('Poptip', Poptip)
Vue.component('Card', Card)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('InputNumber', InputNumber)
Vue.component('Select', Select)
Vue.component('Option', Option)

Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
