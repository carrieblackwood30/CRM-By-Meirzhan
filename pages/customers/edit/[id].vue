<template>
    <div class="p-10">
        <h1 class="font-bold text-2xl mb-10">
            edit {{ (data as unknown as ICustomerFormState)?.name }}
        </h1>

        <form @submit="OnSubmit" class="form">
            <UiInput 
                placeHolder="name"
                v-model="name"
                v-bind="nameAttrs"
                type="text"
                class="input"
            />

            <UiInput 
                placeHolder="email"
                v-model="email"
                v-bind="emailAttrs"
                type="text"
                class="input"
            />

            <UiInput 
                placeHolder="Where find?"
                v-model="formSours"
                v-bind="formSoursAttrs"
                type="text"
                class="input"
            />

            <UiButton :disabled="isPending" variant="secondary" class="mt-3">
                {{ isPending ? ':Loading...' : 'Save' }}
            </UiButton>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { storage } from '@/utils/appwrite';
    import { useMutation, useQuery } from '@tanstack/vue-query';
    import { v4 as uuid } from 'uuid';
    import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from '~/app.constants';
    import type { ICustomer } from '~/types/deals.types';

    interface ICustomerFormState extends Pick<ICustomer, 'avatar_url' | 'email' | 'name' | 'from_source'> {}
    interface inputFileEvent extends Event{
        target: HTMLInputElement
    }

    useSeoMeta({
        title: `Company edit`,
    })

    const route = useRoute()
    const customerId = route.params.id as string

    const { handleSubmit, defineField, setFieldValue, setValues, values } = useForm<ICustomerFormState>()

    const { data, isSuccess } = useQuery({
        queryKey: ['get customer', customerId],
        queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId)
    })

    watch(isSuccess, () =>{
        const initialData = data.value as unknown as ICustomerFormState
        setValues({
            email: initialData.email,
            avatar_url: initialData.avatar_url,
            from_source: initialData.from_source || '',
            name: initialData.name
        })
    })

    const [name, nameAttrs] = defineField('name')
    const [email, emailAttrs]= defineField('email')
    const [formSours, formSoursAttrs] = defineField('from_source')
    
    const{ mutate, isPending } = useMutation({
        mutationKey: ['update customer', customerId],
        mutationFn: (data:ICustomerFormState) => DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data)
    })

    const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
        mutationKey: ['upload image'],
        mutationFn:(file: File) => storage.createFile(STORAGE_ID, uuid(), file),
        onSuccess(data){
            const response = storage.getFileDownload(STORAGE_ID, data.$id)
            setFieldValue('avatar_url', response.href)
        }
    })

    const OnSubmit = handleSubmit(values =>{
        mutate(values)
    })

</script>

<style scoped>
    .input{
        @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border-border transition-colors;
    }
</style>