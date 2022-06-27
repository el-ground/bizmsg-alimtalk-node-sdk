//ButtonTemplate
export function intializeButtonTemplate(
  buttonTemplateArray: Array<ButtonTemplate>,
): ButtonTemplateDict {
  const buttonTemplateDict: ButtonTemplateDict = {}

  for (const buttonTemplate of buttonTemplateArray) {
    const buttonTemplateType = [
      'WL',
      'AL',
      'DS',
      'BK',
      'MD',
      'BC',
      'BT',
      'AC',
      'BF',
      'P1',
      'P2',
      'P3',
    ]
    if (!buttonTemplateType.includes(buttonTemplate.type)) {
      throw new Error(
        `[${buttonTemplate.key}] Button template of ${
          buttonTemplate.type
        } is not one of the following accepted types: ${JSON.stringify(
          buttonTemplateType,
        )}`,
      )
    }

    if (buttonTemplate.type == 'WL' && !buttonTemplate.url_mobile) {
      throw new Error(
        `[${buttonTemplate.key}] Button template of type WL requires field url_mobile`,
      )
    }

    if (buttonTemplate.type == 'AL' && !buttonTemplate.scheme_ios) {
      throw new Error(
        `[${buttonTemplate.key}] Button template of type AL requires field scheme_ios`,
      )
    }

    if (buttonTemplate.type == 'AL' && !buttonTemplate.scheme_android) {
      throw new Error(
        `[${buttonTemplate.key}] Button template of type AL requires field scheme_android`,
      )
    }

    if (buttonTemplate.type == 'BF' && !buttonTemplate.biz_form_key) {
      throw new Error(
        `[${buttonTemplate.key}] Button template of type BF requires field biz_form_key`,
      )
    }

    if (
      ['P1', 'P2', 'P3'].includes(buttonTemplate.type) &&
      !buttonTemplate.plugin_id
    ) {
      throw new Error(
        `[${buttonTemplate.key}] Button template of type P1, P2, P3 requires field plugin_id`,
      )
    }

    if (
      buttonTemplate.type == 'P3' &&
      !(!!buttonTemplate.oneclick_id || !!buttonTemplate.product_id)
    ) {
      throw new Error(
        `[${buttonTemplate.key}] Button template of type P3 requires field oneclick_id or product_id`,
      )
    }

    buttonTemplateDict[buttonTemplate.key] = buttonTemplate
  }

  return buttonTemplateDict
}

//QuickReplyTemplate
export function intializeQuickReplyTemplate(
  quickReplyTemplateArray: Array<QuickReplyTemplate>,
): QuickReplyTemplateDict {
  const quickReplyTemplateDict: QuickReplyTemplateDict = {}

  for (const quickReplyTemplate of quickReplyTemplateArray) {
    const quickReplyTemplateType = ['WL', 'AL', 'BK', 'MD', 'BC', 'BT']
    if (!quickReplyTemplateType.includes(quickReplyTemplate.type)) {
      throw new Error(
        `[${quickReplyTemplate.key}] Quick reply template of ${
          quickReplyTemplate.type
        } is not one of the following accepted types: ${JSON.stringify(
          quickReplyTemplateType,
        )}`,
      )
    }

    if (quickReplyTemplate.type == 'WL' && !quickReplyTemplate.url_mobile) {
      throw new Error(
        `[${quickReplyTemplate.key}] Quick reply template of type WL requires field url_mobile`,
      )
    }

    if (quickReplyTemplate.type == 'AL' && !quickReplyTemplate.scheme_ios) {
      throw new Error(
        `[${quickReplyTemplate.key}] Quick reply template of type AL requires field scheme_ios`,
      )
    }

    if (quickReplyTemplate.type == 'AL' && !quickReplyTemplate.scheme_android) {
      throw new Error(
        `[${quickReplyTemplate.key}] Quick reply template of type AL requires field scheme_android`,
      )
    }

    quickReplyTemplateDict[quickReplyTemplate.key] = quickReplyTemplate
  }

  return quickReplyTemplateDict
}

//ItemListTemplate
export function intializeItemListTemplate(
  itemListTemplateArray: Array<ItemListTemplate>,
): ItemListTemplateDict {
  const itemListTemplateDict: ItemListTemplateDict = {}

  for (const itemListTemplate of itemListTemplateArray) {
    itemListTemplateDict[itemListTemplate.key] = itemListTemplate
  }

  return itemListTemplateDict
}

//MessageTemplate
export function intializeMessageTemplate(
  messageTemplateArray: Array<MessageTemplate>,
): MessageTemplateDict {
  const messageTemplateDict: MessageTemplateDict = {}

  for (const messageTemplate of messageTemplateArray) {
    const messageTemplateType = ['AT', 'AI', 'FT', 'FI', 'FW']
    if (!messageTemplateType.includes(messageTemplate.message_type)) {
      throw new Error(
        `[${messageTemplate.key}] Message template of ${
          messageTemplate.message_type
        } is not one of the following accepted types: ${JSON.stringify(
          messageTemplateType,
        )}`,
      )
    }

    if (!!messageTemplate.reserveDt) {
      if (
        messageTemplate.reserveDt !=
        parseInt(messageTemplate.reserveDt).toString()
      ) {
        throw new Error(
          `[${messageTemplate.key}] Message template field reserveDt can only contain numeral values`,
        )
      }

      if (messageTemplate.reserveDt.length != 16) {
        throw new Error(
          `[${messageTemplate.key}] Message template field reserveDt must be in the following dating format yyyyMMddHHmmss`,
        )
      }
    }

    if (
      ['AT', 'AI', 'FT'].includes(messageTemplate.message_type) &&
      messageTemplate.msg.length > 1000
    ) {
      throw new Error(
        `[${messageTemplate.key}] Message template of type AT, AI, FT cannot have field msg with more than 1000 characters`,
      )
    }

    if (
      messageTemplate.message_type == 'AT' &&
      !!messageTemplate.header &&
      messageTemplate.msg.length > 200
    ) {
      throw new Error(
        `[${messageTemplate.key}] Message template of type AT with an itemlist cannot have field msg with more than 200 characters`,
      )
    }

    if (
      messageTemplate.message_type == 'FI' &&
      messageTemplate.msg.length > 400
    ) {
      throw new Error(
        `[${messageTemplate.key}] Message template of type FI cannot have field msg with more than 400 characters`,
      )
    }

    if (
      messageTemplate.message_type == 'FW' &&
      messageTemplate.msg.length > 76
    ) {
      throw new Error(
        `[${messageTemplate.key}] Message template of type FW cannot have field msg with more than 76 characters`,
      )
    }

    if (messageTemplate.message_type == 'AT' && !messageTemplate.tmplId) {
      throw new Error(
        `[${messageTemplate.key}] Message template of type AT requires field tmplId`,
      )
    }

    messageTemplateDict[messageTemplate.key] = messageTemplate
  }

  return messageTemplateDict
}
