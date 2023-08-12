<script setup lang="ts">
import { useAudioPlayerStore } from '@/stores/audioPlayer';
import { type ChannelItem } from '@/common/podcast';

const props = defineProps(["channel"]);

function play(item: ChannelItem) {
  useAudioPlayerStore().play(item)
}
</script>


<template>
  <div class="container py-3">
    <div class="row">
      <div class="col-sm-12 col-md-auto p-0">
        <img :src="props.channel.image" style="height: 250px; width: 250px; overflow: hidden" />
      </div>
      <div class="col">
        <h4>{{ props.channel.title }}</h4>
        <div v-html="props.channel.description" class="small"></div>
        <div class="row">
          <div v-for="item in props.channel.item" :key="item.title" class="col px-1 my-2 text-center">
            <a class="border btn btn-outline-info btn-sm text-dark" @click="play(item)">
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


