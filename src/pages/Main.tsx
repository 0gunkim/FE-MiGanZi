import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export type Post = {
  id: number;
  imageUrl: string;
};

export type PostData = {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
};

export function Main() {
  const navigate = useNavigate();
  const [post, setPost] = useState<Post[] | null>(null);
  const [postData, setPostData] = useState<PostData | null>(null);
  const ref = useRef(null);
  const [page, setPage] = useState(0);

  const getBoards = async (pageNumber: number) => {
    const posts = await axios.get(
      `https://port-0-java-springboot-teo-backend-7xwyjq992lljba9lba.sel4.cloudtype.app/user/board/posts?page=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TESTAUTH}`,
        },
      }
    );
    const newPosts = posts.data.content;
    const newPostsData = posts.data;
    setPost((prevPosts) => Array.from(prevPosts || []).concat(newPosts));
    setPostData(newPostsData);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          getBoards(page);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [page]);

  console.log(postData);

  return (
    <>
      <>
        <div className="text-[20px] h-[70px] border-b-2 flex items-center ml-[40px]">
          유저가 뽑은 베스트 아티클
        </div>
        <div className="flex flex-row text-[14px] ml-[40px] h-[21px]">
          <div>JUNE 26</div>
          <div>|</div>
          <div>조회수 26</div>
        </div>
        <div className="flex flex-row ml-[40px] h-[60px]">
          <img
            src="street1.jpg"
            alt="profile"
            className="w-[60px] h-[60px] rounded-full"
          ></img>
          <div className="flex items-center ml-[10px]">Miganzi</div>
        </div>
        <div className="ml-[40px] w-[350px] h-[467px]">
          <img src="logo512.png" alt="img"></img>
        </div>
        <div className="flex justify-center text-[20px] h-[70px] items-center">
          새로 작성된 아티클을 확인해보세요
        </div>

        {/**
         * 투두 : 피그마처럼 3열 종대로
         */}
        <div
          onClick={() => navigate("/detail")}
          // className="flex flex-column w-[390px] mb-[5px] justify-evenly"
        >
          {post
            ? post.map((item) => {
                return (
                  <img
                    src={item.imageUrl}
                    alt="이미지"
                    className="w-[380px] h-[169px]"
                    key={item.id}
                    // onClick = {test(item.id)} 클릭 시 해당 게시글로 라우팅하는 함수
                  />
                );
              })
            : null}
          <div ref={ref}>안녕</div>
        </div>
      </>
    </>
  );
}

export default Main;
