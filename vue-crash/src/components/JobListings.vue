<script setup lang="ts">
import JobListing from "./JobListing.vue"
import { RouterLink } from "vue-router"
import { reactive, defineProps, onMounted } from "vue"
import axios from 'axios';

export type Job = {
    id: number;
    title: string;
    type: string;
    description: string;
    location: string;
    salary: string;
    company: {
        name: string;
        description: string;
        contactEmail: string;
        contactPhone: string;
    };
}

defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
})

// reactive only allows objects, while you can pass primitives and other stuff to ref
// still reactive is good for stuff like this because we can make other states like loading and error for example
const state = reactive({
    jobs: [] as Job[],
    isLoading: true
});

onMounted(async () => {
    try {
        const response = await axios.get('/api/jobs');
        state.jobs = response.data;
    } catch (error) {
        console.error('Error fetching jobs', error);
    } finally {
        state.isLoading = false;
    }
})
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>
            <!-- Show Loading Spinner while loading data -->
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <i class="pi pi-spin pi-cog text-2xl"></i>
            </div>
            <!-- Show job listing when done loading -->
            <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-3">
                <JobListing v-for="job in state.jobs.slice(0, limit || state.jobs.length)" :key="job.id" :job="job" />
            </div>
        </div>
    </section>

    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink
            to="/jobs"
            class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
            View All Jobs
        </RouterLink>
    </section>
</template>