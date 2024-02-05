import snf from 'simple-node-framework'
import { instance as origin } from 'simple-node-framework/lib/plugins/origin.js'

export const useSnf = app => {
  const {
    Authorization,
    Singleton: { authorization },
  } = snf

  app.use(origin.proccess.bind(origin))
  app.use(Authorization.parse)
  app.use(authorization.protect.bind(authorization))
}
