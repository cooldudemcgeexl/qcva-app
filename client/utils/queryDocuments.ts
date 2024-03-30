import { omit, values } from "remeda"

export interface QueryDoc {
  __typename?: string
  [key: string | number | symbol]: any
}



export function mapTo2DArray<T extends QueryDoc>(queryDocResults: T[]) {
  return queryDocResults.map(queryDocResult => values(omit(queryDocResult, ['__typename'])))
} 