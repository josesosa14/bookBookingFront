<template>
  <div class="col">
    <div class="title">
    <h2>{{ component_title }}</h2>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4 card-container" v-for="book in books" :key="book.id">
        <div class="card">
          <img
            class="card-img-top"
            :src="'https://dummyimage.com/400x200/343a40/fff.png&text='+book.author.last_name+' '+book.author.name"
            alt="Card image cap"
          />
          <div class="card-body">
            <h4 class="card-title">{{ book.name }}</h4>
            <p class="card-text">{{ book.description }}</p>
            <div class="row" v-if="!my_list">
              <div class="col">
                <p class="btn btn-info btn-block">${{ book.price }}</p>
              </div>
              <div class="col" v-if="book.stock > 0">
                <button class="btn btn-success btn-block" @click="makeBooking(book.id)">Reserve</button>
              </div>
            </div>
          </div>
          <div class="card-footer" v-if="!my_list">
              <small class="alert-success" v-if="book.stock > 0">STOCK: {{book.stock}}</small>
              <small class="alert-danger" v-else>SOLD OUT</small>
          </div>
          <div class="card-footer" v-else>
              <button class="btn btn-danger btn-block" @click="cancelBooking(book)">Cancel your booking</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "BookList",
  props: {
    component_title: String,
    books: [],
    my_list: null
  },
  data: function() {
    return {
      selectBook: null
    };
  },
  computed: {
    ...mapGetters(["errors"])
  },
  mounted() {
    this.$store.commit("setErrors", {});
  },
  methods: {
    ...mapActions("booking", ["sendBooking", "sendCancelBooking"]),
    async makeBooking(selectedBook) {
      await this.sendBooking({ book_id: selectedBook });
    },
    async cancelBooking(selectedBooking) {
      await this.sendCancelBooking(selectedBooking);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bloc_left_price {
  color: #c01508;
  text-align: center;
  font-weight: bold;
  font-size: 150%;
}
.category_block li:hover {
  background-color: #007bff;
}
.category_block li:hover a {
  color: #ffffff;
}
.category_block li a {
  color: #343a40;
}
.add_to_cart_block .price {
  color: #c01508;
  text-align: center;
  font-weight: bold;
  font-size: 200%;
  margin-bottom: 0;
}
.add_to_cart_block .price_discounted {
  color: #343a40;
  text-align: center;
  text-decoration: line-through;
  font-size: 140%;
}
.product_rassurance {
  padding: 10px;
  margin-top: 15px;
  background: #ffffff;
  border: 1px solid #6c757d;
  color: #6c757d;
}
.product_rassurance .list-inline {
  margin-bottom: 0;
  text-transform: uppercase;
  text-align: center;
}
.product_rassurance .list-inline li:hover {
  color: #343a40;
}
.card-title {
  color: #c01508;
}
.card-container{
  margin-bottom: 40px;
}
.title{
  border-bottom: 2px solid #b3b3b3;
  margin-bottom: 30px;
}

</style>
