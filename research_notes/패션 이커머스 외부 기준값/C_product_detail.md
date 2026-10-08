# 블록 C: 상세페이지 완비 → 전환율·반품률

> 작성 2026-10-08. **중요한 한계:** 이번 세션에서는 네트워크 정책 때문에 WebFetch가 모든 대상 도메인에서 막혔습니다(EGRESS_BLOCKED: corporate.zalando.com, baymard.com, elsevier.es, osuva.uwasa.fi, ink.library.smu.edu.sg, arxiv.org, biz.sbs.co.kr, newsroom.musinsa.com). 그래서 _rules.md 1번 기준의 '원문 확인' 숫자는 **0개**입니다. 아래 숫자는 모두 WebSearch 결과 요약에서 가져온 것이라 '2차 인용(검색 요약)'으로 표시했습니다. _rules.md 4번에 따라 URL도 모두 '(미확인)'입니다. 검색 결과에 나온 주소이고, 직접 열어 본 주소가 아닙니다. 보고서에 넣으려면 먼저 원문을 직접 열어 재확인해야 합니다.

표 열: 번호 | 숫자 | 무엇을 셌나 | 기준 기간 | 출처 | 발행일 | URL | 확인 정도 | 쓸 때 주의

## C1 실측 사이즈표·모델 착용 정보 유무 → 전환율·반품률 (2023~2026)

### Takeaway
2023~2026 자료 중 사이즈 정보가 반품에 주는 효과를 숫자로 낸 곳은 잘란도 발표(2025년 사이즈 반품 8% 방지)와 스웨덴 학술 관찰연구(사이즈 파인더 사용자의 반품 확률이 오히려 +0.65%)가 핵심입니다. 두 결과는 방향이 엇갈립니다. ASOS의 2023년 이후 공식 수치는 찾지 못했습니다.

### Cited Findings
| 번호 | 숫자 | 무엇을 셌나 | 기준 기간 | 출처 | 발행일 | URL | 확인 정도 | 쓸 때 주의 |
|---|---|---|---|---|---|---|---|---|
| C1-1 | 사이즈 관련 반품 8% 방지 | 잘란도 사이즈 솔루션(사이즈 안내 등)이 막은 사이즈 사유 반품 비율 | 2025년 | Zalando 기업 페이지 "How Zalando uses technology to help customers find the right size" | 2025~2026 추정(검색 요약상 '2025' 기준, 정확한 발행일 미확인) | https://corporate.zalando.com/en/node/11013 (미확인) | 2차 인용(검색 요약) / 회사 주장 | 연구 설계: 회사 자체 집계, 방법 미공개. 2023년 '사이즈 안내 없는 상품 대비 −10%'와 계산 방식이 달라 직접 비교할 수 없음 |
| C1-2 | 사이즈 사유 반품 −10% | 신체 치수 기반 사이즈 안내가 붙은 상품과 안 붙은 상품의 사이즈 반품 비교 | 2023년 (서비스 출시 2023-07) | Zalando 기업 발표(2023), just-style·mind.eu 보도 | 2023 | https://www.just-style.com/news/zalando-reduces-size-related-returns-with-new-tool/ (미확인) | 2차 인용 / 회사 주장 / 연도 오래됨(이미 본 자료) | 연구 설계: 안내 있는 상품과 없는 상품의 관찰 비교로 보이며, 무작위 실험 여부는 미공개 |
| C1-3 | 반품 중 약 1/3이 사이즈 사유 | 잘란도 전체 반품 가운데 사이즈 문제 비중 | 2025 페이지 기준 | Zalando "Returns at Zalando" | 2025-06(검색 요약) | https://corporate.zalando.com/en/node/10413 (미확인) | 2차 인용 / 회사 발표 | 같은 페이지에 '전 시장 평균 주문 상품의 50% 반품'이 있음. 상품 수 기준인지 금액 기준인지 확인 필요 |
| C1-4 | 사이즈 파인더 사용자의 반품 확률 +0.65%(%인지 %p인지 미확인), 다음 분기 고객생애가치 +7.51% | 사이즈 파인더 사용자와 비사용자의 반품 확률·CLV | 2015-07~2022-04 | Patel, Karlsson & Oghazi, "Fits like a glove? Knowledge and use of size finders and high-end fashion retail returns", *Journal of Innovation & Knowledge* | 2025 | https://www.elsevier.es/en-revista-journal-innovation-knowledge-376-articulo-fits-like-glove-knowledge-use-S2444569X25001246 (미확인, 열기 차단) | 2차 인용(검색 요약) / 학술 | 연구 설계: 관찰 데이터, 스웨덴 하이엔드 패션 플랫폼 1곳, 113개국 고객 75,707명, 주문 상품 496,365개. 실험이 아니므로 사용자가 스스로 고른 효과(자기선택 편의)가 섞여 있음. 회사 발표(C1-1, C1-2)와 방향이 반대 |
| C1-5 | 미국 데스크톱 의류 사이트 83%, 모바일 87%가 사이즈 정보 부족 / 테스트 참가자 84%가 사이즈 가이드 사용 | 벤치마크 사이트 비율, 사용성 테스트 참가자 비율 | 2022 | Baymard Institute "Apparel size information" | 2022-07-06 | https://baymard.com/blog/apparel-size-information (미확인, 차단) | 2차 인용 / 연구기관 / 연도 오래됨(이미 본 자료) | 연구 설계: 사이트 벤치마크와 정성 사용성 테스트. 전환율·반품률 숫자는 아님. 2023~2026 후속 숫자는 찾지 못함. Baymard 의류 모범사례 글(2025-02-25 업데이트)은 '사이트 90%가 의류 구매 과정의 핵심 요소를 1개 이상 놓친다'고 함 |
| C1-6 | 사이즈 파인더가 없는 테스트 사이트 36% | Baymard 벤치마크 사이트 중 사이즈 파인더가 없는 비율 | 발행일 미확인 | Baymard design examples "size finder" | 미확인 | https://baymard.com/ecommerce-design-examples/size-finder (미확인) | 2차 인용 | 표본 수가 페이지마다 다름(325, 327, 257 사이트) |

### Inferences
- 회사 발표(잘란도)는 사이즈 안내가 반품을 줄인다는 방향이고, 학술 관찰연구(Patel 외 2025)는 사용자 반품 확률이 오히려 약간 높다고 봅니다. 사이즈를 잘 모르는 고객이 파인더를 더 많이 쓰는 선택 효과일 수 있으며, 효과 크기는 연구 설계에 크게 좌우된다고 추정합니다.

### Gaps
- ASOS 2023~2026 공식 발표(Annual Report)에서 사이즈 정보와 반품을 연결한 숫자: 찾지 못함.
- 실측표 유무 자체(사이즈 추천 도구가 아닌 정적 실측표)를 다룬 2023~2026 무작위 실험: 찾지 못함.
- 모델 착용 정보(모델 키·착용 사이즈)의 효과 숫자: 찾지 못함.

## C2 상세 영상·360도 이미지 → 전환율·반품률

### Takeaway
학술·공식 숫자는 찾지 못했습니다. 잘란도는 영상 확대 후 반품률이 '크게 개선됐다'고만 말했고 숫자는 밝히지 않았습니다. 나머지 숫자는 모두 영상 벤더 자료이며 '회사 주장'입니다.

### Cited Findings
| 번호 | 숫자 | 무엇을 셌나 | 기준 기간 | 출처 | 발행일 | URL | 확인 정도 | 쓸 때 주의 |
|---|---|---|---|---|---|---|---|---|
| C2-1 | 숫자 없음 ("significant improvements in engagement and return rate") | 영상 콘텐츠와 고급 콘텐츠 확대 후 참여도·반품률 | 미공개 | Zalando 기업 페이지 | 2025(추정) | https://corporate.zalando.com/en/node/10413 (미확인) | 2차 인용 / 회사 주장 | 정성 표현이라 숫자로 쓰면 안 됨 |
| C2-2 | 반품률 영상 없음 43% → 영상 있음 29% | 브랜드 Never Fully Dressed 상품의 반품률 | 미공개 | Bambuser(영상 벤더) 고객 사례 | 미확인 | https://bambuser.com/customer-story/never-fully-dressed (미확인) | 2차 인용 / 회사 주장 | 단일 브랜드, 비교 설계 미공개 |
| C2-3 | 반품률 −2.4% | 모델 착용 영상이 있는 상품의 반품률 변화 | 미공개 | ClickValue(네덜란드 에이전시) 블로그 | 미확인 | https://acc.clickvalue.nl/blog/the-impact-of-product-videos-instead-of-photos-on-conversion (미확인) | 2차 인용 / 회사 주장 | 설계·표본 미공개 |
| C2-4 | 영상이 있는 상품 페이지의 전환율 +65% | 영상 페이지와 이미지만 있는 페이지의 전환 비교 | 미공개 | VideoPoint 블로그(Invesp 2024 인용) | 미확인 | https://videopoint.ai/blog/video-on-product-pages-increase-sales-fashion-data (미확인) | 2차 인용(3차) / 회사 주장 | 원 출처(Invesp)를 확인하지 못함 |
| C2-5 | 전환율 최대 +71.3% | 상품 영상 효과(전 업종) | 2016 | DemoUp(영상 벤더) 보도자료 | 2016 | https://www.24-7pressrelease.com/press-release/419911/study-statistics-show-impact-of-videos-in-online-shops (미확인) | 2차 인용 / 회사 주장 / 연도 오래됨 | 의류에 한정된 결과가 아님 |
| C2-6 | 온라인 패션 반품률 13~96%, 평균 53% | 패션 상품 반품률 범위(시각 정보로 반품 예측하는 연구) | 미공개 | MIT Sloan 박사논문 초록집(Marketing) | 2023 | https://mitsloan.mit.edu/sites/default/files/inline-files/Thesis%20Abstracts_Marketing.pdf (미확인) | 2차 인용 / 학술 | 영상 효과 연구가 아님. 반품률 범위의 참고값 |

### Inferences
- 영상·360도 이미지가 반품률을 낮춘다는 숫자는 모두 벤더 사례라서 외부 기준값으로 쓰기 어렵습니다.

### Gaps
- ASOS의 캣워크 영상 효과: 2006년 도입 보도만 있고 효과 숫자는 찾지 못함.
- 쇼피파이 공식 판매자 자료의 영상 효과 숫자: 찾지 못함.
- 무신사·29CM의 영상·360도 효과 발표: 찾지 못함.
- 360도 이미지만 따로 본 학술 연구: 찾지 못함.

## C3 상세 이미지 수·모델컷·AI 생성 이미지 → 전환

### Takeaway
통제 실험은 Vipshop A/B 테스트 1건(SMU 박사논문, 2025)뿐입니다. AI 모델 이미지를 넣었을 때 전환율이 +4.73%였습니다. 이보다 큰 숫자는 모두 벤더 주장입니다.

### Cited Findings
| 번호 | 숫자 | 무엇을 셌나 | 기준 기간 | 출처 | 발행일 | URL | 확인 정도 | 쓸 때 주의 |
|---|---|---|---|---|---|---|---|---|
| C3-1 | CTR +2.74%, 전환율 +4.73%, 앱 전체 GMV 추정 +0.63% | AI 생성 모델 이미지 적용 효과(6개 시나리오 중 가장 큰 효과) | 미확인 | Singapore Management University 박사논문(etd_coll/803) | 2025 | https://ink.library.smu.edu.sg/etd_coll/803 (미확인, 차단) | 2차 인용(검색 요약) / 학술 | 연구 설계: 중국 Vipshop 실서비스 A/B 테스트. 표본 크기 미확인. 상대 증가(%)인지 %p인지 원문 확인 필요 |
| C3-2 | 쇼핑객 76%가 플랫레이·콜라주보다 모델컷 선호 | 선호도 설문 응답 | 미확인 | Stylitics × Aha Studio | 미확인 | https://stylitics.com/resources/blog/ai-generated-images-pdps/ (미확인) | 2차 인용 / 회사 주장 | 연구 설계: 설문 411명. 선호도이며 실제 전환이 아님 |
| C3-3 | 전환율 +157%, 참여도 +40% | 럭셔리 리테일러 Milaner의 AI 모델 이미지 테스트 | 미공개 | Stylitics 블로그 | 미확인 | 위와 동일 (미확인) | 2차 인용 / 회사 주장 | 설계·표본·대조군 미공개 |
| C3-4 | AI 모델 전환율이 사람 모델보다 22% 낮음(주장) | 'Baymard 2026 연구'라고 인용됨 | 미확인 | Rewarx 블로그(경쟁 벤더) | 미확인 | https://www.rewarx.com/blogs/hm-jcrew-ai-models-ecommerce-worry (미확인) | 확인 불가 | 원래 Baymard 연구의 존재를 확인하지 못함. 쓰지 말 것 |

### Inferences
- AI 모델 이미지의 전환 효과는 통제 실험에서 한 자릿수 %로 나타나며, 벤더 주장(+157%)과 차이가 큽니다.

### Gaps
- 상세 이미지 개수와 전환율의 관계를 다룬 2023~2026 학술 연구: 찾지 못함.

## C4 '상세 완비' 지표 기준 (플랫폼 규칙)

### Takeaway
아마존은 의류 사이즈 속성(성별·연령대·사이즈 체계·사이즈 값)을 카탈로그 전체에 필수로 적용하고, 사이즈가 부정확하면 노출을 제한합니다. 쿠팡은 2026년 대표 이미지 정책 개정과 GTIN 의무화 미이행에 노출 제한을 거는 것으로 보도됐습니다. 네이버 상품정보제공고시의 의류 항목 원문과 무신사의 필수 항목·노출 가산은 확인하지 못했습니다.

### Cited Findings
| 번호 | 숫자/기준 | 무엇 | 기준 시점 | 출처 | 발행일 | URL | 확인 정도 | 쓸 때 주의 |
|---|---|---|---|---|---|---|---|---|
| C4-1 | 미국 의류 필수 속성: target gender, age range, apparel size class, apparel size value (+ 일부 유형은 body type, height) | 아마존 의류 사이즈 표준 | 2021년 1분기 시행(Tinuiti 보도), 현행 SP-API 문서 | Amazon SP-API 개발자 문서 "Listings Items guidance for complex attributes" / Zentail·Tinuiti | 미확인 | https://developer-docs.amazon/sp-api/docs/listings-items-guidance-for-complex-attributes (미확인) | 2차 인용 | 공식 문서는 직접 열지 못함 |
| C4-2 | 사이즈가 부정확하거나 형식이 틀린 리스팅은 상품 페이지에서 숨겨질 수 있음 / 깨끗한 사이즈는 사이즈 필터로 노출 | 아마존 노출 불이익 | 2021~ | Rithum·EcommerceBytes 보도 | 미확인 | https://www.rithum.com/blog/amazon-gets-set-to-update-apparel-size-standards-how-this-will-help-sellers-improve-customer-experience/ (미확인) | 2차 인용 | '상품 정보 품질 점수'의 공식 산식은 찾지 못함(Listing Quality Dashboard는 누락 속성만 표시) |
| C4-3 | 대표 이미지 정책 개정: 모델 착용·연출 이미지는 예외만 허용, 위반 시 업로드 제한·노출 제한·판매 제한 | 쿠팡 마켓플레이스 대표 이미지 | 시행 2026-07-07(보도) | 쿠팡 공지를 요약한 셀러 매체(sellernow) | 2026 | https://sellernow.co.kr/post/507455 (미확인, 해당 글인지 확실치 않음) | 2차 인용 | 의류 카테고리에 예외가 있는지 공지 원문 확인 필요 |
| C4-4 | GTIN 의무화 전면 시행: 미입력 시 신규 등록 실패, 기존 상품 '노출낮음' | 쿠팡 필수 속성 | 2026-06-01(블로그) | Windly 블로그 | 2026 | https://windly.cc/blog/coupang-gtin-wing-guide (미확인) | 2차 인용(블로그) | 의류에 적용되는 범위 미확인 |
| C4-5 | 상품명에서 중복 단어·무관 키워드·할인 정보 제외 권고 | 네이버 스마트스토어 상품명 가이드 | 미확인 | 블로그(ampm)가 인용한 스마트스토어 고객센터 | 미확인 | https://inside.ampm.co.kr/insight/60393 (미확인) | 2차 인용 | 상품정보제공고시 의류 항목(소재·색상·치수·제조자·제조국·세탁방법·제조연월·품질보증기준·A/S)은 검색 요약 수준이며 공정위 고시 원문 미확인 |
| C4-6 | 2025-01 기존 입점 브랜드도 품질 증빙 서류 제출 의무화 | 무신사 상품 등록 절차 강화 | 2025-01 | 무신사 뉴스룸 | 2025-01(추정) | https://newsroom.musinsa.com/newsroom-menu/2025-0123-2 (미확인) | 2차 인용 / 회사 발표 | 실측 정보 의무화가 아님 |
| C4-7 | 실측 비교 서비스(무신사 측정 방식 실측표와 고객이 이전에 산 옷 비교), 실측 필터 | 무신사 상세 기능. 회사는 '입점사 사이즈 교환·반품 업무 감소'라고 설명(숫자 없음) | 2021 | 무신사 뉴스룸 | 2021-11-04 | https://newsroom.musinsa.com/newsroom-menu/2021-1104-02 (미확인, 차단) | 2차 인용 / 회사 주장 / 연도 오래됨 | 반품 감소 숫자 없음 |

### Gaps
- 잘란도 파트너 콘텐츠 기준(필수 이미지 수 등): 찾지 못함.
- 아마존 '상품 정보 품질 점수' 산식: 찾지 못함.
- 쿠팡·네이버·무신사의 '상세 완비 → 검색 노출 가산' 공식 기준: 찾지 못함.

## C5 한국 온라인 의류 반품률과 사이즈 사유 비중

### Takeaway
한국의 공식 '온라인 의류 반품률'과 2023~2026년 사이즈 사유 비중 통계는 찾지 못했습니다. 한국소비자원 자료는 반품률이 아니라 피해구제 신청 건수입니다.

### Cited Findings
| 번호 | 숫자 | 무엇을 셌나 | 기준 기간 | 출처 | 발행일 | URL | 확인 정도 | 쓸 때 주의 |
|---|---|---|---|---|---|---|---|---|
| C5-1 | 11,903건 중 청약철회 거부 42.7%(5,078건). 11~12월 월평균 1,224건으로 연 월평균 992건보다 +23.4% | 온라인 의류 등 피해구제 신청 유형별 건수 | 2021~2023(3년) | 한국소비자원(SBS Biz 보도 인용) | 2024-11-01(기사) | https://biz.sbs.co.kr/amp/article/20000199401 (미확인, 차단) | 2차 인용 | 반품률이 아니라 분쟁 건수. kca.go.kr 원문 보도자료 미확인 |
| C5-2 | 반품 사유 1위 '화면 이미지와 실물 차이' 32.5%, 2위 사이즈 불일치(비율 미확인) | 학위논문 설문 | 미확인 | 이화여대 학위논문(dspace.ewha) | 미확인 | https://dspace.ewha.ac.kr/handle/2015.oak/181693 (미확인) | 2차 인용 / 학술 | 설문 표본·연도 미확인 |
| C5-3 | 온라인·카탈로그 의류 구매의 약 51.2%가 미착용 또는 반품, 주된 이유는 치수 불일치 | 설문 | 2002 | 한국 학술논문(koreascience JAKO200211921171267) | 2002 | https://koreascience.or.kr/article/JAKO200211921171267.page?lang=ko (미확인) | 2차 인용 / 학술 / 연도 오래됨 | 20년 이상 지난 자료 |
| C5-4 | '온라인 패션상품 반품 사유 중 사이즈 불만 비중이 가장 높음'(비율 미확인) | 한국 학술논문의 선행연구 정리 | 2024 | koreascience JAKO202418757626607 | 2024 | https://koreascience.or.kr/article/JAKO202418757626607.pdf (미확인) | 2차 인용 | 구체적 비율은 원문 확인 필요 |
| C5-5 | (참고·해외) 반품 사유 1위 사이즈, 소비자 58% | Akeneo 2025 Consumer Returns Report | 2025 | Akeneo(PIM 벤더) | 2025 | 검색 요약에만 나옴, URL 없음 | 2차 인용 / 회사 주장 | 한국 숫자 아님 |
| — | '국내 온라인 패션몰 평균 반품률 30~40%' | 물류업체 블로그(i-boss) | — | — | — | https://www.i-boss.co.kr/ab-6141-66235 (미확인) | 출처 없음 | 쓰지 말 것(_rules '출처 없는 업계 평균' 금지) |

### Gaps
- 한국 온라인 의류 반품률 공식 통계(국가데이터처, 한국소비자원): 찾지 못함.
- 2023~2026 한국 설문의 사이즈 사유 비중: 찾지 못함.

---

## 이 블록에서 가장 믿을 만한 숫자 3개 (모두 원문 재확인 필요)
1. C5-1 한국소비자원: 2021~2023 온라인 의류 피해구제 11,903건, 그중 청약철회 거부 42.7%. 공공기관 숫자이지만 보도 경유.
2. C1-4 Patel 외(2025, JIK): 관찰연구(고객 75,707명, 상품 496,365개)에서 사이즈 파인더 사용자의 반품 확률 +0.65%, CLV +7.51%. 동료심사 학술지.
3. C3-1 SMU 박사논문(2025): Vipshop A/B 테스트에서 AI 모델 이미지가 전환율 +4.73%, GMV +0.63%. 통제 실험.
(잘란도 C1-1·C1-2는 회사 주장이라 3위권에서 뺐습니다.)

## 찾지 못한 것
- ASOS의 2023~2026 사이즈·영상과 반품 관계 숫자, 무신사·29CM의 영상·실측 효과 숫자, 쇼피파이 공식 수치
- 360도 이미지 학술 연구, 이미지 개수와 전환 관계 연구
- 아마존 품질 점수 산식, 잘란도 콘텐츠 기준, 네이버·쿠팡·무신사 노출 가산 공식 기준
- 한국 온라인 의류 반품률 공식 통계, 최근 사이즈 사유 비중

## 출처마다 다른 숫자
- 잘란도 사이즈 효과: 2023년 −10%(안내 있는 상품과 없는 상품 비교)와 2025년 8% 방지(전체 사이즈 반품 중 비중)는 계산 기준이 다름.
- 사이즈 도구의 효과 방향: 잘란도 발표(반품 감소)와 Patel 외 2025(사용자 반품 확률 +0.65%)가 반대. 회사 내부 비교와 학술 관찰연구라는 설계 차이 때문일 수 있음.
- AI 모델 이미지: Vipshop 실험 +4.73% / Stylitics 사례 +157% / Rewarx가 인용한 'Baymard' −22%(존재 미확인).
- 반품 사유 1위: 한국 학위논문은 '화면과 실물 차이' 32.5%가 1위이고 사이즈가 2위. 해외 Akeneo는 사이즈 58%가 1위.

## 유료/막혀서 못 연 것
- 네트워크 정책 때문에 차단(EGRESS_BLOCKED): corporate.zalando.com, baymard.com, elsevier.es, osuva.uwasa.fi(Patel 논문 오픈 리포지토리), ink.library.smu.edu.sg, arxiv.org, biz.sbs.co.kr, newsroom.musinsa.com
- 프록시 로그에서 함께 거부된 도메인: sciencedirect.com, pubsonline.informs.org, mk.co.kr, edaily.co.kr
- Baymard 상세 연구 일부는 Premium 유료
