<template>
    <v-row>
        <v-col cols="12"
               sm="12"
               md="12">
            <div v-for="(doctors,id_clinic)  in sortingDoctors" :key="id_clinic">

                <div v-for="(key, id_doctor)  in doctors" :key="id_doctor">{{id_doctor}}

                    <DoctorCard :doctorData="getDoctorData(id_doctor)" :d2="{id:2, name:'name'}"/>


                <div style="display: none">{{key}}</div>
                </div>
===============================

                </div>
        </v-col>
        <v-col cols="12"
               sm="12"
               md="12">
        </v-col>
    </v-row>
</template>

<script>
    import { mapGetters , mapMutations , mapState} from "vuex";
    import DoctorCard from "../DoctorCard/DoctorCard";
    export default {


        name: 'Doctors',

        props: {
            idDoctor:{
                type: Number,
                default: 2,
            }
        },
        components: {
            DoctorCard,

        },
        data: () => ({
            valid2: true,
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Имя не должно быть более 10 символов',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
            ],
            checkbox: false,
        }),

        methods: {
            validate () {
                this.$refs.form.validate()
            },
            reset () {
                this.$refs.form.reset()
            },
            SET_TAGS (e, name) {
                //console.log(e);
               //console.log(name);
                this.$store.commit('Doctors/SET_DOCTOR_TAGS', {name:name, data:e});
               // this.$refs.form.resetValidation()
            },
            getDoctorData(id){
                //console.log(this.$store.getters["Doctors/getDoctorData"](id));
                return this.$store.getters["Doctors/getDoctorData"](id);
            },
            tags(t){
                //console.log(t);
                return this.$store.getters["Doctors/tagsSelected"](t);
                //
                //return this.getChildAges();
                //return this.$store.getters["doctorSettings/tagsSelected"];
            },

        },
        created(){
            //console.log('created');
            this.$store.dispatch('Doctors/GET_DOCTORS_SORTING_AJAX', {limit:10});
            this.$store.dispatch('Doctors/GET_DOCTORS_DETAIL_AJAX');

        },

        computed:{
            //====================================================================
            ...mapGetters({
                getDoctors:'Doctors/getDoctors'
                ,getChildAges:'Doctors/getArrChildAges'
                //,currentDoctorId:'doctorSettings/currentDoctorId'
                ,tagsSelected:'Doctors/tagsSelected'
            }),

            ...mapState({currentDoctorId:'Doctors/currentDoctorId'}),
            //====================================================================
            ...mapMutations({SET_CURRENT_DOCTOR_ID:'Doctors/SET_CURRENT_DOCTOR_ID'
                //,currentDoctorId:'doctorSettings/getDoctors'
            }),
            //====================================================================

            currentDoctorId:{
                get(){        //console.log(this);
                    //todo разобраться с mapGetters и mapState
                    //return this.currentDoctorId;
                    return this.$store.getters["Doctors/currentDoctorId"];
                },
                set(val){
                    //this.SET_CURRENT_DOCTOR_ID(val);
                    this.$store.commit('Doctors/SET_CURRENT_DOCTOR_ID', val);
                    this.$store.dispatch('Doctors/GET_DOCTOR_AJAX');
                },
            },
            doctorSettings:{
                get(){        //console.log(this);
                    return this.$store.getters["Doctors/doctorSettings"];
                },
                set(val){

                    console.log(val);
                    //this.SET_CURRENT_DOCTOR_ID(val);
                    //this.$store.commit('doctorSettings/SET_CURRENT_DOCTOR_ID', val);
                    //this.$store.dispatch('doctorSettings/GET_DOCTOR_SETTINGS_AJAX');
                },
            },

            sortingDoctors:{
                get(){        //console.log(this);
                    return this.$store.getters["Doctors/sortingDoctors"];
                },
                set(val){

                    console.log(val);
                    //this.SET_CURRENT_DOCTOR_ID(val);
                    //this.$store.commit('doctorSettings/SET_CURRENT_DOCTOR_ID', val);
                    //this.$store.dispatch('doctorSettings/GET_DOCTOR_SETTINGS_AJAX');
                },
            },
            listDoctors(){                return this.getDoctors;                },
            listChildAges(){                return this.getChildAges;                }

        }


    }
</script>

<style scoped>

</style>
