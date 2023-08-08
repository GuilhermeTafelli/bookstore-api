import { IsNotEmpty, IsUUID } from 'class-validator'

export class FiltersBookDTO {
    title?: string
    author?: string
    publishingCompany?: string
}
