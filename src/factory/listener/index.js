const { consumerOpts, createInbox } = require("nats")

class Listener {
  subject // ABSTRACT
  queueGroupName // ABSTRACT
  _ackWait = 30 * 1000

  constructor(natsWrapper) {
    this._nats = natsWrapper
  }

  parseMessage(msg) {
    return JSON.parse(Buffer.from(msg.data).toString("utf8"))
  }

  async listen() {
    const js = this._nats.js()

    // UNIQUE DURABLE PER LISTENER (REQUIRED)
    const durableName = `${this.queueGroupName}-${this.subject}`

    // CONSUMER OPTIONS (PUSH)
    const opts = consumerOpts()
    opts.durable(durableName)
    opts.manualAck()
    opts.ackWait(this._ackWait)
    opts.deliverAll()
    opts.filterSubject(this.subject)

    //PUSH DELIVERY SUBJECT
    opts.deliverTo(createInbox())

    // THIS MAKES IT "QUEUE GROUP" LIKE (ONE INSTANCE PROCESSES EACH MSG)
    opts.deliverGroup(this.queueGroupName)

    const sub = await js.subscribe(this.subject, opts)

    sub.callback((err, msg) => {
      if (err) {
        console.error("Listener error:", err)
        return
      }
      console.log(`Event Received: ${msg.subject} / ${this.queueGroupName}`)
      const data = this.parseMessage(msg)
      this.onMessage(data, msg)
    })
  }
}

exports.Listener = Listener
