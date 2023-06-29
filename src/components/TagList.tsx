import TagButton from "./TagButton";
import { tagList } from "../@types/tag.type";
import { Dispatch, SetStateAction, useEffect } from "react";

type TagProps = {
  setTags?: Dispatch<SetStateAction<string[]>>;
};

const TagList = ({ setTags }: TagProps) => {
  const arr = new Array<string>();

  const handleSelect = (isClicked: boolean, text: string) => {
    if (isClicked === true) {
      arr.push(text);
    }
    if (isClicked === false) {
      let index = arr.indexOf(text);
      arr.splice(index, 1);
    }
    // TODO: 서버에 요청 & 결과 렌더링
  };

  let idArray: string[] = [];
  const onClickMark = (id: number, isClicked: boolean) => {
    if (isClicked === false) {
      idArray = [...idArray, id.toString()];
      // @ts-ignore
      setTags((pre) => [...pre, id.toString()]);
    }
    if (isClicked === true) {
      let index = arr.indexOf(id.toString());
      idArray.splice(index, 1);
      // @ts-ignore
      setTags((pre) => pre.filter((i) => i !== id.toString()));
    }
  };
  return (
    <div className="mb-5">
      <ul className="px-[20px] grid grid-rows-3 grid-flow-col gap-2">
        {tagList.map((item) => (
          <li key={item.id}>
            <TagButton
              id={item.id}
              text={item.name}
              handleSelect={handleSelect}
              onClickMark={onClickMark}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
