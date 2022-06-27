import getCorrectError from './get-correct-error'

describe(`testing K-series errors`, () => {
  test(`K101 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'K101:NotAvailableSendMessage',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('BLOCKED')
    expect(messageError.message).toBe('K101:NotAvailableSendMessage')
  })

  test(`K102 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'K102:InvalidPhoneNumber',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('VALIDATION')
    expect(messageError.message).toBe('K102:InvalidPhoneNumber')
  })

  test(`K112 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'K112:InvalidUserKeyException',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('MANAGEMENT')
    expect(messageError.message).toBe('K112:InvalidUserKeyException')
  })

  test(`K997 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'K997:ResponseTimeoutException',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('RETRIABLE')
    expect(messageError.message).toBe('K997:ResponseTimeoutException')
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
    expect(messageError.code).toBe('FAILED')
    expect(messageError.message).toBe('M001:ProcessingMessageSend')
  })

  test(`M101 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'M101:NotAvailableSendMessage',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('RETRIABLE')
    expect(messageError.message).toBe('M101:NotAvailableSendMessage')
  })

  test(`M102 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'M102:InvalidPhoneNumber',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('VALIDATION')
    expect(messageError.message).toBe('M102:InvalidPhoneNumber')
  })

  test(`M103 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'M103:DoNotDisturb',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('BLOCKED')
    expect(messageError.message).toBe('M103:DoNotDisturb')
  })

  test(`M300 FAILED`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'M300',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('MANAGEMENT')
    expect(messageError.message).toBe('M300')
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
    expect(messageError.code).toBe('VALIDATION')
    expect(messageError.message).toBe('E100:InvalidJsonArray')
  })

  test(`E114 MANAGEMENT`, () => {
    const mockCleanedJSON: CleanedJSON = {
      code: 'fail',
      msgid: 'MOCKMSGID',
      message: 'E114:DeletedSender',
    }

    const messageError: MessageError = getCorrectError(mockCleanedJSON)
    expect(messageError.code).toBe('MANAGEMENT')
    expect(messageError.message).toBe('E114:DeletedSender')
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
    expect(messageError.code).toBe('FAILED')
    expect(messageError.message).toBe('R109:DuplicatedMsgid')
  })
})
