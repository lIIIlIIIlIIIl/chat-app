# Nextron Chat-app

<br/>

## 사용방법

파이어베이스 키가 필요합니다. 폴더 최상단에 .env파일을 생성 한 후, 다음과 같이 정의해야 합니다.

```
NEXT_PUBLIC_APP_KEY = ...
NEXT_PUBLIC_AUTH_DOMAIN = ...
NEXT_PUBLIC_PROJECT_ID = ...
NEXT_PUBLIC_STORAGE_BUCKET = ...
NEXT_PUBLIC_MESSAGING_SENDER_ID = ...
NEXT_PUBLIC_APP_ID = ...
```

<br/>

### Install Dependencies

```
npm install
```

<br/>

### Use it

```
# development mode
$ npm run dev

# production build
$ npm run build
```

<br/>

## Resources

```
https://github.com/saltyshiomix/nextron
```

<br/>

<br/>

## Contents

### 1️⃣ 유저목록

내가 추가한 유저들의 목록을 출력합니다.

- 유저 찾기(검색)
- 유저 목록에 추가
- 유저 목록에서 제거
- 유저와 채팅 시작하기

<br/>

### 2️⃣ 채팅

1대1 채팅방입니다. 유저 목록에서 채팅하기 버튼 클릭 또는 채팅 목록에서 해당 채팅 방을 클릭하게 되면 채팅이 시작됩니다.

<br/>

### 3️⃣ 그룹채팅

그룹 채팅방입니다. ‘그룹 채팅방 만들기’ 버튼을 클릭하면 나를 제외한 유저 목록이 나타납니다. 내가 원하는 유저를 체크한 후에 ‘초대’ 버튼을 누르면 여러명의 유저와 채팅을 진행할 수 있습니다.

<br/>
<br/>

## 프로젝트를 시작하면서

이번 프로젝트에서 `Nextron.js` 및 `Firebase`, `Tailwindcss`를 처음 사용하여 애플리케이션을 만들었습니다. `Nextron.js`의 경우 이전에 사용해본 `Next.js`와 비슷하기 때문에 사용하는데 큰 어려움이 없었지만, `Firebase`와 `Tailwindcss`의 경우 처음 사용하기 때문에 공식문서를 중심으로 작성 방법에 대해 알아보고 하나씩 구현 하면서 사용 방법과 원리를 이해하는데 노력하였습니다.

<br/>

## 채팅

채팅 데이터는 프로필이나 게시물, 친구 목록과 같은 일반적인 데이터처럼 모든 사용자가 동일한 데이터를 받는 것이 아니라, 각각의 사용자마다 고유한 데이터를 받아야 합니다. (내 채팅방 목록과 다른 사용자의 채팅방 목록은 서로 다르지만, 서로 같은 채팅방이 있는 경우 해당 채팅방의 데이터는 동일해야함)그렇기 때문에 채팅 데이터가 중복되지 않고 저장되어야 하며, 각각의 사용자에 맞게 데이터가 호출되어야 합니다.

<br/>

채팅 데이터에는 채팅 내용과 참여 유저에 대한 정보가 담겨져 있습니다. 각각의 사용자마다 채팅방의 채팅 데이터를 저장한다면, 채팅 데이터는 채팅방에 참여하는 사용자의 수만큼 중복해서 저장되기 때문에 데이터 손실이 크게 나타나게 됩니다.

<br/>

저는 이점을 고려하여 채팅방 목록(채팅방의 채팅 데이터)과 사용자의 채팅 목록을 구별해서 데이터 베이스를 설계하였습니다. 채팅방 목록에는 모든 채팅방에 대한 채팅 데이터가 저장되어 있고, 사용자의 채팅 목록에는 각각의 사용자 참여하고 있는 채팅방에 대한 정보가 저장되어 있습니다. 사용자가 채팅방 목록 중 하나를 선택해서 채팅을 시작하면 해당 채팅방의 정보를 가지고 채팅방 목록에서 채팅방의 채팅 데이터를 찾아 호출하게 됩니다. 이렇게 하면 채팅 데이터가 중복되어 저장되지 않을 수 있고, 사용자에 맞게 데이터가 호출되어 채팅이 이루어 지는 것을 볼 수 있습니다.

<br/>

## 앞으로의 계획

1. 유저 검색 및 유저 목록 추가

   현재 유저 목록은 나를 제외한 모든 유저들이 나타나도록 만들어져 있습니다. 그렇기 때문에 내가 원하지 않는 유저까지 나의 유저 목록에 등록되어 있는 불편함을 가지고 있습니다. 이러한 문제를 해결하기 위해 내가 원하는 유저를 검색해서 나의 유저 목록에 추가하는 기능이 필요합니다. 사용자의 경험이 좋아질 수 있도록 해당 기능을 만들 예정입니다.

<br/>

2. 리펙토링

   코드 전반적으로 반복적으로 사용되고 있거나 코드의 길이를 줄일 수 있는 부분이 있는지, 타입은 명확하게 잘 지정이 되어있는지 등의 코듴 리펙토링하는 과정을 진행할 예정입니다.

<br/>

3. 스타일링

   TailwindCss를 사용하여 화면의 UI를 개선할 예정입니다.
