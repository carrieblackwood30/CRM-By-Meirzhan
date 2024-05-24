<template>
    <UiInput placeHolder="write comment..." v-model="commentRef" @keyup.enter="writeComment" />
    <UiSkeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5" />
    <div v-else-if="card">
        <div v-for="comment in card?.comments" :key="comment.$id" class="flex items-start mt-5">
            <Icon name="radix-icons:chat-bubble" class="mr-3 mt-1" size="20" />
            <div class="mb-4 text-sm">
                Comment: {{ dayjs(comment.$createdAt).format('HH:mm') }}
                <p>{{ comment.text }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type { IDeal } from '~/types/deals.types';
    import { useComments } from './useComments';
    import { useCreateComment } from './useCreateComment';
    import dayjs from 'dayjs';

    const { data, refetch, isLoading } = useComments()
    const { commentRef, writeComment } = useCreateComment({ refetch })

    const card = data as unknown as IDeal

</script>