import { Page, PageResponse } from '../../interfaces/page.interface'
import { ServiceException } from '../../infrastructure/exception/service.exception'
import GenericException from '../../infrastructure/exception/generic.exception'
import { FilterDTO } from '../../dtos/filter.dto'
import { OrderByMode } from '../../enums/orderByMode.enum'
import { BadRequestException } from '../../infrastructure/exception/badRequest.exception'
import { NotFoundException } from '../../infrastructure/exception/notFound.exception'
import { UnauthorizedException } from '../../infrastructure/exception/unauthorized.exception'

export abstract class Service<T> {
  abstract SERVICE_NAME: string

  buildPage({ page, pageSize }: FilterDTO): Page {
    return {
      skip: page ? (Number(page) - 1) * Number(pageSize) : 0,
      take: pageSize ? Number(pageSize) : 10
    }
  }

  buildPageResponse(items: T[], total: number): PageResponse<T> {
    return {
      items,
      total
    }
  }

  buildOrderBy({ orderBy }: FilterDTO) {
    if (!orderBy) return { orderBy: { createdAt: OrderByMode.DESC } }
    const order: { [key: string]: OrderByMode } = {}

    order[orderBy.attribute] = orderBy.mode
    return { orderBy: order }
  }

  protected catchErrors(error: any, context: string | string[]) {
    console.log(error)
    if (error?.code === 'P2025') {
      throw new NotFoundException(
        'Not found entity needed to relation',
        this.SERVICE_NAME,
        {
          error: 'Not found entitiy needed to relation'
        },
      )
    }

    if (
      error?.response?.data?.errorMessage.includes(
        'User exists with same username or email'
      )
    ) {
      throw new BadRequestException(context, this.SERVICE_NAME, {
        email: 'email already exists'
      })
    }

    if (
      (error.message as string).includes('Unknown arg') &&
      (error.message as string).includes('.orderBy.')
    ) {
      throw new BadRequestException(
        'invalid orderBy attribute',
        this.SERVICE_NAME,
        {
          orderBy: 'invalid orderBy attribute'
        }
      )
    }

    if (error instanceof GenericException) {
      error.context =
        error.context === null || error.context === undefined ? { error: context } : error.context
      throw error
    }

    throw new ServiceException(context, this.SERVICE_NAME)
  }
}
