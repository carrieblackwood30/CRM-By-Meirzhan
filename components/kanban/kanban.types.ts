import type { EnumStatus } from '~/types/deals.types'

export interface iCard {
    id: string
    name: string
    price: number
    $createdAt: string
    companyName: string
    status: string
}

export interface IColumn{
    id: EnumStatus
    name: string
    items: iCard[]
}