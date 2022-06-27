import getCorrectError from './get-correct-error'

describe(`testing K-series errors`, () => {
  test(`K101 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'K101:NotAvailableSendMessage',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('K101')
    expect(messageError.message).toBe('NotAvailableSendMessage')
    expect(messageError.class).toBe('BLOCKED')
  })

  test(`K102 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'K102:InvalidPhoneNumber',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('K102')
    expect(messageError.message).toBe('InvalidPhoneNumber')
    expect(messageError.class).toBe('VALIDATION')
  })

  test(`K112 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'K112:InvalidUserKeyException',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('K112')
    expect(messageError.message).toBe('InvalidUserKeyException')
    expect(messageError.class).toBe('MANAGEMENT')
  })

  test(`K997 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'K997:ResponseTimeoutException',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('K997')
    expect(messageError.message).toBe('ResponseTimeoutException')
    expect(messageError.class).toBe('RETRIABLE')
  })
})

describe(`testing M-series errors`, () => {
  test(`M001 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'M001:ProcessingMessageSend',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('M001')
    expect(messageError.message).toBe('ProcessingMessageSend')
    expect(messageError.class).toBe('FAILED')
  })

  test(`M101 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'M101:NotAvailableSendMessage',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('M101')
    expect(messageError.message).toBe('NotAvailableSendMessage')
    expect(messageError.class).toBe('RETRIABLE')
  })

  test(`M102 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'M102:InvalidPhoneNumber',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('M102')
    expect(messageError.message).toBe('InvalidPhoneNumber')
    expect(messageError.class).toBe('VALIDATION')
  })

  test(`M103 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'M103:DoNotDisturb',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('M103')
    expect(messageError.message).toBe('DoNotDisturb')
    expect(messageError.class).toBe('BLOCKED')
  })

  test(`M300 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'M300',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('M300')
    expect(messageError.message).toBe('')
    expect(messageError.class).toBe('MANAGEMENT')
  })
})

describe(`testing E-series errors`, () => {
  test(`E100 VALIDATION`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'E100:InvalidJsonArray',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('E100')
    expect(messageError.message).toBe('InvalidJsonArray')
    expect(messageError.class).toBe('VALIDATION')
  })

  test(`E114 MANAGEMENT`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'E114:DeletedSender',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('E114')
    expect(messageError.message).toBe('DeletedSender')
    expect(messageError.class).toBe('MANAGEMENT')
  })
})

describe(`testing R-series errors`, () => {
  test(`R109 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'R109:DuplicatedMsgid',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('R109')
    expect(messageError.message).toBe('DuplicatedMsgid')
    expect(messageError.class).toBe('FAILED')
  })
})
