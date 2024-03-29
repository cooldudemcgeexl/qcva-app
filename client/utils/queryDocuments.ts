import { omit, values } from "remeda"

interface QueryDoc {
  __typename?: string
}



export function mapTo2DArray<T extends QueryDoc>(queryDocResults: T[]) {
  return queryDocResults.map(queryDocResult => values(omit(queryDocResult, ['__typename'])))
} 