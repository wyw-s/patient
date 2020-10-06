import Vue from 'vue'
import {
  Container,
  Aside,
  Header,
  Main,
  Menu,
  MenuItem,
  Tag,
  Card,
  Table,
  TableColumn,
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  Icon,
  Pagination,
  Tabs,
  TabPane,
  Loading,
  PageHeader,
  MessageBox,
  DatePicker,
  Select,
  Option
} from 'element-ui'

Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Tag)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(PageHeader)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading.directive)

Vue.prototype.$confirm = MessageBox.confirm
