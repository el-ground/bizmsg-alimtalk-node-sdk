import getReport from './index'
import sendMessage from '../send-message/index'
import makeMessageBody from '../make-message-body'

const testProfileKey = process.env.BIZMSGPROFILEKEY as string

describe(`testing get-report with mocked node-fetch`, () => {
  test(`successive report returns correct CleanedJSON`, async () => {
    const response: CleanedJSON = await getReport(
      `messageID`,
      'mock-success',
      testProfileKey,
    )

    expect(response.code).toBe('success')
    expect(response.msgid).toBe('mockMessageID')
    expect(response.message).toBe('mockMessage')
  })

  test(`fail report returns correct CleanedJSON`, async () => {
    const response: CleanedJSON = await getReport(
      `messageID`,
      'mock-fail',
      testProfileKey,
    )

    expect(response.code).toBe('fail')
    expect(response.msgid).toBe('mockMessageID')
    expect(response.message).toBe('mockMessage')
  })
})

test(`successive report returns correct CleanedJSON`, async () => {
  const messagebody = makeMessageBody(
    process.env.TESTPHONENUM || '',
    {
      key: 'roout_mock',
      message_type: 'AT',
      msg: '#{key}',
      tmplId: 'roout_mock',
    },
    { key: 'val' },
    testProfileKey,
  )

  const sendResponse: CleanedJSON = await sendMessage(messagebody, 'test')

  expect(sendResponse.code).toBe('success')
  expect(sendResponse.message).toBe('K000')

  await new Promise((resolve) => setTimeout(resolve, 2000))

  const reportResponse: CleanedJSON = await getReport(
    sendResponse.msgid as string,
    'test',
    testProfileKey,
  )

  expect(reportResponse.code).toBe('success')
  expect(reportResponse.msgid).toBe(sendResponse.msgid)
  expect(reportResponse.message).toBe('K000')
})
