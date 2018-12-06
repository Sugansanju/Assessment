<template>
<div>
  <!-- {{items}} -->
     <b-table striped hover responsive :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage">
        <template slot="testName" slot-scope="data">
        <b-link :href="'#/admin/customTest/'+data.item.testId"> {{data.item.testName}}</b-link>
        </template>
        <template slot="createdAt" slot-scope="data">
          {{data.value | moment("MMMM Do YYYY, h:mm:ss a") }}
        </template>
        <!-- <template slot="languages" slot-scope="data">
          {{data.item.languages}}
        </template> -->
      <template slot="actions" slot-scope="data">
           <b-button class="btn-sm preview btn-active" v-b-tooltip.hover title="Preview" @click="$emit('previewTest',data.item.testId)" ><i class="icon fa fa-eye px-2" aria-hidden="true"></i></b-button>
           <b-button class="btn-sm invite btn-active" v-b-tooltip.hover title="Invite"><i class="fa fa-user px-2" aria-hidden="true"></i></b-button>
           <b-button class="btn-sm report btn-active" v-b-tooltip.hover title="Report" @click="$emit('showStatus',data.item.testId)"><i class="fa fa-bar-chart px-2" aria-hidden="true"></i></b-button>
           <b-button class="btn-sm clone btn-active" v-b-tooltip.hover title="Clone" @click="$emit('cloneTest',data.item.testId)"><i class="fa fa-files-o px-2" aria-hidden="true"></i></b-button>
           <b-button class="btn-sm" variant="success" v-b-tooltip.hover title="Unarchive" v-show="data.item.archived" @click="$emit('unremoveTest',data.item.testId)"><i class="fa fa-trash px-2" aria-hidden="true"></i></b-button>
           <b-button class="btn-sm" variant="danger" v-b-tooltip.hover title="Archive" v-show="!data.item.archived" @click="$emit('removeTest',data.item.testId)"><i class="fa fa-trash px-2" aria-hidden="true"></i></b-button>
           <b-button class="btn-sm unlock btn-active" v-b-tooltip.hover title="Unlock" v-show="data.item.locked" @click="$emit('unlockTest',data.item.testId)"><i class="fa fa-unlock-alt px-2" aria-hidden="true"></i></b-button>
           <b-button class="btn-sm lock btn-active" v-b-tooltip.hover title="Lock" v-show="!data.item.locked" @click="$emit('lockTest',data.item.testId)"><i class="fa fa-lock px-2" aria-hidden="true"></i></b-button>
           <b-button class="btn-sm unlock btn-active" v-b-tooltip.hover title="unpublish" v-show="!data.item.published" @click="$emit('publishTest',data.item.testId)"><i class="fa fa-close px-2" aria-hidden="true"></i></b-button>
           <b-button class="btn-sm  lock btn-active" v-b-tooltip.hover title="publish" v-show="data.item.published" @click="$emit('unpublishTest',data.item.testId)"><i class="fa fa-paper-plane px-2" aria-hidden="true"></i></b-button>
      </template>
     </b-table>
    <b-pagination align="center" size="lg" :total-rows="items.length" v-model="currentPage" :per-page="perPage">
    </b-pagination>
<preview-modal></preview-modal>
</div>
</template>

<script>
import PreviewModal from "@/components/comp/modals/PreviewModal";
export default {
  name: "TestDetailTable",
  props: ["items"],
  components: {
    PreviewModal
  },
  data: function() {
    return {
      isActive: true,
      currentPage: 1,
      perPage: 10,
      fields: {
        testName: { label: "Assessment", sortable: true },
        timeDuration: { label: "Duration/mins", sortable: true },
        createdAt: { label: "Created Date", sortable: true },
        // languages:{label: 'Languages', sortable: false},
        actions: { label: "Actions", sortable: false }
      }
    };
  },
  filters: {
    formatDate: function(value) {
      if (value) {
        //   let todayTime = new Date(value);
        let month = format(todayTime.getMonth() + 1);
        let day = format(todayTime.getDate());
        let year = format(todayTime.getFullYear());
        return month + "/" + day + "/" + year;
      }
      return new Date(value);
    }
  },
  methods: {
    redirect: function(testId) {
      // console.log("TestId",testId)
      this.$router.push("/admin/customTest/" + testId);
    }
  }
};
</script>
<style scoped>
thead {
  color: tomato;
}
.preview {
  border: none;
  background-color: slateblue;
}
.preview:hover {
  border: none;
  background-color: slateblue;
}
.invite {
  border: none;
  background-color: #08a7c3;
}
.invite:hover {
  border: none;
  background-color: #08a7c3;
}
.report {
  border: none;
  background-color: slateblue;
}
.report:hover {
  border: none;
  background-color: slateblue;
}
.clone {
  border: none;
  background-color: #22baa0;
}
.clone:hover {
  border: none;
  background-color: #22baa0;
}
.unlock {
  border: none;
  background-color: #22baa0;
}
.unlock:hover {
  border: none;
  background-color: #22baa0;
}
.lock {
  border: none;
  background-color: #db4c42;
}
.lock:hover {
  border: none;
  background-color: #db4c42;
}
.btn-active {
  outline: none;
  box-shadow: none !important;
}
.is-isActive {
  display: none;
}
</style>
