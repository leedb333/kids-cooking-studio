# 요리놀이터 전용 아이콘 제작

2026-11-22. 내장 이미지 생성 도구로 신규 제작했다. 기존 음식 에셋과 다른 회사의 로고·캐릭터는 사용하지 않았다.

생성 원본은 1254×1254 정사각 PNG다. 원본을 보존하고, 브라우저 Canvas로 비율 그대로 192/512 PNG로 축소했다. 모자와 하트는 512 기준 중심 반지름 약 191.06px 이내에 있으며, Android 마스커블 안전 원 반지름 204.8px 안에 들어간다. 일반 512와 마스커블 512는 동일한 안전 영역 원화를 각 용도 파일로 제공한다. 배경은 완전 불투명이다. 실제 설치 기기에서 확인한 결과는 아니다.

## 사용한 생성 요청

> Create one final polished Android PWA app icon for a Korean children's cooking app for ages 6-8 named Sweet Cooking Playground. NO text, no letters, no logo from any company. Square 1024x1024 opaque full-bleed pastel mint background with very subtle pale pink gradient glow. A single adorable, bold, simple white chef hat with three round puffy lobes, rounded wide cuff, warm soft rose outline and restrained soft dimensional shading. One small pastel pink heart centered on the cuff, and only that extra symbol. Friendly smooth toy-like illustrated graphic, clean vector-like edges, highly legible at 48 pixels, minimal details. Center the entire white hat and heart within the central circular safe area of diameter 72% of canvas, with generous unmarked mint background around it for circle and squircle cropping. Full-bleed square background with NO rounded icon outline, NO border, NO extra objects, NO mockup, NO utensil clutter, NO sparkles, no cast shadow outside central safe area. This is a production app icon, not a presentation.

요청과 별개로 실제 생성 크기는 위의 1254였다. 최종 파일은 별도 크기 검사로 확인한다. [검사 수치](ICON-CHECK.json), [512·원형·둥근 사각형·48px 미리보기](icon-preview.png).
