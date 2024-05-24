<template>

    <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
        <nuxt-link to="/" class="mb-10 block">
            <NuxtImg src="/logo.svg" width="120px" class="mx-auto" />
        </nuxt-link>
        <button @click="logout" class="absolute top-2 right-3 transition-colors hover:text-primary">
            <Icon name="line-md:logout" size="22"/>
        </button>
        <LayoutMenu/>
    </aside>
    
</template>

<script setup lang="ts">
    import { useAuthStore, useIsLoadingStore } from '~/store/auth.store';
    
    const store = useAuthStore()
    const router = useRouter()

    const IsLoadingStore = useIsLoadingStore()

    const logout = async() =>{
        IsLoadingStore.set(true)
        await account.deleteSession('current')
        store.clear()
        await router.push('/login')
        IsLoadingStore.set(false)
    } 
</script>