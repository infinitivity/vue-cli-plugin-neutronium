import Vue from 'vue'
import App from './App.vue'
import rawVm from '../data/vm'
import { install, vueInstanceOption } from './install'
import { createVM } from 'neutronium-vm-loader'

<% if (!options.useRouter) { %>const vm = createVM(rawVm);<% } %>
<% if (options.useRouter) {%>const vm = updateVM(rawVm);<% } %>

install(Vue)

<% if (options.useRouter) { %>function updateVM(raw) {
  const vm = createVM(raw);
  vm.ViewModel.Router = { BeforeResolveCommand: null };
  return vm;
}

const options = vueInstanceOption(vm, Vue);
const { router } = options;
/*eslint no-unused-vars: ["error", { "args": "none" }]*/
router.beforeEach((to, _, next) => {
  const name = to.name;
  console.log(`navigation to ${name}`)
  if (name === null) {
    next();
    return;
  }
  import(`../data/${name}/vm.cjson`)
    .then(module => {
      const newVm = updateVM(module.default);
      router.app.ViewModel.CurrentViewModel = newVm.ViewModel.CurrentViewModel;
      next();
    })
    .catch(error => {
      console.log(error);
      console.log(
        `Problem loading file: "../data/${name}/vm.cjson". Please create corresponding file to be able to . ViewModel will be set to null.`
      );
      router.app.ViewModel.CurrentViewModel = null;
      next();
    });
});<% } %>
<% if (!options.useRouter) { %> const options = vueInstanceOption(vm, Vue);<% } %>

const vueRootInstanceOption = Object.assign({}, options || {}, {
  render: h => h(App, {
    props: {
      viewModel: vm.ViewModel,
      __window__: vm.Window
    }
  }),
  data: vm
});
new Vue(vueRootInstanceOption).$mount('#main');
