<template>
  <form 
    @submit.prevent="submitEvent"
    :ref="name"
    :event="event"
    autocomplete="off" 
    :method="method"
    :action="action"
    class="needs-validation"
    novalidate
  >
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'FormTag',
  props: ["name", "method", "action", "event"],
  methods: {
    submitEvent() {
      let myform = this.$refs[this.$props.name]

      if (myform.checkValidity()) {
        console.log("my event name", this.$props['event'])
        console.log('name', this.$props['name'])

        this.$emit(this.$props['event'])
      }

      myform.classList.add('was-validated')
    }
  },
}

</script>