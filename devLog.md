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
    1. Userinfo 페이지에 아바타, 텍스트필드, 레이블버튼 추가
    2. 같은 페이지에 추후 수정내용과 참고할 사항 주석으로 기입


# 남현수 - 21.04.10
    1. Auth(HOC)를 추가함 
        -> 모든 요청시에 실행됨
        -> 실행시에 /api/auth 요청을 토큰과 함께 보냄
        -> 서버에서 응답으로 유저정보를 받아온다. (리덕스에 추가)
        -> HOC에서 응답된 auth 객체의 따라서 페이지를 제어한다. 

    2. redux-thunk 와 redux-promise를 추가함
        -> 원래 리덕스 사용할 때 필요했었는데 미처 추가하지 못했음
        -> 기능의 대해서는 여기에 적기에 애매해서 따로 물어볼 것


# 남현수 - 21.04.12
    1. 파일 관련(이미지)를 사용할 수 있는 action을 추가함
    2. npm react-dropzone 추가 함


# 남현수 - 21.04.13
    1. post부분을 개선함, 이미지을 보낼 수 있고, 업로드 가능하도록 개선함
    2. 이미지를 불러올 수 있음

    
# 남현수 - 21.04.16
    1. 메인 화면 UI의 개선 , Card 컴포넌트의 개선
    2. appBar를 Hoc 컴포넌트로 개선 및 적용

# 남현수 - 21.04.17
    1. 프로필 이미지 업로드 기능의 추가
    2. 대부분의 avatar 컴포넌트에 userimg 가 들어가도록 수정
   

# 남현수 - 21.05.17
    1. 콜라보 페이지 생성
    2. 컴포넌트 생성 
        -> AvataComp [아바타를 누르면 유저 정보가 뜨는 컴포넌트] 
        -> TaskBar [작업바] 
 
# 남현수 - 21.05.19
    1. 컴포넌트를 확인할 수 있는 테스트 페이지 생성
    2. 컴포넌트 생성 
        -> TaskTool [프로젝트 작업 화면 컴포넌트] 
    

# 남현수 - 21.05.20
    1. 컴포넌트 변경
        -> TaskBar [작업바 -> 버튼으로 만들고 dialog를 추가함] 
    
 
# 남현수 - 21.05.21
    1. 컴포넌트 변경
        -> TaskBar , TaskTool [ task 작업환경 크기 변경함]
    
# 남현수 - 21.05.22
    1. 컴포넌트 추가
        -> taskItems 디렉토리 안에 TaskChatViewer, TaskMovieViewer , TaskPointViewr , TaskStatusViewer , TaskToolBar 컴포넌트를 추가함
    
# 남현수 - 21.05.23
    1. task 관련 컴포넌트를 디렉터리로 관리
    
    2. TaskItemPointViewr의 내용을 추가함 -> 실제 리스트를 추가해서 기능의 일부를 구현
    
# 남현수 - 21.05.25
    1. TaskItemStatusViewer일부 구현 -> Task 컴포넌트에 적용
    

# 남현수 - 21.05.26
    1. 채팅기능을 사용하기 위해서 react-chat-widget 오픈소스를 사용 
    2. TaskItemChatViewer를 구현하고 기능을 추가하도록 함
       

# 남현수 - 21.05.27
    1. 채팅기능을 사용하기 위해서 react-chat-widget 을 react-chat-plugin로 변경 
    2. 약간의 UI변경 후 사용 -> 적용함

# 남현수 - 21.05.30
    1. task가 전체적으로 크기가 맞지 않아서 모든 부분에 조정을 시도함
       

# 남현수 - 21.06.01
    1. 전체적으로 대부분의 필요한 Avatar 컴포넌트를 AvatarComp 로 바꿈
    2. 백엔드의 댓글 APi를 바꿔서 댓글관련된 대부분의 API를 수정함

        
# 선경안 - 21.06.13
    1. 로그아웃 구현(jwt토큰 삭제후 링크로 메인페이지로 이동)

# 남현수 - 21.06.11
    1. Collabomain 컴포넌트의 고질적인 문제 해결

# 선경안 - 21.06.22
    1. 사이드바 링크 걸고 아이콘 변경

    
