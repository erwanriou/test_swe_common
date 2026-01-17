class Listener {
  subject // ABSTRACT
  queueGroupName // ABSTRACT
  _ackWait = 30 * 1000

  constructor(natsWrapper) {
    this._nats = natsWrapper
  }

  streamName() {
    return "EVENTS"
  }

  consumerConfig() {
    return {
      durable_name: this.queueGroupName,
      ack_policy: "explicit",
      ack_wait: this._ackWait * 1_000_000,
      deliver_policy: "all",
      filter_subject: this.subject
    }
  }

  async ensureConsumer() {
    const nc = this._nats.client()
    const jsm = await nc.jetstreamManager()
    const stream = this.streamName()
    const durable = this.queueGroupName

    try {
      await jsm.consumers.info(stream, durable)
    } catch (e) {
      await jsm.consumers.add(stream, this.consumerConfig())
    }
  }

  parseMessage(msg) {
    return JSON.parse(Buffer.from(msg.data).toString("utf8"))
  }

  async listen() {
    await this.ensureConsumer()

    const js = this._nats.js()
    const sub = await js.subscribe(this.subject, { config: this.consumerConfig() })
    this._consume(sub)
  }

  async _consume(sub) {
    try {
      for await (const msg of sub) {
        console.log(`Event Received: ${msg.subject} / ${this.queueGroupName}`)
        const data = this.parseMessage(msg)
        await this.onMessage(data, msg)
      }
    } catch (err) {
      console.error("Listener crashed:", err)
    }
  }
}

exports.Listener = Listener
