import cors from "cors"
import { Router } from "express"
import { 
  registerLoggedInUser,
} from "../middlewares/logged-in-user"
import 
  authenticate 
from "@medusajs/medusa/dist/api/middlewares/authenticate"

const router = Router()

export default function (adminCorsOptions:any) {
  // This router will be applied before the core routes. 
  // Therefore, the middleware will be executed
  // before the create product handler is hit
  router.use(
    "/admin/products", 
    cors(adminCorsOptions), 
    authenticate(),
    registerLoggedInUser
  )
  return router
}