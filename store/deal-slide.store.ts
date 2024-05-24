import type { iCard } from "~/components/kanban/kanban.types";

const defaultValue:{ card:iCard | null; isOpen:Boolean } = {
    card:null,
    isOpen: false
}

export const useDealSlideStore = defineStore('deal-slide', {
    state: () => defaultValue,
    actions:{
        clear(){
            this.$patch(defaultValue)
        },
        set(card: iCard){
            this.$patch({card, isOpen: true})
        },
        toggle(){
            this.isOpen = !this.isOpen
        }
    },
    
})