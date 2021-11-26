
<script lang="ts">
import TabViewer from 'src/components/TabViewer.vue'
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name:'DatePicker',
  components:{ TabViewer },
  setup () {
    const today = new Date();    
    const UserDate = today.getFullYear().toString()+'/'+(today.getMonth()+1).toString()+'/'+today.getDate().toString();
    return {
        date: ref(UserDate),
      }
  },
})
</script>
<template>
  <div class="q-pa-md">
  <div class="q-pa-md" style="max-width: 300px">
    <q-input filled v-model="date" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
    <TabViewer :key="date" :date="date"/>
  </div>
</template>