import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

export default async (
  messageID: string,
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

  const response = await fetch(
    `${serverHost}/v2/sender/report?profile=${process.env.BIZMSGPROFILEKEY}&msgid=${messageID}`,
    {
      method: 'get',
      headers: {
        userid: `${process.env.BIZMSGID}`,
      },
    },
  )
  const getReportResponse = (await response.json()) as MessageReportJSON

  // code, [SUCCESS]data.msgid?, [FAIL]message?
  const cleanedJSON: CleanedJSON = {
    code: getReportResponse.code,
    msgid: getReportResponse.data.msgid as string,
    message: getReportResponse.message as string,
  }

  return cleanedJSON
}
