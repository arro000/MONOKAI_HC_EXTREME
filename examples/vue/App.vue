<script setup lang="ts">
import { computed, ref } from 'vue';
import UserBadge from './UserBadge.vue';

interface User {
    readonly id: number;
    name: string;
    active: boolean;
}

const title = ref('Team');
const users = ref<User[]>([{ id: 1, name: 'Ada', active: true }]);
const activeCount = computed(() => users.value.filter(user => user.active).length);

function selectUser(user: User): void {
    title.value = `Selected: ${user.name}`;
}
</script>

<template>
    <section class="team" :aria-label="title">
        <input v-model="title" @keyup.enter="title = 'Team'" />
        <h1>{{ title }} ({{ activeCount }})</h1>
        <ul v-if="users.length > 0">
            <li v-for="user in users" :key="user.id">
                <UserBadge :name="user.name" @select="selectUser(user)">
                    <template #default="{ label }">
                        <strong>{{ label.toUpperCase() }}</strong>
                    </template>
                </UserBadge>
                <span :class="{ active: user.active }">{{ user.active ? 'Active' : 'Away' }}</span>
            </li>
        </ul>
        <p v-else>No users</p>
    </section>
</template>

<style scoped lang="scss">
$accent: #66d9ef;

.team {
    --spacing: 1rem;
    padding: var(--spacing);

    .active {
        color: $accent;
        font-weight: bold;
    }
}
</style>
