<template>
  <div class="login mt-5">
    <div class="card">
      <div class="card-header">Register Book</div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="name">Name of the book</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.name }"
              id="name"
              v-model="bookForm.name"
              placeholder="Enter name"
            />
            <div class="invalid-feedback" v-if="errors.name">
              {{ errors.name[0] }}
            </div>
          </div>
          <div class="form-group">
            <label for="author">Author</label>
            <select
              class="form-control"
              id="author"
              :class="{ 'is-invalid': errors.author_id }"
              v-model="bookForm.author_id"
            >
              <option
                v-for="option in options"
                :key="option.text"
                v-bind:value="option.value"
                >{{ option.text }}</option
              >
            </select>
            <div class="invalid-feedback" v-if="errors.author_id">
              {{ errors.author_id[0] }}
            </div>
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.price }"
              id="price"
              v-model="bookForm.price"
              placeholder="Enter price"
            />
            <div class="invalid-feedback" v-if="errors.price">
              {{ errors.price[0] }}
            </div>
          </div>
          <div class="form-group">
            <label for="stock">Stock</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.stock }"
              id="stock"
              v-model="bookForm.stock"
              placeholder="Enter stock"
            />
            <div class="invalid-feedback" v-if="errors.stock">
              {{ errors.stock[0] }}
            </div>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              class="form-control"
              :class="{ 'is-invalid': errors.description }"
              id="description"
              v-model="bookForm.description"
              placeholder="Enter description"
            ></textarea>
            <div class="invalid-feedback" v-if="errors.description">
              {{ errors.description[0] }}
            </div>
          </div>
          <button type="button" @click="createBook" class="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default {
  name: "Book",
  created() {
    this.fetchBookAuthors();
  },
  data: function() {
    return {
      bookForm: {
        name: null,
        author_id: null,
        price: null,
        stock: null,
        description: null
      },
      selected: "",
      options: []
    };
  },
  computed: {
    ...mapGetters(["errors"])
  },
  mounted() {
    this.$store.commit("setErrors", {});
  },
  methods: {
    ...mapActions("book", ["sendCreate"]),
    fetchBookAuthors() {
      axios.get("/author").then(res => {
        this.options = res.data;
      });
    },
    createBook: function() {
      this.sendCreate(this.bookForm).then(() => {
        this.$router.push({ name: "Home" });
      });
    }
  }
};
</script>
