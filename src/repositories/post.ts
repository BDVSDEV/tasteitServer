import { Post } from "../models/post"
import { 
  dataSource,
} from "@medusajs/medusa/dist/loaders/database"

export const PostRepository = dataSource
  .getRepository(Post)

export default PostRepository