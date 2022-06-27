import sendMessage from './index'

describe(`testing send-message with mocked node-fetch`, () => {
  test(`successive report returns correct CleanedJSON`, async () => {
    const response: CleanedJSON = await sendMessage(
      `messageBody`,
      'mock-success',
    )

    expect(response.code).toBe('success')
    expect(response.msgid).toBe('mockMessageID')
    expect(response.message).toBe('mockMessage')
  })

  test(`fail report returns correct CleanedJSON`, async () => {
    const response: CleanedJSON = await sendMessage(`messageBody`, 'mock-fail')

    expect(response.code).toBe('fail')
    expect(response.msgid).toBe('mockMessageID')
    expect(response.message).toBe('mockMessage')
  })
})
