/**
 * toggle
 * @author: oldj
 * @homepage: https://oldj.net
 */

import { getList, updateHostsContent } from '@main/actions'
import { broadcast } from '@main/core/agent'
import events from '@common/events'
import { Request, Response } from 'express'

const edit = async (req: Request, res: Response) => {
  const { id, content } = req.body;
  // 获取请求体中的 content
  /*console.log(`http_api toggle: ${id}`)
  if (!id) {
    res.end('bad id.')
    return
  }*/

  let list = await getList()
  let item = updateHostsContent(id.toString(), content)
  if (!item) {
    res.end('not found.')
    return
  }

  broadcast(events.toggle_item, id, !item.on)
  res.end(JSON.stringify({
    id: id,
    content: content,
  }),)
}

export default edit
