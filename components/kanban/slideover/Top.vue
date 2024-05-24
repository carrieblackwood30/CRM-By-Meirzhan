<template>
    <div class="border-border bg-black/20 rounded p-3">
        <div class="uppercase bold text-xl mb-4">about this deal</div>
        <KanbanSlideoverLabel label-text="naming">
            <h2>{{ store.card?.name }}</h2>
        </KanbanSlideoverLabel>
        
        <KanbanSlideoverLabel label-text="currency">
            {{ convertCurrency(store.card?.price || 0) }}
        </KanbanSlideoverLabel>
        
        <KanbanSlideoverLabel label-text="наименование">
            <UIBadge variant="outline">
                {{ store.card?.status }}
            </UIBadge>
        </KanbanSlideoverLabel>
        
        <KanbanSlideoverLabel label-text="client">
            {{ store.card?.companyName }}
        </KanbanSlideoverLabel>
        
        <KanbanSlideoverLabel label-text="created date">
            {{ dayjs(store.card?.$createdAt).format('DD MMMM YYYY') }}
        </KanbanSlideoverLabel>
        
    </div>
</template>

<script setup lang="ts">
    import dayjs from 'dayjs';
    import { useDealSlideStore } from '~/store/deal-slide.store';

    const store = useDealSlideStore()
</script>