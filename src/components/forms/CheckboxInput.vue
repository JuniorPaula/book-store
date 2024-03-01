<template>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" :checked="checked" :required="required">
    <label class="form-check-input" :for="name">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'CheckboxInput',
  props: ["label", "name", "checked", "required"]
}

</script>