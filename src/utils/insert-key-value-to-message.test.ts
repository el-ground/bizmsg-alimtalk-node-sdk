import insertKeyValueToMessage from './insert-key-value-to-message'

describe(`matching targets and key-value pairs`, () => {
  describe(`no targets`, () => {
    test(`empty target string`, () => {
      const newMessage = insertKeyValueToMessage('', {})
      expect(newMessage).toBe('')
    })

    test(`empty target with text`, () => {
      const newMessage = insertKeyValueToMessage('abccba', {})
      expect(newMessage).toBe('abccba')
    })
  })

  describe(`single target`, () => {
    test(`single target instance`, () => {
      const newMessage = insertKeyValueToMessage('#{a}', { a: 'apple' })
      expect(newMessage).toBe('apple')
    })

    test(`single target instance with text`, () => {
      const newMessage = insertKeyValueToMessage('abc#{a}abc', { a: 'apple' })
      expect(newMessage).toBe('abcappleabc')
    })

    test(`multiple target instances`, () => {
      const newMessage = insertKeyValueToMessage('#{a} #{a}', { a: 'apple' })
      expect(newMessage).toBe('apple apple')
    })

    test(`multiple target instances with text`, () => {
      const newMessage = insertKeyValueToMessage('abc#{a}abc#{a}abc', {
        a: 'apple',
      })
      expect(newMessage).toBe('abcappleabcappleabc')
    })
  })

  describe(`multiple targets`, () => {
    test(`multiple targets in order`, () => {
      const newMessage = insertKeyValueToMessage('#{a} #{b}', {
        a: 'apple',
        b: 'banana',
      })
      expect(newMessage).toBe('apple banana')
    })

    test(`multiple targets in reverse order`, () => {
      const newMessage = insertKeyValueToMessage('#{b} #{a}', {
        a: 'apple',
        b: 'banana',
      })
      expect(newMessage).toBe('banana apple')
    })

    test(`multiple targets in order with text`, () => {
      const newMessage = insertKeyValueToMessage('abc#{a}abc#{b}abc', {
        a: 'apple',
        b: 'banana',
      })
      expect(newMessage).toBe('abcappleabcbananaabc')
    })

    test(`multiple target instances in order`, () => {
      const newMessage = insertKeyValueToMessage('#{a}#{a}#{b}#{b}', {
        a: 'apple',
        b: 'banana',
      })
      expect(newMessage).toBe('appleapplebananabanana')
    })

    test(`multiple target instances in mixed order`, () => {
      const newMessage = insertKeyValueToMessage('#{a}#{b}#{a}#{b}', {
        a: 'apple',
        b: 'banana',
      })
      expect(newMessage).toBe('applebananaapplebanana')
    })

    test(`multiple target instances in mixed order with text`, () => {
      const newMessage = insertKeyValueToMessage(
        'abc#{a}abc#{b}abc#{a}abc#{b}abc',
        {
          a: 'apple',
          b: 'banana',
        },
      )
      expect(newMessage).toBe('abcappleabcbananaabcappleabcbananaabc')
    })
  })
})

describe(`non-matching targets and key-value pairs`, () => {
  describe(`more targets than key-value pairs`, () => {
    test(`single target`, () => {
      try {
        const newMessage = insertKeyValueToMessage('#{a}', {})
        expect(true).toBe(false)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((<Error>error).message).toBe('Missing required key-value pair')
      }
    })

    test(`single target with text`, () => {
      try {
        const newMessage = insertKeyValueToMessage('abc#{a}abc', {})
        expect(true).toBe(false)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((<Error>error).message).toBe('Missing required key-value pair')
      }
    })

    test(`multiple targets`, () => {
      try {
        const newMessage = insertKeyValueToMessage('#{a} #{b}', { b: 'banana' })
        expect(true).toBe(false)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((<Error>error).message).toBe('Missing required key-value pair')
      }
    })

    test(`multiple targets with text`, () => {
      try {
        const newMessage = insertKeyValueToMessage('abc#{a}abc#{b}abc', {
          b: 'banana',
        })
        expect(true).toBe(false)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((<Error>error).message).toBe('Missing required key-value pair')
      }
    })
  })

  describe(`key-value pair does not fully cover the targets`, () => {
    test(`single target`, () => {
      try {
        const newMessage = insertKeyValueToMessage('#{a}', { b: 'banana' })
        expect(true).toBe(false)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((<Error>error).message).toBe('Missing required key-value pair')
      }
    })

    test(`single target with text`, () => {
      try {
        const newMessage = insertKeyValueToMessage('abc#{a}abc', {
          b: 'banana',
        })
        expect(true).toBe(false)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((<Error>error).message).toBe('Missing required key-value pair')
      }
    })

    test(`multiple target`, () => {
      try {
        const newMessage = insertKeyValueToMessage('#{a} #{b} #{b} #{a}', {
          c: 'cat',
        })
        expect(true).toBe(false)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((<Error>error).message).toBe('Missing required key-value pair')
      }
    })

    test(`multiple target with text`, () => {
      try {
        const newMessage = insertKeyValueToMessage(
          'abc#{a}abc#{b}abc#{b}abc#{a}abc',
          {
            c: 'cat',
          },
        )
        expect(true).toBe(false)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((<Error>error).message).toBe('Missing required key-value pair')
      }
    })
  })
})
