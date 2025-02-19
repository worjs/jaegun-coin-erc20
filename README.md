# JAEGUN Token (JAEGUN)

JAEGUN은 ERC20 표준을 준수하는 토큰입니다.

## 특징

- 심볼: JAEGUN
- 초기 발행량: 1,000,000,000 JAEGUN
- 소수점: 18자리
- 추가 발행: 가능 (소유자만)
- 소각: 가능 (모든 보유자)

## 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. 환경 변수 설정:
- `.env.example`을 `.env`로 복사하고 필요한 값들을 설정합니다.

3. 컨트랙트 컴파일:
```bash
npm run compile
```

4. 테스트 실행:
```bash
npm run test
```

5. 배포:
- 테스트넷 배포:
```bash
npm run deploy:testnet
```
- 메인넷 배포:
```bash
npm run deploy:mainnet
```

## 라이선스

MIT 