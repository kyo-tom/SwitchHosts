/**
 * refreshHosts
 * @author: oldj
 * @homepage: https://oldj.net
 */

import { getHostsContent, setHostsContent, setList } from '@main/actions/index'
import { broadcast } from '@main/core/agent'

import { swhdb } from '@main/data'
import { IHostsListObject, IOperationResult } from '@common/data'
import events from '@common/events'
import * as hostsFn from '@common/hostsFn'

export default async (hosts_id: string, new_content: string): Promise<IOperationResult> => {
  let list = await swhdb.list.tree.all()
  let hosts: IHostsListObject | undefined = hostsFn.findItemById(list, hosts_id)

  if (!hosts) {
    return {
      success: false,
      code: 'invalid_id',
    }
  }

  let old_content: string = await getHostsContent(hosts.id)

  await setList(list)

  if (old_content !== new_content) {
    await setHostsContent(hosts_id, new_content)
    broadcast(events.hosts_refreshed, hosts)
    broadcast(events.hosts_content_changed, hosts_id)
  }

  return {
    success: true,
    data: { ...hosts },
  }
}
