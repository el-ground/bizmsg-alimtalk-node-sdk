declare global {
  interface KeyValue {
    [key: string]: string
  }

  type SendType = 'default' | 'mock-success' | 'mock-fail' | 'test'

  type BizmsgResponse = any

  interface MessageSentJSON extends BizmsgResponse {
    code: string
    data: {
      phn: string
      type?: string
      msgid?: string
    }
    message?: string
    originMessage?: string
  }

  interface MessageReportJSON extends BizmsgResponse {
    code: string
    data: {
      msgid: string
    }
    message: string
    originMessage?: string
  }

  interface CleanedJSON extends BizmsgResponse {
    code?: string
    msgid?: string
    message?: string
  }

  interface MessageError {
    code: string
    message: string
    class: string
  }

  interface ButtonTemplateDict {
    [key: string]: ButtonTemplate
  }

  interface ButtonTemplate {
    // ButtonTemplateDict 액세스용 명칭
    key: string
    // 버튼 제목
    name: string
    // 버튼 타입: 웹링크(WL), 앱링크(AL), 배송조회(DS), 봇키워드(BK), 메세지 전달(MD)
    //          상담톡 전환(BC), 봇 전환(BT), 채널추가(AC), 비즈니스폼(BF), 이미지보안전송 플러그인(P1)
    //          개인정보이용 플러그인(P2), 원클릭결제 플러그인(P3)
    type: string
    // PC 환경에서 버튼 클릭 시 이동할 url
    url_pc?: string
    // 모바일 환경에서 버튼 클릭 시 이동할 url
    url_mobile?: string
    // IOS 환경에서 버튼 클릭 시 실행할 application custom scheme
    scheme_ios?: string
    // 안드로이드 환경에서 버튼 클릭 시 실행할 application custom scheme
    scheme_android?: string
    // 상담톡/봇 전환 시 전달할 메타정보
    chat_extra?: string
    // 봇 전환 시 연결할 봇 이벤트명
    chat_event?: string
    // 플러그인 ID
    plugin_id?: string
    // 플러그인 실행시 X-Kakao-Plugin-Relay-Id 헤더를 통해 전달 받을 값
    relay_id?: string
    // 원클릭 결제 플러그인에서 사용하는 결제 정보
    oneclick_id?: string
    // 원클릭 결제 플러그인에서 사용하는 결제 정보
    product_id?: string
    // 비즈폼 key
    biz_form_key?: string
  }

  interface QuickReplyTemplateDict {
    [key: string]: QuickReplyTemplate
  }

  interface QuickReplyTemplate {
    // ItemListTemplateDict 액세스용 명칭
    key: string
    // 바로연결 명
    name: string
    // 바로연결 타입: 웹링크(WL), 앱링크(AL), 봇키워드(BK), 메시지전달(MD), 상담톡전환(BC), 봇전환(BT)
    type: string
    // PC 환경에서 버튼 클릭 시 이동할 url
    url_pc?: string
    // 모바일 환경에서 버튼 클릭 시 이동할 url
    url_mobile?: string
    // IOS 환경에서 버튼 클릭 시 실행할 application custom scheme
    scheme_ios?: string
    // 안드로이드 환경에서 버튼 클릭 시 실행할 application custom scheme
    scheme_android?: string
  }

  interface ItemListTemplateDict {
    [key: string]: ItemListTemplate
  }

  interface ItemListTemplate {
    // ItemListTemplateDict 액세스용 명칭
    key: string
    // 아이템 정보
    item?: {
      // 아이템 리스트
      list: Array<{
        // 각 아이템 타이틀
        title: string
        // 각 아이템 설명
        description: string
      }>
      // 아이템 요약정보
      summary?: {
        // 아이템 요약정보 타이틀
        title: string
        // 아이템 가격정보
        description: string
      }
    }
    // 아이템 하이라이트
    itemHighlight?: {
      // 아이템 하이라이트 타이틀
      title: string
      // 아이템 하이라이트 설명
      description: string
    }
  }

  interface MessageTemplateDict {
    [key: string]: MessageTemplate
  }

  interface MessageTemplate {
    // MessageTemplateDict 액세스용 명칭
    key: string
    // 알림톡(AT), 이미지 알림톡(AI), 친구톡(FT), 이미지 친구톡(FI), 와이드 이미지 친구톡 (FW)
    message_type: string
    // 메시지 예약발송을 위한 시간
    reserveDt?: string
    // 사용자에게 전달될 메세지
    msg: string
    // (강조표기형) 강조 표기할 메세지
    title?: string
    // 템플릿 코드 (알림톡 필수)
    tmplId?: string
    // 문자메시지 전환발송시 SMS(S), LMS(L), MMS(M), 발송하지 않음(N)
    smsKind?: string
    // 카카오 비즈메시지 발송 실패 시 문자메시지 대체 발송을 위한 메시지 내용
    msgSms?: string
    // 문자메시지 발송을 위한 비즈엠 사이트에 등록 승인된 발신번호
    smsSender?: string
    // LMS 발송시 메시지 제목
    smsLmsTit?: string
    // 카카오 발송과 관계 없이 문자메시지 전송 사용(Y), 미사용(N), 기본값(N)
    smsOnly?: string
    // 친구톡 메시지 발송 시 광고성 메시지 필수 표기사항 노출여부 노출(Y), 미노출(N), 기본값(Y)
    ad_flag?: string
    // 친구톡 발송 시 메시지에 첨부할 이미지 URL
    img_url?: string
    // 첨부된 이미지 클릭시 이동할 URL
    img_link?: string
    // 메세지에 첨부할 버튼
    button1?: ButtonTemplate
    button2?: ButtonTemplate
    button3?: ButtonTemplate
    button4?: ButtonTemplate
    button5?: ButtonTemplate
    // 메세지에 첨부할 바로연결
    quickReply1?: QuickReplyTemplate
    quickReply2?: QuickReplyTemplate
    quickReply3?: QuickReplyTemplate
    quickReply4?: QuickReplyTemplate
    quickReply5?: QuickReplyTemplate
    quickReply6?: QuickReplyTemplate
    quickReply7?: QuickReplyTemplate
    quickReply8?: QuickReplyTemplate
    quickReply9?: QuickReplyTemplate
    quickReply10?: QuickReplyTemplate
    // [모먼트 광고 전환 최적화 전용] 메시지 내 포함된 가격/금액/결제금액
    price?: string
    // [모먼트 광고 전환 최적화 전용] 메시지 내 포함된 가격/금액/결제금액의 통화단위
    currency_type?: string
    // 아이템리스트형 메시지 상단에 표기할 제목
    header?: string
    // 아이템리스트형 발송 메시지 정보
    items?: ItemListTemplate
  }
}

export const defaultExport = 0
