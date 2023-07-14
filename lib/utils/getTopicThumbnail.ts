import javaScript from "img/topic-thumbnails/javascript.svg";
import python from "img/topic-thumbnails/python.svg";
import typeScript from "img/topic-thumbnails/typescript.svg";
import java from "img/topic-thumbnails/java.svg";
import cSharp from "img/topic-thumbnails/csharp.svg";
import cpp from "img/topic-thumbnails/cpp.svg";
import php from "img/topic-thumbnails/php.svg";
import c from "img/topic-thumbnails/c.svg";
import ruby from "img/topic-thumbnails/ruby.svg";
import ai from "img/topic-thumbnails/ai.svg";
import go from "img/topic-thumbnails/go.svg";
import ml from "img/topic-thumbnails/machine-learning.svg";
import react from "img/topic-thumbnails/react.svg";
import rust from "img/topic-thumbnails/rust.svg";
import vue from "img/topic-thumbnails/vue.svg";
import kubernetes from "img/topic-thumbnails/kubernetes.svg";

import contextThumbnailImage from "../../img/open-sourced-with-bg-icon.png";

import { interestsType } from "./getInterestOptions";

const topicThumbnails: Record<interestsType, string> = {
  javascript: javaScript,
  python: python,
  java: java,
  typescript: typeScript,
  csharp: cSharp,
  cpp: cpp,
  php: php,
  c: c,
  ruby: ruby,
  ai: ai,
  react: react,
  ml: ml,
  golang: go,
  rust: rust,
  vue: vue,
  kubernetes: kubernetes
};

const getTopicThumbnail = (topic: keyof typeof topicThumbnails) => {
  return topicThumbnails[topic] || contextThumbnailImage;
};

export default getTopicThumbnail;
