import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        isDisable: false,
        info: {
            firstForm: {
                fullName: "",
                date: "",
                city: "",
                poisition: [],
                description: "",
                image: ""
            },
            companyList: [
                {
                    id: 1,
                    company: "",
                    poisition: "",
                    start_date: "",
                    end_date: "",
                    description: "",
                },
            ],
            thirdForm: {
                description: "",
                salary: "",
            }
        }
    },
    getters: {
        isDisable: state => state.isDisable,
        firstForm: state => state.info.firstForm,
        companyList: state => state.info.companyList,
        thirdForm: state => state.info.thirdForm,
        info: state => state.info,
    },
    mutations: {
        SET_DISABLE(state, disable) {
            state.isDisable = disable;
        },
        SET_FIRST_FORM(state, firstForm) {
            state.info.firstForm = firstForm;
        },
        SET_SECOND_FORM(state, companyList) {
            state.info.companyList = companyList;
        },
        SET_THIRD_FORM(state, thirdForm) {
            state.info.thirdForm = thirdForm;
        },
    }
})