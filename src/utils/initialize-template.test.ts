import {
  intializeButtonTemplate,
  intializeQuickReplyTemplate,
  intializeItemListTemplate,
  intializeMessageTemplate,
} from './initialize-template'

describe(`button template initialization`, () => {
  test(`throws error on invalid button type`, () => {
    try {
      intializeButtonTemplate([{ key: 'key', name: 'name', type: 'invalid' }])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on button type WL without url_mobile field`, () => {
    try {
      intializeButtonTemplate([{ key: 'key', name: 'name', type: 'WL' }])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on button type AL without scheme_ios field`, () => {
    try {
      intializeButtonTemplate([{ key: 'key', name: 'name', type: 'AL' }])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on button type AL without scheme_android field`, () => {
    try {
      intializeButtonTemplate([
        { key: 'key', name: 'name', type: 'AL', scheme_ios: 'scheme_ios' },
      ])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on button type BF without biz_form_key field`, () => {
    try {
      intializeButtonTemplate([{ key: 'key', name: 'name', type: 'BF' }])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on button type P1 without plugin_id field`, () => {
    try {
      intializeButtonTemplate([{ key: 'key', name: 'name', type: 'P3' }])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on button type P2 without plugin_id field`, () => {
    try {
      intializeButtonTemplate([{ key: 'key', name: 'name', type: 'P3' }])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on button type P3 with neither oneclick_id nor product_id field`, () => {
    try {
      intializeButtonTemplate([
        { key: 'key', name: 'name', type: 'P3', plugin_id: 'plugin_id' },
      ])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`check the results on a successful intialization`, () => {
    const dict: ButtonTemplateDict = intializeButtonTemplate([
      { key: 'key', name: 'name', type: 'WL', url_mobile: 'url_mobile' },
    ])
    expect(dict['key'].name).toBe('name')
    expect(dict['key'].type).toBe('WL')
    expect(dict['key'].url_mobile).toBe('url_mobile')
  })
})

describe(`quick reply template initialization`, () => {
  test(`throws error on invalid quick reply type`, () => {
    try {
      intializeQuickReplyTemplate([
        { key: 'key', name: 'name', type: 'invalid' },
      ])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on quick reply type WL without url_mobile field`, () => {
    try {
      intializeQuickReplyTemplate([{ key: 'key', name: 'name', type: 'WL' }])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on quick reply type AL without scheme_ios field`, () => {
    try {
      intializeQuickReplyTemplate([{ key: 'key', name: 'name', type: 'AL' }])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on quick reply type AL without scheme_android field`, () => {
    try {
      intializeQuickReplyTemplate([
        { key: 'key', name: 'name', type: 'AL', scheme_ios: 'scheme_ios' },
      ])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`check the results on a successful intialization`, () => {
    const dict: QuickReplyTemplateDict = intializeQuickReplyTemplate([
      { key: 'key', name: 'name', type: 'WL', url_mobile: 'url_mobile' },
    ])
    expect(dict['key'].name).toBe('name')
    expect(dict['key'].type).toBe('WL')
    expect(dict['key'].url_mobile).toBe('url_mobile')
  })
})

describe(`item list template initialization`, () => {
  test(`check the results on a successful intialization`, () => {
    const dict: ItemListTemplateDict = intializeItemListTemplate([
      {
        key: 'key',
        item: {
          list: [
            { title: 'title1', description: 'description1' },
            { title: 'title2', description: 'description2' },
          ],
          summary: { title: 'summaryTitle', description: 'summaryDescription' },
        },
        itemHighlight: {
          title: 'itemHighlightTitle',
          description: 'itemHighlightDescription',
        },
      },
    ])
    expect(dict['key'].item?.list.length).toBe(2)
    expect(dict['key'].item?.list[0].title).toBe('title1')
    expect(dict['key'].item?.list[0].description).toBe('description1')
    expect(dict['key'].item?.list[1].title).toBe('title2')
    expect(dict['key'].item?.list[1].description).toBe('description2')
    expect(dict['key'].item?.summary?.title).toBe('summaryTitle')
    expect(dict['key'].item?.summary?.description).toBe('summaryDescription')
    expect(dict['key'].itemHighlight?.title).toBe('itemHighlightTitle')
    expect(dict['key'].itemHighlight?.description).toBe(
      'itemHighlightDescription',
    )
  })
})

describe(`quick reply template initialization`, () => {
  test(`throws error on invalid message type`, () => {
    try {
      intializeMessageTemplate([
        { key: 'key', message_type: 'invalid', msg: 'msg' },
      ])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on invalid reserveDt input characters`, () => {
    try {
      intializeMessageTemplate([
        { key: 'key', message_type: 'AT', msg: 'msg', reserveDt: 'a' },
      ])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on invalid reserveDt length`, () => {
    try {
      intializeMessageTemplate([
        { key: 'key', message_type: 'AT', msg: 'msg', reserveDt: '20211130' },
      ])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on AT message with invalid msg length`, () => {
    try {
      const msg: string = '1'.repeat(1001)
      intializeMessageTemplate([{ key: 'key', message_type: 'AT', msg: msg }])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on AT message with itemlist with invalid msg length`, () => {
    try {
      const msg: string = '1'.repeat(201)
      intializeMessageTemplate([
        { key: 'key', message_type: 'AT', msg: msg, header: 'header' },
      ])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on FI message with invalid msg length`, () => {
    try {
      const msg: string = '1'.repeat(401)
      intializeMessageTemplate([{ key: 'key', message_type: 'FI', msg: msg }])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on FW message with invalid msg length`, () => {
    try {
      const msg: string = '1'.repeat(77)
      intializeMessageTemplate([{ key: 'key', message_type: 'FW', msg: msg }])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test(`throws error on message type AT without tmplId field`, () => {
    try {
      intializeMessageTemplate([{ key: 'key', message_type: 'AT', msg: 'msg' }])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
