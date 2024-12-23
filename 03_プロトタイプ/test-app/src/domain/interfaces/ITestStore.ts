export interface ITestStoreState {
  count: number
  increment: () => void
  decrement: () => void
  getCount: () => number
}
