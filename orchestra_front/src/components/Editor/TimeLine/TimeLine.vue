<template>
  <section>
    <button @click="deleteElement" v-if="selectedItems.length != 0" class="btn btn-danger">Eliminar elemento seleccionado</button>
    <div id="time"></div>
    <div id="time-line" />
  </section>
</template>

<script>
import { mapActions } from "vuex";
import { Timeline as Vis } from "vis-timeline/standalone";
import {convertTimeElementArray} from "@/utils/utils"
export default {
  name: "TimeLine",
  data() {
    return {
      timeline: null,
      selectedItems: [],
      showAddFilterDialog: false,
      duration: "00:00:00,000",
      items: [
        {
          id: 1,
          content: "item 1",
          start: new Date(1970, 0, 1, 0, 0, 0, 0),
          end: new Date(1970, 0, 1, 0, 1, 0, 0),
          index: 0,
        },
        {
          id: 2,
          content: "item 2",
          start: new Date(1970, 0, 1, 0, 0, 0, 0),
          end: new Date(1970, 0, 1, 0, 1, 0, 0),
          index: 1,
        },
      ],
    };
  },
  async mounted() {
    let payloadPage = {
      idProject: this.$route.params.projectId,
      idSection: this.$route.params.sectionId,
      idPage: this.$route.params.pageId,
    }
    await this.$store.dispatch('element/getPage', payloadPage);
    // let page = this.$store.state.element.page
    let pageDuration = convertTimeElementArray( this.page.endTime);
    const container = document.getElementById("time-line");
    const options = {
      orientation: "top",
      min: new Date(1970, 0, 1),
      max: new Date(1970, 0, 1, pageDuration[0], pageDuration[1], pageDuration[2], pageDuration[3]),
      showCurrentTime: true,
      multiselect: false,
      multiselectPerGroup: true,
      //   stack: false,
      zoomMin: 100,
      zoomMax: 21600000,
      editable: {
        updateTime: true,
        updateGroup: true,
      },
      onMove: this.onMove,
      onMoving: this.onMoving,
      format: {
        minorLabels: {
          millisecond: "SSS [ms]",
          second: "s [s]",
          minute: "HH:mm:ss",
          hour: "HH:mm:ss",
          weekday: "HH:mm:ss",
          day: "HH:mm:ss",
          week: "HH:mm:ss",
          month: "HH:mm:ss",
          year: "HH:mm:ss",
        },
        majorLabels: {
          millisecond: "HH:mm:ss",
          second: "HH:mm:ss",
          minute: "",
          hour: "",
          weekday: "",
          day: "",
          week: "",
          month: "",
          year: "",
        },
      },
    };
    //container
    //items
    //groups
    //options
    //new Date(1970, 0, 1, parsed[1], parsed[2], parsed[3], parsed[4])

    this.timeline = new Vis(container, this.itemsLineTime, options);
    this.timeline.addCustomTime(new Date(1970, 0, 1));
    this.timeline.setCustomTimeTitle("00:00:00,000");
    this.timeline.on("select", this.onSelect);
    this.timeline.on("timechange", this.onTimeChange);
    this.timeline.on("moving", this.onMoving);
    this.timeline.on("move", this.onMove);
  },
  methods: {
    ...mapActions({
      updateTime: "element/updateTimeLine",
      deleteTimeLine: "element/deleteTimeLine",
    }),
    onMove(item) {
      // Aca va la petción al server
      let timeStart  = parseFloat(item.start.getHours())*3600 + parseFloat(item.start.getMinutes())*60 + parseFloat(item.start.getSeconds())
      timeStart*=1000
      timeStart= parseFloat(item.start.getMilliseconds())===0 ? timeStart: timeStart + parseFloat(item.start.getMilliseconds())
      let timeEnd  = parseFloat(item.end.getHours())*3600 + parseFloat(item.end.getMinutes())*60 + parseFloat(item.end.getSeconds())
      timeEnd*=1000
      timeEnd= parseFloat(item.end.getMilliseconds())===0 ? timeEnd: timeEnd + parseFloat(item.end.getMilliseconds())
      let payload = {
        element: {
          _id: item.id,
          startTime: timeStart,
          endTime: timeEnd,
          title: item.content,
        },
        pageId: this.$route.params.pageId
      }
      this.updateTime(payload);
    },
    onMoving(item, callback) {
      if (item.start.getFullYear() >= 1970 && item.end.getTime() <= this.pageEnd.getTime()) {
        callback(item);
      }
    },
    onSelect(properties) {
      this.selectedItems = properties.items;
    },
    deleteElement() {
      let payload ={
        elementId: this.selectedItems[0],
        pageId: this.$route.params.pageId,
        idProject: this.$route.params.projectId
      }
      this.deleteTimeLine(payload);
    },
    onTimeChange(event) {
      // const timePointer = TimelineModel.dateToString(event.time);
      //
      // if (event.time.getFullYear() < 1970) {
      //   this.props.setTime(new Date(1970, 0, 1));
      // } else if (timePointer > this.state.duration) {
      //   this.props.setTime(TimelineModel.dateFromString(this.state.duration));
      // } else {
      //   this.props.setTime(event.time);
      //   this.timeline.setCustomTimeTitle(timePointer);
      // }
    },
  },
  computed: {
    itemsLineTime() {
      
      let items = this.$store.state.element.timeLine
      if(items){
        let itemsLine = []
        items.elements.forEach(element => {
          let start = convertTimeElementArray(element.startTime)
          let end = convertTimeElementArray(element.endTime)
          let itemTime ={
            id: element._id,
            content: element.title,
            start: new Date(1970, 0, 1, start[0], start[1], start[2], start[3]),
            end: new Date(1970, 0, 1, end[0], end[1], end[2], end[3]),
          }
          itemsLine.push(itemTime)
        });
        return itemsLine;
      }
      return [];
    },
    page () {
      return this.$store.state.element.page
    },
    pageEnd(){
      let page= this.$store.state.element.page
      let pageDuration = convertTimeElementArray( page.endTime);
      let info = new Date(1970, 0, 1, pageDuration[0], pageDuration[1], pageDuration[2], pageDuration[3])
      return info
    }
  },
   watch: {
    itemsLineTime: function (val) {
      this.timeline.setData({
			items: val
		});
    },
    
  }
};
</script>

<style scoped >
section {
  width: 83.7%;
  height: 100%;
  background-color: var(--third-color-editor);
  overflow-y: scroll;
}

section::-webkit-scrollbar-track {
  /* border: 1px solid #000; */
  padding: 2px 0;
  background-color: #404040;
}

section::-webkit-scrollbar {
  width: 15px;
}

section::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: white;
  border: 1px solid #000;
}
</style>
