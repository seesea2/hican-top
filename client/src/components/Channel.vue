<template>
  <div class="container py-3">
    <div class="row">
      <div class="col-sm-12 col-md-auto p-0">
        <img
          :src="props.channel.image"
          style="height: 250px; width: 250px; overflow: hidden"
        />
      </div>
      <div class="col">
        <h4>{{ props.channel.title }}</h4>
        <div v-html="props.channel.description" class="small"></div>
        <div class="row">
          <div
            v-for="item in props.channel.item"
            :key="item.title"
            class="col px-1 my-2 text-center"
          >
            <a
              class="border btn btn-outline-info btn-sm text-dark"
              @click="play(item)"
            >
              <p>
                <b>{{ new Date(item.pubDate).toLocaleDateString() }}</b>
              </p>
              <p class="small">{{ item.title }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["channel"]);

function play(item) {
  try {
    // console.log("in onPlayItem", item);
    let audioPlayer = document.getElementById("audioplayer");
    audioPlayer.src = item.url;
    if (audioPlayer.canPlayType(item.type)) {
      audioPlayer.load();
      audioPlayer.play();
      audioPlayer.controls = true;
      let audioarea = document.getElementById("audioarea");
      // audioarea.removeAttribute("class", "d-none");
      audioarea.setAttribute("class", "w-100");
    }
  } catch (err) {
    console.log("Play audio failed.");
  }
}
</script>
