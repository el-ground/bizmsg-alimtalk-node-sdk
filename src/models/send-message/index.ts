import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

export default async (
  messageBody: string,
  sendType: SendType,
): Promise<CleanedJSON> => {
  let serverHost: string = ''
  switch (sendType) {
    case 'test':
      serverHost = 'https://dev-alimtalk-api.bizmsg.kr:1443'
      break
    case 'mock-success':
      const mockSuccessReportJSON: CleanedJSON = {
        code: 'success',
        msgid: 'mockMessageID',
        message: 'mockMessage',
      }
      return mockSuccessReportJSON
    case 'mock-fail':
      const mockFailReportJSON: CleanedJSON = {
        code: 'fail',
        msgid: 'mockMessageID',
        message: 'mockMessage',
      }
      return mockFailReportJSON

    case 'default':
      serverHost = 'https://alimtalk-api.bizmsg.kr/'
      break
  }

  const response = await fetch(`${serverHost}/v2/sender/send`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
      userid: `${process.env.BIZMSGID}`,
    },
    body: messageBody,
  })

  const sendMessageResponseArray = await response.json()

  const sendMessageResponse: MessageSentJSON = Array.isArray(
    sendMessageResponseArray,
  )
    ? sendMessageResponseArray[0]
    : sendMessageResponseArray

  // code, [SUCCESS]data.msgid?, [FAIL]message?
  const cleanedJSON: CleanedJSON = {
    code: sendMessageResponse.code,
    msgid: sendMessageResponse.data.msgid as string,
    message: sendMessageResponse.message as string,
  }

  return cleanedJSON
}
