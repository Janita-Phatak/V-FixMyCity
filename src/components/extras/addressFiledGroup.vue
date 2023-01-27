<template>
  <h3>{{ label }}</h3>
  <div>
    <label>
      Street
      <input
        type="text"
        @input="$emit('update:street', $event.target.value)"
        :value="street"
        ref="streetRef"
        placeholder="Street"/>
    </label>

    <label>
      Number
      <input
        type="text"
        @input="$emit('update:streetNumber', $event.target.value)"
        :value="streetNumber"
        placeholder="Number"/>
    </label>

    <label>
      Postcode
      <input
        type="text"
        @input="$emit('update:postcode', $event.target.value)"
        :value="postcode"
        placeholder="Postcode"/>
    </label>

    <label>
      City
      <input
        type="text"
        @input="$emit('update:city', $event.target.value)"
        :value="city"
        placeholder="City"/>
    </label>

    <label>
      Country
      <input
        type="text"
        @input="$emit('update:country', $event.target.value)"
        :value="country"
        placeholder="Country"/>
    </label>
  </div>
</template>

<script>
import {onMounted, onUnmounted, ref} from "vue";

export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    street: {
      type: String,
      default: '',
    },
    streetNumber: {
      type: String,
      default: '',
    },
    postcode: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    /* eslint-disable */
    const streetRef = ref();
    let autocomplete;

    onMounted(() => {
      autocomplete = new google.maps.places.Autocomplete(streetRef.value, {
        types: ["address"],
        fields: ["address_components"]
      });

      google.maps.event.addListener(autocomplete, "place_changed", () => {
        const mapping = {
          street_number: "update:streetNumber",
          route: "update:street",
          locality: "update:city",
          postal_code: "update:postcode",
          country: "update:country",
        }

        for(const type in mapping) {
          context.emit(mapping[type], "");
        }

        let place = {
          address_components: [],
          ...autocomplete.getPlace()
        }

        place.address_components.forEach((component) => {
          component.types.forEach((type) => {
              if(mapping.hasOwnProperty(type)){
                context.emit(mapping[type], component.long_name);
              }
          });
        });
      });
    });

    onUnmounted(() => {
      if(autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    });

    return {streetRef};
  }
};
</script>