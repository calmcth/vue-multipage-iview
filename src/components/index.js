import {xfdLabel} from './label';
import {xfdModal} from './modal';
import {xfdPageTable} from './pageTable';
const iview={
    xfdLabel,
    xfdModal,
    xfdPageTable
};

const install=function (Vue) {
  Object.keys(iview).forEach((key)=>{
      Vue.component(key,iview[key]);
  });
};

if(typeof window !=='undefined' && window.Vue){
    install(window.Vue);
}

export default install;
