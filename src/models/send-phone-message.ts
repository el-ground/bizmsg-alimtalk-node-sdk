import sendMessage from '#src/models/send-message/index'
import getCorrectError from '#src/utils/get-correct-error'

export const sendPhoneMessage = async (
  sendType: SendType,
  phoneNumber: string,
  phoneMessageType: string,
  message: string,
  senderPhoneNumber: string,
  profileKey: string,
  messageTitle?: string,
): Promise<CleanedJSON> => {
  const messageBody: string = JSON.stringify([
    {
      message_type: 'AT',
      phn: phoneNumber,
      profile: profileKey,
      msg: '',
      smsKind: phoneMessageType,
      msgSms: message,
      smsSender: senderPhoneNumber,
      smsLmsTit: messageTitle,
      smsOnly: 'Y',
    },
  ])

  const sendMessageResponse: CleanedJSON = await sendMessage(
    messageBody,
    sendType,
  )

  // throw error if response code of the notification message === 'fail'
  if (sendMessageResponse.code === 'fail') {
    throw getCorrectError(sendMessageResponse)
  }

  return sendMessageResponse
}
