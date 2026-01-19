const { AckPolicy, DeliverPolicy } = require("nats")

// ABSTRACT CLASS FOR LISTEN NATS EVENT (JETSTREAM - SIMPLE + WORKING)
class Listener {
  subject // ABSTRACT
  queueGroupName // ABSTRACT
  _nats // PROTECTED
  _ackWait = 30 * 1000 // PROTECTED

  constructor(natsWrapper) {
    this._nats = natsWrapper
  }

  streamName() {
    return "EVENTS"
  }

  parseMessage(msg) {
    return JSON.parse(Buffer.from(msg.data).toString("utf8"))
  }

  async ensureStream() {
    const nc = this._nats.client()
    const jsm = await nc.jetstreamManager()

    try {
      await jsm.streams.info(this.streamName())
      console.log(`[Listener] stream ok: ${this.streamName()}`)
    } catch (e) {
      await jsm.streams.add({
        name: this.streamName(),
        subjects: [">"]
      })
      console.log(`[Listener] stream created: ${this.streamName()}`)
    }
  }

  async listen() {
    console.log(`[Listener] boot ${this.subject} / ${this.queueGroupName}`)

    await this.ensureStream()

    const js = this._nats.js()

    // NOTE: KEEP IT SIMPLE
    // - durable = queueGroupName (NO ":" PROBLEM)
    // - config is provided HERE (NO ack_policy undefined bug)
    const sub = await js.pullSubscribe(this.subject, {
      stream: this.streamName(),
      durable: this.queueGroupName,
      config: {
        durable_name: this.queueGroupName,
        ack_policy: AckPolicy.Explicit,
        ack_wait: this._ackWait * 1_000_000,
        deliver_policy: DeliverPolicy.All,
        filter_subject: this.subject
      }
    })

    console.log(`[Listener] subscribed ${this.subject} durable=${this.queueGroupName}`)

    for (;;) {
      const msgs = await sub.fetch(10, { expires: 1000 })

      for (const msg of msgs) {
        console.log(`[Listener] received ${msg.subject} seq=${msg.seq}`)
        const data = this.parseMessage(msg)
        await this.onMessage(data, msg)
        msg.ack()
      }
    }
  }
}

module.exports = { Listener }
