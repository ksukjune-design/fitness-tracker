# 블록 D: 후기 수 → 전환 (후기 수, 사진·영상 후기, 한국 플랫폼)

> **확인 정도 공통 주의 (반드시 읽을 것)**
> 2026-10-08 조사 세션에서는 네트워크 정책 때문에 WebFetch와 curl이 모두 막혔습니다(EGRESS_BLOCKED). 막힌 곳은 spiegel.medill.northwestern.edu, bazaarvoice.com, powerreviews.com, retaildive.com, web.archive.org, mt.co.kr 등입니다. 그래서 **이 노트에는 원문을 직접 열어 확인한 숫자가 하나도 없습니다.** 모든 숫자는 WebSearch 결과 요약(검색 엔진이 해당 페이지에서 뽑은 문장)에서 가져왔습니다. 따라서 확인 정도는 모두 **'검색요약(원문 미열람)'**으로 표시했습니다. _rules.md 4번에 따라 URL에는 모두 **(미확인)**을 붙였습니다. 검색 결과에 나온 주소이고, 열어보지는 못했습니다.
> 경영진 보고에 쓰기 전에, 접근 가능한 환경에서 각 URL을 열어 숫자와 문구를 대조해야 합니다.
> 벤더(Bazaarvoice, PowerReviews)가 자기 서비스 효과로 낸 숫자는 모두 **'회사 주장'**입니다.

표 열: 번호 | 숫자 | 무엇을 셌나 | 기준 기간 | 출처 | 발행일 | URL | 확인 정도 | 쓸 때 주의

---

## D1. Spiegel Research Center(2017) '후기 5개면 구매 가능성 +270%'의 원문 정의와 2020~2026 새 연구

### Takeaway
'+270%'는 **후기 5개가 있는 상품의 구매 가능성을 후기 0개 상품과 비교한 값**입니다. 원전은 Spiegel Research Center, "How Online Reviews Influence Sales"(2017년 6월 eBook)입니다. 실험 결과가 아니라 리테일러 관측 데이터에서 나온 상관입니다. 저가 상품은 +190%, 고가 상품은 +380%였고, 고가 쪽 값은 고급 선물 리테일러 한 곳의 데이터입니다. 2020년 이후 학술 연구로는 Vana & Lambrecht(2021, Marketing Science)가 있습니다. 개별 후기가 평균 평점과 별개로 구매에 영향을 준다고 보고했지만, 이번 검색으로는 효과 크기 숫자를 확인하지 못했습니다.

**연구 설계 한 줄 (Spiegel 2017):** 관측 데이터(실험 아님). 선물 리테일러는 약 1,550만 페이지뷰, 상품 1,800개, 사용자 780만 명, 1년 치입니다. 평점 데이터는 PowerReviews가 제공했다고 알려져 있습니다(검색요약). 대조군 무작위 배정은 없습니다.

| 번호 | 숫자 | 무엇을 셌나 | 기준 기간 | 출처 | 발행일 | URL | 확인 정도 | 쓸 때 주의 |
|---|---|---|---|---|---|---|---|---|
| D1-1 | +270% | 후기 5개 상품의 구매 가능성(purchase likelihood), 후기 0개 상품 대비 | 리테일러 데이터 1년(정확한 연도 미확인) | Spiegel Research Center(Northwestern Medill), "How Online Reviews Influence Sales" | 2017-06(eBook 파일명 "Jun2017") | https://spiegel.medill.northwestern.edu/how-online-reviews-influence-sales/ (미확인) ; PDF https://spiegel.medill.northwestern.edu/wp-content/uploads/sites/2/2021/04/Spiegel_Online-Review_eBook_Jun2017_FINAL.pdf (미확인) | 검색요약(원문 미열람). 연도 오래됨 | '전환율'이 아니라 '구매 가능성(구매 확률)'입니다. 2차 자료(예: Lipscore)는 '5개 **이상**'이라고 쓰지만, 원문은 '5개'입니다. 후기 5개를 넘으면 추가 효과가 빠르게 줄어든다는 문구가 있습니다. 상관이며 인과가 아닙니다 |
| D1-2 | +190% | 저가 상품에서 후기 노출 시 전환(구매 가능성) 증가 | 상동 | 상동 | 2017 | 상동 (미확인) | 검색요약(2차 요약 경유) | 저가와 고가를 구분한 기준가격은 확인하지 못함 |
| D1-3 | +380% | 고가 상품에서 후기 노출 시 전환 증가 | 고급 선물 리테일러 1곳 데이터 | 상동 | 2017 | 상동 (미확인) | 검색요약(2차 요약 경유) | 리테일러 한 곳 결과. 일반화 주의 |
| D1-4 | 약 1,550만 페이지뷰 / 상품 1,800개 / 사용자 780만 명 / 1년 | 선물 리테일러 데이터 규모 | 1년 | 상동 | 2017 | 상동 (미확인) | 검색요약 | 다른 리테일러(D1-1에 쓰인 데이터)의 표본 크기는 따로 확인하지 못함 |
| D1-5 | 4.2~4.5점에서 구매 가능성 최고, 5.0에 가까울수록 하락 | 별점 구간별 구매 가능성 | PowerReviews 제공 CPG(소비재) 평점 DB | Medill 기사(2015), Spiegel PDF "4.5 stars are better than 5" | 2015(기사) | https://spiegel.medill.northwestern.edu/wp-content/uploads/sites/2/2021/04/Spiegel-research-reveals-4.5-stars-are-better-than-5-The-Medill-IMC-Spiegel-Research-Center.pdf (미확인) | 검색요약. 연도 오래됨 | 후기 수가 아니라 별점 숫자. 270%와 같은 연구가 아님 |
| D1-6 | 개별 후기가 평균 평점을 통제한 뒤에도 구매에 강한 영향. 5점 후기는 목록 내 위치가 중요 | 영국 리테일러, 최신순 정렬에서 후기 위치의 자연 변동을 이용 | 미확인 | Vana & Lambrecht, Marketing Science 40(4):708-730, DOI 10.1287/mksc.2020.1278 | 2021 | https://pubsonline.informs.org/doi/fpi/10.1287/mksc.2020.1278 (미확인) ; https://www.informs.org/News-Room/INFORMS-Releases/News-Releases/How-Influential-are-Individual-Online-Reviews-on-Consumer-Purchasing-Decisions (미확인) | 검색요약 | 효과 크기(%)를 확인하지 못함. 후기 '수'의 효과가 아니라 '개별 후기'의 효과 |
| D1-7 | 첫 후기가 부정적인 상품은 1년 뒤 평균 평점이 긍정 첫 후기 상품보다 0.29점 낮음 | 첫 후기의 긍·부정이 이후 평점과 후기 수에 미치는 영향 | 미확인 | Park, Shin & Xie, "The Fateful First Consumer Review", Marketing Science(2021 게재 예정으로 표기) | 2021 | https://sc.edu/study/colleges_schools/moore/about/press_room/news_and_announcements/2021/sungsik21.php (미확인) | 검색요약 | 매출이나 전환을 직접 측정하지 않았음(검색요약 기준) |

### Cited Findings
- Spiegel 페이지 문구: 후기 5개 상품의 구매 가능성은 후기 0개 상품보다 270% 높고, 처음 5개 이후에는 한계효과가 빠르게 줄어듭니다. — [Spiegel 페이지 (미확인)](https://spiegel.medill.northwestern.edu/how-online-reviews-influence-sales/)
- 저가 +190%, 고가 +380%. 380%는 고급 선물 리테일러 데이터입니다. — [Spiegel eBook PDF (미확인)](https://spiegel.medill.northwestern.edu/wp-content/uploads/sites/2/2021/04/Spiegel_Online-Review_eBook_Jun2017_FINAL.pdf). 2차 인용: [tooltester (미확인)](https://www.tooltester.com/en/blog/online-reviews-statistics/)
- Lipscore(벤더 블로그)는 '5개 이상, +270%'로 표현하고, Spiegel 출처로 '인증 구매자 배지 +15%'도 인용합니다. — [Lipscore (미확인)](https://lipscore.com/blog/product-reviews-increase-your-online-sales-by-270/). 2차 인용이며 원 출처는 Spiegel 2017입니다.
- 한 블로그는 '첫 후기 추가 시 +65%'를 Spiegel 출처로 인용합니다. Spiegel 원문에서는 확인하지 못했습니다. — [eevy.ai (미확인)](https://eevy.ai/blog/review-impact-on-conversion-rate-data)
- Vana & Lambrecht(2021): 개별 후기는 평균 평점을 통제한 뒤에도 구매에 강한 영향을 줍니다. 제품 불확실성을 해소하거나 평균 정보와 대비될 때 효과가 큽니다. — [INFORMS 보도자료 (미확인)](https://www.informs.org/News-Room/INFORMS-Releases/News-Releases/How-Influential-are-Individual-Online-Reviews-on-Consumer-Purchasing-Decisions)

### Inferences
- '+270%'는 '후기 0개 대비 5개'라는 좁은 비교입니다. '후기가 있으면 전환율이 3.7배'로 일반화하면 원문 정의를 벗어납니다.
- 원 데이터가 2010년대 중반 미국 리테일러(선물·소비재)이므로, 한국 패션 플랫폼 기준값으로는 방향성 정도로만 쓸 수 있습니다.

### Gaps
- Spiegel 원문 PDF를 열지 못해 다음 항목을 확인하지 못했습니다: 270%를 산출한 리테일러의 이름과 표본 크기, 데이터 연도, 저가·고가 기준가격. 검색 요약에는 선물 리테일러 표본(1,550만 PV 등)만 나왔습니다.
- 2022~2026년에 후기 '수'와 전환의 인과 효과를 추정한 학술 연구(필드 실험)는 이번 검색에서 찾지 못했습니다.

---

## D2. Bazaarvoice '후기 1개 +10%, 30개 +25%, 100개 +37%'의 원문, 그리고 2023~2026 후기 수 구간별 전환

### Takeaway
'1개 +10%, 30개 +25%, 100개 +37%'는 Bazaarvoice의 **Conversation Index Volume 8** 보도에서 확인됩니다. 후기 5,700만 건 이상, 상품 페이지뷰 350억 회 이상을 바탕으로 했고, 지표는 **'주문(orders)' 증가**입니다. 발표 시점은 2014~2015년 무렵으로 보이지만 정확한 날짜는 확인하지 못했습니다. 이후 Bazaarvoice 자료는 '50개 +30%', '0→100개 매출 최대 +37%'처럼 같은 숫자를 지표만 바꿔 다시 씁니다. PowerReviews는 2020~2021년 데이터로 '0→1개 +52.2%'를 냈습니다. 2023~2026년에 새로 집계한 후기 수 구간별 전환 곡선은 원 출처로 확인한 것이 없습니다.

**연구 설계 한 줄:** 두 회사 모두 자사 고객사 네트워크의 관측 데이터를 집계한 것입니다(실험 아님, 방법론 대부분 미공개). 모두 회사 주장입니다.

| 번호 | 숫자 | 무엇을 셌나 | 기준 기간 | 출처 | 발행일 | URL | 확인 정도 | 쓸 때 주의 |
|---|---|---|---|---|---|---|---|---|
| D2-1 | +10% | 상품 페이지에 후기 1개 추가 시 주문 증가 | 미확인 (Conversation Index Vol.8 데이터) | Bazaarvoice Conversation Index Vol.8 (Digital Commerce 360 보도) | 2014~2015 무렵(정확한 날짜 미확인) | https://www.digitalcommerce360.com/?p=8272 (미확인) | 검색요약, 2차 인용(언론), 회사 주장. 연도 오래됨 | '전환율'이 아니라 '주문(orders)' |
| D2-2 | +25% | 후기 0개에서 30개로 늘 때 주문 증가 | 상동 | 상동 | 상동 | 상동 (미확인) | 상동 | '1개에서 30개'가 아니라 '0개에서 30개' |
| D2-3 | +37% | 후기 0개에서 100개로 늘 때 주문 증가 | 상동 | 상동 | 상동 | 상동 (미확인) | 상동 | Bazaarvoice 블로그는 같은 숫자를 '매출 최대 +37%'로, eDesk는 '전환 +37% 이상'으로 표현. 지표 표현이 출처마다 다름 |
| D2-4 | 후기 5,700만 건+, 상품 페이지뷰 350억+ | Vol.8 분석 데이터 규모 | 미확인 | 상동 | 상동 | 상동 (미확인) | 상동 | — |
| D2-5 | 1개 +10%, 50개 +30%, 100개 +37% (주문) | 후기 수별 주문 증가 | 미확인 | Bazaarvoice SAP 앱센터 소개 페이지 | 미확인 | https://www.bazaarvoice.com/blog/bazaarvoice-sap-app-center (미확인) | 검색요약, 회사 주장 | 30개 대신 50개 구간이 등장함. 같은 데이터인지 확인 못함 |
| D2-6 | 주문 +9~56% | 후기 1개→15개 그리고 별점 3.5→4.5 동시 변화 시 주문 증가(카테고리별 차이) | 미확인 | Bazaarvoice FAQ 블로그 | 2019 | https://www.bazaarvoice.com/blog/top-5-faqs-reviews-answered/ (미확인) | 검색요약, 회사 주장 | 후기 수와 별점 변화가 섞인 값 |
| D2-7 | +52.2% | 후기 0개 → 1개 이상 상품의 전환율 증가 | 2020-05-12 ~ 2021-05-14 | PowerReviews 벤치마크 "Review Volume" | 미확인(2021 무렵) | https://www.powerreviews.com/review-volume/ (미확인) ; https://www.powerreviews.com/review-volume-conversion-impact/ (미확인) | 검색요약, 회사 주장 | PowerReviews 다른 페이지는 '1~100개 +76.7%', '10개 초과 +102.9%' 등 구간 정의가 다름 |
| D2-8 | +33.6% | **의류·잡화** 카테고리, 후기 1~10개 상품 전환율(후기 0개 대비) | 2020~2021 데이터 | PowerReviews | 미확인 | https://www.powerreviews.com/review-volume/ (미확인) | 검색요약, 회사 주장 | 패션에 가장 가까운 해외 구간 값. 같은 구간에서 전자제품 +70.5%, 헬스·뷰티 +22.1%, 가구 +56% |
| D2-9 | PDP의 60%가 후기 0개, 이 PDP들이 받는 트래픽은 12% | 후기 0개 상품 비중(웹 전체, PowerReviews 주장) | 미확인 | PowerReviews | 미확인 | https://www.powerreviews.com/how-many-product-reviews/ (미확인) | 검색요약, 회사 주장 | '인터넷 전체 PDP'라는 측정 범위가 불명확함. 한국 숫자 아님 |
| D2-10 | 조사 대상 7,000명+ (6개국), Savanta 실시, 2025년 7월 | Bazaarvoice Shopper Experience Index 2025(설문) | 2025-07 | Bazaarvoice 보도자료 | 2025-09-30 | https://www.bazaarvoice.com/press/bazaarvoice-shopper-experience-index-2025-as-ai-search-grows-in-popularity-ratings-and-reviews-feed-llms/ (미확인) | 검색요약 | 2025 SEI에서 후기 수 구간별 전환 숫자는 찾지 못함. 블로그는 8,000명+라고 적어 표본 수가 서로 다름 |
| D2-11 | 리뷰 진위 판단이 쇼핑 여정의 1위 불만(46%) | 설문 응답 비율 | 2025 | Bazaarvoice SEI 2025 | 2025 | 상동 (미확인) | 검색요약, 회사 설문 | 전환 숫자 아님 |
| D2-12 | 후기 수별 전환 증가: 5개 약 +3.5%, 25개 +4.6%, 200개+ +4.9% | Bazaarvoice SEI 2025 인용으로 표기 | 미확인 | LaunchMyStore(독일 블로그)의 2차 인용 | 미확인 | https://launchmystore.io/de/blog/ecommerce-product-reviews-build-trust (미확인) | 검색요약, 2차 인용. 원 출처 확인 못함 | 다른 Bazaarvoice 숫자와 크기가 크게 달라 신뢰 낮음. 사용 비권장 |

### Cited Findings
- Conversation Index Vol.8: 후기 1개 추가 시 주문 +10%, 0→30개 +25%, 0→100개 +37%. 데이터는 후기 5,700만 건 이상, 페이지뷰 350억 회 이상입니다. — [Digital Commerce 360 (미확인)](https://www.digitalcommerce360.com/?p=8272). 2차 인용이며 원 출처는 Bazaarvoice Conversation Index Vol.8입니다.
- Bazaarvoice 블로그: '후기 1개면 구매 +10%(자사 데이터)', '0→100개 매출 최대 +37%'. 근거 연구는 명시하지 않았습니다. — [Bazaarvoice 블로그 (미확인)](https://www.bazaarvoice.com/blog/new-playbook-for-crushing-the-conversion-game/). 회사 주장입니다.
- 2008년 Bazaarvoice 데이터: 후기 25개 이상 상품의 전환 +100%, 10개 미만 +30%. — 검색요약에만 언급되었고 URL은 특정하지 못했습니다. 아래 Gaps를 보세요.
- PowerReviews: 0→1개 +52.2%(2020-05-12~2021-05-14). 의류·잡화 1~10개 +33.6%. — [PowerReviews Review Volume (미확인)](https://www.powerreviews.com/review-volume/)
- PowerReviews는 이 수치를 상관으로 봐야 한다는 비판도 받습니다. 잘 팔리는 상품일수록 후기가 쌓이므로 역인과일 수 있다는 지적입니다. — [cleancommit (미확인)](https://cleancommit.io/blog/do-product-reviews-increase-conversion-rate/). 블로그 의견입니다.

### Inferences
- '1개 +10% / 30개 +25% / 100개 +37%'는 2014~2015년 무렵 Bazaarvoice 네트워크의 '주문' 기준 값입니다. '전환율'로 표기하면 원문과 어긋날 수 있습니다.
- Bazaarvoice와 PowerReviews는 0→1개 효과를 각각 +10%(주문)와 +52.2%(전환율)로 냅니다. 지표, 데이터 기간, 고객사 구성이 달라 직접 비교하면 안 됩니다.

### Gaps
- Conversation Index Vol.8의 정확한 발행일과 원문(PDF)은 찾지 못했습니다.
- 2023~2026년 Bazaarvoice·PowerReviews 보고서에서 후기 수 구간별 전환 곡선을 새로 낸 것은 원 출처로 확인하지 못했습니다(찾지 못함).
- 2008년 Bazaarvoice 숫자(25개 이상 +100%)의 원 URL은 특정하지 못했습니다.

---

## D3. 사진·영상 후기 효과 (PowerReviews 2022년 이후): '상호작용한 방문자'와 '노출만 된 방문자'

### Takeaway
PowerReviews 벤치마크(2022-06-28 이전 12개월, 상품 페이지 2,540만 개 이상, 사이트 3,600개 이상) 기준입니다. 사진·영상 후기와 **상호작용한 방문자는 전환이 평균 +114.4%**, **노출만 된 방문자는 +2.5%**입니다. 텍스트 포함 일반 후기는 상호작용 +128.0%, 노출 +19.8%입니다. 의류·잡화의 상호작용 효과는 사진·영상 +151%, 후기 +183.3%로 평균보다 큽니다. 모두 회사 주장이며 상관입니다. 상호작용하는 방문자는 원래 구매 의도가 높은 사람들이라는 선택 편향이 있습니다.

**연구 설계 한 줄:** PowerReviews 고객사 사이트의 방문 단위 관측 데이터입니다. 상호작용이나 노출 후 24시간 안의 전환을 집계했습니다. 실험이 아니고 회사 주장입니다.

| 번호 | 숫자 | 무엇을 셌나 | 기준 기간 | 출처 | 발행일 | URL | 확인 정도 | 쓸 때 주의 |
|---|---|---|---|---|---|---|---|---|
| D3-1 | +114.4% | 사진·영상 후기(visual UGC)와 **상호작용한** 방문자의 전환 증가(평균, 업종 전체) | 2022-06-28 이전 12개월 | PowerReviews "Visual UGC Benchmarks: Av. Interactor and Impression Conversion Lift" | 2022(추정, 미확인) | https://www.powerreviews.com/visual-ugc-interactor-impression-conversion/ (미확인) | 검색요약, 회사 주장 | 상호작용자는 원래 구매 의도가 높음(선택 편향) |
| D3-2 | +2.5% | 사진·영상 후기가 **노출만** 된 방문자의 전환 증가(업종 평균) | 상동 | 상동 | 상동 | 상동 (미확인) | 검색요약, 회사 주장 | 노출 효과는 작다는 것이 회사 스스로의 해석 |
| D3-3 | +151% | **의류·잡화**, 사진·영상 상호작용 전환 증가 | 상동 | 상동 | 상동 | 상동 (미확인) | 검색요약, 회사 주장 | 상위 업종: 자동차·모터스포츠 +161.3%, 가방·러기지 +157.7% |
| D3-4 | +8.2% | **신발**, 사진·영상 노출 전환 증가 | 상동 | 상동 | 상동 | 상동 (미확인) | 검색요약, 회사 주장 | 노출 상위 업종: 사무용품 +14.6%, 백화점·종합몰 +5.3% |
| D3-5 | 2,540만+ 상품 페이지, 3,600+ 사이트 | 분석 규모. 전환은 방문 단위로, 상호작용이나 노출 24시간 안 전환 | 상동 | 상동 | 상동 | 상동 (미확인) | 검색요약 | — |
| D3-6 | +128.0% (2021년 108.3%) | 일반 후기(ratings & reviews)와 **상호작용한** 방문자의 전환 증가(업종 평균) | 2022-06-28 이전 12개월 | PowerReviews "Ratings & Reviews: Av. Interactor and Impression Conversion Lift" | 2022(추정) | https://www.powerreviews.com/av-interactor-impression-conversion-lift/ (미확인) | 검색요약, 회사 주장 | 사진·영상이 아닌 후기 전체 |
| D3-7 | +19.8% | 후기 콘텐츠가 **노출된** 방문자의 전환 증가(업종 평균) | 상동 | 상동 | 상동 | 상동 (미확인) | 검색요약, 회사 주장 | — |
| D3-8 | +183.3% | **의류·잡화**, 후기 상호작용 전환 증가 | 상동 | 상동 | 상동 | 상동 (미확인) | 검색요약, 회사 주장 | 1위 가방·러기지 +185.7% |
| D3-9 | +103.9% | 사진·영상과 상호작용한 방문자 전환 증가 | 2022년 데이터 | PowerReviews "How UGC Impacts Conversion: 2023 Edition" | 2023 | https://www.powerreviews.com/how-ugc-impacts-conversion-2023/ (미확인) | 검색요약, 회사 주장 | 같은 판에서 UGC 전체 상호작용 +102.4%(2021 +100.6%) |
| D3-10 | +106.3% (전환율 5.9% vs 전체 2.8%) | 사진·영상 상호작용 방문자 전환 | 2021년 데이터(추정) | PowerReviews "Conversion Impact of UGC: 2022 Edition" | 2022 | https://www.powerreviews.com/conversion-impact-ugc-2022/ (미확인) | 검색요약, 회사 주장 | 같은 회사의 다른 판과 숫자와 연도 표기가 일치하지 않음 |
| D3-11 | +91.4% (전환율 6.6% vs 전체 3.4%) | 사진·영상 상호작용 방문자 전환 | 2020년 또는 2021년(페이지마다 표기가 다름) | PowerReviews 2021 analysis | 2021 | https://www.powerreviews.com/2021-ugc-conversion-impact-analysis/ (미확인) | 검색요약, 회사 주장 | 연도 표기 불일치 |
| D3-12 | +163.6% | 사진·영상 상호작용 시 전환 증가 | 미확인(연도 불명) | PowerReviews "Complete Guide to Ratings & Reviews" | 미확인 | https://www.powerreviews.com/the-complete-guide-to-ratings-reviews/ (미확인) | 검색요약, 회사 주장 | 기준 데이터 연도가 불명확. 사용 비권장 |
| D3-13 | 전환 +144%, 방문당 매출 +162% | 후기와 상호작용한 쇼핑객 | 미확인 | Bazaarvoice SEI 2023으로 인용됨(2차 인용) | 2023(추정) | https://smashballoon.com/ugc-statistics/ (미확인) | 검색요약, 2차 인용, 회사 주장 | 162%가 2022판인지 2023판인지 출처마다 다름 |

### Cited Findings
- 사진·영상 후기: 상호작용 +114.4%, 노출 +2.5%. 의류·잡화 상호작용 +151%, 신발 노출 +8.2%. 상품 페이지 2,540만 개 이상, 사이트 3,600개 이상, 2022-06-28 이전 12개월, 24시간 내 전환 기준입니다. — [PowerReviews (미확인)](https://www.powerreviews.com/visual-ugc-interactor-impression-conversion/). 회사 주장입니다.
- 일반 후기: 상호작용 +128.0%(2021 108.3%), 노출 +19.8%, 의류·잡화 상호작용 +183.3%. — [PowerReviews (미확인)](https://www.powerreviews.com/av-interactor-impression-conversion-lift/). 회사 주장입니다.
- 2023 Edition: 사진·영상 상호작용 +103.9%, UGC 전체 +102.4%. — [PowerReviews 2023 (미확인)](https://www.powerreviews.com/how-ugc-impacts-conversion-2023/). 회사 주장입니다.

### Inferences
- '상호작용'과 '노출'의 차이가 매우 큽니다(+114% 대 +2.5%). 사진 후기를 단순히 '보여주는 것'의 효과는 작게 측정됩니다. 큰 수치는 대부분 구매 의도가 높은 방문자의 자기 선택을 반영할 가능성이 큽니다.
- PowerReviews의 사진·영상 상호작용 수치는 같은 회사 안에서도 판마다 91.4%~163.6%로 흔들립니다. 하나만 고르면 오해가 생기므로 데이터 기간과 함께 써야 합니다.

### Gaps
- 2024~2026년 PowerReviews·Bazaarvoice의 '상호작용 대 노출' 분리 수치(새 판)는 찾지 못했습니다.
- 무작위 실험(A/B)으로 사진 후기 효과를 잰 공개 자료는 찾지 못했습니다.

---

## D4. 한국 플랫폼: 무신사 후기 수와 AI 후기 요약, 지그재그·에이블리 후기 정책, 후기 0개 상품 비중, 후기 수와 판매의 관계

### Takeaway
무신사는 2026-02-12에 'AI 후기 요약'을 출시했습니다. 최근 2년간 누적된 후기 약 2,100만 건(연간 약 1,152만 건, 월평균 약 96만 건)을 분석해 상품 상세페이지 후기 영역 상단에 배치한다고 발표했습니다(회사 발표, 언론 보도). 에이블리는 누적 후기 1,000만 건 돌파(전체 카테고리, 시점 미확인)와 뷰티 누적 후기 520만 건(2024-09), 이후 700만~735만 건을 발표했습니다. **한국 플랫폼의 '후기 0개 상품 비중'과 '후기 수에 따른 판매·전환 변화' 숫자는 찾지 못했습니다.** 지그재그의 후기 관련 공식 숫자도 찾지 못했습니다.

**연구 설계 한 줄:** 해당 없음. 회사 발표 수치(누적 건수 집계)이며 효과 연구가 아닙니다.

| 번호 | 숫자 | 무엇을 셌나 | 기준 기간 | 출처 | 발행일 | URL | 확인 정도 | 쓸 때 주의 |
|---|---|---|---|---|---|---|---|---|
| D4-1 | 약 2,100만 건 | 무신사 스토어 누적 실사용 후기(AI 후기 요약 분석 대상) | 최근 2년(발표 시점 기준) | 무신사 발표, 머니투데이·한국경제·EBN 등 보도 | 2026-02-12 | https://www.mt.co.kr/living/2026/02/12/2026021210064733610 (미확인) ; https://www.hankyung.com/article/202602122755i (미확인) ; https://www.ebn.co.kr/news/articleView.html?idxno=1699569 (미확인) | 검색요약(언론 2차 인용, 원 출처는 무신사 보도자료), 회사 발표 | '최근 2년' 누적. 전체 누적이 아님 |
| D4-2 | 연간 약 1,152만 건, 월평균 약 96만 건 | 무신사 후기 작성 속도 | 미확인(발표 시점 직전 기간으로 보임) | 상동 | 2026-02-12 | 상동 (미확인) | 검색요약, 회사 발표 | 상품 수로 나눈 '상품당 후기 수'는 공개되지 않음 |
| D4-3 | 약 80% | AI 후기 요약 출시 후 5일간 이용 고객 중 '도움돼요' 선택 비율 | 출시 후 5일 | 상동 | 2026-02-12 이후 보도 | 상동 (미확인) | 검색요약, **회사 주장** | 만족도이며 전환 효과가 아님. 출시 당시 베타 단계 |
| D4-4 | 상품 1개당 최대 3,500원 | 무신사, 오프라인 매장 구매 상품에 앱 후기 작성 시 적립금(환불하면 회수) | 정책 시행 시점 | 헤럴드경제 | 미확인 | https://biz.heraldcorp.com/article/10415847 (미확인) | 검색요약 | 정책 숫자 |
| D4-5 | 월 최대 100만 원 상당 추가 적립금 | 무신사 '후기왕'(우수 후기 작성자 순위 보상) | 2025-07 출시 | 무신사 뉴스룸, ZDNet Korea | 2025-07-03 | https://newsroom.musinsa.com/newsroom-menu/2025-0703 (미확인) ; https://zdnet.co.kr/view/?no=20250703095055 (미확인) | 검색요약, 회사 발표 | 회사가 밝힌 목적은 '체류 시간 증가'이며 전환 숫자는 없음 |
| D4-6 | 2,000원 | 무신사 '스타일 후기'(전신 착용컷 + 20자 이상) 적립금 | 2023 보도 시점 | 일간스포츠 | 2023-05-08(URL 기준) | https://isplus.com/article/view/isp202305080143 (미확인) | 검색요약 | 현재 정책과 다를 수 있음 |
| D4-7 | 누적 1,000만 건, 약 초당 1건 | 에이블리 전체 누적 후기 | 발표 시점(미확인, 2021년 무렵 추정) | 플래텀 | 미확인 | https://platum.kr/archives/158923 (미확인) | 검색요약, 회사 발표. 연도 오래됨 가능 | 발행일 미확인 |
| D4-8 | 520만 건(1년 전 250만 건에서 +110%), 포토 후기 비중 70% 육박 | 에이블리 **뷰티** 카테고리 누적 후기와 포토 후기 비중 | 2024년(발표 시점) | 한국금융신문 | 2024-09-20 | https://www.fntimes.com/html/view.php?ud=202409200840353870b5b890e35c_18 (미확인) | 검색요약, 회사 발표 | 패션이 아닌 뷰티 카테고리 |
| D4-9 | 700만 건 돌파(본문에는 735만 건), 사진 후기 전월 대비 +25% | 에이블리 뷰티 누적 후기 | 미확인(2025년 무렵) | 패션비즈 | 미확인 | https://fashionbiz.co.kr/article/219704 (미확인) | 검색요약, 회사 발표 | 제목과 본문 숫자가 다름(집계 기준 차이로 보임). 뷰티 카테고리 |
| D4-10 | 찾지 못함 | 지그재그(카카오스타일) 누적 후기 수, 후기 정책 숫자 | — | — | — | — | 찾지 못함 | — |
| D4-11 | 찾지 못함 | 한국 패션 플랫폼의 후기 0개 상품 비중 | — | — | — | — | 찾지 못함 | 해외 PowerReviews '60%'(D2-9)로 대체하면 안 됨 |
| D4-12 | 찾지 못함 | 한국 플랫폼에서 후기 수에 따른 판매·전환 변화(회사 발표 또는 학술) | — | — | — | — | 찾지 못함 | — |

### Cited Findings
- 무신사 AI 후기 요약: 2026-02-12 발표. 최근 2년 누적 후기 약 2,100만 건(연 약 1,152만 건, 월 약 96만 건)을 분석하고, 장단점('참고할 점') 요약과 카테고리별 키워드(바지는 사이즈·핏·신축성, 아우터는 디자인·보온성·소재)를 제공합니다. 출시 5일간 이용자의 약 80%가 '도움돼요'를 눌렀다는 수치는 회사 주장입니다. — [머니투데이 (미확인)](https://www.mt.co.kr/living/2026/02/12/2026021210064733610); [한국경제 (미확인)](https://www.hankyung.com/article/202602122755i); [인사이트코리아 (미확인)](https://www.insightkorea.co.kr/news/articleView.html?idxno=241191)
- 무신사 후기왕: 2025-07 출시, 월 최대 100만 원 상당 추가 적립금. — [무신사 뉴스룸 (미확인)](https://newsroom.musinsa.com/newsroom-menu/2025-0703)
- 에이블리 뷰티 누적 후기 520만 건, 포토 후기 비중 70%에 육박. — [한국금융신문 (미확인)](https://www.fntimes.com/html/view.php?ud=202409200840353870b5b890e35c_18)
- 체험단 후기: 무신사 체험단은 15~25명 정도를 선정한다는 보도가 있습니다. 전환 기여 숫자는 없습니다. — [어패럴뉴스 (미확인)](https://m.apparelnews.co.kr/news/news_view/?idx=206812)

### Inferences
- 한국 플랫폼은 후기 '양'(누적 건수)과 후기 '보상 정책'은 발표하지만, 후기 수와 전환의 관계는 공개하지 않았습니다(이번 검색 범위 기준).

### Gaps
- 지그재그와 에이블리의 후기 적립금 정책 상세(금액)는 신뢰할 출처로 확인하지 못했습니다.
- 한국 패션 플랫폼의 후기 0개 상품 비중, 후기 수 구간별 전환이나 판매 숫자는 찾지 못했습니다.
- 한국 학술(KCI)에서 패션 플랫폼 후기 수와 판매를 다룬 논문은 이번 검색에서 찾지 못했습니다. RISS나 DBpia 직접 검색이 필요합니다.

---

### 이 블록에서 가장 믿을 만한 숫자 3개
(모두 원문 미열람이므로 '상대적으로' 믿을 만한 순서입니다)
1. **D1-1 Spiegel +270%** (후기 5개 상품 대 0개 상품의 구매 가능성, 2017). 학술기관 원전이고 정의가 명확합니다. 다만 연도가 오래됐고 상관입니다.
2. **D4-1·D4-2 무신사 후기 약 2,100만 건(최근 2년), 연 약 1,152만 건** (2026-02-12). 여러 언론이 같은 숫자를 보도했습니다. 회사 발표입니다.
3. **D3-1·D3-2 PowerReviews 사진·영상 후기 상호작용 +114.4% 대 노출 +2.5%** (2022-06-28 이전 12개월, 2,540만 PDP). 정의와 표본은 명시되어 있지만 회사 주장입니다.

### 찾지 못한 것
- 한국 패션 플랫폼의 후기 0개 상품 비중
- 한국 플랫폼에서 후기 수와 판매·전환의 관계 숫자
- 지그재그(카카오스타일) 후기 관련 공식 숫자
- 2023~2026년 Bazaarvoice·PowerReviews의 후기 수 구간별 전환 새 집계
- 2022~2026년 후기 수 효과를 인과로 추정한 학술 연구의 효과 크기
- Bazaarvoice Conversation Index Vol.8 원문과 정확한 발행일

### 출처마다 다른 숫자
- **0→1개 후기 효과:** Bazaarvoice 주문 +10%(Vol.8, 2014~2015 무렵), PowerReviews 전환율 +52.2%(2020~2021), 블로그가 Spiegel 출처로 인용한 +65%(원문 미확인). 지표(주문 대 전환율)와 기간이 다릅니다.
- **100개 +37%:** Bazaarvoice 원래 보도는 '주문', Bazaarvoice 블로그는 '매출 최대', eDesk는 '전환율 이상'으로 표현합니다.
- **Spiegel 270%:** 원문은 '후기 5개', 일부 2차 자료는 '5개 이상'입니다.
- **PowerReviews 사진·영상 상호작용 전환 증가:** 91.4%(2020 또는 2021 데이터), 106.3%(2022판), 103.9%(2023판, 2022 데이터), 114.4%(2022-06 이전 12개월 벤치마크), 163.6%(연도 불명). 판마다 기간과 표본이 다르고 연도 표기도 일관되지 않습니다.
- **Bazaarvoice SEI 2025 표본:** 보도자료는 7,000명 이상, 블로그는 8,000명 이상입니다.
- **에이블리 뷰티 누적 후기:** 같은 기사에서 제목은 700만 건, 본문은 735만 건입니다.

### 유료·막혀서 못 연 것
- 네트워크 정책(EGRESS_BLOCKED)으로 열지 못한 곳: spiegel.medill.northwestern.edu(본문과 PDF), bazaarvoice.com, powerreviews.com, retaildive.com, web.archive.org, mt.co.kr. curl 테스트에서는 musinsa.com, hankyung.com, platum.kr, digitalcommerce360.com, sciencedirect.com, pubsonline.informs.org 등도 모두 접속에 실패했습니다.
- 그 결과 **이 노트의 모든 숫자는 검색요약 수준이며 '원문 확인'이 0건**입니다. 보고서에 쓰기 전에 각 URL을 열어 재확인해야 합니다.
- Vana & Lambrecht(2021) 본문은 INFORMS 유료일 가능성이 있고 열지도 못했습니다.
