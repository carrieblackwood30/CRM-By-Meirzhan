<template>
    <div class="p-10">
        <h1 class="font-bold text-2xl mb-10">CRM SYSTEM</h1>
        <div v-if="isLoading">Loading...</div>
        <div v-else>
            <div class="grid grid-cols-5 gap-16">
                <div v-for="(column, index) in data" :key="column.id" @dragover="handleDragOver" @drop="() => handleDrop(column)" class="min-h-screen">
                <div class="rounded bg-slate-700 py-1 px-4 mb-2 text-center" :style="generateColumnStyle(index, data?.length)">
                    {{ column.name }}
                </div>
                <div>
                    <KanbanCreateDeal :refetch="refetch" :status="column.id"/>
                    <UiCard v-for="card in column.items" :key="card.id"  class="mb-3" draggable="true" @dragstart="() => handleDragStart(card, column)">
                        <UiCardHeader role="button" @click="store.set(card)">
                            <UiCardTitle>{{ card.name }}</UiCardTitle>
                            <UiCardDescription>{{ convertCurrency(card.price) }}</UiCardDescription>
                        </UiCardHeader>
                        <UiCardContent class="text-sm"><h3>Compony: </h3>
                            {{ card.companyName }}</UiCardContent>
                        <UiCardFooter>{{ dayjs().format('DD MMMM YYYY') }}</UiCardFooter>
                    </UiCard>
                </div>
            </div>
            </div>
        <KanbanSlideover />
    </div>
    </div>

</template>

<script lang="ts" setup>
import type { IColumn, iCard } from '~/components/kanban/kanban.types';
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery';
import { convertCurrency } from '~/utils/convertCurrency';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/vue-query';
import type { EnumStatus } from '~/types/deals.types';
import { COLLECTION_DEALS, DB_ID } from '~/app.constants';
import { generateColumnStyle } from '~/components/kanban/generate-gradient';
import { useDealSlideStore } from '~/store/deal-slide.store';

    useSeoMeta({
        title: 'Home | CRM SYSTEM'
    })
    
    const dragCardRef = ref<iCard | null>(null)
    const sourceColumnRef = ref<IColumn | null>(null)
    const {data, isLoading, refetch} = useKanbanQuery()
    const store = useDealSlideStore()

    type TypeMutationVariables = {
        docId: string,
        status?: EnumStatus
    }

    const { mutate } = useMutation({
        mutationKey: ['move card'],
        mutationFn: ({docId, status}:TypeMutationVariables) => DB.updateDocument(DB_ID, COLLECTION_DEALS, docId,{status }),
        onSuccess: () =>{
            refetch()
        }
        
    })


    function handleDragStart(card:iCard, column: IColumn){
        dragCardRef.value = card
        sourceColumnRef.value = column
    }

    function handleDragOver(event:DragEvent){
        event.preventDefault()
    }

    function handleDrop(targetColumn:IColumn){
        if(dragCardRef.value && sourceColumnRef.value){
            mutate({ docId: dragCardRef.value.id, status: targetColumn.id })
        }
    }

</script>