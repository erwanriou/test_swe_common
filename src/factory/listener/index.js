const { consumerOpts } = require("nats")

class Listener {
  subject
  queueGroupName
  _ackWait = 30 * 1000

  constructor(natsWrapper) {
    this._nats = natsWrapper
  }

  parseMessage(msg) {
    return JSON.parse(Buffer.from(msg.data).toString("utf8"))
  }

  async listen() {
    const js = this._nats.js()

    const durableName = `${this.queueGroupName}-${this.subject}`
    const deliverSubject = `${durableName}.deliver`

    const opts = consumerOpts()
    opts.durable(durableName)
    opts.deliverTo(deliverSubject)
    opts.deliverGroup(this.queueGroupName)
    opts.manualAck()
    opts.ackWait(this._ackWait)
    opts.deliverAll()
    opts.filterSubject(this.subject)

    const sub = await js.subscribe(this.subject, opts)

    sub.callback(async (err, msg) => {
      if (err) return
      const data = this.parseMessage(msg)
      await this.onMessage(data, msg)
      msg.ack()
    })
  }
}

module.exports = { Listener }
