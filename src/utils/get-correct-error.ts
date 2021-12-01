type errorType =
  | 'BLOCKED'
  | 'VALIDATION'
  | 'MANAGEMENT'
  | 'FAILED' // don't retry :(
  | 'RETRIABLE'

type errorDict = { [key: string]: errorType }

// https://alimtalk-api.bizmsg.kr/codeList.html
const bizmsgErrors: errorDict = {
  // K000		카카오 비즈메시지 발송 성공
  /* ! K101	NotAvailableSendMessage	수신불가 사용자
    알림톡/친구톡 수신이 가능한 사용자 조건은 아래와 같으며,
    아래 조건에 해당하지 않는 경우
    수신불가 사용자로 판단되어 알림톡/친구톡 발송에 실패됩니다.
    - 카카오톡채널 차단(알림톡 받지않기)을 하지 않은 사용자 (알림톡만 해당)
    - 카카오톡채널 친구추가 되어 있는 사용자 (친구톡만 해당)
    - 서버와 연결되어 있는 카카오톡 사용자
    - 발송 당일 가입한 사용자를 제외한 최근 7일(168시간) 내에 카카오톡을 사용한 사용자
    - 카카오톡에 연결된 전화번호(인증받은 전화번호)와 실제 기기의 전화번호가 같은 사용자 */
  K101: 'BLOCKED',
  //@ K102	InvalidPhoneNumber	전화번호 오류
  K102: 'VALIDATION',
  /* @ K103	OverLimitMessageLength	메시지 길이제한 오류
    - 알림톡 텍스트/이미지 타입 : 1,000자 초과
    - 알림톡 아이템리스트 타입 : 200자 초과
    - 친구톡 텍스트 타입 : 1,000자 초과
    - 친구톡 이미지 타입 : 400자 초과
    - 친구톡 이미지 와이드형 타입 : 76자 초과 */
  K103: 'VALIDATION',
  // @ K104	TemplateNotFound	템플릿을 찾을 수 없음
  K104: 'VALIDATION',
  // @ K105	NoMatchedTemplate	메시지 내용이 템플릿과 일치하지 않음
  K105: 'VALIDATION',
  // @ K106	InvalidImage	첨부 이미지 URL 또는 링크 정보가 올바르지 않음
  K106: 'VALIDATION',
  // # K107	TalkUserIdNotFound	유효하지 않은 app user id 요청
  K107: 'MANAGEMENT',
  // @ K108	NoMatchedTemplateButtonException	메시지 버튼/바로연결이 템플릿과 일치하지 않음
  K108: 'VALIDATION',
  // @ K109	NoMatchedTemplateTitleException	메시지 강조 표기 타이틀이 템플릿과 일치하지 않음
  K109: 'VALIDATION',
  // @ K110	ExceedMaxTitleLengthException	메시지 강조 표기 타이틀 길이 제한 초과 (50자)
  K110: 'VALIDATION',
  // @ K111	NoMatchedTemplateWithMessageTypeException	메시지 타입과 템플릿 강조유형이 일치하지 않음
  K111: 'VALIDATION',
  // # K112	InvalidUserKeyException	잘못된 형식의 유저키 요청
  K112: 'MANAGEMENT',
  // # K113	InvalidAppLink	유효하지 않은 app연결
  K113: 'MANAGEMENT',
  // # K114	InvalidBizNum	유효하지 않은 사업자번호
  K114: 'MANAGEMENT',
  // @ K115	MessageEmptyException	메시지가 비어 있음
  K115: 'VALIDATION',
  // @ K131	NoMatchedTemplateHeaderException	헤더가 템플릿과 일치하지 않음
  K131: 'VALIDATION',
  // @ K132	ExceedMaxHeaderLengthException	헤더 길이 제한 초과(16자)
  K132: 'VALIDATION',
  // @ K133	NoMatchedTemplateItemHighlightException	아이템 하이라이트가 템플릿과 일치하지 않음
  K133: 'VALIDATION',
  // @ K134	ExceedMaxItemHighlightTitleLengthException	아이템 하이라이트 타이틀 길이 제한 초과(이미지 없는 경우 30자, 이미지 있는 경우 21자)
  K134: 'VALIDATION',
  // @ K135	ExceedMaxItemHighlightDescriptionLengthException	아이템 하이라이트 디스크립션 길이 제한 초과(이미지 없는 경우 19자, 이미지 있는 경우 13자)
  K135: 'VALIDATION',
  // @ K136	NoMatchedTemplateItemListException	아이템 리스트가 템플릿과 일치하지 않음
  K136: 'VALIDATION',
  // @ K137	ExceedMaxItemDescriptionLengthException	아이템 리스트의 아이템의 디스크립션 길이 제한 초과(23자)
  K137: 'VALIDATION',
  // @ K138	NoMatchedTemplateItemSummaryException	아이템 요약정보가 템플릿과 일치하지 않음
  K138: 'VALIDATION',
  // @ K139	ExceedMaxItemSummaryDescriptionLengthException	아이템 요약정보의 디스크립션 길이 제한 초과(14자)
  K139: 'VALIDATION',
  // @ K140	InvalidItemSummaryDescriptionException	아이템 요약정보의 디스크립션에 허용되지 않은 문자 포함(통화기호/코드, 숫자, 콤마, 소수점, 공백을 제외한 문자 포함)
  K140: 'VALIDATION',
  // # K200	InvalidSenderKey	발신 프로필 키가 유효하지 않음
  K200: 'MANAGEMENT',
  // # K201	DeletedSender	삭제된 발신프로필
  K201: 'MANAGEMENT',
  // # K202	StoppedSender	차단 상태의 발신프로필
  K202: 'MANAGEMENT',
  // # K203	BlockedProfile	차단 상태의 카카오톡 채널 (카카오톡 채널 운영툴에서 확인)
  K203: 'MANAGEMENT',
  // # K204	DeactivatedProfile	닫힘 상태의 카카오톡 채널 (카카오톡 채널 운영툴에서 확인)
  K204: 'MANAGEMENT',
  // # K205	DeletedProfile	삭제된 카카오톡 채널 (카카오톡 채널 운영툴에서 확인)
  K205: 'MANAGEMENT',
  // # K206	DeletingProfile	삭제대기 상태의 카카오톡 채널 (카카오톡 채널 운영툴에서 확인)
  K206: 'MANAGEMENT',
  // # K207	SpammedProfile	메시지차단 상태의 카카오톡 채널 (카카오톡 채널 운영툴에서 확인)
  K207: 'MANAGEMENT',
  // @ K208	InvalidParameterException	링크버튼 형식 오류 (잘못된 파라메터 요청)
  K208: 'VALIDATION',
  // @ K209	NoValueJsonElement	json에서 name/value를 찾을 수 없음
  K209: 'VALIDATION',
  // @ K220	InvalidReceiveUser	전화번호 or app user id가 유효하지 않거나 미입력 요청
  K220: 'VALIDATION',
  // & K301	FailedToSendMessageByNoFriendshipException	메시지 전송 실패(테스트 서버에서 친구관계가 아닌 경우)
  K301: 'RETRIABLE',
  // @ K302	FailedToMatchTemplateException	템플릿 일치 확인시 오류 발생
  K302: 'VALIDATION',
  // @ K303	NoSendAvailableTimeException	메시지 발송 가능한 시간이 아님(친구톡 / 마케팅 메시지는 08시부터 20시 50분까지 발송 가능)
  K303: 'VALIDATION',
  // @ K304	ExceedMaxVariableLengthException	변수 글자수 제한 초과
  K304: 'VALIDATION',
  // @ K306	Button chat_extra(event)-InvalidExtra(EventName)Exception '([A-Za-z0-9_]{1,50})	상담/봇 전환 버튼 extra, event 글자수 제한 초과
  K306: 'VALIDATION',
  // & K401	UnknownMessageStatusError	알 수 없는 메시지 상태
  K401: 'RETRIABLE',
  // # K500	InvalidTestUser	(테스트발송) 관리자 혹은 일회성 인증을 받은 사용자가 아님
  K500: 'MANAGEMENT',
  // # K501	DailyTestLimitExceeded	(테스트 발송) 일일 발송량 초과
  K501: 'MANAGEMENT',
  // & K997	ResponseTimeoutException	결과 대기시간 지남(성공 불확실)
  K997: 'RETRIABLE',
  // & K998	FailedToSendMessageException	기타 오류로 메시지 전송 실패
  K998: 'RETRIABLE',
  // & K999	UnknownException	시스템 오류
  K999: 'RETRIABLE',
  // M000		SMS/LMS 발송 성공
  // $ M001	ProcessingMessageSend	SMS 발송 처리 중
  M001: 'FAILED',
  // & M101	NotAvailableSendMessage	메시지를 전송할 수 없음(connect failed)
  M101: 'RETRIABLE',
  // @ M102	InvalidPhoneNumber	전화번호 오류
  M102: 'VALIDATION',
  // ! M103	DoNotDisturb	수신자 착신거부
  M103: 'BLOCKED',
  // ! M104	SpamMessage	스팸 번호로 등록 됨
  M104: 'BLOCKED',
  // $ M105	TurnOff	수신자 단말기 전원 꺼짐
  M105: 'FAILED',
  /* @ M106	OverLimitMessageLength	메시지 길이제한 오류
    - SMS: 90 byte
    - LMS: 2,000 byte
    - MMS: 2,000 byte */
  M106: 'VALIDATION',
  // @ M107	DeniedSenderNumber	미등록된 SMS 발신번호
  M107: 'VALIDATION',
  // @ M108	InvalidImgUrl	이미지 URL 누락
  M108: 'VALIDATION',
  // @ M120	SmsInvalidParams	문자발송 파라메터 누락
  M120: 'VALIDATION',
  // @ M121	SmsEmojiText	문자 메시지에 이모지 포함되어 있음
  M121: 'VALIDATION',
  // @ M122	SmsEmojiSubject	LMS/MMS 문자 제목에 이모지 포함되어 있음
  M122: 'VALIDATION',
  // & M128	SmsServerInternalError	문자발송 서버 내부 오류
  M128: 'RETRIABLE',
  // & M129	SmsServerUnknownError	문자발송 서버 알수없는 오류
  M129: 'RETRIABLE',
  // @ M200		기대하지 않은 Head 또는 헤더필드 부적절함
  M200: 'VALIDATION',
  // @ M201		Body 필드의 부적절
  M201: 'VALIDATION',
  // @ M202		규격 오류
  M202: 'VALIDATION',
  // @ M203		발/착신 번호 에러
  M203: 'VALIDATION',
  // @ M204		컨텐츠 크기 오류
  M204: 'VALIDATION',
  // @ M205		컨텐츠 크기 초과
  M205: 'VALIDATION',
  // @ M206		첨부파일 개수 오류
  M206: 'VALIDATION',
  // @ M207		지원하지 않는 컨텐츠 존재
  M207: 'VALIDATION',
  // @ M208		컨텐츠 관련 기타
  M208: 'VALIDATION',
  // @ M209		시리얼넘버 오류(크기 초과등)
  M209: 'VALIDATION',
  // @ M210		잘못된 메시지 타입
  M210: 'VALIDATION',
  // & M211		동보 전송수 초과
  M211: 'RETRIABLE',
  // & M212		초당 처리 건수 초과
  M212: 'RETRIABLE',
  // # M300		일발송량 초과
  M300: 'MANAGEMENT',
  // # M301		월발송량 초과
  M301: 'MANAGEMENT',
  // @ M302		발송제한시간
  M302: 'VALIDATION',
  // # M303		잔액 부족
  M303: 'MANAGEMENT',
  // $ M304		중복발송- sn+da 중복
  M304: 'FAILED',
  // & M305		요청시간 오류 – pcclient에서 사용
  M305: 'RETRIABLE',
  // @ M306		전화번호 세칙 미준수 발신번호 사용
  M306: 'VALIDATION',
  // # M307		사전 미등록 발신번호 사용
  M307: 'MANAGEMENT',
  // # M308		발신번호 변작으로 등록된 발신번호 사용
  M308: 'MANAGEMENT',
  // # M309		번호도용문자차단서비스에 가입된 발신번호 사용
  M309: 'MANAGEMENT',
  // & M400		라우팅 정보 없음
  M400: 'RETRIABLE',
  // @ M403		메시지 크기 초과
  M403: 'VALIDATION',
  // & M404		실시간 전송 실패
  M404: 'RETRIABLE',
  // & M405		Gw자체 expired: 리포트 미수신
  M405: 'RETRIABLE',
  // & M406		Gw자체 expired: 미전송
  M406: 'RETRIABLE',
  // @ M407		첨부파일 관련 에러
  M407: 'VALIDATION',
  // & M408		기타
  M408: 'RETRIABLE',
  // ! M409		발신번호 스팸
  M409: 'BLOCKED',
  // ! M504		이통사 expired
  M504: 'BLOCKED',
  // ! M505		착신가입자 없음
  M505: 'BLOCKED',
  // ! M507		음영지역
  M507: 'BLOCKED',
  // ! M508		단말 수신용량 초과
  M508: 'BLOCKED',
  // ! M509		MMS를 미 지원 단말
  M509: 'BLOCKED',
  // ! M510		미 지원 단말
  M510: 'BLOCKED',
  // & M511		무응답 및 통화중
  M511: 'RETRIABLE',
  // ! M512		번호이동
  M512: 'BLOCKED',
  // ! M513		NPDB 에러(수신자 번호 등록 안됨, 번호 이동중)
  M513: 'BLOCKED',
  // ! M514		이통사의 컨텐츠에러
  M514: 'BLOCKED',
  // ! M515		이통사 전화번호 세칙 미준수 발신번호 사용
  M515: 'BLOCKED',
  // ! M516		이통사 사전 미등록 발신번호 사용
  M516: 'BLOCKED',
  // ! M517		이통사 발신번호 변작으로 등록된 발신번호 사용
  M517: 'BLOCKED',
  // ! M518		이통사 번호도용문자차단서비스에 가입된 발신번호
  M518: 'BLOCKED',
  // & M519		이통사 기타
  M519: 'RETRIABLE',
  // ! M520		가입자 일시정지
  M520: 'BLOCKED',
  // @ M701		일시적 용량초과
  M701: 'VALIDATION',
  // ! M703		중지된 고객
  M703: 'BLOCKED',
  // ! M704		미등록 고객
  M704: 'BLOCKED',
  // & M705		이미 연결됨
  M705: 'RETRIABLE',
  // ! M706		미지원 버전
  M706: 'BLOCKED',
  // @ M707		sms 발송 권한 없음
  M707: 'VALIDATION',
  // @ M708		mms 발송 권한 없음
  M708: 'VALIDATION',
  // @ M709		isms 발송 권한 없음
  M709: 'VALIDATION',
  // & M710		네트웍 에러 발생
  M710: 'RETRIABLE',
  // & M711		바인드 되지 않음
  M711: 'RETRIABLE',
  // @ M712		암호화 에러
  M712: 'VALIDATION',
  // @ M713		복호화 에러
  M713: 'VALIDATION',
  // # M714		발송권한 없음
  M714: 'MANAGEMENT',
  // @ M800		첨부 불가능한 확장자
  M800: 'VALIDATION',
  // @ M801		파일 사이즈가 0 또는 일정 크기 초과
  M801: 'VALIDATION',
  // @ M803		발송 번호 block 테이블에 등록된 상태
  M803: 'VALIDATION',
  // @ M804		내용 및 제목의 한글 인코딩 오류
  M804: 'VALIDATION',
  // @ M805		착신 번호의 번호 유효성 오류
  M805: 'VALIDATION',
  // @ M806		SMS/LMS 경우 내용이 없거나 LMS 2000byte 이상인 경우
  M806: 'VALIDATION',
  // @ M807		지정한 파일이 없을 경우, HTTP/FTP로 파일을 가져오지 못하는 경우
  M807: 'VALIDATION',
  // @ M808		회신 번호 미입력시 – NEW
  M808: 'VALIDATION',
  // @ M809		첨부 파일 개수 3개 초과
  M809: 'VALIDATION',
  // @ M811		착신번호 복호화 오류
  M811: 'VALIDATION',
  // @ M812		발신번호 복호화 오류
  M812: 'VALIDATION',
  // @ M813		메시지 내용 복호화 오류
  M813: 'VALIDATION',
  // & M900		발송요청이 지정한 시간보다 오래된 경우
  M900: 'RETRIABLE',
  // & M901		지정시간 리포트 미수신 실패 처리
  M901: 'RETRIABLE',
  // & M990		발송요청이 지정한 시간보다 오래된 경우
  M990: 'RETRIABLE',
  // & M998	ReportTimeoutException	이동통신사 결과 수신 시간 초과
  M998: 'RETRIABLE',
  // & M999	UnknownException	기타 시스템 오류
  M999: 'RETRIABLE',
  // @ E100	InvalidJsonArray	Request 데이터 오류 (json array 형식이 아닌 json object로 요청)
  E100: 'VALIDATION',
  // @ E101	InvalidData	Request 데이터 오류 (올바르지 않은 json 형식, json 파싱오류)
  E101: 'VALIDATION',
  // @ E102	InvalidProfileKey	발신 프로필 키가 없거나 유효하지 않음
  E102: 'VALIDATION',
  // @ E103	EmptyTemplateCode	템플릿 코드가 없음
  E103: 'VALIDATION',
  // @ E104	InvalidPhoneNumber	유효하지 않은 사용자 전화번호 (전화번호 형식 오류, 안심번호 등)
  E104: 'VALIDATION',
  // @ E105	InvalidSenderNumber	유효하지 않은 SMS 발신번호 (전화번호 형식 오류, 안심번호 등)
  E105: 'VALIDATION',
  // @ E106	EmptyMessage	메시지 내용이 없음
  E106: 'VALIDATION',
  // @ E107	SMSEmptyMessage	카카오 발송 실패시 SMS 전환 발송을 하는 경우 SMS 메시지 내용이 없음
  E107: 'VALIDATION',
  // @ E108	InvalidReservationDate	예약일자 이상(잘못된 예약일자 요청)
  E108: 'VALIDATION',
  // @ E109	DuplicatedMsgId	중복된 MsgId 요청
  E109: 'VALIDATION',
  // @ E110	RequestMsgIdNotFound	MsgId를 찾을 수 없음
  E110: 'VALIDATION',
  // @ E111	RequestImgNotFound	첨부 이미지 URL 정보를 찾을 수 없음
  E111: 'VALIDATION',
  // @ E112	OverLimitMessageLength	메시지 길이제한 오류(메시지 제한길이 또는 1,000자 초과)
  E112: 'VALIDATION',
  // @ E113	InvalidMsgIdLength	메시지ID 길이제한 오류(메시지ID 없음 또는 20자 초과)
  E113: 'VALIDATION',
  // # E114	DeletedSender	삭제된 발신프로필
  E114: 'MANAGEMENT',
  // # E115	StoppedSender	차단 상태의 발신프로필
  E115: 'MANAGEMENT',
  // # E116	BlockedProfile	차단 상태의 카카오톡 채널 (카카오톡 채널 운영툴에서 확인)
  E116: 'MANAGEMENT',
  // # E117	DeactivatedProfile	닫힘 상태의 카카오톡 채널 (카카오톡 채널 운영툴에서 확인)
  E117: 'MANAGEMENT',
  // # E118	DeletedProfile	삭제된 카카오톡 채널 (카카오톡 채널 운영툴에서 확인)
  E118: 'MANAGEMENT',
  // # E119	DeletingProfile	삭제대기 상태의 카카오톡 채널 (카카오톡 채널 운영툴에서 확인)
  E119: 'MANAGEMENT',
  // # E120	InvalidSMSProfile	발신프로필 문자발송 설정 안됨
  E120: 'MANAGEMENT',
  // @ E121	ItemsNotJsonFormat	ITEMS 잘못된 Json 형식
  E121: 'VALIDATION',
  // @ E122	ItemsLengthOverLimit	ITEMS 문자열 길이 1000자 초과
  E122: 'VALIDATION',
  // @ E123	HeaderLengthOverLimit	HEADER 문자열 길이 16자 초과
  E123: 'VALIDATION',
  // @ E124	InvalidButtonJsonObject	button1~button5 중 json object가 아닌 버튼이 존재함
  E124: 'VALIDATION',
  // @ E125	InvalidSMSKind	smsKind 유효성 오류
  E125: 'VALIDATION',
  // & E998	OverLimitRequest	최대 요청 수 초과
  E998: 'RETRIABLE',
  // & E999	UnknownException	시스템 오류
  E999: 'RETRIABLE',
  // R000		발송 예약 성공
  // $ R109	DuplicatedMsgid	중복된 MsgId 요청
  R109: 'FAILED',
}

export default (cleanedJSON: CleanedJSON): MessageError => {
  const errorCode: string = `${cleanedJSON.message}`.slice(0, 4)

  const messageError: MessageError = {
    code: errorCode,
    message: `${cleanedJSON.message}`.slice(5),
    class: bizmsgErrors[errorCode],
  }

  return messageError
}
