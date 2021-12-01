import insertKeyValueToMessage from '#src/utils/insert-key-value-to-message'

export default (
  phoneNumber: string,
  messageTemplate: MessageTemplate,
  keyValue: KeyValue,
): string => {
  const body = JSON.stringify([
    {
      // 알림톡(AT), 이미지 알림톡(AI), 친구톡(FT), 이미지 친구톡(FI), 와이드 이미지 친구톡 (FW)
      message_type: messageTemplate.message_type,
      // 사용자 전화번호
      phn: phoneNumber,
      // 발신 프로필키
      profile: process.env.BIZMSGPROFILEKEY,
      // 메시지 예약발송을 위한 시간
      reserveDt: messageTemplate.reserveDt || '',
      // 사용자에게 전달될 메세지
      msg: insertKeyValueToMessage(messageTemplate.msg, keyValue),
      // (강조표기형) 강조 표기할 메세지
      title: messageTemplate.title || '',
      // 템플릿 코드 (알림톡 필수)
      tmplId: messageTemplate.tmplId || '',
      // 문자메시지 전환발송시 SMS(S), LMS(L), MMS(M), 발송하지 않음(N)
      smsKind: messageTemplate.smsKind || '',
      // 카카오 비즈메시지 발송 실패 시 문자메시지 대체 발송을 위한 메시지 내용
      msgSms: messageTemplate.msgSms || '',
      // 문자메시지 발송을 위한 비즈엠 사이트에 등록 승인된 발신번호
      smsSender: messageTemplate.smsSender || '',
      // LMS 발송시 메시지 제목
      smsLmsTit: messageTemplate.smsLmsTit || '',
      // 카카오 발송과 관계 없이 문자메시지 전송 사용(Y), 미사용(N), 기본값(N)
      smsOnly: messageTemplate.smsOnly || '',
      // 친구톡 메시지 발송 시 광고성 메시지 필수 표기사항 노출여부 노출(Y), 미노출(N), 기본값(Y)
      ad_flag: messageTemplate.ad_flag || '',
      // 친구톡 발송 시 메시지에 첨부할 이미지 URL
      img_url: messageTemplate.ad_flag || '',
      // 첨부된 이미지 클릭시 이동할 URL
      img_link: messageTemplate.ad_flag || '',
      // 메세지에 첨부할 버튼
      button1: messageTemplate.button1 || {},
      button2: messageTemplate.button2 || {},
      button3: messageTemplate.button3 || {},
      button4: messageTemplate.button4 || {},
      button5: messageTemplate.button5 || {},
      // 메세지에 첨부할 바로연결
      quickReply1: messageTemplate.quickReply1 || {},
      quickReply2: messageTemplate.quickReply2 || {},
      quickReply3: messageTemplate.quickReply3 || {},
      quickReply4: messageTemplate.quickReply4 || {},
      quickReply5: messageTemplate.quickReply5 || {},
      quickReply6: messageTemplate.quickReply6 || {},
      quickReply7: messageTemplate.quickReply7 || {},
      quickReply8: messageTemplate.quickReply8 || {},
      quickReply9: messageTemplate.quickReply9 || {},
      quickReply10: messageTemplate.quickReply10 || {},
      // [모먼트 광고 전환 최적화 전용] 메시지 내 포함된 가격/금액/결제금액
      price: messageTemplate.price || '',
      // [모먼트 광고 전환 최적화 전용] 메시지 내 포함된 가격/금액/결제금액의 통화단위
      currency_type: messageTemplate.currency_type || '',
      // 아이템리스트형 메시지 상단에 표기할 제목
      header: messageTemplate.header || '',
      // 아이템리스트형 발송 메시지 정보
      items: messageTemplate.items || {},
    },
  ])

  return body
}
