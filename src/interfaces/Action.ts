export default interface Action {
  type: string
  request?: Request
}

interface Request {
  query: string
  variables: object
  multi?: boolean
}
