const { AckPolicy, DeliverPolicy } = require("nats")

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
    const nc = this._nats.client()
    const js = this._nats.js()
    const jsm = await nc.jetstreamManager()

    const stream = "EVENTS"
    const durable = `${this.queueGroupName}-${this.subject}`

    console.log("[Listener] boot")
    console.log("[Listener] subject =", this.subject)
    console.log("[Listener] durable =", durable)

    // ---- HARD RESET CONSUMER (ON PURPOSE) ----
    try {
      await jsm.consumers.delete(stream, durable)
      console.log("[Listener] old consumer deleted")
    } catch (_) {
      console.log("[Listener] no previous consumer")
    }

    // ---- CREATE *PULL* CONSUMER ----
    await jsm.consumers.add(stream, {
      durable_name: durable,
      ack_policy: AckPolicy.Explicit,
      deliver_policy: DeliverPolicy.All,
      ack_wait: this._ackWait * 1_000_000,
      filter_subject: this.subject
    })

    console.log("[Listener] pull consumer created")

    // ---- BIND TO EXISTING CONSUMER ----
    const sub = await js.pullSubscribe(this.subject, {
      durable,
      stream,
      bind: true
    })

    // ---- FETCH LOOP ----
    for (;;) {
      console.log("[Listener] fetching…")
      const msgs = await sub.fetch(10, { expires: 1000 })

      for (const msg of msgs) {
        console.log("[Listener] received", msg.subject, msg.seq)
        const data = this.parseMessage(msg)
        await this.onMessage(data, msg)
        msg.ack()
      }
    }
  }
}

module.exports = { Listener }
