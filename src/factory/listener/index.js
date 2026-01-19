const { AckPolicy, DeliverPolicy } = require("nats")

class Listener {
  subject // ABSTRACT
  queueGroupName // ABSTRACT
  _nats
  _ackWait = 30 * 1000

  constructor(natsWrapper) {
    this._nats = natsWrapper
  }

  streamName() {
    return "EVENTS"
  }

  durableName() {
    return `${this.queueGroupName}-${this.subject}`
  }

  parseMessage(msg) {
    return JSON.parse(Buffer.from(msg.data).toString("utf8"))
  }

  async ensureConsumer() {
    const nc = this._nats.client()
    const jsm = await nc.jetstreamManager()

    const stream = this.streamName()
    const durable = this.durableName()

    try {
      await jsm.consumers.info(stream, durable)
      return
    } catch (e) {}

    await jsm.consumers.add(stream, {
      durable_name: durable,
      ack_policy: AckPolicy.Explicit,
      ack_wait: this._ackWait * 1_000_000,
      deliver_policy: DeliverPolicy.All,
      filter_subject: this.subject
    })
  }

  async listen() {
    console.log(`[Listener] boot ${this.subject} / ${this.queueGroupName}`)

    await this.ensureConsumer()

    const js = this._nats.js()
    const consumer = await js.consumers.get(this.streamName(), this.durableName())

    for (;;) {
      const iter = await consumer.consume({ max_messages: 10, expires: 1000 })

      for await (const msg of iter) {
        console.log(`[Listener] received ${msg.subject} seq=${msg.seq}`)
        const data = this.parseMessage(msg)
        await this.onMessage(data, msg)
        msg.ack()
      }
    }
  }
}

module.exports = { Listener }
