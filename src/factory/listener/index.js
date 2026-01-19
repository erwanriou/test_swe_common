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
    console.log("[Listener] stream  =", stream)

    // ---- ENSURE CONSUMER ----
    try {
      const info = await jsm.consumers.info(stream, durable)
      console.log("[Listener] consumer exists", {
        delivered: info.delivered?.consumer_seq,
        ackFloor: info.ack_floor?.consumer_seq
      })
    } catch {
      console.log("[Listener] creating consumer")
      await jsm.consumers.add(stream, {
        durable_name: durable,
        ack_policy: AckPolicy.Explicit,
        deliver_policy: DeliverPolicy.All,
        ack_wait: this._ackWait * 1_000_000,
        filter_subject: this.subject
      })
      console.log("[Listener] consumer created")
    }

    // ---- IMPORTANT FIX IS HERE ----
    console.log("[Listener] pullSubscribe bind to stream")

    const sub = await js.pullSubscribe(this.subject, {
      durable,
      stream // ⬅️ THIS WAS MISSING, THIS IS THE BUG
    })

    // ---- FETCH LOOP ----
    for (;;) {
      console.log("[Listener] fetching…")
      const msgs = await sub.fetch(10, { expires: 1000 })

      let received = 0

      for (const msg of msgs) {
        received++
        console.log("[Listener] received", "subject=", msg.subject, "seq=", msg.seq)

        const data = this.parseMessage(msg)
        await this.onMessage(data, msg)
        msg.ack()
      }

      if (received === 0) {
        console.log("[Listener] no messages")
      }
    }
  }
}

module.exports = { Listener }
