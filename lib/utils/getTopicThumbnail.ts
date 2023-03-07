import javaScript from "../../img/topicThumbnails/javascript.svg";
import python from "../../img/topicThumbnails/python.svg";
import typeScript from "../../img/topicThumbnails/typescript.svg";
import java from "../../img/topicThumbnails/java.svg";
import cSharp from "../../img/topicThumbnails/csharp.svg";
import cpp from "../../img/topicThumbnails/cpp.svg";
import php from "../../img/topicThumbnails/php.svg";
import c from "../../img/topicThumbnails/c.svg";
import ruby from "../../img/topicThumbnails/ruby.svg";
import ai from "../../img/topicThumbnails/ai.svg";
import ml from "../../img/topicThumbnails/ml.svg";
import react from "../../img/topicThumbnails/react.svg";
import contextThumbnailImage from "../../img/open-sourced-with-bg-icon.png";

const topicThumbnails = [
  {
    topic: "javascript",
    thumbnail: javaScript
  },
  {
    topic: "python",
    thumbnail: python
  },
  {
    topic: "java",
    thumbnail: java
  },
  {
    topic: "typescript",
    thumbnail: typeScript
  },
  {
    topic: "csharp",
    thumbnail: cSharp
  },
  {
    topic: "cpp",
    thumbnail: cpp
  },
  {
    topic: "php",
    thumbnail: php
  },
  {
    topic: "c",
    thumbnail: c
  },
  {
    topic: "ruby",
    thumbnail: ruby
  },
  {
    topic: "ai",
    thumbnail: ai
  },
  {
    topic: "ml",
    thumbnail: ml
  },
  {
    topic: "react",
    thumbnail: react
  }
];

export const getTopicThumbnail = (topic: string) => {
  const topicThumbnail = topicThumbnails.find(
    (topicThumbnail) => topicThumbnail.topic === topic
  );
  return topicThumbnail?.thumbnail || contextThumbnailImage;
};