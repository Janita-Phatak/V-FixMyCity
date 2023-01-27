<template>
  <div>
    <label for="product_image">Product Images</label>
    <input type="file" @change="uploadImage" accept="image/*" />
  </div>
</template>

<script>
import { fb, db } from "../firebase";
export default {
  name: "UploadImg",
  data() {
    return {};
  },

  firestore() {
    return {
      products: db.collection("products"),
    };
  },
  methods: {
    uploadImage(e) {
      let file = e.target.files[0];

      var storageRef = fb.storage().ref("products/" + file.name);

      storageRef.put(file);

      console.log(e.target.files[0]);
    },
  },
};
</script>