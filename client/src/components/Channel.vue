<template>
  <div class="container py-3">
    <div class="row">
      <img
        :src="channel.image"
        style="height: 250px; width: 250px; overflow: hidden"
        class="col-auto"
      />
      <div class="col">
        <h4>{{ channel.title }}</h4>
        <div class="small">
          {{ channel.description }}
        </div>
        <div class="row">
          <div v-for="item in channel.item" :key="item.title" class="col my-1">
            <div
              class="card btn btn-info btn-sm"
              @click="$emit('playItem', JSON.stringify(item))"
            >
              <p>
                <b>{{ new Date(item.pubDate).toLocaleDateString() }}</b>
              </p>
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChannelVue",
  props: ["channel"],
  emits: ["playItem"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
