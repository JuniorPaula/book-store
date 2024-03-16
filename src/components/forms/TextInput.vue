<template>
  <div class="mb-3">
    <label :for="name" class="form-label">{{ label }}</label>
    <input 
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :min="min"
      :max="max"
      :value="modelValue"
      :autocomplete="name + '-new'"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-control"
    >
    <div class="form-text">{{ help }}</div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    modelValue: {
      type: String,
      default: ''
    },
    help: {
      type: String,
      default: ''
    }
  }
}

</script>