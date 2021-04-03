# 남현수 - 21.02.22
    1. 리엑트 라우터 사용을 위한 테스트 코드를 추가 (실제 개발에는 사용하지 않을 것임 )
        [components/DevMenu , page/post] 

    2. 라우터를 중첩으로 사용할 수 있는데 아직 사용방법이 익숙하지 않은, 좀더 숙달하겠음


# 남현수 - 21.02.24
    1. 리엑트에 flux 모델을 적용하기 위해서 다음과 같은 dependency를 추가함 
        [redux , react-redux ]
        - 이후 추가로 간단힌 디렉토리 작업과, 개발자 도구를 추가함 

            _action 디렉토리에는 타입과 엑션을 따로 배재해서 만듬
            -recucer 디렉토리에는 각각의 리듀서들만 만들고 index를 rootreducer로 해서 스토어에 받아들일 수 있도록 수정함

            -개발자 도구로는 store 내용을 확인할 수 있도록 redux-devtools-extension 를 설치함, 크롬 개발자 경로는 다음과 같음 
            [ https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related ]


     2. 리덕트 실행을 위한 실행코드와 컴포넌트를 만들과 about 페이지에 실험적으로 넣음. 프로젝트에는 사용하지 않을 것임]]]



# 남현수 - 21.03.18
    1. 회원가입을 위한 간단한 코드를 작성함
        -> page에 우선 있는 템플렛을 이용해서 작성하였음
        -> testSignUp에 회원가입을 할 수 있는 템플릿과 usestate , action, 을 추가함
        ]

# 남현수 - 21.03.31
    1. AppBarMain 컴포넌트에 draw를 추가함, 메뉴를 추가 가능함

# 선경안 - 21.04.04
    1. Userinfo 페이지 수정
