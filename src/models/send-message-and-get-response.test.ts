import { sendMessageAndGetResponse } from './send-message-and-get-response'

describe(`testing sendMessageAndGetResponse with mock results`, () => {
  const phoneNumber: string = 'phoneNumber'
  const messageTemplate: MessageTemplate = {
    key: 'roout_mock',
    message_type: 'AT',
    msg: '#{key}',
    tmplId: 'roout_mock',
  }
  const keyValue: KeyValue = { key: 'value' }

  const invalidPhoneNumber: string = 'invalidPhoneNumber'
  const invalidMessageTemplate: MessageTemplate = {
    key: 'mock_invalid',
    message_type: 'AT',
    msg: 'mock message',
  }
  const invalidKeyValue: KeyValue = { invalidKey: 'value' }

  const messageError: MessageError = { code: '', message: '' }

  test(`testing phone number validation when sending message`, async () => {
    try {
      await sendMessageAndGetResponse({
        phoneNumber: invalidPhoneNumber,
        messageTemplate: messageTemplate,
        keyValue: keyValue,
        sendType: 'test',
      })
      expect(true).toBe(false)
    } catch (error) {
      expect(typeof error).toBe(typeof messageError)
      expect((<MessageError>error).message).toBe('E104:InvalidPhoneNumber')
    }
  })

  test(`testing message category validation when making message body`, async () => {
    try {
      await sendMessageAndGetResponse({
        phoneNumber: phoneNumber,
        messageTemplate: invalidMessageTemplate,
        keyValue: keyValue,
        sendType: 'test',
      })
      expect(true).toBe(false)
    } catch (error) {
      expect(typeof error).toBe(typeof messageError)
    }
  })

  test(`testing key value validation when making message body`, async () => {
    try {
      await sendMessageAndGetResponse({
        phoneNumber: phoneNumber,
        messageTemplate: messageTemplate,
        keyValue: invalidKeyValue,
        sendType: 'test',
      })
      expect(true).toBe(false)
    } catch (error) {
      expect(typeof error).toBe(typeof messageError)
      expect((<Error>error).message).toBe('Missing required key-value pair')
    }
  })

  test(`testing output of a successive sendMessageAndGetResponse call`, async () => {
    const response = await sendMessageAndGetResponse({
      phoneNumber: phoneNumber,
      messageTemplate: messageTemplate,
      keyValue: keyValue,
      sendType: 'mock-success',
    })

    expect(response.msgid).toBe('mockMessageID')
  })
})
