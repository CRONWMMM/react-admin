import homeRoute from './homeRoute'
import userRoute from './userRoute'
import componentsRoute from './componentsRoute'
import notFoundRoute from './404Route'

export default [
    ...homeRoute,
    ...userRoute,
    ...componentsRoute,
    ...notFoundRoute
]
