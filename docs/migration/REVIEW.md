# 독립 요리 앱 1차 구축 검수

확인일: 2026-11-17. 원본 기준 커밋: `d608a79becc6ea9731c7ddf72ef8671fe25eb92e`.

## 범위와 원본 보호

- 원본 `leedb333/kids-game-playground`는 Git 조회만 사용했다. 파일·브랜치·설정·원격 기록을 변경하지 않았다.
- 신규 저장소의 초기 main `8822a947a5cbc8f3f2267ad7b59ca8539b56bda9`에서 `feat/cooking-studio-extraction`을 만들었다.
- 기존 `REPORT.md`, `FILE-MAP.csv`, `BASELINE.json`, `BACKUP-PLAN.md`, `STORAGE-KEYS.json`을 참고하고 실제 import와 운영 빌드로 의존성을 재확인했다.
- 기존 저장소를 통째로 복사하지 않았다. 기준 커밋의 861개 추적 파일 중 149개를 선별했다. 정확한 목록·기준 SHA-256·제외 파일 712개는 [FILES.json](FILES.json)에 기록했다.
- 149개에는 요리 소스 103개, 실제 사용하는 public 파일 29개, 기존 HTML 5개, 기본 설정 5개, 요리 검사 파일 7개가 포함된다. 별도로 독립 홈·PWA·검사·문서를 추가했다.
- source/public의 PNG 88개는 원본 바이트를 보존했다. 게임 모델, 이미지 합성, 터치·드래그 계산, 스쿱·토핑 좌표, 컵케이크 호환 모델도 보존했다.
- 색칠·벽돌깨기·기억력 카드·코디·구버전 요리 앱은 포함하지 않았다. 중간 시안, 불합격 후보, 원본 ZIP, 대량 캡처·로그도 이전하지 않았다.
- 미사용 public 원본 사본 52개는 제외했다. 피자·햄버거·기존 컵케이크는 이미 src의 기존 가공 스프라이트를 사용한다. 세 컵케이크가 실제 사용하는 public 원본 두 장과 승인 레이어 8장, 아이스크림 19장은 보존했다.

## 변경한 부분

| 부분 | 변경 이유 |
|---|---|
| `src/main.tsx`, `src/home.css`, 루트 HTML | 달콤한 요리놀이터 홈. 기존 RecipeLinks의 네 그림 카드 재사용. 큰 카드와 세로 스크롤 |
| 요리 진입/완성 컴포넌트 6개 | 돌아가기 주소를 독립 앱 루트로 변경. 한 컵 기록 보기 경로도 유지 |
| `Workbench.tsx` | 돌아가기 접근성 이름을 요리 선택으로 변경 |
| 피자 `full/main.tsx` | PNG 생성 중 홈 이동은 다운로드 요청이 끝난 후 실행. 전체 페이지 이동으로 인한 저장 중단 예방 |
| 기존 HTML 5개 | 임시 아이콘 경로와 manifest 연결 |
| `vite.config.ts`, manifest | 새 base·설치 ID·범위·캐시 분리 |
| 배포/검사 workflow, 검사 설정 | 독립 앱 전용 수동 배포와 요리 핵심 검사만 실행 |

피자·햄버거·컵케이크·아이스크림의 규칙·모델·이미지·애니메이션·합성 좌표를 재작성하지 않았다. 신규 원화나 아이콘을 생성하지 않았고 승인된 컵케이크 이미지를 임시 앱 아이콘으로 재사용했다.

## 기능 차이와 이동

| 항목 | 독립 앱 |
|---|---|
| 기본 홈 | 네 요리 선택. 다른 게임·준비 중 메뉴 없음 |
| 홈 복귀 | 종합 놀이터/중간 선택 대신 독립 앱 루트로 이동 |
| 완성된 피자 재진입 | 독립 홈에서 열면 완성 기록을 보존. 새로 만들기는 기존 확인창에서 명시적으로 선택 |
| 기존 피자 선택 페이지 | 직접 주소로 계속 열림. 기존 내부 시작 버튼 동작은 유지 |
| 아이스크림 완성의 아이스크림 가게로 | 기존처럼 컵·콘 선택으로 돌아가고 스쿱·장식 유지 |
| 한 컵 컵케이크 | 호환 읽기·가져오기·원본 기록 보관과 `?legacy`, `#legacy-play` 유지. 구버전 요리 앱과 별개 |

| 경로 | 주소 |
|---|---|
| 홈 | `/kids-cooking-studio/` |
| 피자 | `/kids-cooking-studio/prototypes/cooking-v2/kitchen/#pizza` |
| 햄버거 | `/kids-cooking-studio/prototypes/cooking-v2/burger/#play` |
| 세 컵케이크 | `/kids-cooking-studio/prototypes/cooking-v2/cupcake/#play` |
| 아이스크림 | `/kids-cooking-studio/prototypes/cooking-v2/icecream/` |

## 저장 기록

접미사까지 기존의 정확한 키를 유지했다.

| 요리 | 키 |
|---|---|
| 피자 | `kids-game-playground:v1:game:cooking-v2:pizza:full:r1` |
| 피자 초기 시험 기록 | `kids-game-playground:v1:game:cooking-v2:pizza:prototype:r1` |
| 햄버거 | `kids-game-playground:v1:game:cooking-v2:burger:prototype:r1` |
| 세 컵케이크 | `kids-game-playground:v1:game:cooking-v2:cupcake:three:r2` |
| 한 컵 기록 | `kids-game-playground:v1:game:cooking-v2:cupcake:prototype:r1` |
| 한 컵 보관 | `kids-game-playground:v1:game:cooking-v2:cupcake:three:r2:legacy-archive` |
| 아이스크림 | `kids-cooking-v2-icecream-v1` |

같은 `https://leedb333.github.io` 출처·브라우저·프로필에서는 경로가 달라도 이 키를 공유한다. 양쪽 앱을 동시에 열면 각 화면이 갖고 있던 값으로 마지막 저장이 다른 기록을 덮을 수 있다. 이전 검수 후에는 신규 앱 한 곳을 사용한다.

다른 기기·브라우저·개인정보 보호 모드·개발 서버에는 자동 이전되지 않는다. 이번 검사는 임시 브라우저의 알려진 기존 형식 기록을 사용했다. 실제 갤럭시탭 기록을 읽거나 삭제하지 않았으며, 실제 사용자 기록 백업·동일 출처 배포 후 이어하기 확인은 별도로 필요하다. `localStorage.clear()`를 사용하지 않는다.

## PWA·오프라인·배포

- base / manifest ID / 시작 주소 / scope: `/kids-cooking-studio/`.
- 서비스 워커: `/kids-cooking-studio/sw.js`, 위 범위에만 등록.
- 캐시 접두사: `kids-cooking-studio:` + 등록 범위 + `:`. 파일 내용 기반 버전 사용.
- 갱신 시 이 접두사의 이전 캐시만 제거. 기존 놀이터 캐시 접두사에 접근하지 않는다.
- 빌드된 HTML·JS·CSS와 실제 public 파일을 사전 캐시한다. `pnpm verify`로 153개 캐시 URL과 모든 빌드 파일의 존재, HTML의 새 base, manifest를 확인했다.
- 로컬 운영 빌드는 148개 파일, 약 100.7MB다. 이미지 선명도를 보존하고 기존 import 구조를 유지했기 때문에 초기 오프라인 준비에 시간·공간이 필요하다. 설치 완료 전 오프라인 전환이나 기기 저장소 부족까지 보장하지 않는다.
- Pages workflow는 수동 실행, main에서만 배포한다. PR workflow는 빌드·요리 검사와 검수 자료 업로드만 수행한다.
- 이번 작업에서 main 병합·Pages 설정 변경·배포 실행·실기 앱 설치는 하지 않았다.

## 검증과 화면

실행 결과와 캡처는 [RESULTS.md](RESULTS.md)를 확인한다. 관련 요리 검사만 선택하며 다른 게임 전체 검사는 실행하지 않는다.

태블릿은 1280×800, 스마트폰은 390×844와 844×390의 실제 Chrome 브라우저 화면을 사용했다. 실제 삼성 갤럭시탭·스마트폰 실기 검사는 아니다.

| 검수 화면 | 자료 |
|---|---|
| 독립 홈 | [태블릿](screenshots/home-tablet.png) |
| 피자 | [제작](screenshots/pizza.png) |
| 햄버거 | [제작](screenshots/burger.png) |
| 세 컵케이크 | [제작](screenshots/cupcake.png) |
| 아이스크림 | [토핑](screenshots/icecream.png) |
| 완성 | [아이스크림](screenshots/finish.png) |
| 스마트폰 | [세로](screenshots/phone-portrait.png) · [가로](screenshots/phone-landscape.png) |
| 다운로드 PNG | [1400×1400 투명 PNG 예시](screenshots/icecream-export.png) |

## 배포 전 남은 확인

1. 개인 기기의 실제 진행 기록을 먼저 백업한다. 기존 놀이터 앱을 제거하거나 캐시를 지우지 않는다.
2. 사용자가 Draft PR의 기능·화면·GitHub 검사를 검토한 후에만 병합한다.
3. 별도 승인 후 Settings → Pages → GitHub Actions를 선택하고 수동 배포한다.
4. `https://leedb333.github.io/kids-cooking-studio/`에서 네 요리 이어하기·PNG·오프라인 재실행·새 앱 설치를 확인한다.
5. 위 확인 전에는 이전 완료로 선언하거나 원본 게임을 삭제하지 않는다.

최종 아이콘 디자인 개선과 이후 신규 요리 추가는 별도 작업이다.
