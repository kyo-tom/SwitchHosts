/**
 * index
 * @author: oldj
 * @homepage: https://oldj.net
 */

import express from 'express'
import edit from './edit'
import list from './list'
import toggle from './toggle'

const router = express.Router()

router.get('/list', list)
router.get('/toggle', toggle)
router.use(express.json());
router.post('/edit', edit)
router.post('/update', list)

export default router
