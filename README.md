# 소방공무원 월급 계산기 — GitHub Pages 배포

이 폴더의 `index.html`, `app.js`, `style.css` 세 파일이 웹앱입니다. 서버, 빌드, 설치가 필요하지 않습니다. 본인의 급여 입력값은 사용 중인 브라우저의 로컬 저장소에만 보관됩니다.

## 배포

1. GitHub에서 **새 공개 저장소**를 만들고 이름을 `fire-pay-planner`로 지정합니다.
2. 저장소의 **Add file → Upload files**에서 `index.html`, `app.js`, `style.css`를 압축을 푼 채 저장소의 **최상위 위치**에 올리고 Commit changes를 누릅니다. ZIP 파일 자체를 올리면 웹앱이 열리지 않습니다.
3. 저장소의 **Settings → Pages → Build and deployment**로 갑니다. **Source: Deploy from a branch**, **Branch: main**, **Folder: /(root)**를 선택하고 Save를 누릅니다.
4. 게시가 완료되면 `https://isshoman519-coder.github.io/fire-pay-planner/` 형식의 주소에서 열립니다. 실제 주소는 Pages 화면의 **Visit site** 버튼으로 확인합니다.

참고: [GitHub 공식 Pages 배포 안내](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 사용 전 확인

- 첫 화면의 소방장 8호봉·근무연수 7년은 **예시 입력값**입니다. 본인의 계급, 호봉, 근무연수로 바꿉니다.
- 연금 `기준소득월액`과 건강보험 `보수월액`은 급여명세서 값을 입력해야 공제 추정이 좋아집니다. 0으로 두면 앱이 임시 추정합니다.
- 시간외, 야간, 휴일 단가와 보직별 수당은 해당 급여명세서의 지급 단가를 입력합니다.
- 소득세는 간이세액표 조회값이 아닌 연환산 예상액입니다. 명세서 금액을 알면 월별 상세 화면에서 직접 수정할 수 있습니다.
- 2027년 이후 봉급은 2026년 표에 사용자가 입력한 인상 가정을 적용한 전망치입니다.

2026년 봉급표·수당과 공제 근거 링크는 웹앱 하단에 있습니다.
