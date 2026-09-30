<script setup lang="ts">
defineProps<{ name: string }>();
const emit = defineEmits<{ select: [] }>();
defineSlots<{ default(props: { label: string }): unknown }>();
</script>

<template>
    <button type="button" @click="emit('select')">
        <slot :label="name">{{ name }}</slot>
    </button>
</template>
