import axios from 'axios'

export default {
  namespaced:true,
  mutations: {
    SET_CURRENT_DOCTOR_ID(state, val) {

      state.currentDoctorId = val;
      //this.GET_DOCTOR_SETTINGS_AJAX();
      //console.log(state);
    },
    FILL_DOCTOR_SETTINGS_DATA(state, doctor) {

      state.doctorSettings = doctor.data[0];
      console.log(state);
      },
    SET_DOCTORS_DATA_DETAIL(state, doctors_data_detail ={}) {
      state.doctors = doctors_data_detail ;
      },
    SET_DOCTORS_SORTING(state, doctors) {
      console.log(doctors);
      if(!Array.isArray(doctors)){console.log('необходимо передать массив докторов');}

      state.doctors_sort = doctors;
    },
  },
  actions:{

    async GET_DOCTORS_SORTING_AJAX(state){
      let qdata = {
        action:  'doctors/get_sorting',
        cors_key : '8cbd6a0c2e767862b02887a446bb34ca',
        };



      axios
          .post(state.state.url, qdata)
          .then(response => {
            this.info = response;


            this.commit('Doctors/SET_DOCTORS_SORTING', response.data.data);
            //
          }).catch(error => console.log(error));
    },
    async GET_DOCTORS_DETAIL_AJAX(state){
      let qdata = {
        action:  'doctors/get',
        cors_key : '8cbd6a0c2e767862b02887a446bb34ca',
        doc__off:0,
      };

      axios

          .post(state.state.url, qdata)
          .then(response => {
            // this.info = response;
            // console.log('response');
            // console.log(response.data.data);
            this.commit('Doctors/SET_DOCTORS_DATA_DETAIL', response.data.data);
          });
    },
    async SAVE_DOCTOR_SETTINGS_AJAX({getters, state}){
console.log(state);
      let qdata = {
        ...state.doctorSettings,
        action:'doctors/set',
        cors_key:'8cbd6a0c2e767862b02887a446bb34ca',
        id:getters.currentDoctorId};
      axios

          .post(state.state.url, qdata)
          .then(response => {this.info = response

            //this.commit('doctorSettings/FILL_DOCTOR_SETTINGS_DATA', response.data);
          });
    },




    async getDoctorsAjax2(){
      const res = await fetch('https://gorest.co.in/public-api/users');
      //console.log(res);
      const initialData = await res.json();


      this.commit('Doctors/initialData', initialData);


      //this.commit('Shops/initialData', initialData);
//ctx.commit('setPF', JSON.parse(prods));
    }
  },
  state: {
    doctorSettings:
      {id:0,
        email: 0,
        name: 0,
        gender: 0}
    ,
    doctors_sort:[],
    doctors:[
        { "doc__id": "2",
            "doc__iid": "10000007",
            "doc__surname": "Абраменко",
            "doc__name": "Валентина",
            "doc__middlename": "Николаевна",
            "doc__fullname": "Абраменко Валентина Николаевна",
            "doc__photo": "null",
            "doc__iservice_ids": "10001329,10001007,10001008,10001317",
            "doc__holiday": "0",
            "doc__rating": "0",
            "doc__comments": "0",
            "doc__show_comments": "1",
            "doc__child": "0",
            "doc__pregnant": "1",
            "doc__diseases": "null",
            "doc__experience": "1984",
            "doc__show_experience": "1",
            "doc__telemedicine": "1",
            "doc__training": "null",
            "doc__off": "0"
        }
    ],
    currentDoctorId:1,
    arrChildAge:[

      {value:'17', text:'с детьми от 5 лет'},
      {value:'18', text:'с детьми от 6 лет'},


    ],
      url: (window.location.hostname === 'localhost') ? 'http://dev.eastclinic.local/assets/components/eastclinic/eastdoc/connector.php'
          :  '/assets/components/eastclinic/eastdoc/connector.php',
      //url:(window.location.host === 'localhost:8080') ? 'dev.eastclinic.local' : window.location.host,
  },
  getters: {
    getDoctors: state => {        return state.doctors;      },
    getDoctorData: state => id => {
      let id_doc = id*1;
      return state.doctors.filter( doc => { return  doc.doc__iid*1 === id_doc;    })[0];
          //return state.doctors;
      },
    getArrChildAges: state => {        return state.arrChildAge;      },
    //todo разобраться почему currentDoctorId is not a function
    currentDoctorId: state => {        return state.currentDoctorId;      },
    sortingDoctors: state => {        return state.doctors_sort ;      },
    tagsSelected: state => type =>  {
     // console.log(type);

      if(state.doctorSettings['bind'] && state.doctorSettings['bind'][type]){
       // console.log('Обновляем tagsSelected');
        return state.doctorSettings['bind'][type] ;
      }else{
        return[];
      }
          },
  },








}
