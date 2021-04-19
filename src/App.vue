<template>
  <v-app>
        <v-main>
          <Doctors/>
    </v-main>
  </v-app>
</template>

<script>
  import Doctors from './components/eastdoc/Doctors/Doctors'
export default {
  name: 'App',

  components: {
    Doctors,
  },

  data: () => ({
    //
  }),
};
</script>
