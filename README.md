# bizmsg-alimtalk-node-sdk

A module for sending Kakao notifications via Bizmsg API\
비즈엠 API를 이용한 알림톡 전송 지원 서비스

# Installing

Using npm:

```bash
$ npm install bizmsg-alimtalk-node-sdk
```

Using yarn:

```bash
$ yarn add bizmsg-alimtalk-node-sdk
```

# Methods

```bash
intializeMessageTemplate(Array<MessageTemplate>)
```

Initializes an _MessageTemplateDict_ object from an array of _MessageTemplate_ objects.\
Throws error if the given _MessageTemplate_ goes against Bizmsg's policy of message templates.

```bash
intializeButtonTemplate(Array<ButtonTemplate>)
```

Initializes a _ButtonTemplateDict_ object from an array of _ButtonTemplate_ objects.\
Throws error if the given _ButtonTemplate_ goes against Bizmsg's policy of button templates.

```bash
intializeQuickReplyTemplate(Array<QuickReplyTemplate>)
```

Initializes a _QuickReplyTemplateDict_ object from an array of _QuickReplyTemplate_ objects.\
Throws error if the given _QuickReplyTemplate_ goes against Bizmsg's policy of quick reply templates.

```bash
intializeItemListTemplate(Array<ItemListTemplate>)
```

Initializes an _ItemListTemplateDict_ object from an array of _ItemListTemplate_ objects.\
Throws error if the given _ItemListTemplate_ goes against Bizmsg's policy of item list templates.

```bash
sendMessageAndGetResponse({sendType: sendType, phoneNumber: number, messageTemplate: MessageTemplate, keyValue: KeyValue})
```

`sendType: *default*`\
Sends a Kakaotalk notification via BizmsgAPI and returns a _CleanedJSON_ containing the message ID of the sent message.\
Requires the following environmental variables: **BIZMSGID**, **BIZMSGPROFILEKEY**

**TODO** Update the environmental variables to that of *https://www.bizmsg.kr/*

**TODO** _messageTemplate_ must be pre-registered and authorized at *https://www.bizmsg.kr/*\
If the _messageTemplate_ provided to the method does not exactly match the ones authorized on the site, the method will throw an error.

`sendType: *mock-success*`\
Mocks a successive notification send request

`sendType: *mock-fail*`\
Mocks a failed notification send request

`sendType: *test*`\
Used for developmental testing purposes\
Requires the following environmental variables: **BIZMSGID**, **BIZMSGPROFILEKEY**, **TESTPHONENUM**

**TEST** Update the environmental variables to that of *https://dev-admin.bizmsg.kr/*

**TEST** _messageTemplate_ must be pre-registered and authorized at *https://dev-admin.bizmsg.kr/*\
If the _messageTemplate_ provided to the method does not exactly match the ones authorized on the site, the method will throw an error.

**TEST** Authorize template at *https://dev-admin.bizmsg.kr/*

```bash
curl -X POST 'https://dev-alimtalk-api.bizmsg.kr:1443/v2/partner/test/template/approve' -H "userid:*dev-userID*" -d "senderKey=*dev-senderKey*&templateCode=*dev-templateCode*"
```

**TEST** Authorize phone request

```bash
curl -X POST 'https://dev-alimtalk-api.bizmsg.kr:1443/v2/partner/test/user/token?phoneNumber=*phonenumber*'
```

**TEST** Authorize phone with token

```bash
curl -X POST 'https://dev-alimtalk-api.bizmsg.kr:1443/v2/partner/test/user/certify?phoneNumber=*phonenumber*&token=*token*'
```

**TEST** Add the Kakaotalk channel sending the notification
