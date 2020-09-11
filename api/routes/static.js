import serveStatic from '../handlers/static';
import express from 'express'

const router = express.Router()

router.get(/css|js|images/, serveStatic)

export default router;
