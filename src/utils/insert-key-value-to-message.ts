export default (templateMessage: string, keyValue: KeyValue): string => {
  let message: string = templateMessage
  const keyInTemplateArray = templateMessage.match(
    /\#\{([^\}]+)\}/gm,
  ) as Array<string>

  if (!keyInTemplateArray) {
    return message
  }

  for (const keyInTemplate of keyInTemplateArray) {
    const key: string = keyInTemplate.toString().replace(/\#\{|\}/gm, '')

    // missing required key-value pair
    if (!keyValue[key]) {
      throw new Error('Missing required key-value pair')
    }

    message = message.replace(`#{${key}}`, `${keyValue[key]}`)
  }

  return message
}
