# 달콤한 요리놀이터

피자·햄버거·세 컵케이크·아이스크림을 만드는 독립 요리놀이 웹앱입니다.

원본: `leedb333/kids-game-playground`의 `d608a79becc6ea9731c7ddf72ef8671fe25eb92e`. 게임 모델·합성 좌표·이미지·저장 키를 유지하고 홈, 돌아가기 주소, 앱 배포 범위만 분리했습니다.

## 개발과 검사

Node 24, pnpm 11.25.0을 사용합니다.

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm build
pnpm verify
pnpm exec playwright install chromium
pnpm test --reporter=line
```

기본 검사는 요리 핵심 흐름과 독립 앱 검사만 선택합니다. 다른 게임 전체 검사는 포함하지 않습니다. Windows에서는 Chrome을 기본 사용하며 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`로 실행 파일을 지정할 수 있습니다.

## 경로

- 홈: `/kids-cooking-studio/`
- 피자: `/kids-cooking-studio/prototypes/cooking-v2/kitchen/#pizza`
- 햄버거: `/kids-cooking-studio/prototypes/cooking-v2/burger/#play`
- 세 컵케이크: `/kids-cooking-studio/prototypes/cooking-v2/cupcake/#play`
- 아이스크림: `/kids-cooking-studio/prototypes/cooking-v2/icecream/`
- 기존 피자 시험 진입과 컵케이크 `?legacy`·`#legacy-play`도 보존합니다. 구버전 요리놀이 앱은 포함하지 않습니다.

## 저장 기록 주의

이전 앱과 같은 `https://leedb333.github.io` 출처에서 **같은 브라우저·프로필**로 사용하면 기존 키를 읽습니다. 개발 서버·다른 기기·다른 브라우저에서는 자동으로 이전되지 않습니다. 양쪽 앱을 동시에 열어 수정하면 마지막 저장이 앞선 기록을 덮을 수 있으므로 이전 후에는 한 앱만 사용하세요. 저장 초기화는 해당 요리에만 적용합니다.

## 배포 — 사용자 승인 이후에만

현재는 검토용 브랜치입니다. 배포하지 않았습니다.

1. Draft PR의 검수 자료와 검사를 확인합니다.
2. 실제 기기 기록을 백업하고, 승인 후 PR을 main에 병합합니다.
3. 저장소 Settings → Pages → Source에서 GitHub Actions를 선택합니다.
4. Actions → Publish to GitHub Pages (manual) → Run workflow → main을 선택합니다.
5. `https://leedb333.github.io/kids-cooking-studio/`에서 온라인 실행 후 오프라인 재실행과 설치를 확인합니다.

배포 workflow는 수동 실행이며 main에서만 배포합니다. PR 검사는 배포하지 않습니다. 원본 놀이터는 삭제·수정하지 않습니다.

이전 목록과 제한은 [검수 보고서](docs/migration/REVIEW.md), 원본 파일 해시는 [파일 목록](docs/migration/FILES.json)을 확인하세요.
