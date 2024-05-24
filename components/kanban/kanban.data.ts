import { EnumStatus } from "~/types/deals.types";
import type { IColumn } from "./kanban.types";

export const KANBAN_DATA:IColumn[] = [
    {
        id: EnumStatus.todo,
        name: 'incoming',
        items: []
    },
    {
        id: EnumStatus['to-be-agreed'],
        name: 'agreement',
        items: []
    },
    {
        id: EnumStatus['in-progress'],
        name: 'production',
        items: []
    },
    {
        id: EnumStatus['produced'],
        name: 'produced',
        items: []
    },
    {
        id: EnumStatus.done,
        name: 'done',
        items: []
    },

]