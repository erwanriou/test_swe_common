class Publisher {
  subject // ABSTRACT

  constructor(natsWrapper) {
    this._nats = natsWrapper
  }

  async publish(data) {
    const js = this._nats.js()
    const payload = Buffer.from(JSON.stringify(data))

    const ack = await js.publish(this.subject, payload)
    console.log(`Event Published: ${this.subject} (seq=${ack.seq})`)
    return ack
  }
}

exports.Publisher = Publisher
