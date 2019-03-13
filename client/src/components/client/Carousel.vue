<template>
  <div>
    <!-- controls
    indicators-->
    <b-carousel :interval="0">
      <b-carousel-slide>
        <img
          slot="img"
          class="d-block img-fluid w-100 m-auto"
          height="auto"
          :src="images.banner1"
          alt="banner"
        >
      </b-carousel-slide>
      <b-carousel-slide>
        <img
          slot="img"
          class="d-block img-fluid w-100"
          height="480"
          :src="images.banner2"
          alt="banner"
        >
      </b-carousel-slide>
      <b-carousel-slide>
        <img
          slot="img"
          class="d-block img-fluid w-100"
          height="480"
          :src="images.banner3"
          alt="banner"
        >
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'CarouselComponent',
  data() {
    return {
      images: {
        banner1: require('@/assets/images/toss-banner1.png'),
        banner2: require('@/assets/images/toss-banner2.png'),
        banner3: require('@/assets/images/toss-banner3.png')
      }
    };
  }
};
</script>

<style scoped>
.carousel-item {
  box-shadow: inset 0rem 0px 97px rgba(34, 34, 34, 0.09);
}
img {
  max-width: 1024px;
  margin: auto;
}

.carousel-item {
  background: rgb(255, 255, 255);
  margin-top: 3rem;
}

.carousel-inner {
  box-shadow: 4px 4px 4px rgba(34, 34, 34, 0.5);
}
</style>



