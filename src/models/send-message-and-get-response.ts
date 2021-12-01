import makeMessageBody from '#src/models/make-message-body'
import sendMessage from '#src/models/send-message/index'
import getReport from '#src/models/get-report/index'
import getCorrectError from '#src/utils/get-correct-error'

export async function sendMessageAndGetResponse({
  phoneNumber,
  messageTemplate,
  keyValue,
  sendType,
}: {
  phoneNumber: string
  messageTemplate: MessageTemplate
  keyValue: KeyValue
  sendType: sendType
}): Promise<CleanedJSON> {
  // create message body based on template
  const messageBody: string = makeMessageBody(
    phoneNumber,
    messageTemplate,
    keyValue,
  )

  // send notification message
  const sendMessageResponse: CleanedJSON = await sendMessage(
    messageBody,
    sendType,
  )

  // throw error if response code of the notification message === 'fail'
  if (sendMessageResponse.code === 'fail') {
    throw getCorrectError(sendMessageResponse)
  }

  // get notification report
  // wait for the message to be sent by Kakao w/ exponential backoff
  let getReportResponse: CleanedJSON = { code: '' }
  for (let i = 1; i <= 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 2 ** i * 500))

    getReportResponse = await getReport(
      sendMessageResponse.msgid as string,
      sendType,
    )

    if (getReportResponse.code == 'success') {
      break
    }
  }

  // throw error if response code of the notification report === 'fail'
  if (getReportResponse.code === 'fail') {
    throw getCorrectError(getReportResponse)
  }

  // return unique message ID
  const cleanedJSON: CleanedJSON = { msgid: getReportResponse.msgid }
  return cleanedJSON
}
