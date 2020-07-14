import { camelCase } from 'lodash'

export class User {
  sub: string
  name: string
  nickname: string
  picture: string
  updatedAt: string
  email: string
  emailVerified: boolean

  provider?: string
  id?: string

  givenName?: string
  familyName?: string
  locale?: string
  [key: string]: string | boolean | undefined

  constructor (auth0User: { [key: string]: string | boolean | undefined }) {
    if (!auth0User) return
    for (const key in auth0User) {
      this[key] = auth0User[key]
    }

    this.sub = auth0User.sub as string
    this.provider = this.sub.split('|')[0]
    this.id = this.sub.split('|')[1]
  }
}
