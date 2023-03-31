# 📦 open-sauced/insights changelog

[![conventional commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic versioning](https://img.shields.io/badge/semantic%20versioning-2.0.0-green.svg)](https://semver.org)

> All notable changes to this project will be documented in this file

## [1.39.0-beta.4](https://github.com/open-sauced/insights/compare/v1.39.0-beta.3...v1.39.0-beta.4) (2023-03-31)


### 🐛 Bug Fixes

* fix nav server render to match initial client render ([ad7e996](https://github.com/open-sauced/insights/commit/ad7e99667671f55fc0ffdaebd4b228964c61e58e))

## [1.39.0-beta.3](https://github.com/open-sauced/insights/compare/v1.39.0-beta.2...v1.39.0-beta.3) (2023-03-31)


### 🐛 Bug Fixes

* show logo in the header for smaller screens ([#1071](https://github.com/open-sauced/insights/issues/1071)) ([6b4c199](https://github.com/open-sauced/insights/commit/6b4c1996ec3d1477e481193dc34f050a73b286bb))

## [1.39.0-beta.2](https://github.com/open-sauced/insights/compare/v1.39.0-beta.1...v1.39.0-beta.2) (2023-03-31)


### 🍕 Features

* improve insights page interactions with feedback ([#1051](https://github.com/open-sauced/insights/issues/1051)) ([35a8e90](https://github.com/open-sauced/insights/commit/35a8e90aa1709555d64092cec27b6f0a799c06af))

## [1.39.0-beta.1](https://github.com/open-sauced/insights/compare/v1.38.1-beta.3...v1.39.0-beta.1) (2023-03-31)


### 🍕 Features

* connect repository contributors to the API ([#1072](https://github.com/open-sauced/insights/issues/1072)) ([669db3d](https://github.com/open-sauced/insights/commit/669db3dc3c09c03bd33c97eb66fa3189032dd767))

### [1.38.1-beta.3](https://github.com/open-sauced/insights/compare/v1.38.1-beta.2...v1.38.1-beta.3) (2023-03-30)


### 🐛 Bug Fixes

* use pull request counts for determining repository activity levels ([#1070](https://github.com/open-sauced/insights/issues/1070)) ([f0d0571](https://github.com/open-sauced/insights/commit/f0d05713363056d0cebaa035e12d2e735715f1f0))

### [1.38.1-beta.2](https://github.com/open-sauced/insights/compare/v1.38.1-beta.1...v1.38.1-beta.2) (2023-03-30)


### 🐛 Bug Fixes

* correct connect with github button being too big on mobile ([#1063](https://github.com/open-sauced/insights/issues/1063)) ([bb0aef3](https://github.com/open-sauced/insights/commit/bb0aef3a0b81046642ac3229fb16821e2154be05))

### [1.38.1-beta.1](https://github.com/open-sauced/insights/compare/v1.38.0...v1.38.1-beta.1) (2023-03-29)


### 🐛 Bug Fixes

* fix typo in GitHub button to authenticate ([#1064](https://github.com/open-sauced/insights/issues/1064)) ([35c8756](https://github.com/open-sauced/insights/commit/35c875629cd715f0f018ca8934634c077814088f))

## [1.38.0](https://github.com/open-sauced/insights/compare/v1.37.0...v1.38.0) (2023-03-28)


### 🐛 Bug Fixes

* add loading indicator to insights filter page ([#1049](https://github.com/open-sauced/insights/issues/1049)) ([42fbe2e](https://github.com/open-sauced/insights/commit/42fbe2e68c39e75c309464eab6c7549c9ded8291))
* correct github link length wrapping on new line in highlights feature ([#1053](https://github.com/open-sauced/insights/issues/1053)) ([693874c](https://github.com/open-sauced/insights/commit/693874cfb17da1d58982993dd461ecc83576ce8b)), closes [#1052](https://github.com/open-sauced/insights/issues/1052)
* reset page when adding/removing a repo highlight filter ([#1061](https://github.com/open-sauced/insights/issues/1061)) ([026f2bc](https://github.com/open-sauced/insights/commit/026f2bc77fc20bea30572ade0bbe0e35140b8dbe))
* update `repo.host_id` to repo.id to match github repo schema ([#1059](https://github.com/open-sauced/insights/issues/1059)) ([d106544](https://github.com/open-sauced/insights/commit/d1065445a0a4cf5de8bf4547c6915b1e7bb6f520))


### 🍕 Features

* add `ProfileLanguageChart` component to design system and user profile page ([#1030](https://github.com/open-sauced/insights/issues/1030)) ([e8e5362](https://github.com/open-sauced/insights/commit/e8e53625f254edc4bc00b73165f90d550e9ccb64))
* add repository recommendation links ([#1050](https://github.com/open-sauced/insights/issues/1050)) ([acfa306](https://github.com/open-sauced/insights/commit/acfa306514ffc019cf074908f0713fc8710e8d83))
* add repository recommendations component to the design system ([#1045](https://github.com/open-sauced/insights/issues/1045)) ([37122bc](https://github.com/open-sauced/insights/commit/37122bc390bd68a960fdde4c08fc0cb11b595860))
* connect repositories to API ([#1042](https://github.com/open-sauced/insights/issues/1042)) ([619ce84](https://github.com/open-sauced/insights/commit/619ce84255d7100f77a2618011497ba3cdb613e7))
* remove guard for nav links and handle contributors error ([#1060](https://github.com/open-sauced/insights/issues/1060)) ([3227ceb](https://github.com/open-sauced/insights/commit/3227ceb1b6cbf23206ee1a9b1cbe2673ecc51962))

## [1.38.0-beta.8](https://github.com/open-sauced/insights/compare/v1.38.0-beta.7...v1.38.0-beta.8) (2023-03-28)


### 🍕 Features

* remove guard for nav links and handle contributors error ([#1060](https://github.com/open-sauced/insights/issues/1060)) ([3227ceb](https://github.com/open-sauced/insights/commit/3227ceb1b6cbf23206ee1a9b1cbe2673ecc51962))

## [1.38.0-beta.7](https://github.com/open-sauced/insights/compare/v1.38.0-beta.6...v1.38.0-beta.7) (2023-03-28)


### 🐛 Bug Fixes

* reset page when adding/removing a repo highlight filter ([#1061](https://github.com/open-sauced/insights/issues/1061)) ([026f2bc](https://github.com/open-sauced/insights/commit/026f2bc77fc20bea30572ade0bbe0e35140b8dbe))

## [1.38.0-beta.6](https://github.com/open-sauced/insights/compare/v1.38.0-beta.5...v1.38.0-beta.6) (2023-03-28)


### 🐛 Bug Fixes

* update `repo.host_id` to repo.id to match github repo schema ([#1059](https://github.com/open-sauced/insights/issues/1059)) ([d106544](https://github.com/open-sauced/insights/commit/d1065445a0a4cf5de8bf4547c6915b1e7bb6f520))

## [1.38.0-beta.5](https://github.com/open-sauced/insights/compare/v1.38.0-beta.4...v1.38.0-beta.5) (2023-03-28)


### 🍕 Features

* add `ProfileLanguageChart` component to design system and user profile page ([#1030](https://github.com/open-sauced/insights/issues/1030)) ([e8e5362](https://github.com/open-sauced/insights/commit/e8e53625f254edc4bc00b73165f90d550e9ccb64))

## [1.38.0-beta.4](https://github.com/open-sauced/insights/compare/v1.38.0-beta.3...v1.38.0-beta.4) (2023-03-27)


### 🐛 Bug Fixes

* add loading indicator to insights filter page ([#1049](https://github.com/open-sauced/insights/issues/1049)) ([42fbe2e](https://github.com/open-sauced/insights/commit/42fbe2e68c39e75c309464eab6c7549c9ded8291))

## [1.38.0-beta.3](https://github.com/open-sauced/insights/compare/v1.38.0-beta.2...v1.38.0-beta.3) (2023-03-27)


### 🐛 Bug Fixes

* correct github link length wrapping on new line in highlights feature ([#1053](https://github.com/open-sauced/insights/issues/1053)) ([693874c](https://github.com/open-sauced/insights/commit/693874cfb17da1d58982993dd461ecc83576ce8b)), closes [#1052](https://github.com/open-sauced/insights/issues/1052)

## [1.38.0-beta.2](https://github.com/open-sauced/insights/compare/v1.38.0-beta.1...v1.38.0-beta.2) (2023-03-24)


### 🍕 Features

* add repository recommendation links ([#1050](https://github.com/open-sauced/insights/issues/1050)) ([acfa306](https://github.com/open-sauced/insights/commit/acfa306514ffc019cf074908f0713fc8710e8d83))
* add repository recommendations component to the design system ([#1045](https://github.com/open-sauced/insights/issues/1045)) ([37122bc](https://github.com/open-sauced/insights/commit/37122bc390bd68a960fdde4c08fc0cb11b595860))

## [1.38.0-beta.1](https://github.com/open-sauced/insights/compare/v1.37.0...v1.38.0-beta.1) (2023-03-24)


### 🍕 Features

* connect repositories to API ([#1042](https://github.com/open-sauced/insights/issues/1042)) ([619ce84](https://github.com/open-sauced/insights/commit/619ce84255d7100f77a2618011497ba3cdb613e7))

## [1.37.0](https://github.com/open-sauced/insights/compare/v1.36.0...v1.37.0) (2023-03-24)


### 🧑‍💻 Code Refactoring

* Deleted unused hooks, removed unused exports and imports ([#1028](https://github.com/open-sauced/insights/issues/1028)) ([7b2bda2](https://github.com/open-sauced/insights/commit/7b2bda22957e389dde711832dad2e19a5b502ea1))


### 🍕 Features

* add teams UI for the design system ([#994](https://github.com/open-sauced/insights/issues/994)) ([499d08e](https://github.com/open-sauced/insights/commit/499d08e81aa890ac7a2cca0761fc7d670538c363))
* added active styles to navbar links ([#1016](https://github.com/open-sauced/insights/issues/1016)) ([c25c0a3](https://github.com/open-sauced/insights/commit/c25c0a33230bca37aca12a98b243eaa00cd0731c)), closes [#697](https://github.com/open-sauced/insights/issues/697)
* create collaboration Ui components ([#1006](https://github.com/open-sauced/insights/issues/1006)) ([19ff5a7](https://github.com/open-sauced/insights/commit/19ff5a73d1ae669722c307bbf9f16e1dd5be3fb4))
* replace react toast to radix ([#933](https://github.com/open-sauced/insights/issues/933)) ([3e000be](https://github.com/open-sauced/insights/commit/3e000be0e85b29cfdf16d58d1a74256ebcf85f8b))
* update top nav menu to be more responsive on mobile ([#1029](https://github.com/open-sauced/insights/issues/1029)) ([90c1e4a](https://github.com/open-sauced/insights/commit/90c1e4a9f5ffeaa9839d0afae503ba42859170da)), closes [#866](https://github.com/open-sauced/insights/issues/866)


### 🐛 Bug Fixes

*  updated footer file to update the year dynamically ([#1040](https://github.com/open-sauced/insights/issues/1040)) ([c766d95](https://github.com/open-sauced/insights/commit/c766d9521faf9d6198a9049772a285b9b2d32d00))
* add a check for proper URL in avatarURL prop ([#1009](https://github.com/open-sauced/insights/issues/1009)) ([a425279](https://github.com/open-sauced/insights/commit/a4252797fa8093c8d3d472c26422e20a9ec44160))
* center text inside upgrade access button ([#1027](https://github.com/open-sauced/insights/issues/1027)) ([cf3f6cb](https://github.com/open-sauced/insights/commit/cf3f6cbd7c5a7bf4db76733c9b90255a5bc09d39)), closes [#1024](https://github.com/open-sauced/insights/issues/1024)
* close highlight dialog when clicking outside its container ([#999](https://github.com/open-sauced/insights/issues/999)) ([1bc90bb](https://github.com/open-sauced/insights/commit/1bc90bb5c61b353aeb847fef98d738998fb9c142))
* make delete standout ([#1026](https://github.com/open-sauced/insights/issues/1026)) ([9c68287](https://github.com/open-sauced/insights/commit/9c68287eabbe9b826efd27f0a70c3e0d48ba120e))
* make insights hub layout inconsistent on larger screens ([#1046](https://github.com/open-sauced/insights/issues/1046)) ([daaf6d1](https://github.com/open-sauced/insights/commit/daaf6d12d042af52ab0f1c405eb85caf207e80b5))
* refresh highlights list on update and delete ([#1034](https://github.com/open-sauced/insights/issues/1034)) ([bf2d951](https://github.com/open-sauced/insights/commit/bf2d9518bdf7b38e8dbdc147e8f01284041b511e))
* remove dialog layout overlap on single highlight view ([#1047](https://github.com/open-sauced/insights/issues/1047)) ([ea836e8](https://github.com/open-sauced/insights/commit/ea836e8090f41ece5a8fae9ff4aa5835166c51fd))
* update avatar style to remain aligned with the input field ([#1037](https://github.com/open-sauced/insights/issues/1037)) ([2374f20](https://github.com/open-sauced/insights/commit/2374f204d75292ad2b947583e10ed485c1a2d4f0))

## [1.37.0-beta.7](https://github.com/open-sauced/insights/compare/v1.37.0-beta.6...v1.37.0-beta.7) (2023-03-23)


### 🐛 Bug Fixes

* make insights hub layout inconsistent on larger screens ([#1046](https://github.com/open-sauced/insights/issues/1046)) ([daaf6d1](https://github.com/open-sauced/insights/commit/daaf6d12d042af52ab0f1c405eb85caf207e80b5))
* remove dialog layout overlap on single highlight view ([#1047](https://github.com/open-sauced/insights/issues/1047)) ([ea836e8](https://github.com/open-sauced/insights/commit/ea836e8090f41ece5a8fae9ff4aa5835166c51fd))

## [1.37.0-beta.6](https://github.com/open-sauced/insights/compare/v1.37.0-beta.5...v1.37.0-beta.6) (2023-03-23)


### 🍕 Features

* replace react toast to radix ([#933](https://github.com/open-sauced/insights/issues/933)) ([3e000be](https://github.com/open-sauced/insights/commit/3e000be0e85b29cfdf16d58d1a74256ebcf85f8b))

## [1.37.0-beta.5](https://github.com/open-sauced/insights/compare/v1.37.0-beta.4...v1.37.0-beta.5) (2023-03-23)


### 🍕 Features

* create collaboration Ui components ([#1006](https://github.com/open-sauced/insights/issues/1006)) ([19ff5a7](https://github.com/open-sauced/insights/commit/19ff5a73d1ae669722c307bbf9f16e1dd5be3fb4))

## [1.37.0-beta.4](https://github.com/open-sauced/insights/compare/v1.37.0-beta.3...v1.37.0-beta.4) (2023-03-22)


### 🐛 Bug Fixes

*  updated footer file to update the year dynamically ([#1040](https://github.com/open-sauced/insights/issues/1040)) ([c766d95](https://github.com/open-sauced/insights/commit/c766d9521faf9d6198a9049772a285b9b2d32d00))

## [1.37.0-beta.3](https://github.com/open-sauced/insights/compare/v1.37.0-beta.2...v1.37.0-beta.3) (2023-03-22)


### 🐛 Bug Fixes

* close highlight dialog when clicking outside its container ([#999](https://github.com/open-sauced/insights/issues/999)) ([1bc90bb](https://github.com/open-sauced/insights/commit/1bc90bb5c61b353aeb847fef98d738998fb9c142))

## [1.37.0-beta.2](https://github.com/open-sauced/insights/compare/v1.37.0-beta.1...v1.37.0-beta.2) (2023-03-22)


### 🐛 Bug Fixes

* update avatar style to remain aligned with the input field ([#1037](https://github.com/open-sauced/insights/issues/1037)) ([2374f20](https://github.com/open-sauced/insights/commit/2374f204d75292ad2b947583e10ed485c1a2d4f0))

## [1.37.0-beta.1](https://github.com/open-sauced/insights/compare/v1.36.0...v1.37.0-beta.1) (2023-03-22)


### 🧑‍💻 Code Refactoring

* Deleted unused hooks, removed unused exports and imports ([#1028](https://github.com/open-sauced/insights/issues/1028)) ([7b2bda2](https://github.com/open-sauced/insights/commit/7b2bda22957e389dde711832dad2e19a5b502ea1))


### 🍕 Features

* add teams UI for the design system ([#994](https://github.com/open-sauced/insights/issues/994)) ([499d08e](https://github.com/open-sauced/insights/commit/499d08e81aa890ac7a2cca0761fc7d670538c363))
* added active styles to navbar links ([#1016](https://github.com/open-sauced/insights/issues/1016)) ([c25c0a3](https://github.com/open-sauced/insights/commit/c25c0a33230bca37aca12a98b243eaa00cd0731c)), closes [#697](https://github.com/open-sauced/insights/issues/697)
* update top nav menu to be more responsive on mobile ([#1029](https://github.com/open-sauced/insights/issues/1029)) ([90c1e4a](https://github.com/open-sauced/insights/commit/90c1e4a9f5ffeaa9839d0afae503ba42859170da)), closes [#866](https://github.com/open-sauced/insights/issues/866)


### 🐛 Bug Fixes

* add a check for proper URL in avatarURL prop ([#1009](https://github.com/open-sauced/insights/issues/1009)) ([a425279](https://github.com/open-sauced/insights/commit/a4252797fa8093c8d3d472c26422e20a9ec44160))
* center text inside upgrade access button ([#1027](https://github.com/open-sauced/insights/issues/1027)) ([cf3f6cb](https://github.com/open-sauced/insights/commit/cf3f6cbd7c5a7bf4db76733c9b90255a5bc09d39)), closes [#1024](https://github.com/open-sauced/insights/issues/1024)
* make delete standout ([#1026](https://github.com/open-sauced/insights/issues/1026)) ([9c68287](https://github.com/open-sauced/insights/commit/9c68287eabbe9b826efd27f0a70c3e0d48ba120e))
* refresh highlights list on update and delete ([#1034](https://github.com/open-sauced/insights/issues/1034)) ([bf2d951](https://github.com/open-sauced/insights/commit/bf2d9518bdf7b38e8dbdc147e8f01284041b511e))

## [1.36.0-beta.9](https://github.com/open-sauced/insights/compare/v1.36.0-beta.8...v1.36.0-beta.9) (2023-03-21)


### 🐛 Bug Fixes

* add a check for proper URL in avatarURL prop ([#1009](https://github.com/open-sauced/insights/issues/1009)) ([a425279](https://github.com/open-sauced/insights/commit/a4252797fa8093c8d3d472c26422e20a9ec44160))


### 🍕 Features

* update top nav menu to be more responsive on mobile ([#1029](https://github.com/open-sauced/insights/issues/1029)) ([90c1e4a](https://github.com/open-sauced/insights/commit/90c1e4a9f5ffeaa9839d0afae503ba42859170da)), closes [#866](https://github.com/open-sauced/insights/issues/866)

## [1.36.0-beta.8](https://github.com/open-sauced/insights/compare/v1.36.0-beta.7...v1.36.0-beta.8) (2023-03-20)


### 🐛 Bug Fixes

* make delete standout ([#1026](https://github.com/open-sauced/insights/issues/1026)) ([9c68287](https://github.com/open-sauced/insights/commit/9c68287eabbe9b826efd27f0a70c3e0d48ba120e))

## [1.36.0-beta.7](https://github.com/open-sauced/insights/compare/v1.36.0-beta.6...v1.36.0-beta.7) (2023-03-20)


### 🧑‍💻 Code Refactoring

* Deleted unused hooks, removed unused exports and imports ([#1028](https://github.com/open-sauced/insights/issues/1028)) ([7b2bda2](https://github.com/open-sauced/insights/commit/7b2bda22957e389dde711832dad2e19a5b502ea1))


### 🍕 Features

* added active styles to navbar links ([#1016](https://github.com/open-sauced/insights/issues/1016)) ([c25c0a3](https://github.com/open-sauced/insights/commit/c25c0a33230bca37aca12a98b243eaa00cd0731c)), closes [#697](https://github.com/open-sauced/insights/issues/697)


### 🐛 Bug Fixes

* center text inside upgrade access button ([#1027](https://github.com/open-sauced/insights/issues/1027)) ([cf3f6cb](https://github.com/open-sauced/insights/commit/cf3f6cbd7c5a7bf4db76733c9b90255a5bc09d39)), closes [#1024](https://github.com/open-sauced/insights/issues/1024)

## [1.36.0-beta.6](https://github.com/open-sauced/insights/compare/v1.36.0-beta.5...v1.36.0-beta.6) (2023-03-17)


### 🍕 Features

* add teams UI for the design system ([#994](https://github.com/open-sauced/insights/issues/994)) ([499d08e](https://github.com/open-sauced/insights/commit/499d08e81aa890ac7a2cca0761fc7d670538c363))

## [1.36.0](https://github.com/open-sauced/insights/compare/v1.35.0...v1.36.0) (2023-03-16)


### 🎨 Styles

* log netlify env variables ([245b625](https://github.com/open-sauced/insights/commit/245b6255af96e1a76028812b4b88ebffcb9e5a15))


### 🧑‍💻 Code Refactoring

* correct some missing hook dependencies ([4868b5f](https://github.com/open-sauced/insights/commit/4868b5f49c222a0b17377f6cdea8c09711dbc618))
* correct user insight repos search results ([9503d17](https://github.com/open-sauced/insights/commit/9503d17eff3d14f5b1af1f1fad120f393b47db08))
* correctly await router transitions ([8fa63c0](https://github.com/open-sauced/insights/commit/8fa63c040bd7980657024b3bd60c1ce5781ec815))


### 🔥 Performance Improvements

* load balance test, primarily for the backend ([2dcce75](https://github.com/open-sauced/insights/commit/2dcce75a6518dcaf49db1082c05c108c740d553f))


### 🐛 Bug Fixes

* correct database repo types and import loops ([d70f067](https://github.com/open-sauced/insights/commit/d70f06720f4b22b3fc92ab2aaeaeb45240e8a8f7))
* enable displaying/editing of insight page repos from API ([f4cc62f](https://github.com/open-sauced/insights/commit/f4cc62f5e6f39b96ec76041998b3664ab8068f8b))
* formatting ([065ede0](https://github.com/open-sauced/insights/commit/065ede07e9218568f363e66cbb997d0c88597310))
* thumbnail topic images ([#1010](https://github.com/open-sauced/insights/issues/1010)) ([3f64f6d](https://github.com/open-sauced/insights/commit/3f64f6d3657abec66b227c04cd229df671c10689))


### 🍕 Features

* add context to the Insights list page ([#1017](https://github.com/open-sauced/insights/issues/1017)) ([bd293d1](https://github.com/open-sauced/insights/commit/bd293d1a7e3d5912b6ae30378158d8ed1d1131de))
* add support for repo full name for onboarding/insight repos ([#861](https://github.com/open-sauced/insights/issues/861)) ([d075f90](https://github.com/open-sauced/insights/commit/d075f90a6b287fd52e31ec96cd8a2256f147b74f))
* connect contributors to public API ([0eb73e9](https://github.com/open-sauced/insights/commit/0eb73e9b081477567be8762689ff3ff964b5869e))
* connect pull requests to API ([#1015](https://github.com/open-sauced/insights/issues/1015)) ([4e06a6f](https://github.com/open-sauced/insights/commit/4e06a6f09096dd57db45fc2f02174c6b4116c895))
* connect pull requests to search API ([5904102](https://github.com/open-sauced/insights/commit/5904102337a875e17ff8aeef5cdfe793d0c7dc06))
* get pull requests for dashboard from API ([ec31c42](https://github.com/open-sauced/insights/commit/ec31c4207f321dccb9b8281b6171cd41235e3b3c))
* implement linked data with JSON-LD ([#888](https://github.com/open-sauced/insights/issues/888)) ([e8bda0e](https://github.com/open-sauced/insights/commit/e8bda0ec892750ad2d91acccd51624ed669a9542)), closes [#814](https://github.com/open-sauced/insights/issues/814)
* implement repo suggestions in create insight page ([#1011](https://github.com/open-sauced/insights/issues/1011)) ([8814289](https://github.com/open-sauced/insights/commit/8814289cc76ea9234f0ead05dd44078bc034dc66))

## [1.36.0-beta.5](https://github.com/open-sauced/insights/compare/v1.36.0-beta.4...v1.36.0-beta.5) (2023-03-16)


### 🍕 Features

* implement repo suggestions in create insight page ([#1011](https://github.com/open-sauced/insights/issues/1011)) ([8814289](https://github.com/open-sauced/insights/commit/8814289cc76ea9234f0ead05dd44078bc034dc66))

## [1.36.0-beta.4](https://github.com/open-sauced/insights/compare/v1.36.0-beta.3...v1.36.0-beta.4) (2023-03-16)


### 🍕 Features

* add context to the Insights list page ([#1017](https://github.com/open-sauced/insights/issues/1017)) ([bd293d1](https://github.com/open-sauced/insights/commit/bd293d1a7e3d5912b6ae30378158d8ed1d1131de))

## [1.36.0-beta.3](https://github.com/open-sauced/insights/compare/v1.36.0-beta.2...v1.36.0-beta.3) (2023-03-15)


### 🐛 Bug Fixes

* thumbnail topic images ([#1010](https://github.com/open-sauced/insights/issues/1010)) ([3f64f6d](https://github.com/open-sauced/insights/commit/3f64f6d3657abec66b227c04cd229df671c10689))


### 🍕 Features

* connect pull requests to API ([#1015](https://github.com/open-sauced/insights/issues/1015)) ([4e06a6f](https://github.com/open-sauced/insights/commit/4e06a6f09096dd57db45fc2f02174c6b4116c895))

## [1.36.0-beta.2](https://github.com/open-sauced/insights/compare/v1.36.0-beta.1...v1.36.0-beta.2) (2023-03-15)


### 🔥 Performance Improvements

* load balance test, primarily for the backend ([2dcce75](https://github.com/open-sauced/insights/commit/2dcce75a6518dcaf49db1082c05c108c740d553f))

## [1.36.0-beta.1](https://github.com/open-sauced/insights/compare/v1.35.0...v1.36.0-beta.1) (2023-03-15)


### 🎨 Styles

* log netlify env variables ([245b625](https://github.com/open-sauced/insights/commit/245b6255af96e1a76028812b4b88ebffcb9e5a15))


### 🧑‍💻 Code Refactoring

* correct some missing hook dependencies ([4868b5f](https://github.com/open-sauced/insights/commit/4868b5f49c222a0b17377f6cdea8c09711dbc618))
* correct user insight repos search results ([9503d17](https://github.com/open-sauced/insights/commit/9503d17eff3d14f5b1af1f1fad120f393b47db08))
* correctly await router transitions ([8fa63c0](https://github.com/open-sauced/insights/commit/8fa63c040bd7980657024b3bd60c1ce5781ec815))


### 🐛 Bug Fixes

* correct database repo types and import loops ([d70f067](https://github.com/open-sauced/insights/commit/d70f06720f4b22b3fc92ab2aaeaeb45240e8a8f7))
* enable displaying/editing of insight page repos from API ([f4cc62f](https://github.com/open-sauced/insights/commit/f4cc62f5e6f39b96ec76041998b3664ab8068f8b))
* formatting ([065ede0](https://github.com/open-sauced/insights/commit/065ede07e9218568f363e66cbb997d0c88597310))


### 🍕 Features

* add support for repo full name for onboarding/insight repos ([#861](https://github.com/open-sauced/insights/issues/861)) ([d075f90](https://github.com/open-sauced/insights/commit/d075f90a6b287fd52e31ec96cd8a2256f147b74f))
* connect contributors to public API ([0eb73e9](https://github.com/open-sauced/insights/commit/0eb73e9b081477567be8762689ff3ff964b5869e))
* connect pull requests to search API ([5904102](https://github.com/open-sauced/insights/commit/5904102337a875e17ff8aeef5cdfe793d0c7dc06))
* get pull requests for dashboard from API ([ec31c42](https://github.com/open-sauced/insights/commit/ec31c4207f321dccb9b8281b6171cd41235e3b3c))
* implement linked data with JSON-LD ([#888](https://github.com/open-sauced/insights/issues/888)) ([e8bda0e](https://github.com/open-sauced/insights/commit/e8bda0ec892750ad2d91acccd51624ed669a9542)), closes [#814](https://github.com/open-sauced/insights/issues/814)

## [1.35.0](https://github.com/open-sauced/insights/compare/v1.34.0...v1.35.0) (2023-03-14)


### 🐛 Bug Fixes

* copy correct permalink ([#998](https://github.com/open-sauced/insights/issues/998)) ([7fb7e67](https://github.com/open-sauced/insights/commit/7fb7e67bc56b38c9620ed32a52b233c8793db181))
* remove deprecated create usage from Zustand ([0d797ec](https://github.com/open-sauced/insights/commit/0d797ec3b340b9ec864b89ffd79f36bc47a4d64f))


### 🍕 Features

* add golang language topic to supported interests ([#995](https://github.com/open-sauced/insights/issues/995)) ([8753d9d](https://github.com/open-sauced/insights/commit/8753d9d3149aa0c5162cd37317d4a45419c3a689))
* add official logos for pre-defined topics. ([#966](https://github.com/open-sauced/insights/issues/966)) ([ce3f579](https://github.com/open-sauced/insights/commit/ce3f579388dbdb26e529fe1f00aadfc1f018851b))
* add pagination component to feeds and profile ([#996](https://github.com/open-sauced/insights/issues/996)) ([02007d6](https://github.com/open-sauced/insights/commit/02007d6ae98cf1f0a7d23e73d6ce3af773f86ec4))
* add pagination to user insights page ([#870](https://github.com/open-sauced/insights/issues/870)) ([39a0700](https://github.com/open-sauced/insights/commit/39a0700dcacb762404ac81a8e9875ad01d98b90a))
* adds zendesk to the app ([#979](https://github.com/open-sauced/insights/issues/979)) ([383df83](https://github.com/open-sauced/insights/commit/383df8355697dd15f811f546003ba79a6131485c))

## [1.35.0-beta.5](https://github.com/open-sauced/insights/compare/v1.35.0-beta.4...v1.35.0-beta.5) (2023-03-14)


### 🍕 Features

* add pagination to user insights page ([#870](https://github.com/open-sauced/insights/issues/870)) ([39a0700](https://github.com/open-sauced/insights/commit/39a0700dcacb762404ac81a8e9875ad01d98b90a))

## [1.35.0-beta.4](https://github.com/open-sauced/insights/compare/v1.35.0-beta.3...v1.35.0-beta.4) (2023-03-14)


### 🍕 Features

* add golang language topic to supported interests ([#995](https://github.com/open-sauced/insights/issues/995)) ([8753d9d](https://github.com/open-sauced/insights/commit/8753d9d3149aa0c5162cd37317d4a45419c3a689))

## [1.35.0-beta.3](https://github.com/open-sauced/insights/compare/v1.35.0-beta.2...v1.35.0-beta.3) (2023-03-14)


### 🐛 Bug Fixes

* remove deprecated create usage from Zustand ([0d797ec](https://github.com/open-sauced/insights/commit/0d797ec3b340b9ec864b89ffd79f36bc47a4d64f))

## [1.35.0-beta.2](https://github.com/open-sauced/insights/compare/v1.35.0-beta.1...v1.35.0-beta.2) (2023-03-14)


### 🍕 Features

* add pagination component to feeds and profile ([#996](https://github.com/open-sauced/insights/issues/996)) ([02007d6](https://github.com/open-sauced/insights/commit/02007d6ae98cf1f0a7d23e73d6ce3af773f86ec4))

## [1.35.0-beta.1](https://github.com/open-sauced/insights/compare/v1.34.1-beta.1...v1.35.0-beta.1) (2023-03-14)


### 🍕 Features

* add official logos for pre-defined topics. ([#966](https://github.com/open-sauced/insights/issues/966)) ([ce3f579](https://github.com/open-sauced/insights/commit/ce3f579388dbdb26e529fe1f00aadfc1f018851b))
* adds zendesk to the app ([#979](https://github.com/open-sauced/insights/issues/979)) ([383df83](https://github.com/open-sauced/insights/commit/383df8355697dd15f811f546003ba79a6131485c))

### [1.34.1-beta.1](https://github.com/open-sauced/insights/compare/v1.34.0...v1.34.1-beta.1) (2023-03-14)


### 🐛 Bug Fixes

* copy correct permalink ([#998](https://github.com/open-sauced/insights/issues/998)) ([7fb7e67](https://github.com/open-sauced/insights/commit/7fb7e67bc56b38c9620ed32a52b233c8793db181))

## [1.34.0](https://github.com/open-sauced/insights/compare/v1.33.0...v1.34.0) (2023-03-10)


### 🍕 Features

* add custom tooltip to pr list icon ([#962](https://github.com/open-sauced/insights/issues/962)) ([44fa050](https://github.com/open-sauced/insights/commit/44fa05073614acd7cafc44a83d4a6a3fb82e6d2b)), closes [#955](https://github.com/open-sauced/insights/issues/955)
* add delete highlight implementation ([#963](https://github.com/open-sauced/insights/issues/963)) ([10575f1](https://github.com/open-sauced/insights/commit/10575f14cf5dd14dde143e0b4ae08f09462ddc01)), closes [#906](https://github.com/open-sauced/insights/issues/906)
* implement highlight's permanent link ([#957](https://github.com/open-sauced/insights/issues/957)) ([78ad176](https://github.com/open-sauced/insights/commit/78ad176bfb8524332a4249485157f6e4a4a64de6)), closes [#895](https://github.com/open-sauced/insights/issues/895) [#950](https://github.com/open-sauced/insights/issues/950)
* remove the repo click to filter feature & link to github ([#989](https://github.com/open-sauced/insights/issues/989)) ([6f62b46](https://github.com/open-sauced/insights/commit/6f62b46af06271859a1b2012dd730af8ad176d4e)), closes [#983](https://github.com/open-sauced/insights/issues/983)


### 🧑‍💻 Code Refactoring

* add invalid pull url feedback ([#992](https://github.com/open-sauced/insights/issues/992)) ([28fe15c](https://github.com/open-sauced/insights/commit/28fe15c76980ffb1a1982cf45e074ac61ac83a4f)), closes [#961](https://github.com/open-sauced/insights/issues/961)


### 🐛 Bug Fixes

* add Rust to interests options and combine utility function ([#977](https://github.com/open-sauced/insights/issues/977)) ([28a5270](https://github.com/open-sauced/insights/commit/28a5270fd9b8fe281ed9360c1e3e2a8903042c01)), closes [#976](https://github.com/open-sauced/insights/issues/976)
* add skeleton wrapper atom to storybook ([#990](https://github.com/open-sauced/insights/issues/990)) ([780d345](https://github.com/open-sauced/insights/commit/780d3453ed1e3100a8e74e3318bcd51fbd53d774))
* adds more placeholder ([#971](https://github.com/open-sauced/insights/issues/971)) ([bf5daa7](https://github.com/open-sauced/insights/commit/bf5daa7f4322d006c2026bdaba6d61d800211f9a))
* adjust input body overlap when editing a highlight ([#991](https://github.com/open-sauced/insights/issues/991)) ([1512f7d](https://github.com/open-sauced/insights/commit/1512f7d4b7ebcfb5cdaaef8a683e50e6d12b8fcd))
* fix pointer-events when closing edit dialog ([#987](https://github.com/open-sauced/insights/issues/987)) ([df6eb2b](https://github.com/open-sauced/insights/commit/df6eb2b1a605be1048fb049a16786169e73de709))
* update local time option from user settings ([#951](https://github.com/open-sauced/insights/issues/951)) ([c91a513](https://github.com/open-sauced/insights/commit/c91a51365bbde9bddfd889b952d9bd35d0a3cf43))

## [1.34.0-beta.9](https://github.com/open-sauced/insights/compare/v1.34.0-beta.8...v1.34.0-beta.9) (2023-03-10)


### 🐛 Bug Fixes

* update local time option from user settings ([#951](https://github.com/open-sauced/insights/issues/951)) ([c91a513](https://github.com/open-sauced/insights/commit/c91a51365bbde9bddfd889b952d9bd35d0a3cf43))

## [1.34.0-beta.8](https://github.com/open-sauced/insights/compare/v1.34.0-beta.7...v1.34.0-beta.8) (2023-03-10)


### 🐛 Bug Fixes

* adjust input body overlap when editing a highlight ([#991](https://github.com/open-sauced/insights/issues/991)) ([1512f7d](https://github.com/open-sauced/insights/commit/1512f7d4b7ebcfb5cdaaef8a683e50e6d12b8fcd))

## [1.34.0-beta.7](https://github.com/open-sauced/insights/compare/v1.34.0-beta.6...v1.34.0-beta.7) (2023-03-10)


### 🧑‍💻 Code Refactoring

* add invalid pull url feedback ([#992](https://github.com/open-sauced/insights/issues/992)) ([28fe15c](https://github.com/open-sauced/insights/commit/28fe15c76980ffb1a1982cf45e074ac61ac83a4f)), closes [#961](https://github.com/open-sauced/insights/issues/961)

## [1.34.0-beta.6](https://github.com/open-sauced/insights/compare/v1.34.0-beta.5...v1.34.0-beta.6) (2023-03-10)


### 🍕 Features

* add delete highlight implementation ([#963](https://github.com/open-sauced/insights/issues/963)) ([10575f1](https://github.com/open-sauced/insights/commit/10575f14cf5dd14dde143e0b4ae08f09462ddc01)), closes [#906](https://github.com/open-sauced/insights/issues/906)

## [1.34.0-beta.5](https://github.com/open-sauced/insights/compare/v1.34.0-beta.4...v1.34.0-beta.5) (2023-03-10)


### 🐛 Bug Fixes

* add skeleton wrapper atom to storybook ([#990](https://github.com/open-sauced/insights/issues/990)) ([780d345](https://github.com/open-sauced/insights/commit/780d3453ed1e3100a8e74e3318bcd51fbd53d774))


### 🍕 Features

* remove the repo click to filter feature & link to github ([#989](https://github.com/open-sauced/insights/issues/989)) ([6f62b46](https://github.com/open-sauced/insights/commit/6f62b46af06271859a1b2012dd730af8ad176d4e)), closes [#983](https://github.com/open-sauced/insights/issues/983)

## [1.34.0-beta.4](https://github.com/open-sauced/insights/compare/v1.34.0-beta.3...v1.34.0-beta.4) (2023-03-09)


### 🐛 Bug Fixes

* fix pointer-events when closing edit dialog ([#987](https://github.com/open-sauced/insights/issues/987)) ([df6eb2b](https://github.com/open-sauced/insights/commit/df6eb2b1a605be1048fb049a16786169e73de709))

## [1.34.0-beta.3](https://github.com/open-sauced/insights/compare/v1.34.0-beta.2...v1.34.0-beta.3) (2023-03-09)


### 🍕 Features

* implement highlight's permanent link ([#957](https://github.com/open-sauced/insights/issues/957)) ([78ad176](https://github.com/open-sauced/insights/commit/78ad176bfb8524332a4249485157f6e4a4a64de6)), closes [#895](https://github.com/open-sauced/insights/issues/895) [#950](https://github.com/open-sauced/insights/issues/950)

## [1.34.0-beta.2](https://github.com/open-sauced/insights/compare/v1.34.0-beta.1...v1.34.0-beta.2) (2023-03-08)


### 🐛 Bug Fixes

* add Rust to interests options and combine utility function ([#977](https://github.com/open-sauced/insights/issues/977)) ([28a5270](https://github.com/open-sauced/insights/commit/28a5270fd9b8fe281ed9360c1e3e2a8903042c01)), closes [#976](https://github.com/open-sauced/insights/issues/976)

## [1.34.0-beta.1](https://github.com/open-sauced/insights/compare/v1.33.1-beta.1...v1.34.0-beta.1) (2023-03-08)


### 🍕 Features

* add custom tooltip to pr list icon ([#962](https://github.com/open-sauced/insights/issues/962)) ([44fa050](https://github.com/open-sauced/insights/commit/44fa05073614acd7cafc44a83d4a6a3fb82e6d2b)), closes [#955](https://github.com/open-sauced/insights/issues/955)

### [1.33.1-beta.1](https://github.com/open-sauced/insights/compare/v1.33.0...v1.33.1-beta.1) (2023-03-08)


### 🐛 Bug Fixes

* adds more placeholder ([#971](https://github.com/open-sauced/insights/issues/971)) ([bf5daa7](https://github.com/open-sauced/insights/commit/bf5daa7f4322d006c2026bdaba6d61d800211f9a))

## [1.33.0](https://github.com/open-sauced/insights/compare/v1.32.0...v1.33.0) (2023-03-07)


### 🐛 Bug Fixes

*  broken css on button component ([#938](https://github.com/open-sauced/insights/issues/938)) ([6ba2365](https://github.com/open-sauced/insights/commit/6ba23655aa5b8e674d1be1579e1a1b868be8017a)), closes [#934](https://github.com/open-sauced/insights/issues/934) [#937](https://github.com/open-sauced/insights/issues/937)
* Add highlights placeholder ([#945](https://github.com/open-sauced/insights/issues/945)) ([034d550](https://github.com/open-sauced/insights/commit/034d550c473e14aee9215b5c6495315a3369636a))
* check for contributor commit data before updating graph ([#941](https://github.com/open-sauced/insights/issues/941)) ([58a74fe](https://github.com/open-sauced/insights/commit/58a74fe1f61d2e33001b19b314e0b6c65ce52816))
* Highlights UX copy bandaid ([#944](https://github.com/open-sauced/insights/issues/944)) ([8a7d559](https://github.com/open-sauced/insights/commit/8a7d55980a29428e5de2b9b5b79b48758015c888))
* keep initial user settings data after being fetched ([#959](https://github.com/open-sauced/insights/issues/959)) ([b869863](https://github.com/open-sauced/insights/commit/b8698630c9e086f45f4f8e5aafce7b58e81ca662)), closes [#931](https://github.com/open-sauced/insights/issues/931)


### 🧑‍💻 Code Refactoring

* update non-connected user avatar  ([#967](https://github.com/open-sauced/insights/issues/967)) ([51bf664](https://github.com/open-sauced/insights/commit/51bf664701ab8b4ed161960be5fc46865080521d)), closes [#964](https://github.com/open-sauced/insights/issues/964)


### 🍕 Features

* add repository search to the create insights page ([#958](https://github.com/open-sauced/insights/issues/958)) ([d6f151c](https://github.com/open-sauced/insights/commit/d6f151c02e634e093fb7e7ea1076f39517d08e1d)), closes [#932](https://github.com/open-sauced/insights/issues/932)
* add reuseable error component to the design system ([#954](https://github.com/open-sauced/insights/issues/954)) ([56e986b](https://github.com/open-sauced/insights/commit/56e986b5e3275737cf5de51a9ae62d7c6c101789)), closes [#781](https://github.com/open-sauced/insights/issues/781) [#700](https://github.com/open-sauced/insights/issues/700)
* expand list of topics and interests ([#939](https://github.com/open-sauced/insights/issues/939)) ([a607062](https://github.com/open-sauced/insights/commit/a607062ecacc627b2739def58c1872fb36e16bf3)), closes [#927](https://github.com/open-sauced/insights/issues/927) [#930](https://github.com/open-sauced/insights/issues/930)
* make highlights avatar and handle clickable on feeds page ([#953](https://github.com/open-sauced/insights/issues/953)) ([fd59918](https://github.com/open-sauced/insights/commit/fd59918f4e97007c2b1fb725aa492f257205aa44)), closes [#940](https://github.com/open-sauced/insights/issues/940) [#935](https://github.com/open-sauced/insights/issues/935)
* make the entire insight page buttons clickable ([#960](https://github.com/open-sauced/insights/issues/960)) ([7a7708f](https://github.com/open-sauced/insights/commit/7a7708fdc707b35f506af21a4e899fdbda2613ad)), closes [#701](https://github.com/open-sauced/insights/issues/701)
* make user profile interest clickable ([#952](https://github.com/open-sauced/insights/issues/952)) ([370bc8a](https://github.com/open-sauced/insights/commit/370bc8a8206688b6d7a689f26b114032dafaf276)), closes [#942](https://github.com/open-sauced/insights/issues/942)

## [1.33.0-beta.10](https://github.com/open-sauced/insights/compare/v1.33.0-beta.9...v1.33.0-beta.10) (2023-03-07)


### 🍕 Features

* add repository search to the create insights page ([#958](https://github.com/open-sauced/insights/issues/958)) ([d6f151c](https://github.com/open-sauced/insights/commit/d6f151c02e634e093fb7e7ea1076f39517d08e1d)), closes [#932](https://github.com/open-sauced/insights/issues/932)

## [1.33.0-beta.9](https://github.com/open-sauced/insights/compare/v1.33.0-beta.8...v1.33.0-beta.9) (2023-03-07)


### 🍕 Features

* make the entire insight page buttons clickable ([#960](https://github.com/open-sauced/insights/issues/960)) ([7a7708f](https://github.com/open-sauced/insights/commit/7a7708fdc707b35f506af21a4e899fdbda2613ad)), closes [#701](https://github.com/open-sauced/insights/issues/701)

## [1.33.0-beta.8](https://github.com/open-sauced/insights/compare/v1.33.0-beta.7...v1.33.0-beta.8) (2023-03-07)


### 🧑‍💻 Code Refactoring

* update non-connected user avatar  ([#967](https://github.com/open-sauced/insights/issues/967)) ([51bf664](https://github.com/open-sauced/insights/commit/51bf664701ab8b4ed161960be5fc46865080521d)), closes [#964](https://github.com/open-sauced/insights/issues/964)

## [1.33.0-beta.7](https://github.com/open-sauced/insights/compare/v1.33.0-beta.6...v1.33.0-beta.7) (2023-03-07)


### 🐛 Bug Fixes

* keep initial user settings data after being fetched ([#959](https://github.com/open-sauced/insights/issues/959)) ([b869863](https://github.com/open-sauced/insights/commit/b8698630c9e086f45f4f8e5aafce7b58e81ca662)), closes [#931](https://github.com/open-sauced/insights/issues/931)

## [1.33.0-beta.6](https://github.com/open-sauced/insights/compare/v1.33.0-beta.5...v1.33.0-beta.6) (2023-03-06)


### 🍕 Features

* add reuseable error component to the design system ([#954](https://github.com/open-sauced/insights/issues/954)) ([56e986b](https://github.com/open-sauced/insights/commit/56e986b5e3275737cf5de51a9ae62d7c6c101789)), closes [#781](https://github.com/open-sauced/insights/issues/781) [#700](https://github.com/open-sauced/insights/issues/700)
* make highlights avatar and handle clickable on feeds page ([#953](https://github.com/open-sauced/insights/issues/953)) ([fd59918](https://github.com/open-sauced/insights/commit/fd59918f4e97007c2b1fb725aa492f257205aa44)), closes [#940](https://github.com/open-sauced/insights/issues/940) [#935](https://github.com/open-sauced/insights/issues/935)

## [1.33.0-beta.5](https://github.com/open-sauced/insights/compare/v1.33.0-beta.4...v1.33.0-beta.5) (2023-03-06)


### 🍕 Features

* make user profile interest clickable ([#952](https://github.com/open-sauced/insights/issues/952)) ([370bc8a](https://github.com/open-sauced/insights/commit/370bc8a8206688b6d7a689f26b114032dafaf276)), closes [#942](https://github.com/open-sauced/insights/issues/942)

## [1.33.0-beta.4](https://github.com/open-sauced/insights/compare/v1.33.0-beta.3...v1.33.0-beta.4) (2023-03-03)


### 🐛 Bug Fixes

* Add highlights placeholder ([#945](https://github.com/open-sauced/insights/issues/945)) ([034d550](https://github.com/open-sauced/insights/commit/034d550c473e14aee9215b5c6495315a3369636a))

## [1.33.0-beta.3](https://github.com/open-sauced/insights/compare/v1.33.0-beta.2...v1.33.0-beta.3) (2023-03-03)


### 🐛 Bug Fixes

* Highlights UX copy bandaid ([#944](https://github.com/open-sauced/insights/issues/944)) ([8a7d559](https://github.com/open-sauced/insights/commit/8a7d55980a29428e5de2b9b5b79b48758015c888))

## [1.33.0-beta.2](https://github.com/open-sauced/insights/compare/v1.33.0-beta.1...v1.33.0-beta.2) (2023-03-03)


### 🐛 Bug Fixes

* check for contributor commit data before updating graph ([#941](https://github.com/open-sauced/insights/issues/941)) ([58a74fe](https://github.com/open-sauced/insights/commit/58a74fe1f61d2e33001b19b314e0b6c65ce52816))

## [1.33.0-beta.1](https://github.com/open-sauced/insights/compare/v1.32.0...v1.33.0-beta.1) (2023-03-03)


### 🐛 Bug Fixes

*  broken css on button component ([#938](https://github.com/open-sauced/insights/issues/938)) ([6ba2365](https://github.com/open-sauced/insights/commit/6ba23655aa5b8e674d1be1579e1a1b868be8017a)), closes [#934](https://github.com/open-sauced/insights/issues/934) [#937](https://github.com/open-sauced/insights/issues/937)


### 🍕 Features

* expand list of topics and interests ([#939](https://github.com/open-sauced/insights/issues/939)) ([a607062](https://github.com/open-sauced/insights/commit/a607062ecacc627b2739def58c1872fb36e16bf3)), closes [#927](https://github.com/open-sauced/insights/issues/927) [#930](https://github.com/open-sauced/insights/issues/930)

## [1.32.0](https://github.com/open-sauced/insights/compare/v1.31.0...v1.32.0) (2023-03-02)


### 🍕 Features

* add ability to delete an insight page ([#920](https://github.com/open-sauced/insights/issues/920)) ([e1cd798](https://github.com/open-sauced/insights/commit/e1cd7988851eb4734b666e29541b7f8155f8ea1b)), closes [#853](https://github.com/open-sauced/insights/issues/853)
* add loading state to highlight cards ([#921](https://github.com/open-sauced/insights/issues/921)) ([63c2cc1](https://github.com/open-sauced/insights/commit/63c2cc1772fed6161b70e25a883d16a0f756d1a2)), closes [#903](https://github.com/open-sauced/insights/issues/903)
* default explore topic matches user interest ([#930](https://github.com/open-sauced/insights/issues/930)) ([e73c9dd](https://github.com/open-sauced/insights/commit/e73c9ddaffa2cd013ea43f2132b98cf28d2951ad)), closes [#929](https://github.com/open-sauced/insights/issues/929)
* implement highlights feed page ([#913](https://github.com/open-sauced/insights/issues/913)) ([6271c91](https://github.com/open-sauced/insights/commit/6271c919fc45bcd8d0ef7eb8f4282a5114a72882)), closes [#900](https://github.com/open-sauced/insights/issues/900) [#829](https://github.com/open-sauced/insights/issues/829)
* navigate to user contributions tab if there are no user highlights ([#918](https://github.com/open-sauced/insights/issues/918)) ([3bb20ef](https://github.com/open-sauced/insights/commit/3bb20ef596cf32e2186678c8e1bcb5c4040e3393)), closes [#914](https://github.com/open-sauced/insights/issues/914) [#916](https://github.com/open-sauced/insights/issues/916)
* update default user profile bio ([#926](https://github.com/open-sauced/insights/issues/926)) ([2a95817](https://github.com/open-sauced/insights/commit/2a9581709365c2bdcbe9a0f1fcbddf6272ff4b72)), closes [#922](https://github.com/open-sauced/insights/issues/922)

## [1.32.0-beta.1](https://github.com/open-sauced/insights/compare/v1.31.0...v1.32.0-beta.1) (2023-03-02)


### 🍕 Features

* add ability to delete an insight page ([#920](https://github.com/open-sauced/insights/issues/920)) ([e1cd798](https://github.com/open-sauced/insights/commit/e1cd7988851eb4734b666e29541b7f8155f8ea1b)), closes [#853](https://github.com/open-sauced/insights/issues/853)
* add loading state to highlight cards ([#921](https://github.com/open-sauced/insights/issues/921)) ([63c2cc1](https://github.com/open-sauced/insights/commit/63c2cc1772fed6161b70e25a883d16a0f756d1a2)), closes [#903](https://github.com/open-sauced/insights/issues/903)
* default explore topic matches user interest ([#930](https://github.com/open-sauced/insights/issues/930)) ([e73c9dd](https://github.com/open-sauced/insights/commit/e73c9ddaffa2cd013ea43f2132b98cf28d2951ad)), closes [#929](https://github.com/open-sauced/insights/issues/929)
* implement highlights feed page ([#913](https://github.com/open-sauced/insights/issues/913)) ([6271c91](https://github.com/open-sauced/insights/commit/6271c919fc45bcd8d0ef7eb8f4282a5114a72882)), closes [#900](https://github.com/open-sauced/insights/issues/900) [#829](https://github.com/open-sauced/insights/issues/829)
* navigate to user contributions tab if there are no user highlights ([#918](https://github.com/open-sauced/insights/issues/918)) ([3bb20ef](https://github.com/open-sauced/insights/commit/3bb20ef596cf32e2186678c8e1bcb5c4040e3393)), closes [#914](https://github.com/open-sauced/insights/issues/914) [#916](https://github.com/open-sauced/insights/issues/916)
* update default user profile bio ([#926](https://github.com/open-sauced/insights/issues/926)) ([2a95817](https://github.com/open-sauced/insights/commit/2a9581709365c2bdcbe9a0f1fcbddf6272ff4b72)), closes [#922](https://github.com/open-sauced/insights/issues/922)

## [1.31.0](https://github.com/open-sauced/insights/compare/v1.30.0...v1.31.0) (2023-02-28)

## [1.31.0-beta.16](https://github.com/open-sauced/insights/compare/v1.31.0-beta.15...v1.31.0-beta.16) (2023-03-02)


### 🍕 Features

* implement highlights feed page ([#913](https://github.com/open-sauced/insights/issues/913)) ([6271c91](https://github.com/open-sauced/insights/commit/6271c919fc45bcd8d0ef7eb8f4282a5114a72882)), closes [#900](https://github.com/open-sauced/insights/issues/900) [#829](https://github.com/open-sauced/insights/issues/829)

## [1.31.0-beta.15](https://github.com/open-sauced/insights/compare/v1.31.0-beta.14...v1.31.0-beta.15) (2023-03-01)


### 🍕 Features

* default explore topic matches user interest ([#930](https://github.com/open-sauced/insights/issues/930)) ([e73c9dd](https://github.com/open-sauced/insights/commit/e73c9ddaffa2cd013ea43f2132b98cf28d2951ad)), closes [#929](https://github.com/open-sauced/insights/issues/929)

## [1.31.0-beta.14](https://github.com/open-sauced/insights/compare/v1.31.0-beta.13...v1.31.0-beta.14) (2023-03-01)


### 🧑‍💻 Code Refactoring

* replace `Supabase` button with native button element  ([#907](https://github.com/open-sauced/insights/issues/907)) ([807a177](https://github.com/open-sauced/insights/commit/807a17727f9cc4b09d7cf6b42c2c536e934675cc)), closes [#901](https://github.com/open-sauced/insights/issues/901) [#854](https://github.com/open-sauced/insights/issues/854)


### 🍕 Features

* navigate to user contributions tab if there are no user highlights ([#918](https://github.com/open-sauced/insights/issues/918)) ([3bb20ef](https://github.com/open-sauced/insights/commit/3bb20ef596cf32e2186678c8e1bcb5c4040e3393)), closes [#914](https://github.com/open-sauced/insights/issues/914) [#916](https://github.com/open-sauced/insights/issues/916)

## [1.31.0-beta.13](https://github.com/open-sauced/insights/compare/v1.31.0-beta.12...v1.31.0-beta.13) (2023-03-01)


### 🍕 Features

* update default user profile bio ([#926](https://github.com/open-sauced/insights/issues/926)) ([2a95817](https://github.com/open-sauced/insights/commit/2a9581709365c2bdcbe9a0f1fcbddf6272ff4b72)), closes [#922](https://github.com/open-sauced/insights/issues/922)

## [1.31.0-beta.12](https://github.com/open-sauced/insights/compare/v1.31.0-beta.11...v1.31.0-beta.12) (2023-03-01)


### 🍕 Features

* add ability to delete an insight page ([#920](https://github.com/open-sauced/insights/issues/920)) ([e1cd798](https://github.com/open-sauced/insights/commit/e1cd7988851eb4734b666e29541b7f8155f8ea1b)), closes [#853](https://github.com/open-sauced/insights/issues/853)
* add loading state to highlight cards ([#921](https://github.com/open-sauced/insights/issues/921)) ([63c2cc1](https://github.com/open-sauced/insights/commit/63c2cc1772fed6161b70e25a883d16a0f756d1a2)), closes [#903](https://github.com/open-sauced/insights/issues/903)

## [1.31.0-beta.11](https://github.com/open-sauced/insights/compare/v1.31.0-beta.10...v1.31.0-beta.11) (2023-02-28)


### 🐛 Bug Fixes

* update pointer after highlight is saved ([754e94f](https://github.com/open-sauced/insights/commit/754e94fe2051801ac372230e3be3224643ecd596))

## [1.31.0-beta.10](https://github.com/open-sauced/insights/compare/v1.31.0-beta.9...v1.31.0-beta.10) (2023-02-28)


### 🍕 Features

* implement highlights character limit  ([#912](https://github.com/open-sauced/insights/issues/912)) ([5ee12bf](https://github.com/open-sauced/insights/commit/5ee12bff1910d47613a2644f6546059cc3a8d878)), closes [#899](https://github.com/open-sauced/insights/issues/899)

## [1.31.0-beta.9](https://github.com/open-sauced/insights/compare/v1.31.0-beta.8...v1.31.0-beta.9) (2023-02-28)


### 🍕 Features

* add suggestions to repo search ([#908](https://github.com/open-sauced/insights/issues/908)) ([f908b18](https://github.com/open-sauced/insights/commit/f908b186e168a229ab59e59a623f5380094152c2)), closes [#789](https://github.com/open-sauced/insights/issues/789)

## [1.31.0-beta.8](https://github.com/open-sauced/insights/compare/v1.31.0-beta.7...v1.31.0-beta.8) (2023-02-28)


### 🐛 Bug Fixes

* update highlight toast message ([#915](https://github.com/open-sauced/insights/issues/915)) ([a1a5568](https://github.com/open-sauced/insights/commit/a1a556888f256eab9d48e47e13ed10e2a8265493)), closes [#904](https://github.com/open-sauced/insights/issues/904)

## [1.31.0-beta.7](https://github.com/open-sauced/insights/compare/v1.31.0-beta.6...v1.31.0-beta.7) (2023-02-27)


### 🍕 Features

* 867 mobile buttons header ([#898](https://github.com/open-sauced/insights/issues/898)) ([e2246f4](https://github.com/open-sauced/insights/commit/e2246f447f46c1e92849c8e2e73baff3051976bf))

## [1.31.0-beta.6](https://github.com/open-sauced/insights/compare/v1.31.0-beta.5...v1.31.0-beta.6) (2023-02-27)


### 🍕 Features

* implement edit highlight ([#909](https://github.com/open-sauced/insights/issues/909)) ([79f9ddc](https://github.com/open-sauced/insights/commit/79f9ddc90498a5fc1456199ce1350668ece5ab22))

## [1.31.0-beta.5](https://github.com/open-sauced/insights/compare/v1.31.0-beta.4...v1.31.0-beta.5) (2023-02-24)


### 🧑‍💻 Code Refactoring

* replace `Supabase` button with native button element  ([#907](https://github.com/open-sauced/insights/issues/907)) ([807a177](https://github.com/open-sauced/insights/commit/807a17727f9cc4b09d7cf6b42c2c536e934675cc)), closes [#901](https://github.com/open-sauced/insights/issues/901) [#854](https://github.com/open-sauced/insights/issues/854)

## [1.31.0-beta.4](https://github.com/open-sauced/insights/compare/v1.31.0-beta.3...v1.31.0-beta.4) (2023-02-24)


### 🍕 Features

* update user onboarding flow ([#880](https://github.com/open-sauced/insights/issues/880)) ([bd34c2a](https://github.com/open-sauced/insights/commit/bd34c2ae49186acbf9bd459cf974f907165de36b)), closes [#801](https://github.com/open-sauced/insights/issues/801)

## [1.31.0-beta.3](https://github.com/open-sauced/insights/compare/v1.31.0-beta.2...v1.31.0-beta.3) (2023-02-23)


### 🐛 Bug Fixes

* prevent user URL fields from providing an empty string ([7de74b3](https://github.com/open-sauced/insights/commit/7de74b370bd0ecdff7b661e8372788974b801c1d))

## [1.31.0-beta.2](https://github.com/open-sauced/insights/compare/v1.31.0-beta.1...v1.31.0-beta.2) (2023-02-23)


### 🍕 Features

* add user profile fields for LinkedIn, GitHub sponsors ([#905](https://github.com/open-sauced/insights/issues/905)) ([df06687](https://github.com/open-sauced/insights/commit/df06687c67abd04004287b1d99c075ffe605ae9f)), closes [#876](https://github.com/open-sauced/insights/issues/876)

## [1.31.0-beta.1](https://github.com/open-sauced/insights/compare/v1.30.0...v1.31.0-beta.1) (2023-02-21)


### 🍕 Features

* implement report highlight  ([#897](https://github.com/open-sauced/insights/issues/897)) ([604f70e](https://github.com/open-sauced/insights/commit/604f70ee2af352eb1da3f3dc3cd70f17972b7d51)), closes [#884](https://github.com/open-sauced/insights/issues/884)

## [1.30.0](https://github.com/open-sauced/insights/compare/v1.29.0...v1.30.0) (2023-02-21)


### 🍕 Features

* add  highlights to user profile page ([#859](https://github.com/open-sauced/insights/issues/859)) ([4b01376](https://github.com/open-sauced/insights/commit/4b013767176a9f1e8bec47a5190dc0d0a18e6ac1)), closes [#830](https://github.com/open-sauced/insights/issues/830)
* add dropdown for topics in Explore ([#877](https://github.com/open-sauced/insights/issues/877)) ([9579902](https://github.com/open-sauced/insights/commit/95799029ea5e47fff7862146a24daeedf22288e4)), closes [#533](https://github.com/open-sauced/insights/issues/533)
* disable create insight page button if the page name is missing ([#857](https://github.com/open-sauced/insights/issues/857)) ([95da564](https://github.com/open-sauced/insights/commit/95da5649e64642d70e8b95b8f8e9d753f8c2bde2)), closes [#852](https://github.com/open-sauced/insights/issues/852)


### 🐛 Bug Fixes

* disable create page button only if insight page name is empty ([#893](https://github.com/open-sauced/insights/issues/893)) ([ed52399](https://github.com/open-sauced/insights/commit/ed52399acc13f5cb05abb62beabaac016a951729)), closes [#892](https://github.com/open-sauced/insights/issues/892)
* hide non-functional elements in highlights card ([#881](https://github.com/open-sauced/insights/issues/881)) ([ba1bd5e](https://github.com/open-sauced/insights/commit/ba1bd5e32c8645e3b99f019afd00c20ea9c0e15d))
* rename 404 image file ([4e5171f](https://github.com/open-sauced/insights/commit/4e5171fd86d1d905fc801eaf4c6d57769ed13d80))
* replace `PRSocialCard` component with GitHub OpenGraph image ([#889](https://github.com/open-sauced/insights/issues/889)) ([3bfc5a4](https://github.com/open-sauced/insights/commit/3bfc5a4e56d58ab41aadd7bb22595988ebf4b6de)), closes [#883](https://github.com/open-sauced/insights/issues/883)
* reset text input fields when clear button is clicked ([#869](https://github.com/open-sauced/insights/issues/869)) ([783098d](https://github.com/open-sauced/insights/commit/783098dfbd18a3e5f03e3d6d8001c6cfcea1dde1)), closes [#858](https://github.com/open-sauced/insights/issues/858)
* user profile interest pill UI fix ([#890](https://github.com/open-sauced/insights/issues/890)) ([4cbff36](https://github.com/open-sauced/insights/commit/4cbff36fc104be46143c31b5ccd3b732179206d7))

## [1.30.0-beta.9](https://github.com/open-sauced/insights/compare/v1.30.0-beta.8...v1.30.0-beta.9) (2023-02-21)


### 🐛 Bug Fixes

* rename 404 image file ([4e5171f](https://github.com/open-sauced/insights/commit/4e5171fd86d1d905fc801eaf4c6d57769ed13d80))

## [1.30.0-beta.8](https://github.com/open-sauced/insights/compare/v1.30.0-beta.7...v1.30.0-beta.8) (2023-02-21)


### 🐛 Bug Fixes

* replace `PRSocialCard` component with GitHub OpenGraph image ([#889](https://github.com/open-sauced/insights/issues/889)) ([3bfc5a4](https://github.com/open-sauced/insights/commit/3bfc5a4e56d58ab41aadd7bb22595988ebf4b6de)), closes [#883](https://github.com/open-sauced/insights/issues/883)

## [1.30.0-beta.7](https://github.com/open-sauced/insights/compare/v1.30.0-beta.6...v1.30.0-beta.7) (2023-02-21)


### 🐛 Bug Fixes

* hide non-functional elements in highlights card ([#881](https://github.com/open-sauced/insights/issues/881)) ([ba1bd5e](https://github.com/open-sauced/insights/commit/ba1bd5e32c8645e3b99f019afd00c20ea9c0e15d))

## [1.30.0-beta.6](https://github.com/open-sauced/insights/compare/v1.30.0-beta.5...v1.30.0-beta.6) (2023-02-21)


### 🐛 Bug Fixes

* disable create page button only if insight page name is empty ([#893](https://github.com/open-sauced/insights/issues/893)) ([ed52399](https://github.com/open-sauced/insights/commit/ed52399acc13f5cb05abb62beabaac016a951729)), closes [#892](https://github.com/open-sauced/insights/issues/892)

## [1.30.0-beta.5](https://github.com/open-sauced/insights/compare/v1.30.0-beta.4...v1.30.0-beta.5) (2023-02-20)


### 🐛 Bug Fixes

* user profile interest pill UI fix ([#890](https://github.com/open-sauced/insights/issues/890)) ([4cbff36](https://github.com/open-sauced/insights/commit/4cbff36fc104be46143c31b5ccd3b732179206d7))

## [1.30.0-beta.4](https://github.com/open-sauced/insights/compare/v1.30.0-beta.3...v1.30.0-beta.4) (2023-02-17)


### 🍕 Features

* add  highlights to user profile page ([#859](https://github.com/open-sauced/insights/issues/859)) ([4b01376](https://github.com/open-sauced/insights/commit/4b013767176a9f1e8bec47a5190dc0d0a18e6ac1)), closes [#830](https://github.com/open-sauced/insights/issues/830)

## [1.30.0-beta.3](https://github.com/open-sauced/insights/compare/v1.30.0-beta.2...v1.30.0-beta.3) (2023-02-17)


### 🍕 Features

* add dropdown for topics in Explore ([#877](https://github.com/open-sauced/insights/issues/877)) ([9579902](https://github.com/open-sauced/insights/commit/95799029ea5e47fff7862146a24daeedf22288e4)), closes [#533](https://github.com/open-sauced/insights/issues/533)

## [1.30.0-beta.2](https://github.com/open-sauced/insights/compare/v1.30.0-beta.1...v1.30.0-beta.2) (2023-02-17)


### 🐛 Bug Fixes

* reset text input fields when clear button is clicked ([#869](https://github.com/open-sauced/insights/issues/869)) ([783098d](https://github.com/open-sauced/insights/commit/783098dfbd18a3e5f03e3d6d8001c6cfcea1dde1)), closes [#858](https://github.com/open-sauced/insights/issues/858)

## [1.30.0-beta.1](https://github.com/open-sauced/insights/compare/v1.29.0...v1.30.0-beta.1) (2023-02-15)


### 🍕 Features

* disable create insight page button if the page name is missing ([#857](https://github.com/open-sauced/insights/issues/857)) ([95da564](https://github.com/open-sauced/insights/commit/95da5649e64642d70e8b95b8f8e9d753f8c2bde2)), closes [#852](https://github.com/open-sauced/insights/issues/852)

## [1.29.0](https://github.com/open-sauced/insights/compare/v1.28.0...v1.29.0) (2023-02-14)


### 🧑‍💻 Code Refactoring

* use github avatar link instead of cached one ([#848](https://github.com/open-sauced/insights/issues/848)) ([a7678c3](https://github.com/open-sauced/insights/commit/a7678c32da95adf60dce1b129aa43e165620aff3)), closes [#832](https://github.com/open-sauced/insights/issues/832)


### 🍕 Features

* add highlights feed filter card to design system ([#843](https://github.com/open-sauced/insights/issues/843)) ([b4d0eba](https://github.com/open-sauced/insights/commit/b4d0eba0ca068b03a78290d920496c8737f6813d)), closes [#827](https://github.com/open-sauced/insights/issues/827)
* add support for custom SEO per page ([#835](https://github.com/open-sauced/insights/issues/835)) ([03e760e](https://github.com/open-sauced/insights/commit/03e760e7df37c918a9de41a1be0bf652b04a4606)), closes [#814](https://github.com/open-sauced/insights/issues/814)
* add unit tests for lib files ([#862](https://github.com/open-sauced/insights/issues/862)) ([466c70f](https://github.com/open-sauced/insights/commit/466c70f67be96008a593e91d6b74810fbc5e56a3)), closes [#546](https://github.com/open-sauced/insights/issues/546)
* add utility function to camelcase topic value ([#851](https://github.com/open-sauced/insights/issues/851)) ([b805659](https://github.com/open-sauced/insights/commit/b805659e3d5c42ef6bce3fa4f1eaf33f13e21617)), closes [#822](https://github.com/open-sauced/insights/issues/822)
* make pr list item clickable ([#807](https://github.com/open-sauced/insights/issues/807)) ([5398ad8](https://github.com/open-sauced/insights/commit/5398ad84cd310a04ea5f7bd96feb83dedc5689c5)), closes [#799](https://github.com/open-sauced/insights/issues/799)


### 🐛 Bug Fixes

* enable update access for all user profile settings ([#838](https://github.com/open-sauced/insights/issues/838)) ([0ff49d0](https://github.com/open-sauced/insights/commit/0ff49d0bf2cff4d38a6ddb5c5b97a0500f6743dc)), closes [#837](https://github.com/open-sauced/insights/issues/837)
* move SEOobject to next types ([4500b60](https://github.com/open-sauced/insights/commit/4500b6078f4aecfadc29a2ff0f096c265f1c9060))
* truncate text on mobile and move dropdown for repositories ([#863](https://github.com/open-sauced/insights/issues/863)) ([9c7a6f5](https://github.com/open-sauced/insights/commit/9c7a6f5bc167f55b102decb6faeceed1312a2fc7)), closes [#805](https://github.com/open-sauced/insights/issues/805) [#806](https://github.com/open-sauced/insights/issues/806)

## [1.29.0-beta.7](https://github.com/open-sauced/insights/compare/v1.29.0-beta.6...v1.29.0-beta.7) (2023-02-14)


### 🐛 Bug Fixes

* move SEOobject to next types ([4500b60](https://github.com/open-sauced/insights/commit/4500b6078f4aecfadc29a2ff0f096c265f1c9060))

## [1.29.0-beta.6](https://github.com/open-sauced/insights/compare/v1.29.0-beta.5...v1.29.0-beta.6) (2023-02-13)


### 🍕 Features

* add unit tests for lib files ([#862](https://github.com/open-sauced/insights/issues/862)) ([466c70f](https://github.com/open-sauced/insights/commit/466c70f67be96008a593e91d6b74810fbc5e56a3)), closes [#546](https://github.com/open-sauced/insights/issues/546)


### 🐛 Bug Fixes

* enable update access for all user profile settings ([#838](https://github.com/open-sauced/insights/issues/838)) ([0ff49d0](https://github.com/open-sauced/insights/commit/0ff49d0bf2cff4d38a6ddb5c5b97a0500f6743dc)), closes [#837](https://github.com/open-sauced/insights/issues/837)
* truncate text on mobile and move dropdown for repositories ([#863](https://github.com/open-sauced/insights/issues/863)) ([9c7a6f5](https://github.com/open-sauced/insights/commit/9c7a6f5bc167f55b102decb6faeceed1312a2fc7)), closes [#805](https://github.com/open-sauced/insights/issues/805) [#806](https://github.com/open-sauced/insights/issues/806)

## [1.29.0-beta.5](https://github.com/open-sauced/insights/compare/v1.29.0-beta.4...v1.29.0-beta.5) (2023-02-13)


### 🍕 Features

* add support for custom SEO per page ([#835](https://github.com/open-sauced/insights/issues/835)) ([03e760e](https://github.com/open-sauced/insights/commit/03e760e7df37c918a9de41a1be0bf652b04a4606)), closes [#814](https://github.com/open-sauced/insights/issues/814)

## [1.29.0-beta.4](https://github.com/open-sauced/insights/compare/v1.29.0-beta.3...v1.29.0-beta.4) (2023-02-10)


### 🍕 Features

* add utility function to camelcase topic value ([#851](https://github.com/open-sauced/insights/issues/851)) ([b805659](https://github.com/open-sauced/insights/commit/b805659e3d5c42ef6bce3fa4f1eaf33f13e21617)), closes [#822](https://github.com/open-sauced/insights/issues/822)

## [1.29.0-beta.3](https://github.com/open-sauced/insights/compare/v1.29.0-beta.2...v1.29.0-beta.3) (2023-02-09)


### 🍕 Features

* add highlights feed filter card to design system ([#843](https://github.com/open-sauced/insights/issues/843)) ([b4d0eba](https://github.com/open-sauced/insights/commit/b4d0eba0ca068b03a78290d920496c8737f6813d)), closes [#827](https://github.com/open-sauced/insights/issues/827)

## [1.29.0-beta.2](https://github.com/open-sauced/insights/compare/v1.29.0-beta.1...v1.29.0-beta.2) (2023-02-09)


### 🧑‍💻 Code Refactoring

* use github avatar link instead of cached one ([#848](https://github.com/open-sauced/insights/issues/848)) ([a7678c3](https://github.com/open-sauced/insights/commit/a7678c32da95adf60dce1b129aa43e165620aff3)), closes [#832](https://github.com/open-sauced/insights/issues/832)

## [1.29.0-beta.1](https://github.com/open-sauced/insights/compare/v1.28.0...v1.29.0-beta.1) (2023-02-08)


### 🍕 Features

* make pr list item clickable ([#807](https://github.com/open-sauced/insights/issues/807)) ([5398ad8](https://github.com/open-sauced/insights/commit/5398ad84cd310a04ea5f7bd96feb83dedc5689c5)), closes [#799](https://github.com/open-sauced/insights/issues/799)

## [1.28.0](https://github.com/open-sauced/insights/compare/v1.27.0...v1.28.0) (2023-02-08)


### 🐛 Bug Fixes

* bump insight page limit higher ([#846](https://github.com/open-sauced/insights/issues/846)) ([893fa16](https://github.com/open-sauced/insights/commit/893fa163d3650fae618c32d83855b9d318bbe59e))


### 🍕 Features

* add highlights input form to design system ([#836](https://github.com/open-sauced/insights/issues/836)) ([62aa04a](https://github.com/open-sauced/insights/commit/62aa04aa2e5d21bb55461681dc581630a0ca23f9)), closes [#828](https://github.com/open-sauced/insights/issues/828)

## [1.28.0-beta.1](https://github.com/open-sauced/insights/compare/v1.27.1-beta.1...v1.28.0-beta.1) (2023-02-08)


### 🍕 Features

* add highlights input form to design system ([#836](https://github.com/open-sauced/insights/issues/836)) ([62aa04a](https://github.com/open-sauced/insights/commit/62aa04aa2e5d21bb55461681dc581630a0ca23f9)), closes [#828](https://github.com/open-sauced/insights/issues/828)

### [1.27.1-beta.1](https://github.com/open-sauced/insights/compare/v1.27.0...v1.27.1-beta.1) (2023-02-08)


### 🐛 Bug Fixes

* bump insight page limit higher ([#846](https://github.com/open-sauced/insights/issues/846)) ([893fa16](https://github.com/open-sauced/insights/commit/893fa163d3650fae618c32d83855b9d318bbe59e))

## [1.27.0](https://github.com/open-sauced/insights/compare/v1.26.0...v1.27.0) (2023-02-08)


### 🍕 Features

* add playwright e2e testing ([#831](https://github.com/open-sauced/insights/issues/831)) ([5ee800b](https://github.com/open-sauced/insights/commit/5ee800b27742c1c40d28b52d5c95379758d90d80)), closes [#539](https://github.com/open-sauced/insights/issues/539)
* adds loading skeleton to page ([#834](https://github.com/open-sauced/insights/issues/834)) ([2c1c00e](https://github.com/open-sauced/insights/commit/2c1c00ea7fb38606517173e23e6e9fa46484485a))


### 🐛 Bug Fixes

* increase limit for listing insight pages ([#841](https://github.com/open-sauced/insights/issues/841)) ([335e2fe](https://github.com/open-sauced/insights/commit/335e2fe733eacff57845720083f465583851c2cf))
* update check for user id when editing an insight page ([#842](https://github.com/open-sauced/insights/issues/842)) ([6533ba8](https://github.com/open-sauced/insights/commit/6533ba8cc9f8ace25356b742376c4a5d2d412ff9)), closes [#833](https://github.com/open-sauced/insights/issues/833)

## [1.27.0-beta.2](https://github.com/open-sauced/insights/compare/v1.27.0-beta.1...v1.27.0-beta.2) (2023-02-08)


### 🐛 Bug Fixes

* increase limit for listing insight pages ([#841](https://github.com/open-sauced/insights/issues/841)) ([335e2fe](https://github.com/open-sauced/insights/commit/335e2fe733eacff57845720083f465583851c2cf))
* update check for user id when editing an insight page ([#842](https://github.com/open-sauced/insights/issues/842)) ([6533ba8](https://github.com/open-sauced/insights/commit/6533ba8cc9f8ace25356b742376c4a5d2d412ff9)), closes [#833](https://github.com/open-sauced/insights/issues/833)

## [1.27.0-beta.1](https://github.com/open-sauced/insights/compare/v1.26.0...v1.27.0-beta.1) (2023-02-08)


### 🍕 Features

* add playwright e2e testing ([#831](https://github.com/open-sauced/insights/issues/831)) ([5ee800b](https://github.com/open-sauced/insights/commit/5ee800b27742c1c40d28b52d5c95379758d90d80)), closes [#539](https://github.com/open-sauced/insights/issues/539)
* adds loading skeleton to page ([#834](https://github.com/open-sauced/insights/issues/834)) ([2c1c00e](https://github.com/open-sauced/insights/commit/2c1c00ea7fb38606517173e23e6e9fa46484485a))

## [1.26.0](https://github.com/open-sauced/insights/compare/v1.25.0...v1.26.0) (2023-02-02)


### 🍕 Features

* add profile badge to connected user profile ([#824](https://github.com/open-sauced/insights/issues/824)) ([e3a1fcf](https://github.com/open-sauced/insights/commit/e3a1fcfb5ab4e9d84a243a1034dcce35b917ab45)), closes [#821](https://github.com/open-sauced/insights/issues/821) [#820](https://github.com/open-sauced/insights/issues/820)
* add user location and bio details to profile page ([#797](https://github.com/open-sauced/insights/issues/797)) ([a301874](https://github.com/open-sauced/insights/commit/a301874f2cae3f8b474715ceb5e45197efc5a845))
* implement profile settings feature ([#808](https://github.com/open-sauced/insights/issues/808)) ([4a8d706](https://github.com/open-sauced/insights/commit/4a8d706ed0ee409973f61b3b94d647fa7c5dfb4d))


### 🐛 Bug Fixes

* connect more user profile settings to the API ([#826](https://github.com/open-sauced/insights/issues/826)) ([01b8bc0](https://github.com/open-sauced/insights/commit/01b8bc02ce98bb46ef3ef089f97d434f47207a39))


### 🤖 Build System

* correct dep versioning ([42a1b0a](https://github.com/open-sauced/insights/commit/42a1b0af2626c17fafd07b34bfe17d6473c1d6ed))
* update some dependencies ([f522f5e](https://github.com/open-sauced/insights/commit/f522f5e3ee99f6dcc97c3fea85a838197cbb7aec))

## [1.26.0-beta.1](https://github.com/open-sauced/insights/compare/v1.25.0...v1.26.0-beta.1) (2023-02-02)


### 🍕 Features

* add profile badge to connected user profile ([#824](https://github.com/open-sauced/insights/issues/824)) ([e3a1fcf](https://github.com/open-sauced/insights/commit/e3a1fcfb5ab4e9d84a243a1034dcce35b917ab45)), closes [#821](https://github.com/open-sauced/insights/issues/821) [#820](https://github.com/open-sauced/insights/issues/820)
* add user location and bio details to profile page ([#797](https://github.com/open-sauced/insights/issues/797)) ([a301874](https://github.com/open-sauced/insights/commit/a301874f2cae3f8b474715ceb5e45197efc5a845))
* implement profile settings feature ([#808](https://github.com/open-sauced/insights/issues/808)) ([4a8d706](https://github.com/open-sauced/insights/commit/4a8d706ed0ee409973f61b3b94d647fa7c5dfb4d))


### 🐛 Bug Fixes

* connect more user profile settings to the API ([#826](https://github.com/open-sauced/insights/issues/826)) ([01b8bc0](https://github.com/open-sauced/insights/commit/01b8bc02ce98bb46ef3ef089f97d434f47207a39))


### 🤖 Build System

* correct dep versioning ([42a1b0a](https://github.com/open-sauced/insights/commit/42a1b0af2626c17fafd07b34bfe17d6473c1d6ed))
* update some dependencies ([f522f5e](https://github.com/open-sauced/insights/commit/f522f5e3ee99f6dcc97c3fea85a838197cbb7aec))

## [1.25.0](https://github.com/open-sauced/insights/compare/v1.24.0...v1.25.0) (2023-01-30)


### 🧑‍💻 Code Refactoring

* Renamed the ContributorTable to PullRequestTable ([#779](https://github.com/open-sauced/insights/issues/779)) ([694d213](https://github.com/open-sauced/insights/commit/694d213128077735803054f11e40eaf483a04e22)), closes [#681](https://github.com/open-sauced/insights/issues/681)


### 🐛 Bug Fixes

* add fix for Storybook usage with Next 13 ([#792](https://github.com/open-sauced/insights/issues/792)) ([bb10b2b](https://github.com/open-sauced/insights/commit/bb10b2b3b324f344a0279446c219db9d5ea77d31)), closes [/github.com/vercel/next.js/issues/36417#issuecomment-1117360509](https://github.com/open-sauced//github.com/vercel/next.js/issues/36417/issues/issuecomment-1117360509)
* correct repositories empty list message ([#778](https://github.com/open-sauced/insights/issues/778)) ([18b7393](https://github.com/open-sauced/insights/commit/18b7393c73526c891f1bddf1a7629d9e9803d3f9)), closes [#777](https://github.com/open-sauced/insights/issues/777)
* make repositories table styles more responsive ([#773](https://github.com/open-sauced/insights/issues/773)) ([fe5c6f5](https://github.com/open-sauced/insights/commit/fe5c6f55c2e3e10e99432ebf1b772c7326f3642e)), closes [#724](https://github.com/open-sauced/insights/issues/724)
* mobile insights header layout break ([#795](https://github.com/open-sauced/insights/issues/795)) ([0bc2f0b](https://github.com/open-sauced/insights/commit/0bc2f0b6e3d6d4b132aad11284d2529573b687cf)), closes [#769](https://github.com/open-sauced/insights/issues/769)
* remove usage of next/legacy/image ([#793](https://github.com/open-sauced/insights/issues/793)) ([9264ffb](https://github.com/open-sauced/insights/commit/9264ffb978dbf05204116363f93b57f834f3ceef))
* revert [#778](https://github.com/open-sauced/insights/issues/778) ([f6e30e1](https://github.com/open-sauced/insights/commit/f6e30e1b875b2423c5f002ee954a7da4d4a786c1))
* use correct avatar URL for caching  ([#800](https://github.com/open-sauced/insights/issues/800)) ([726f11b](https://github.com/open-sauced/insights/commit/726f11b263ea867e4efd7137f439309e8d9c554b)), closes [#757](https://github.com/open-sauced/insights/issues/757) [#746](https://github.com/open-sauced/insights/issues/746)


### 🍕 Features

* add `PullRequestSocialCard` component to design system ([#774](https://github.com/open-sauced/insights/issues/774)) ([04600c2](https://github.com/open-sauced/insights/commit/04600c24a5d3c437aacd36fa15d4b068d1c42e33)), closes [#716](https://github.com/open-sauced/insights/issues/716)
* add `UserSettings` component to design system ([#788](https://github.com/open-sauced/insights/issues/788)) ([dd9cabd](https://github.com/open-sauced/insights/commit/dd9cabdbe473901e2f27031a41edf065ee7ac50f)), closes [#783](https://github.com/open-sauced/insights/issues/783)
* set insight repo limit based on role ([#813](https://github.com/open-sauced/insights/issues/813)) ([9e998f1](https://github.com/open-sauced/insights/commit/9e998f1b792011918a38d377810e07ca355e47c0))
* update to Next 13.1.x ([#758](https://github.com/open-sauced/insights/issues/758)) ([72c2b64](https://github.com/open-sauced/insights/commit/72c2b64a5a0d8dfc621029d003083ce0874179d8)), closes [#753](https://github.com/open-sauced/insights/issues/753)

## [1.25.0-beta.14](https://github.com/open-sauced/insights/compare/v1.25.0-beta.13...v1.25.0-beta.14) (2023-02-01)


### 🐛 Bug Fixes

* connect more user profile settings to the API ([#826](https://github.com/open-sauced/insights/issues/826)) ([01b8bc0](https://github.com/open-sauced/insights/commit/01b8bc02ce98bb46ef3ef089f97d434f47207a39))

## [1.25.0-beta.13](https://github.com/open-sauced/insights/compare/v1.25.0-beta.12...v1.25.0-beta.13) (2023-02-01)


### 🍕 Features

* add profile badge to connected user profile ([#824](https://github.com/open-sauced/insights/issues/824)) ([e3a1fcf](https://github.com/open-sauced/insights/commit/e3a1fcfb5ab4e9d84a243a1034dcce35b917ab45)), closes [#821](https://github.com/open-sauced/insights/issues/821) [#820](https://github.com/open-sauced/insights/issues/820)

## [1.25.0-beta.12](https://github.com/open-sauced/insights/compare/v1.25.0-beta.11...v1.25.0-beta.12) (2023-02-01)


### 🍕 Features

* add user location and bio details to profile page ([#797](https://github.com/open-sauced/insights/issues/797)) ([a301874](https://github.com/open-sauced/insights/commit/a301874f2cae3f8b474715ceb5e45197efc5a845))

## [1.25.0-beta.11](https://github.com/open-sauced/insights/compare/v1.25.0-beta.10...v1.25.0-beta.11) (2023-02-01)


### 🍕 Features

* implement profile settings feature ([#808](https://github.com/open-sauced/insights/issues/808)) ([4a8d706](https://github.com/open-sauced/insights/commit/4a8d706ed0ee409973f61b3b94d647fa7c5dfb4d))

## [1.25.0](https://github.com/open-sauced/insights/compare/v1.24.0...v1.25.0) (2023-01-30)


### 🧑‍💻 Code Refactoring

* Renamed the ContributorTable to PullRequestTable ([#779](https://github.com/open-sauced/insights/issues/779)) ([694d213](https://github.com/open-sauced/insights/commit/694d213128077735803054f11e40eaf483a04e22)), closes [#681](https://github.com/open-sauced/insights/issues/681)


### 🐛 Bug Fixes

* add fix for Storybook usage with Next 13 ([#792](https://github.com/open-sauced/insights/issues/792)) ([bb10b2b](https://github.com/open-sauced/insights/commit/bb10b2b3b324f344a0279446c219db9d5ea77d31)), closes [/github.com/vercel/next.js/issues/36417#issuecomment-1117360509](https://github.com/open-sauced//github.com/vercel/next.js/issues/36417/issues/issuecomment-1117360509)
* correct repositories empty list message ([#778](https://github.com/open-sauced/insights/issues/778)) ([18b7393](https://github.com/open-sauced/insights/commit/18b7393c73526c891f1bddf1a7629d9e9803d3f9)), closes [#777](https://github.com/open-sauced/insights/issues/777)
* make repositories table styles more responsive ([#773](https://github.com/open-sauced/insights/issues/773)) ([fe5c6f5](https://github.com/open-sauced/insights/commit/fe5c6f55c2e3e10e99432ebf1b772c7326f3642e)), closes [#724](https://github.com/open-sauced/insights/issues/724)
* mobile insights header layout break ([#795](https://github.com/open-sauced/insights/issues/795)) ([0bc2f0b](https://github.com/open-sauced/insights/commit/0bc2f0b6e3d6d4b132aad11284d2529573b687cf)), closes [#769](https://github.com/open-sauced/insights/issues/769)
* remove usage of next/legacy/image ([#793](https://github.com/open-sauced/insights/issues/793)) ([9264ffb](https://github.com/open-sauced/insights/commit/9264ffb978dbf05204116363f93b57f834f3ceef))
* revert [#778](https://github.com/open-sauced/insights/issues/778) ([f6e30e1](https://github.com/open-sauced/insights/commit/f6e30e1b875b2423c5f002ee954a7da4d4a786c1))
* use correct avatar URL for caching  ([#800](https://github.com/open-sauced/insights/issues/800)) ([726f11b](https://github.com/open-sauced/insights/commit/726f11b263ea867e4efd7137f439309e8d9c554b)), closes [#757](https://github.com/open-sauced/insights/issues/757) [#746](https://github.com/open-sauced/insights/issues/746)


### 🍕 Features

* add `PullRequestSocialCard` component to design system ([#774](https://github.com/open-sauced/insights/issues/774)) ([04600c2](https://github.com/open-sauced/insights/commit/04600c24a5d3c437aacd36fa15d4b068d1c42e33)), closes [#716](https://github.com/open-sauced/insights/issues/716)
* add `UserSettings` component to design system ([#788](https://github.com/open-sauced/insights/issues/788)) ([dd9cabd](https://github.com/open-sauced/insights/commit/dd9cabdbe473901e2f27031a41edf065ee7ac50f)), closes [#783](https://github.com/open-sauced/insights/issues/783)
* set insight repo limit based on role ([#813](https://github.com/open-sauced/insights/issues/813)) ([9e998f1](https://github.com/open-sauced/insights/commit/9e998f1b792011918a38d377810e07ca355e47c0))
* update to Next 13.1.x ([#758](https://github.com/open-sauced/insights/issues/758)) ([72c2b64](https://github.com/open-sauced/insights/commit/72c2b64a5a0d8dfc621029d003083ce0874179d8)), closes [#753](https://github.com/open-sauced/insights/issues/753)

## [1.25.0-beta.10](https://github.com/open-sauced/insights/compare/v1.25.0-beta.9...v1.25.0-beta.10) (2023-01-30)


### 🍕 Features

* set insight repo limit based on role ([#813](https://github.com/open-sauced/insights/issues/813)) ([9e998f1](https://github.com/open-sauced/insights/commit/9e998f1b792011918a38d377810e07ca355e47c0))

## [1.25.0-beta.9](https://github.com/open-sauced/insights/compare/v1.25.0-beta.8...v1.25.0-beta.9) (2023-01-26)


### 🐛 Bug Fixes

* use correct avatar URL for caching  ([#800](https://github.com/open-sauced/insights/issues/800)) ([726f11b](https://github.com/open-sauced/insights/commit/726f11b263ea867e4efd7137f439309e8d9c554b)), closes [#757](https://github.com/open-sauced/insights/issues/757) [#746](https://github.com/open-sauced/insights/issues/746)

## [1.25.0-beta.8](https://github.com/open-sauced/insights/compare/v1.25.0-beta.7...v1.25.0-beta.8) (2023-01-24)


### 🍕 Features

* add `PullRequestSocialCard` component to design system ([#774](https://github.com/open-sauced/insights/issues/774)) ([04600c2](https://github.com/open-sauced/insights/commit/04600c24a5d3c437aacd36fa15d4b068d1c42e33)), closes [#716](https://github.com/open-sauced/insights/issues/716)

## [1.25.0-beta.7](https://github.com/open-sauced/insights/compare/v1.25.0-beta.6...v1.25.0-beta.7) (2023-01-24)


### 🐛 Bug Fixes

* make repositories table styles more responsive ([#773](https://github.com/open-sauced/insights/issues/773)) ([fe5c6f5](https://github.com/open-sauced/insights/commit/fe5c6f55c2e3e10e99432ebf1b772c7326f3642e)), closes [#724](https://github.com/open-sauced/insights/issues/724)

## [1.25.0-beta.6](https://github.com/open-sauced/insights/compare/v1.25.0-beta.5...v1.25.0-beta.6) (2023-01-24)


### 🍕 Features

* add `UserSettings` component to design system ([#788](https://github.com/open-sauced/insights/issues/788)) ([dd9cabd](https://github.com/open-sauced/insights/commit/dd9cabdbe473901e2f27031a41edf065ee7ac50f)), closes [#783](https://github.com/open-sauced/insights/issues/783)


### 🐛 Bug Fixes

* mobile insights header layout break ([#795](https://github.com/open-sauced/insights/issues/795)) ([0bc2f0b](https://github.com/open-sauced/insights/commit/0bc2f0b6e3d6d4b132aad11284d2529573b687cf)), closes [#769](https://github.com/open-sauced/insights/issues/769)

## [1.25.0-beta.5](https://github.com/open-sauced/insights/compare/v1.25.0-beta.4...v1.25.0-beta.5) (2023-01-18)


### 🐛 Bug Fixes

* remove usage of next/legacy/image ([#793](https://github.com/open-sauced/insights/issues/793)) ([9264ffb](https://github.com/open-sauced/insights/commit/9264ffb978dbf05204116363f93b57f834f3ceef))

## [1.25.0-beta.4](https://github.com/open-sauced/insights/compare/v1.25.0-beta.3...v1.25.0-beta.4) (2023-01-17)


### 🐛 Bug Fixes

* add fix for Storybook usage with Next 13 ([#792](https://github.com/open-sauced/insights/issues/792)) ([bb10b2b](https://github.com/open-sauced/insights/commit/bb10b2b3b324f344a0279446c219db9d5ea77d31)), closes [/github.com/vercel/next.js/issues/36417#issuecomment-1117360509](https://github.com/open-sauced//github.com/vercel/next.js/issues/36417/issues/issuecomment-1117360509)

## [1.25.0-beta.3](https://github.com/open-sauced/insights/compare/v1.25.0-beta.2...v1.25.0-beta.3) (2023-01-17)


### 🐛 Bug Fixes

* revert [#778](https://github.com/open-sauced/insights/issues/778) ([f6e30e1](https://github.com/open-sauced/insights/commit/f6e30e1b875b2423c5f002ee954a7da4d4a786c1))

## [1.25.0-beta.2](https://github.com/open-sauced/insights/compare/v1.25.0-beta.1...v1.25.0-beta.2) (2023-01-16)


### 🐛 Bug Fixes

* correct repositories empty list message ([#778](https://github.com/open-sauced/insights/issues/778)) ([18b7393](https://github.com/open-sauced/insights/commit/18b7393c73526c891f1bddf1a7629d9e9803d3f9)), closes [#777](https://github.com/open-sauced/insights/issues/777)


### 🧑‍💻 Code Refactoring

* Renamed the ContributorTable to PullRequestTable ([#779](https://github.com/open-sauced/insights/issues/779)) ([694d213](https://github.com/open-sauced/insights/commit/694d213128077735803054f11e40eaf483a04e22)), closes [#681](https://github.com/open-sauced/insights/issues/681)

## [1.25.0-beta.1](https://github.com/open-sauced/insights/compare/v1.24.0...v1.25.0-beta.1) (2023-01-13)


### 🍕 Features

* update to Next 13.1.x ([#758](https://github.com/open-sauced/insights/issues/758)) ([72c2b64](https://github.com/open-sauced/insights/commit/72c2b64a5a0d8dfc621029d003083ce0874179d8)), closes [#753](https://github.com/open-sauced/insights/issues/753)

## [1.24.0](https://github.com/open-sauced/insights/compare/v1.23.2...v1.24.0) (2023-01-13)


### 🍕 Features

* add custom profile banner for verified OpenSauced user  ([#771](https://github.com/open-sauced/insights/issues/771)) ([4f73c15](https://github.com/open-sauced/insights/commit/4f73c152a7fa625655c32d311d96d279007f74fe)), closes [#713](https://github.com/open-sauced/insights/issues/713)
* add public/private insights badge ([#735](https://github.com/open-sauced/insights/issues/735)) ([3120657](https://github.com/open-sauced/insights/commit/3120657eed0b58d2795808eae9c1e2a55ebab5a3)), closes [#688](https://github.com/open-sauced/insights/issues/688)


### 🐛 Bug Fixes

* check for contributor username and update field for recent merged prs ([#776](https://github.com/open-sauced/insights/issues/776)) ([c681a61](https://github.com/open-sauced/insights/commit/c681a6124df25f746ee55b5927f40908fdae0747))
* fix placement of badge on insight page ([#770](https://github.com/open-sauced/insights/issues/770)) ([aace1c7](https://github.com/open-sauced/insights/commit/aace1c759edf49c66465dd949b64128d5c714c24))

## [1.24.0-beta.4](https://github.com/open-sauced/insights/compare/v1.24.0-beta.3...v1.24.0-beta.4) (2023-01-13)


### 🐛 Bug Fixes

* check for contributor username and update field for recent merged prs ([#776](https://github.com/open-sauced/insights/issues/776)) ([c681a61](https://github.com/open-sauced/insights/commit/c681a6124df25f746ee55b5927f40908fdae0747))

## [1.24.0-beta.3](https://github.com/open-sauced/insights/compare/v1.24.0-beta.2...v1.24.0-beta.3) (2023-01-13)


### 🍕 Features

* add custom profile banner for verified OpenSauced user  ([#771](https://github.com/open-sauced/insights/issues/771)) ([4f73c15](https://github.com/open-sauced/insights/commit/4f73c152a7fa625655c32d311d96d279007f74fe)), closes [#713](https://github.com/open-sauced/insights/issues/713)

## [1.24.0-beta.2](https://github.com/open-sauced/insights/compare/v1.24.0-beta.1...v1.24.0-beta.2) (2023-01-09)


### 🐛 Bug Fixes

* fix placement of badge on insight page ([#770](https://github.com/open-sauced/insights/issues/770)) ([aace1c7](https://github.com/open-sauced/insights/commit/aace1c759edf49c66465dd949b64128d5c714c24))

## [1.24.0-beta.1](https://github.com/open-sauced/insights/compare/v1.23.2...v1.24.0-beta.1) (2023-01-09)


### 🍕 Features

* add public/private insights badge ([#735](https://github.com/open-sauced/insights/issues/735)) ([3120657](https://github.com/open-sauced/insights/commit/3120657eed0b58d2795808eae9c1e2a55ebab5a3)), closes [#688](https://github.com/open-sauced/insights/issues/688)

### [1.23.2](https://github.com/open-sauced/insights/compare/v1.23.1...v1.23.2) (2023-01-06)


### 🐛 Bug Fixes

* fix data fetching for contributor page data ([#766](https://github.com/open-sauced/insights/issues/766)) ([d3c0625](https://github.com/open-sauced/insights/commit/d3c06254a8f8f23667001229f89cc6b723de3fc4))
* redirect from hub page if not authorized to view ([#767](https://github.com/open-sauced/insights/issues/767)) ([a57899d](https://github.com/open-sauced/insights/commit/a57899d48c303d9ed84b1084a15db9f52b340cce)), closes [#763](https://github.com/open-sauced/insights/issues/763)

### [1.23.2-beta.2](https://github.com/open-sauced/insights/compare/v1.23.2-beta.1...v1.23.2-beta.2) (2023-01-06)


### 🐛 Bug Fixes

* redirect from hub page if not authorized to view ([#767](https://github.com/open-sauced/insights/issues/767)) ([a57899d](https://github.com/open-sauced/insights/commit/a57899d48c303d9ed84b1084a15db9f52b340cce)), closes [#763](https://github.com/open-sauced/insights/issues/763)

### [1.23.2-beta.1](https://github.com/open-sauced/insights/compare/v1.23.1...v1.23.2-beta.1) (2023-01-06)


### 🐛 Bug Fixes

* fix data fetching for contributor page data ([#766](https://github.com/open-sauced/insights/issues/766)) ([d3c0625](https://github.com/open-sauced/insights/commit/d3c06254a8f8f23667001229f89cc6b723de3fc4))

### [1.23.1](https://github.com/open-sauced/insights/compare/v1.23.0...v1.23.1) (2023-01-06)


### 🐛 Bug Fixes

* correct icon loading and double ci processing ([#764](https://github.com/open-sauced/insights/issues/764)) ([f1f766e](https://github.com/open-sauced/insights/commit/f1f766ef008ea9ce1b904907f3c16ec57d15d379)), closes [#211](https://github.com/open-sauced/insights/issues/211)

### [1.23.1-beta.1](https://github.com/open-sauced/insights/compare/v1.23.0...v1.23.1-beta.1) (2023-01-05)


### 🐛 Bug Fixes

* correct icon loading and double ci processing ([#764](https://github.com/open-sauced/insights/issues/764)) ([f1f766e](https://github.com/open-sauced/insights/commit/f1f766ef008ea9ce1b904907f3c16ec57d15d379)), closes [#211](https://github.com/open-sauced/insights/issues/211)

## [1.23.0](https://github.com/open-sauced/insights/compare/v1.22.2...v1.23.0) (2023-01-05)


### 🧑‍💻 Code Refactoring

* update pr velocity indicator ([#707](https://github.com/open-sauced/insights/issues/707)) ([7e96735](https://github.com/open-sauced/insights/commit/7e96735cb35f0436e0af5cf5bc13d8f51d441220)), closes [#684](https://github.com/open-sauced/insights/issues/684)


### 🐛 Bug Fixes

* add missing title props ([cdcc28d](https://github.com/open-sauced/insights/commit/cdcc28d615dbc04815327e10ff5e4a211a6b9503))
* correct some tooling and dependency issues ([#749](https://github.com/open-sauced/insights/issues/749)) ([cb4ec9f](https://github.com/open-sauced/insights/commit/cb4ec9fa8c9d996fb6e6facf9b11fd35af177424))
* only pull insights for stacked avatar on insight pages ([#761](https://github.com/open-sauced/insights/issues/761)) ([80ae119](https://github.com/open-sauced/insights/commit/80ae1192be9bc64f617aee39e3cd27683400a5c0))
* overflow x bug on dashboard ([#709](https://github.com/open-sauced/insights/issues/709)) ([b022dbc](https://github.com/open-sauced/insights/commit/b022dbc4a2d389bb3a364038797a1089f8351888)), closes [#677](https://github.com/open-sauced/insights/issues/677)
* user profile auth avatar processing errors ([#755](https://github.com/open-sauced/insights/issues/755)) ([3ba87a6](https://github.com/open-sauced/insights/commit/3ba87a6b448f6aae9b8b0c8415dab5b1a3baf13f)), closes [#733](https://github.com/open-sauced/insights/issues/733)


### 🍕 Features

* add Edit Page button to insight pages ([#738](https://github.com/open-sauced/insights/issues/738)) ([bde1eb8](https://github.com/open-sauced/insights/commit/bde1eb88e5409bc65cf79b9d4fc806ec030ec86b)), closes [#685](https://github.com/open-sauced/insights/issues/685)
* add favorite repos on the design system ([#744](https://github.com/open-sauced/insights/issues/744)) ([c8660b5](https://github.com/open-sauced/insights/commit/c8660b5fec5f872f04554524bd8329da1e8860c8)), closes [#717](https://github.com/open-sauced/insights/issues/717)
* add hover card and expand on contributor stack ([#742](https://github.com/open-sauced/insights/issues/742)) ([9f45b3d](https://github.com/open-sauced/insights/commit/9f45b3dc85f9a1b9a7c398ceb0929a899d707666))
* adjust search font-size ([c451450](https://github.com/open-sauced/insights/commit/c4514509a0580125495b391c5f905e513f5c70ea))
* change name to enhace from logarithmic ([#743](https://github.com/open-sauced/insights/issues/743)) ([4384324](https://github.com/open-sauced/insights/commit/43843246c9d7d6b4aed586754f4673f56070206e))
* enable repository selection & add to new insights page ([#693](https://github.com/open-sauced/insights/issues/693)) ([ba6405d](https://github.com/open-sauced/insights/commit/ba6405d1f983709f7ea1a5da0d43a82ae18299ef)), closes [#593](https://github.com/open-sauced/insights/issues/593) [#592](https://github.com/open-sauced/insights/issues/592)
* Filter dashboard scatter plot by PR states ([#736](https://github.com/open-sauced/insights/issues/736)) ([f04093a](https://github.com/open-sauced/insights/commit/f04093ac500d48b22a14aebb2364a16fd81a2b37))
* handle close modal when click outside and improve select usage ([#705](https://github.com/open-sauced/insights/issues/705)) ([105a47b](https://github.com/open-sauced/insights/commit/105a47b5e27d48ee60ef8d4b1ed06a08dbaba3e7)), closes [#689](https://github.com/open-sauced/insights/issues/689)
* update icon PR  details row ([#706](https://github.com/open-sauced/insights/issues/706)) ([dac42ba](https://github.com/open-sauced/insights/commit/dac42bab1065f184107482ed8e69c937bc4bf088)), closes [#696](https://github.com/open-sauced/insights/issues/696)

## [1.23.0-beta.13](https://github.com/open-sauced/insights/compare/v1.23.0-beta.12...v1.23.0-beta.13) (2023-01-05)


### 🍕 Features

* update icon PR  details row ([#706](https://github.com/open-sauced/insights/issues/706)) ([dac42ba](https://github.com/open-sauced/insights/commit/dac42bab1065f184107482ed8e69c937bc4bf088)), closes [#696](https://github.com/open-sauced/insights/issues/696)

## [1.23.0-beta.12](https://github.com/open-sauced/insights/compare/v1.23.0-beta.11...v1.23.0-beta.12) (2023-01-05)


### 🐛 Bug Fixes

* only pull insights for stacked avatar on insight pages ([#761](https://github.com/open-sauced/insights/issues/761)) ([80ae119](https://github.com/open-sauced/insights/commit/80ae1192be9bc64f617aee39e3cd27683400a5c0))

## [1.23.0-beta.11](https://github.com/open-sauced/insights/compare/v1.23.0-beta.10...v1.23.0-beta.11) (2023-01-05)


### 🧑‍💻 Code Refactoring

* update pr velocity indicator ([#707](https://github.com/open-sauced/insights/issues/707)) ([7e96735](https://github.com/open-sauced/insights/commit/7e96735cb35f0436e0af5cf5bc13d8f51d441220)), closes [#684](https://github.com/open-sauced/insights/issues/684)

## [1.23.0-beta.10](https://github.com/open-sauced/insights/compare/v1.23.0-beta.9...v1.23.0-beta.10) (2023-01-03)


### 🍕 Features

* add hover card and expand on contributor stack ([#742](https://github.com/open-sauced/insights/issues/742)) ([9f45b3d](https://github.com/open-sauced/insights/commit/9f45b3dc85f9a1b9a7c398ceb0929a899d707666))

## [1.23.0-beta.9](https://github.com/open-sauced/insights/compare/v1.23.0-beta.8...v1.23.0-beta.9) (2023-01-03)


### 🐛 Bug Fixes

* user profile auth avatar processing errors ([#755](https://github.com/open-sauced/insights/issues/755)) ([3ba87a6](https://github.com/open-sauced/insights/commit/3ba87a6b448f6aae9b8b0c8415dab5b1a3baf13f)), closes [#733](https://github.com/open-sauced/insights/issues/733)

## [1.23.0-beta.8](https://github.com/open-sauced/insights/compare/v1.23.0-beta.7...v1.23.0-beta.8) (2023-01-03)


### 🍕 Features

* handle close modal when click outside and improve select usage ([#705](https://github.com/open-sauced/insights/issues/705)) ([105a47b](https://github.com/open-sauced/insights/commit/105a47b5e27d48ee60ef8d4b1ed06a08dbaba3e7)), closes [#689](https://github.com/open-sauced/insights/issues/689)

## [1.23.0-beta.7](https://github.com/open-sauced/insights/compare/v1.23.0-beta.6...v1.23.0-beta.7) (2023-01-03)


### 🐛 Bug Fixes

* correct some tooling and dependency issues ([#749](https://github.com/open-sauced/insights/issues/749)) ([cb4ec9f](https://github.com/open-sauced/insights/commit/cb4ec9fa8c9d996fb6e6facf9b11fd35af177424))

## [1.23.0-beta.6](https://github.com/open-sauced/insights/compare/v1.23.0-beta.5...v1.23.0-beta.6) (2023-01-03)


### 🍕 Features

* add Edit Page button to insight pages ([#738](https://github.com/open-sauced/insights/issues/738)) ([bde1eb8](https://github.com/open-sauced/insights/commit/bde1eb88e5409bc65cf79b9d4fc806ec030ec86b)), closes [#685](https://github.com/open-sauced/insights/issues/685)
* enable repository selection & add to new insights page ([#693](https://github.com/open-sauced/insights/issues/693)) ([ba6405d](https://github.com/open-sauced/insights/commit/ba6405d1f983709f7ea1a5da0d43a82ae18299ef)), closes [#593](https://github.com/open-sauced/insights/issues/593) [#592](https://github.com/open-sauced/insights/issues/592)


### 🐛 Bug Fixes

* add missing title props ([cdcc28d](https://github.com/open-sauced/insights/commit/cdcc28d615dbc04815327e10ff5e4a211a6b9503))

## [1.23.0-beta.5](https://github.com/open-sauced/insights/compare/v1.23.0-beta.4...v1.23.0-beta.5) (2022-12-30)


### 🍕 Features

* add favorite repos on the design system ([#744](https://github.com/open-sauced/insights/issues/744)) ([c8660b5](https://github.com/open-sauced/insights/commit/c8660b5fec5f872f04554524bd8329da1e8860c8)), closes [#717](https://github.com/open-sauced/insights/issues/717)

## [1.23.0-beta.4](https://github.com/open-sauced/insights/compare/v1.23.0-beta.3...v1.23.0-beta.4) (2022-12-28)


### 🍕 Features

* Filter dashboard scatter plot by PR states ([#736](https://github.com/open-sauced/insights/issues/736)) ([f04093a](https://github.com/open-sauced/insights/commit/f04093ac500d48b22a14aebb2364a16fd81a2b37))

## [1.23.0-beta.3](https://github.com/open-sauced/insights/compare/v1.23.0-beta.2...v1.23.0-beta.3) (2022-12-28)


### 🐛 Bug Fixes

* overflow x bug on dashboard ([#709](https://github.com/open-sauced/insights/issues/709)) ([b022dbc](https://github.com/open-sauced/insights/commit/b022dbc4a2d389bb3a364038797a1089f8351888)), closes [#677](https://github.com/open-sauced/insights/issues/677)

## [1.23.0-beta.2](https://github.com/open-sauced/insights/compare/v1.23.0-beta.1...v1.23.0-beta.2) (2022-12-27)


### 🍕 Features

* change name to enhace from logarithmic ([#743](https://github.com/open-sauced/insights/issues/743)) ([4384324](https://github.com/open-sauced/insights/commit/43843246c9d7d6b4aed586754f4673f56070206e))

## [1.23.0-beta.1](https://github.com/open-sauced/insights/compare/v1.22.2...v1.23.0-beta.1) (2022-12-26)


### 🍕 Features

* adjust search font-size ([c451450](https://github.com/open-sauced/insights/commit/c4514509a0580125495b391c5f905e513f5c70ea))

### [1.22.2](https://github.com/open-sauced/insights/compare/v1.22.1...v1.22.2) (2022-12-23)


### ⏩ Reverts

* Revert "feat: add sorting by column type on repositories screen (#662)" ([5436712](https://github.com/open-sauced/insights/commit/5436712ce203bdb43c5f6fec92751c0d2bf711e2)), closes [#662](https://github.com/open-sauced/insights/issues/662)

### [1.22.2-beta.1](https://github.com/open-sauced/insights/compare/v1.22.1...v1.22.2-beta.1) (2022-12-23)


### ⏩ Reverts

* Revert "feat: add sorting by column type on repositories screen (#662)" ([5436712](https://github.com/open-sauced/insights/commit/5436712ce203bdb43c5f6fec92751c0d2bf711e2)), closes [#662](https://github.com/open-sauced/insights/issues/662)

### [1.22.1](https://github.com/open-sauced/insights/compare/v1.22.0...v1.22.1) (2022-12-23)


### 🐛 Bug Fixes

* add wrapper element for Link usage on table repo name ([#727](https://github.com/open-sauced/insights/issues/727)) ([beb767a](https://github.com/open-sauced/insights/commit/beb767a5030ae942074a4491677e09117bab6b70)), closes [#726](https://github.com/open-sauced/insights/issues/726)

### [1.22.1-beta.1](https://github.com/open-sauced/insights/compare/v1.22.0...v1.22.1-beta.1) (2022-12-23)


### 🐛 Bug Fixes

* add wrapper element for Link usage on table repo name ([#727](https://github.com/open-sauced/insights/issues/727)) ([beb767a](https://github.com/open-sauced/insights/commit/beb767a5030ae942074a4491677e09117bab6b70)), closes [#726](https://github.com/open-sauced/insights/issues/726)

## [1.22.0](https://github.com/open-sauced/insights/compare/v1.21.0...v1.22.0) (2022-12-22)


### ✅ Tests

* implement automatic notifications for foss ([#679](https://github.com/open-sauced/insights/issues/679)) ([75f3aaf](https://github.com/open-sauced/insights/commit/75f3aaf3e97f79a88a1e032302e50d78b92f5e61))


### 🐛 Bug Fixes

* fixed status footer 404 error ([#699](https://github.com/open-sauced/insights/issues/699)) ([e14a976](https://github.com/open-sauced/insights/commit/e14a9769a8a9715aad7a0e9651ae166bed41d8ac)), closes [#656](https://github.com/open-sauced/insights/issues/656)
* handle caching issues with local storage ([#676](https://github.com/open-sauced/insights/issues/676)) ([e332d84](https://github.com/open-sauced/insights/commit/e332d84bafbe830bf269a62e14a4a9e93fb34eb2)), closes [#617](https://github.com/open-sauced/insights/issues/617)
* update generic profile page styles to match design ([#695](https://github.com/open-sauced/insights/issues/695)) ([3eabf0f](https://github.com/open-sauced/insights/commit/3eabf0f95fb57acb5b1510ee0e32946c9e9d01eb)), closes [#692](https://github.com/open-sauced/insights/issues/692)


### 🍕 Features

* add sorting by column type on repositories screen ([#662](https://github.com/open-sauced/insights/issues/662)) ([d588032](https://github.com/open-sauced/insights/commit/d5880321ed82d5c505c74c6f797e70d5895803b6)), closes [#627](https://github.com/open-sauced/insights/issues/627)
* add Stripe checkout integration ([#702](https://github.com/open-sauced/insights/issues/702)) ([f4da7af](https://github.com/open-sauced/insights/commit/f4da7afc4de577de869da292c35b3cbd43d801c6)), closes [#394](https://github.com/open-sauced/insights/issues/394)
* add support for goto page functionality ([#708](https://github.com/open-sauced/insights/issues/708)) ([1902a98](https://github.com/open-sauced/insights/commit/1902a983420bde31173771b6fcba97b708cf616e)), closes [#675](https://github.com/open-sauced/insights/issues/675)
* add toggle group component ([#666](https://github.com/open-sauced/insights/issues/666)) ([3bc7d8c](https://github.com/open-sauced/insights/commit/3bc7d8cda7047df921b8fcda30380287988595e9))
* filter recent contributions array by last updated time ([#690](https://github.com/open-sauced/insights/issues/690)) ([063b07c](https://github.com/open-sauced/insights/commit/063b07c239590b93bd1f202362296aa691f3a281)), closes [#682](https://github.com/open-sauced/insights/issues/682)
* implement hover card functionality on scatterchart ([#643](https://github.com/open-sauced/insights/issues/643)) ([8249eb8](https://github.com/open-sauced/insights/commit/8249eb8ae822592f64cc5bc07836583d16641606))
* implement image caching on avatar images ([#691](https://github.com/open-sauced/insights/issues/691)) ([b6fbeb4](https://github.com/open-sauced/insights/commit/b6fbeb407a5d933b91e5b885270ecd9da9a387c8))
* link repos, prs, and contributors to GitHub ([#658](https://github.com/open-sauced/insights/issues/658)) ([79d16d0](https://github.com/open-sauced/insights/commit/79d16d0f7e76485b9ed9288e18753eac866516cc)), closes [#670](https://github.com/open-sauced/insights/issues/670) [#620](https://github.com/open-sauced/insights/issues/620) [#669](https://github.com/open-sauced/insights/issues/669)
* remove the top5 ([#674](https://github.com/open-sauced/insights/issues/674)) ([d0720ef](https://github.com/open-sauced/insights/commit/d0720efea7f1932fbc68f8a8af8af13e89b698ff))

## [1.22.0-beta.12](https://github.com/open-sauced/insights/compare/v1.22.0-beta.11...v1.22.0-beta.12) (2022-12-22)


### 🍕 Features

* add Stripe checkout integration ([#702](https://github.com/open-sauced/insights/issues/702)) ([f4da7af](https://github.com/open-sauced/insights/commit/f4da7afc4de577de869da292c35b3cbd43d801c6)), closes [#394](https://github.com/open-sauced/insights/issues/394)

## [1.22.0-beta.11](https://github.com/open-sauced/insights/compare/v1.22.0-beta.10...v1.22.0-beta.11) (2022-12-22)


### 🍕 Features

* add support for goto page functionality ([#708](https://github.com/open-sauced/insights/issues/708)) ([1902a98](https://github.com/open-sauced/insights/commit/1902a983420bde31173771b6fcba97b708cf616e)), closes [#675](https://github.com/open-sauced/insights/issues/675)

## [1.22.0-beta.10](https://github.com/open-sauced/insights/compare/v1.22.0-beta.9...v1.22.0-beta.10) (2022-12-21)


### 🍕 Features

* add toggle group component ([#666](https://github.com/open-sauced/insights/issues/666)) ([3bc7d8c](https://github.com/open-sauced/insights/commit/3bc7d8cda7047df921b8fcda30380287988595e9))

## [1.22.0-beta.9](https://github.com/open-sauced/insights/compare/v1.22.0-beta.8...v1.22.0-beta.9) (2022-12-21)


### 🐛 Bug Fixes

* fixed status footer 404 error ([#699](https://github.com/open-sauced/insights/issues/699)) ([e14a976](https://github.com/open-sauced/insights/commit/e14a9769a8a9715aad7a0e9651ae166bed41d8ac)), closes [#656](https://github.com/open-sauced/insights/issues/656)


### 🍕 Features

* add sorting by column type on repositories screen ([#662](https://github.com/open-sauced/insights/issues/662)) ([d588032](https://github.com/open-sauced/insights/commit/d5880321ed82d5c505c74c6f797e70d5895803b6)), closes [#627](https://github.com/open-sauced/insights/issues/627)

## [1.22.0-beta.8](https://github.com/open-sauced/insights/compare/v1.22.0-beta.7...v1.22.0-beta.8) (2022-12-21)


### 🐛 Bug Fixes

* update generic profile page styles to match design ([#695](https://github.com/open-sauced/insights/issues/695)) ([3eabf0f](https://github.com/open-sauced/insights/commit/3eabf0f95fb57acb5b1510ee0e32946c9e9d01eb)), closes [#692](https://github.com/open-sauced/insights/issues/692)

## [1.22.0-beta.7](https://github.com/open-sauced/insights/compare/v1.22.0-beta.6...v1.22.0-beta.7) (2022-12-20)


### 🍕 Features

* filter recent contributions array by last updated time ([#690](https://github.com/open-sauced/insights/issues/690)) ([063b07c](https://github.com/open-sauced/insights/commit/063b07c239590b93bd1f202362296aa691f3a281)), closes [#682](https://github.com/open-sauced/insights/issues/682)

## [1.22.0-beta.6](https://github.com/open-sauced/insights/compare/v1.22.0-beta.5...v1.22.0-beta.6) (2022-12-20)


### 🍕 Features

* implement image caching on avatar images ([#691](https://github.com/open-sauced/insights/issues/691)) ([b6fbeb4](https://github.com/open-sauced/insights/commit/b6fbeb407a5d933b91e5b885270ecd9da9a387c8))

## [1.22.0-beta.5](https://github.com/open-sauced/insights/compare/v1.22.0-beta.4...v1.22.0-beta.5) (2022-12-20)


### ✅ Tests

* implement automatic notifications for foss ([#679](https://github.com/open-sauced/insights/issues/679)) ([75f3aaf](https://github.com/open-sauced/insights/commit/75f3aaf3e97f79a88a1e032302e50d78b92f5e61))

## [1.22.0-beta.4](https://github.com/open-sauced/insights/compare/v1.22.0-beta.3...v1.22.0-beta.4) (2022-12-19)


### 🍕 Features

* implement hover card functionality on scatterchart ([#643](https://github.com/open-sauced/insights/issues/643)) ([8249eb8](https://github.com/open-sauced/insights/commit/8249eb8ae822592f64cc5bc07836583d16641606))

## [1.22.0-beta.3](https://github.com/open-sauced/insights/compare/v1.22.0-beta.2...v1.22.0-beta.3) (2022-12-19)


### 🍕 Features

* link repos, prs, and contributors to GitHub ([#658](https://github.com/open-sauced/insights/issues/658)) ([79d16d0](https://github.com/open-sauced/insights/commit/79d16d0f7e76485b9ed9288e18753eac866516cc)), closes [#670](https://github.com/open-sauced/insights/issues/670) [#620](https://github.com/open-sauced/insights/issues/620) [#669](https://github.com/open-sauced/insights/issues/669)

## [1.22.0-beta.2](https://github.com/open-sauced/insights/compare/v1.22.0-beta.1...v1.22.0-beta.2) (2022-12-19)


### 🐛 Bug Fixes

* handle caching issues with local storage ([#676](https://github.com/open-sauced/insights/issues/676)) ([e332d84](https://github.com/open-sauced/insights/commit/e332d84bafbe830bf269a62e14a4a9e93fb34eb2)), closes [#617](https://github.com/open-sauced/insights/issues/617)

## [1.22.0-beta.1](https://github.com/open-sauced/insights/compare/v1.21.0...v1.22.0-beta.1) (2022-12-16)


### 🍕 Features

* remove the top5 ([#674](https://github.com/open-sauced/insights/issues/674)) ([d0720ef](https://github.com/open-sauced/insights/commit/d0720efea7f1932fbc68f8a8af8af13e89b698ff))

## [1.21.0](https://github.com/open-sauced/insights/compare/v1.20.0...v1.21.0) (2022-12-16)


### 🍕 Features

* add date filter to the contributor calendar ([#668](https://github.com/open-sauced/insights/issues/668)) ([52e2b28](https://github.com/open-sauced/insights/commit/52e2b288cedebaa28388bcc94dc7bda0af784dcf)), closes [#663](https://github.com/open-sauced/insights/issues/663)
* add Explore to nav ([#667](https://github.com/open-sauced/insights/issues/667)) ([aa1688d](https://github.com/open-sauced/insights/commit/aa1688d8443bbedda3c2fda868205a0a69b6bf00)), closes [#661](https://github.com/open-sauced/insights/issues/661)
* add support for custom fontsize on `CardRepoList` ([#652](https://github.com/open-sauced/insights/issues/652)) ([a61bf07](https://github.com/open-sauced/insights/commit/a61bf07b9cc81aa6c3767b188e39e55e9011b07e)), closes [#508](https://github.com/open-sauced/insights/issues/508)
* add X button to clear search bar ([#659](https://github.com/open-sauced/insights/issues/659)) ([9564ce1](https://github.com/open-sauced/insights/commit/9564ce17d00012445c08f4f8dcac4c7e2bea716e))
* update brand logo font weight ([#651](https://github.com/open-sauced/insights/issues/651)) ([3aa3519](https://github.com/open-sauced/insights/commit/3aa351958f09160f21fd086cff65f1dcbbefb2ae)), closes [#500](https://github.com/open-sauced/insights/issues/500)


### 🐛 Bug Fixes

* a typo ([5d9c2b5](https://github.com/open-sauced/insights/commit/5d9c2b5e7321d80bca34823f481f00b23513b3e2))
* correct lock file ([96696cc](https://github.com/open-sauced/insights/commit/96696ccb9b2c74ed4c7d90b53b13e3eaf1eb41c8))
* onboarding layout break on mobile ([#655](https://github.com/open-sauced/insights/issues/655)) ([9ae6d6f](https://github.com/open-sauced/insights/commit/9ae6d6f3aa5c21cd496191418b1dde6be6a9da5c)), closes [#649](https://github.com/open-sauced/insights/issues/649)
* outside contribution suggestions ([#665](https://github.com/open-sauced/insights/issues/665)) ([577fdd6](https://github.com/open-sauced/insights/commit/577fdd669cc07e51457ec714a058ae10f24c6f66))
* pr overview empty space ([#653](https://github.com/open-sauced/insights/issues/653)) ([8e3f846](https://github.com/open-sauced/insights/commit/8e3f84637520cbf4031c061c6b42cb261af808a8)), closes [#447](https://github.com/open-sauced/insights/issues/447)
* replace package lock file ([849126f](https://github.com/open-sauced/insights/commit/849126f09d3166bdd815cfed2856ac48789407f6))
* wrong command for dev ([af61a32](https://github.com/open-sauced/insights/commit/af61a32901518148bc68a0254f22d6af49df805f))

## [1.21.0-beta.2](https://github.com/open-sauced/insights/compare/v1.21.0-beta.1...v1.21.0-beta.2) (2022-12-16)


### 🐛 Bug Fixes

* correct lock file ([96696cc](https://github.com/open-sauced/insights/commit/96696ccb9b2c74ed4c7d90b53b13e3eaf1eb41c8))

## [1.21.0-beta.1](https://github.com/open-sauced/insights/compare/v1.20.0...v1.21.0-beta.1) (2022-12-16)


### 🍕 Features

* add date filter to the contributor calendar ([#668](https://github.com/open-sauced/insights/issues/668)) ([52e2b28](https://github.com/open-sauced/insights/commit/52e2b288cedebaa28388bcc94dc7bda0af784dcf)), closes [#663](https://github.com/open-sauced/insights/issues/663)
* add Explore to nav ([#667](https://github.com/open-sauced/insights/issues/667)) ([aa1688d](https://github.com/open-sauced/insights/commit/aa1688d8443bbedda3c2fda868205a0a69b6bf00)), closes [#661](https://github.com/open-sauced/insights/issues/661)
* add support for custom fontsize on `CardRepoList` ([#652](https://github.com/open-sauced/insights/issues/652)) ([a61bf07](https://github.com/open-sauced/insights/commit/a61bf07b9cc81aa6c3767b188e39e55e9011b07e)), closes [#508](https://github.com/open-sauced/insights/issues/508)
* add X button to clear search bar ([#659](https://github.com/open-sauced/insights/issues/659)) ([9564ce1](https://github.com/open-sauced/insights/commit/9564ce17d00012445c08f4f8dcac4c7e2bea716e))
* update brand logo font weight ([#651](https://github.com/open-sauced/insights/issues/651)) ([3aa3519](https://github.com/open-sauced/insights/commit/3aa351958f09160f21fd086cff65f1dcbbefb2ae)), closes [#500](https://github.com/open-sauced/insights/issues/500)


### 🐛 Bug Fixes

* a typo ([5d9c2b5](https://github.com/open-sauced/insights/commit/5d9c2b5e7321d80bca34823f481f00b23513b3e2))
* onboarding layout break on mobile ([#655](https://github.com/open-sauced/insights/issues/655)) ([9ae6d6f](https://github.com/open-sauced/insights/commit/9ae6d6f3aa5c21cd496191418b1dde6be6a9da5c)), closes [#649](https://github.com/open-sauced/insights/issues/649)
* outside contribution suggestions ([#665](https://github.com/open-sauced/insights/issues/665)) ([577fdd6](https://github.com/open-sauced/insights/commit/577fdd669cc07e51457ec714a058ae10f24c6f66))
* pr overview empty space ([#653](https://github.com/open-sauced/insights/issues/653)) ([8e3f846](https://github.com/open-sauced/insights/commit/8e3f84637520cbf4031c061c6b42cb261af808a8)), closes [#447](https://github.com/open-sauced/insights/issues/447)
* replace package lock file ([849126f](https://github.com/open-sauced/insights/commit/849126f09d3166bdd815cfed2856ac48789407f6))
* wrong command for dev ([af61a32](https://github.com/open-sauced/insights/commit/af61a32901518148bc68a0254f22d6af49df805f))

## [1.20.0](https://github.com/open-sauced/insights/compare/v1.19.0...v1.20.0) (2022-12-09)


### 🐛 Bug Fixes

* show percentage bar at zero percent ([#638](https://github.com/open-sauced/insights/issues/638)) ([b98cb4b](https://github.com/open-sauced/insights/commit/b98cb4bcec0a26f8a67cf06f8b4ab4a89e006f21)), closes [#632](https://github.com/open-sauced/insights/issues/632)
* update top5 ([7a43afc](https://github.com/open-sauced/insights/commit/7a43afc95b8f9f03de33dc2bdf4cbbfec51f5b2a))
*  create date filter component ([#623](https://github.com/open-sauced/insights/issues/623)) ([4b11709](https://github.com/open-sauced/insights/commit/4b1170992b6202aa5290bd4d310400fddfaf9b76))
* add auth check to insights hub and redirect after onboarding ([#639](https://github.com/open-sauced/insights/issues/639)) ([8510243](https://github.com/open-sauced/insights/commit/8510243e5346054f838873f0fa86da9aa89147b4)), closes [#628](https://github.com/open-sauced/insights/issues/628)
* add contributor profile page UI ([#648](https://github.com/open-sauced/insights/issues/648)) ([c1497af](https://github.com/open-sauced/insights/commit/c1497af9c84581ff6afa751372c3b8e22d70cba4))
* add hover card tooltip component ([#607](https://github.com/open-sauced/insights/issues/607)) ([2385c43](https://github.com/open-sauced/insights/commit/2385c43692b36bf0f13d081bba49896e21030633)), closes [#526](https://github.com/open-sauced/insights/issues/526)
* add Zustand for managing global state. Update global state usage ([#646](https://github.com/open-sauced/insights/issues/646)) ([7987144](https://github.com/open-sauced/insights/commit/798714473c05b51aae393b707ef68160dec63215)), closes [#642](https://github.com/open-sauced/insights/issues/642)
* implement logarithmic scale view on chart ([#644](https://github.com/open-sauced/insights/issues/644)) ([ca3a38c](https://github.com/open-sauced/insights/commit/ca3a38c4a540667816b2a6ec6148d1cf842340d5))
* Introduce loading skeleton to repository and contributors page ([#637](https://github.com/open-sauced/insights/issues/637)) ([3ca20f3](https://github.com/open-sauced/insights/commit/3ca20f3e32eee8ca1c2de6612e699183987c1405))

## [1.20.0-beta.16](https://github.com/open-sauced/insights/compare/v1.20.0-beta.15...v1.20.0-beta.16) (2022-12-16)
### 🍕 Features

* add date filter to the contributor calendar ([#668](https://github.com/open-sauced/insights/issues/668)) ([52e2b28](https://github.com/open-sauced/insights/commit/52e2b288cedebaa28388bcc94dc7bda0af784dcf)), closes [#663](https://github.com/open-sauced/insights/issues/663)

## [1.20.0-beta.15](https://github.com/open-sauced/insights/compare/v1.20.0-beta.14...v1.20.0-beta.15) (2022-12-16)


### 🍕 Features

* add Explore to nav ([#667](https://github.com/open-sauced/insights/issues/667)) ([aa1688d](https://github.com/open-sauced/insights/commit/aa1688d8443bbedda3c2fda868205a0a69b6bf00)), closes [#661](https://github.com/open-sauced/insights/issues/661)

## [1.20.0-beta.14](https://github.com/open-sauced/insights/compare/v1.20.0-beta.13...v1.20.0-beta.14) (2022-12-16)


### 🐛 Bug Fixes

* outside contribution suggestions ([#665](https://github.com/open-sauced/insights/issues/665)) ([577fdd6](https://github.com/open-sauced/insights/commit/577fdd669cc07e51457ec714a058ae10f24c6f66))

## [1.20.0-beta.13](https://github.com/open-sauced/insights/compare/v1.20.0-beta.12...v1.20.0-beta.13) (2022-12-15)


### 🍕 Features

* add X button to clear search bar ([#659](https://github.com/open-sauced/insights/issues/659)) ([9564ce1](https://github.com/open-sauced/insights/commit/9564ce17d00012445c08f4f8dcac4c7e2bea716e))

## [1.20.0-beta.12](https://github.com/open-sauced/insights/compare/v1.20.0-beta.11...v1.20.0-beta.12) (2022-12-13)


### 🐛 Bug Fixes

* wrong command for dev ([af61a32](https://github.com/open-sauced/insights/commit/af61a32901518148bc68a0254f22d6af49df805f))

## [1.20.0-beta.11](https://github.com/open-sauced/insights/compare/v1.20.0-beta.10...v1.20.0-beta.11) (2022-12-13)


### 🐛 Bug Fixes

* a typo ([5d9c2b5](https://github.com/open-sauced/insights/commit/5d9c2b5e7321d80bca34823f481f00b23513b3e2))

## [1.20.0-beta.10](https://github.com/open-sauced/insights/compare/v1.20.0-beta.9...v1.20.0-beta.10) (2022-12-13)


### 🐛 Bug Fixes

* onboarding layout break on mobile ([#655](https://github.com/open-sauced/insights/issues/655)) ([9ae6d6f](https://github.com/open-sauced/insights/commit/9ae6d6f3aa5c21cd496191418b1dde6be6a9da5c)), closes [#649](https://github.com/open-sauced/insights/issues/649)

## [1.20.0-beta.9](https://github.com/open-sauced/insights/compare/v1.20.0-beta.8...v1.20.0-beta.9) (2022-12-12)


### 🍕 Features

* add support for custom fontsize on `CardRepoList` ([#652](https://github.com/open-sauced/insights/issues/652)) ([a61bf07](https://github.com/open-sauced/insights/commit/a61bf07b9cc81aa6c3767b188e39e55e9011b07e)), closes [#508](https://github.com/open-sauced/insights/issues/508)
* update brand logo font weight ([#651](https://github.com/open-sauced/insights/issues/651)) ([3aa3519](https://github.com/open-sauced/insights/commit/3aa351958f09160f21fd086cff65f1dcbbefb2ae)), closes [#500](https://github.com/open-sauced/insights/issues/500)

## [1.20.0-beta.8](https://github.com/open-sauced/insights/compare/v1.20.0-beta.7...v1.20.0-beta.8) (2022-12-12)


### 🐛 Bug Fixes

* pr overview empty space ([#653](https://github.com/open-sauced/insights/issues/653)) ([8e3f846](https://github.com/open-sauced/insights/commit/8e3f84637520cbf4031c061c6b42cb261af808a8)), closes [#447](https://github.com/open-sauced/insights/issues/447)

## [1.20.0-beta.7](https://github.com/open-sauced/insights/compare/v1.20.0-beta.6...v1.20.0-beta.7) (2022-12-08)


### 🍕 Features

* implement logarithmic scale view on chart ([#644](https://github.com/open-sauced/insights/issues/644)) ([ca3a38c](https://github.com/open-sauced/insights/commit/ca3a38c4a540667816b2a6ec6148d1cf842340d5))

## [1.20.0-beta.6](https://github.com/open-sauced/insights/compare/v1.20.0-beta.5...v1.20.0-beta.6) (2022-12-08)


### 🍕 Features

* add contributor profile page UI ([#648](https://github.com/open-sauced/insights/issues/648)) ([c1497af](https://github.com/open-sauced/insights/commit/c1497af9c84581ff6afa751372c3b8e22d70cba4))

## [1.20.0-beta.5](https://github.com/open-sauced/insights/compare/v1.20.0-beta.4...v1.20.0-beta.5) (2022-12-08)


### 🍕 Features

* add Zustand for managing global state. Update global state usage ([#646](https://github.com/open-sauced/insights/issues/646)) ([7987144](https://github.com/open-sauced/insights/commit/798714473c05b51aae393b707ef68160dec63215)), closes [#642](https://github.com/open-sauced/insights/issues/642)

## [1.20.0-beta.4](https://github.com/open-sauced/insights/compare/v1.20.0-beta.3...v1.20.0-beta.4) (2022-12-06)


### 🍕 Features

*  create date filter component ([#623](https://github.com/open-sauced/insights/issues/623)) ([4b11709](https://github.com/open-sauced/insights/commit/4b1170992b6202aa5290bd4d310400fddfaf9b76))
* add auth check to insights hub and redirect after onboarding ([#639](https://github.com/open-sauced/insights/issues/639)) ([8510243](https://github.com/open-sauced/insights/commit/8510243e5346054f838873f0fa86da9aa89147b4)), closes [#628](https://github.com/open-sauced/insights/issues/628)

## [1.20.0-beta.3](https://github.com/open-sauced/insights/compare/v1.20.0-beta.2...v1.20.0-beta.3) (2022-12-05)


### 🍕 Features

* Introduce loading skeleton to repository and contributors page ([#637](https://github.com/open-sauced/insights/issues/637)) ([3ca20f3](https://github.com/open-sauced/insights/commit/3ca20f3e32eee8ca1c2de6612e699183987c1405))

## [1.20.0-beta.2](https://github.com/open-sauced/insights/compare/v1.20.0-beta.1...v1.20.0-beta.2) (2022-12-05)


### 🐛 Bug Fixes

* show percentage bar at zero percent ([#638](https://github.com/open-sauced/insights/issues/638)) ([b98cb4b](https://github.com/open-sauced/insights/commit/b98cb4bcec0a26f8a67cf06f8b4ab4a89e006f21)), closes [#632](https://github.com/open-sauced/insights/issues/632)

## [1.20.0-beta.1](https://github.com/open-sauced/insights/compare/v1.19.1-beta.1...v1.20.0-beta.1) (2022-12-05)


### 🍕 Features

* add hover card tooltip component ([#607](https://github.com/open-sauced/insights/issues/607)) ([2385c43](https://github.com/open-sauced/insights/commit/2385c43692b36bf0f13d081bba49896e21030633)), closes [#526](https://github.com/open-sauced/insights/issues/526)

### [1.19.1-beta.1](https://github.com/open-sauced/insights/compare/v1.19.0...v1.19.1-beta.1) (2022-12-03)


### 🐛 Bug Fixes

* update top5 ([7a43afc](https://github.com/open-sauced/insights/commit/7a43afc95b8f9f03de33dc2bdf4cbbfec51f5b2a))

## [1.19.0](https://github.com/open-sauced/insights/compare/v1.18.0...v1.19.0) (2022-12-02)


### 🐛 Bug Fixes

* bottom axis issues on mobile ([#625](https://github.com/open-sauced/insights/issues/625)) ([3d1acfc](https://github.com/open-sauced/insights/commit/3d1acfc0a03744afd2e4356f28f635effaff3300))
* correct domain normalisation missing trailing slash for auth ([0bbb81f](https://github.com/open-sauced/insights/commit/0bbb81f25c488e873deb471e64ea44cd484e273e))
* correct supabase oauth redirect mismatch ([#630](https://github.com/open-sauced/insights/issues/630)) ([ac37f4b](https://github.com/open-sauced/insights/commit/ac37f4bf028a7e50c36490ae596dbd3591a58834))


### 🍕 Features

* Update Dashboard Echart to `NivoScatterPlot` ([#612](https://github.com/open-sauced/insights/issues/612)) ([fb73f3c](https://github.com/open-sauced/insights/commit/fb73f3c7e5dc6dcc7304655ac329e3dc02d7bb20)), closes [#282](https://github.com/open-sauced/insights/issues/282) [#411](https://github.com/open-sauced/insights/issues/411) [#586](https://github.com/open-sauced/insights/issues/586)
* update insight cards to use topic/selected/repo filters ([#626](https://github.com/open-sauced/insights/issues/626)) ([2ecfcf7](https://github.com/open-sauced/insights/commit/2ecfcf72d894d6d868828e5b7142183234380f80)), closes [#619](https://github.com/open-sauced/insights/issues/619)

## [1.19.0-beta.5](https://github.com/open-sauced/insights/compare/v1.19.0-beta.4...v1.19.0-beta.5) (2022-12-02)


### 🍕 Features

* update insight cards to use topic/selected/repo filters ([#626](https://github.com/open-sauced/insights/issues/626)) ([2ecfcf7](https://github.com/open-sauced/insights/commit/2ecfcf72d894d6d868828e5b7142183234380f80)), closes [#619](https://github.com/open-sauced/insights/issues/619)

## [1.19.0-beta.4](https://github.com/open-sauced/insights/compare/v1.19.0-beta.3...v1.19.0-beta.4) (2022-12-02)


### 🐛 Bug Fixes

* correct domain normalisation missing trailing slash for auth ([0bbb81f](https://github.com/open-sauced/insights/commit/0bbb81f25c488e873deb471e64ea44cd484e273e))

## [1.19.0-beta.3](https://github.com/open-sauced/insights/compare/v1.19.0-beta.2...v1.19.0-beta.3) (2022-12-02)


### 🐛 Bug Fixes

* correct supabase oauth redirect mismatch ([#630](https://github.com/open-sauced/insights/issues/630)) ([ac37f4b](https://github.com/open-sauced/insights/commit/ac37f4bf028a7e50c36490ae596dbd3591a58834))

## [1.19.0-beta.2](https://github.com/open-sauced/insights/compare/v1.19.0-beta.1...v1.19.0-beta.2) (2022-11-30)


### 🐛 Bug Fixes

* bottom axis issues on mobile ([#625](https://github.com/open-sauced/insights/issues/625)) ([3d1acfc](https://github.com/open-sauced/insights/commit/3d1acfc0a03744afd2e4356f28f635effaff3300))

## [1.19.0-beta.1](https://github.com/open-sauced/insights/compare/v1.18.0...v1.19.0-beta.1) (2022-11-30)


### 🍕 Features

* Update Dashboard Echart to `NivoScatterPlot` ([#612](https://github.com/open-sauced/insights/issues/612)) ([fb73f3c](https://github.com/open-sauced/insights/commit/fb73f3c7e5dc6dcc7304655ac329e3dc02d7bb20)), closes [#282](https://github.com/open-sauced/insights/issues/282) [#411](https://github.com/open-sauced/insights/issues/411) [#586](https://github.com/open-sauced/insights/issues/586)

## [1.18.0](https://github.com/open-sauced/insights/compare/v1.17.0...v1.18.0) (2022-11-29)


### 🐛 Bug Fixes

* add fallback message for a filtered repo not being indexed ([#611](https://github.com/open-sauced/insights/issues/611)) ([852a383](https://github.com/open-sauced/insights/commit/852a3837f2222fa9c20733560ea520f13836d1e9)), closes [#585](https://github.com/open-sauced/insights/issues/585)
* increase default for number of recent prs displayed on scatterchart ([#614](https://github.com/open-sauced/insights/issues/614)) ([1996694](https://github.com/open-sauced/insights/commit/199669473e385ac2671172053e2a3e86d1130d68)), closes [#583](https://github.com/open-sauced/insights/issues/583)


### 🍕 Features

* implement edit insight page ([#615](https://github.com/open-sauced/insights/issues/615)) ([06dcf4a](https://github.com/open-sauced/insights/commit/06dcf4a02ce3fbc815f5828ba35a611212ede096)), closes [#609](https://github.com/open-sauced/insights/issues/609)

## [1.18.0-beta.1](https://github.com/open-sauced/insights/compare/v1.17.1-beta.2...v1.18.0-beta.1) (2022-11-23)


### 🍕 Features

* implement edit insight page ([#615](https://github.com/open-sauced/insights/issues/615)) ([06dcf4a](https://github.com/open-sauced/insights/commit/06dcf4a02ce3fbc815f5828ba35a611212ede096)), closes [#609](https://github.com/open-sauced/insights/issues/609)

### [1.17.1-beta.2](https://github.com/open-sauced/insights/compare/v1.17.1-beta.1...v1.17.1-beta.2) (2022-11-21)


### 🐛 Bug Fixes

* increase default for number of recent prs displayed on scatterchart ([#614](https://github.com/open-sauced/insights/issues/614)) ([1996694](https://github.com/open-sauced/insights/commit/199669473e385ac2671172053e2a3e86d1130d68)), closes [#583](https://github.com/open-sauced/insights/issues/583)

### [1.17.1-beta.1](https://github.com/open-sauced/insights/compare/v1.17.0...v1.17.1-beta.1) (2022-11-21)


### 🐛 Bug Fixes

* add fallback message for a filtered repo not being indexed ([#611](https://github.com/open-sauced/insights/issues/611)) ([852a383](https://github.com/open-sauced/insights/commit/852a3837f2222fa9c20733560ea520f13836d1e9)), closes [#585](https://github.com/open-sauced/insights/issues/585)

## [1.17.0](https://github.com/open-sauced/insights/compare/v1.16.0...v1.17.0) (2022-11-18)


### 🍕 Features

* implement add create insight page ([#591](https://github.com/open-sauced/insights/issues/591)) ([b1b3c7b](https://github.com/open-sauced/insights/commit/b1b3c7bf65ff717f9ed69e03f823c2633e9ffc7d)), closes [#562](https://github.com/open-sauced/insights/issues/562)


### 🐛 Bug Fixes

* add additional filters to contributor hooks ([#589](https://github.com/open-sauced/insights/issues/589)) ([a107f97](https://github.com/open-sauced/insights/commit/a107f973e061e2d23c9fc84a64133107f3ee2e40))
* add gap to insight row section ([#606](https://github.com/open-sauced/insights/issues/606)) ([3553d14](https://github.com/open-sauced/insights/commit/3553d149582602053eb25c54d6960cd6edfcd735)), closes [#605](https://github.com/open-sauced/insights/issues/605)
* broken css in insights hub page ([#590](https://github.com/open-sauced/insights/issues/590)) ([97de259](https://github.com/open-sauced/insights/commit/97de259f31f45d71fab4d46b2e494af4e118163b)), closes [#588](https://github.com/open-sauced/insights/issues/588)
* fix calculation of average open PRs on insights hub ([#604](https://github.com/open-sauced/insights/issues/604)) ([0e2405b](https://github.com/open-sauced/insights/commit/0e2405be75b8293d1814895d00e597806c906a98))
* Improve the Onboarding UI ([#602](https://github.com/open-sauced/insights/issues/602)) ([657e344](https://github.com/open-sauced/insights/commit/657e344b55054a63515f661333ed522bbbe68d56)), closes [#601](https://github.com/open-sauced/insights/issues/601)
* navigate back to home after finishing onboarding ([#610](https://github.com/open-sauced/insights/issues/610)) ([9567b83](https://github.com/open-sauced/insights/commit/9567b8307190b8adc0f47867fabbfd8d6c9b1962))
* set min heigh/width on repository table repo name avatar ([#603](https://github.com/open-sauced/insights/issues/603)) ([aaec5dd](https://github.com/open-sauced/insights/commit/aaec5ddbe0110378029e95e1464f4e1b991a9856)), closes [#527](https://github.com/open-sauced/insights/issues/527)

## [1.17.0-beta.4](https://github.com/open-sauced/insights/compare/v1.17.0-beta.3...v1.17.0-beta.4) (2022-11-17)


### 🐛 Bug Fixes

* navigate back to home after finishing onboarding ([#610](https://github.com/open-sauced/insights/issues/610)) ([9567b83](https://github.com/open-sauced/insights/commit/9567b8307190b8adc0f47867fabbfd8d6c9b1962))

## [1.17.0-beta.3](https://github.com/open-sauced/insights/compare/v1.17.0-beta.2...v1.17.0-beta.3) (2022-11-17)


### 🐛 Bug Fixes

* set min heigh/width on repository table repo name avatar ([#603](https://github.com/open-sauced/insights/issues/603)) ([aaec5dd](https://github.com/open-sauced/insights/commit/aaec5ddbe0110378029e95e1464f4e1b991a9856)), closes [#527](https://github.com/open-sauced/insights/issues/527)

## [1.17.0-beta.2](https://github.com/open-sauced/insights/compare/v1.17.0-beta.1...v1.17.0-beta.2) (2022-11-17)


### 🐛 Bug Fixes

* add gap to insight row section ([#606](https://github.com/open-sauced/insights/issues/606)) ([3553d14](https://github.com/open-sauced/insights/commit/3553d149582602053eb25c54d6960cd6edfcd735)), closes [#605](https://github.com/open-sauced/insights/issues/605)
* fix calculation of average open PRs on insights hub ([#604](https://github.com/open-sauced/insights/issues/604)) ([0e2405b](https://github.com/open-sauced/insights/commit/0e2405be75b8293d1814895d00e597806c906a98))

## [1.17.0-beta.1](https://github.com/open-sauced/insights/compare/v1.16.1-beta.3...v1.17.0-beta.1) (2022-11-16)


### 🍕 Features

* implement add create insight page ([#591](https://github.com/open-sauced/insights/issues/591)) ([b1b3c7b](https://github.com/open-sauced/insights/commit/b1b3c7bf65ff717f9ed69e03f823c2633e9ffc7d)), closes [#562](https://github.com/open-sauced/insights/issues/562)

### [1.16.1-beta.3](https://github.com/open-sauced/insights/compare/v1.16.1-beta.2...v1.16.1-beta.3) (2022-11-16)


### 🐛 Bug Fixes

* add additional filters to contributor hooks ([#589](https://github.com/open-sauced/insights/issues/589)) ([a107f97](https://github.com/open-sauced/insights/commit/a107f973e061e2d23c9fc84a64133107f3ee2e40))

### [1.16.1-beta.2](https://github.com/open-sauced/insights/compare/v1.16.1-beta.1...v1.16.1-beta.2) (2022-11-16)


### 🐛 Bug Fixes

* broken css in insights hub page ([#590](https://github.com/open-sauced/insights/issues/590)) ([97de259](https://github.com/open-sauced/insights/commit/97de259f31f45d71fab4d46b2e494af4e118163b)), closes [#588](https://github.com/open-sauced/insights/issues/588)

### [1.16.1-beta.1](https://github.com/open-sauced/insights/compare/v1.16.0...v1.16.1-beta.1) (2022-11-16)


### 🐛 Bug Fixes

* Improve the Onboarding UI ([#602](https://github.com/open-sauced/insights/issues/602)) ([657e344](https://github.com/open-sauced/insights/commit/657e344b55054a63515f661333ed522bbbe68d56)), closes [#601](https://github.com/open-sauced/insights/issues/601)

## [1.16.0](https://github.com/open-sauced/insights/compare/v1.15.0...v1.16.0) (2022-11-11)


### 📝 Documentation

* update text input story ([f508499](https://github.com/open-sauced/insights/commit/f5084998f74a60f83e2062606c56b729f6cfb763))


### 🐛 Bug Fixes

* correct retention and job timeouts for worflows ([43ae12b](https://github.com/open-sauced/insights/commit/43ae12be2caa78b1c067e96b291a3cbc11ab5bc8)), closes [#554](https://github.com/open-sauced/insights/issues/554)
* diverge cron execution for rate limit purposes ([3607a80](https://github.com/open-sauced/insights/commit/3607a8030c6228b8fe7ecc5149d044889674ead5))
* pass topic to contributor and commit hooks ([#571](https://github.com/open-sauced/insights/issues/571)) ([ebb061f](https://github.com/open-sauced/insights/commit/ebb061fcf310fa156f437ddcdb056a341a9e67c9))


### 🧑‍💻 Code Refactoring

* improve text input component ([#556](https://github.com/open-sauced/insights/issues/556)) ([707df9d](https://github.com/open-sauced/insights/commit/707df9d9c4d3383245f2a47289ce45d0287edf29)), closes [#552](https://github.com/open-sauced/insights/issues/552)
* replaced toggle switch component with radix ([#563](https://github.com/open-sauced/insights/issues/563)) ([3bdca61](https://github.com/open-sauced/insights/commit/3bdca61241f62bd8ecac6428f19a69997a3b10c0)), closes [#561](https://github.com/open-sauced/insights/issues/561)
* set default font weight to `medium` and removed all instance in code base ([#569](https://github.com/open-sauced/insights/issues/569)) ([f9f55ab](https://github.com/open-sauced/insights/commit/f9f55abcd7f9c2518024456bf59be4b83cc6d82c))


### 🍕 Features

* add individual repo search on repositories page ([#580](https://github.com/open-sauced/insights/issues/580)) ([cbc9e43](https://github.com/open-sauced/insights/commit/cbc9e4357245d65ed90659629b1d4e6cff03d154)), closes [#322](https://github.com/open-sauced/insights/issues/322)
* add repository cart components ([#577](https://github.com/open-sauced/insights/issues/577)) ([740a339](https://github.com/open-sauced/insights/commit/740a339405630b6ae631e2631ac51ba3377ce6e9)), closes [#560](https://github.com/open-sauced/insights/issues/560)
* change default topic to javascript ([#570](https://github.com/open-sauced/insights/issues/570)) ([bc810d8](https://github.com/open-sauced/insights/commit/bc810d87b74b01257ae115a6960c948d1922bf44))
* create `SuggestedRepository` component ([#564](https://github.com/open-sauced/insights/issues/564)) ([5fe3bbf](https://github.com/open-sauced/insights/commit/5fe3bbffffeb177d56e94e1b1e62ee1e1df33440))
* create search result component ([#572](https://github.com/open-sauced/insights/issues/572)) ([5aa4620](https://github.com/open-sauced/insights/commit/5aa462006dfe8e4d6d055a6a6abfb0ebdbbc356b)), closes [#553](https://github.com/open-sauced/insights/issues/553)
* implement initial user insights hub page ([#574](https://github.com/open-sauced/insights/issues/574)) ([107bee7](https://github.com/open-sauced/insights/commit/107bee71cfdb30eaf81f2b990d00407ebf1b16c5)), closes [#511](https://github.com/open-sauced/insights/issues/511)
* implement insight hub pages ([#578](https://github.com/open-sauced/insights/issues/578)) ([e8d53dd](https://github.com/open-sauced/insights/commit/e8d53dde2d8d370fa470440e12277f7858af05c8))
* implement insight page table ([#547](https://github.com/open-sauced/insights/issues/547)) ([a2b92b1](https://github.com/open-sauced/insights/commit/a2b92b1c393ba0043e6424849230eeceab828549))
* implement Supabase auth helpers for managing authenticated user ([#565](https://github.com/open-sauced/insights/issues/565)) ([3b32f5f](https://github.com/open-sauced/insights/commit/3b32f5f1671ce4ea7a97404c8f38dc55ac316d43))
* New insights soon ([#582](https://github.com/open-sauced/insights/issues/582)) ([1c36cc8](https://github.com/open-sauced/insights/commit/1c36cc873a02085298c13eb1d0cb2548828399c6))
* redirect to recent filter by default ([#548](https://github.com/open-sauced/insights/issues/548)) ([edf99e7](https://github.com/open-sauced/insights/commit/edf99e7e58a81d5382a41a7939323047ef83ba1f)), closes [#517](https://github.com/open-sauced/insights/issues/517)
* update top nav to include `NavLinks` ([#549](https://github.com/open-sauced/insights/issues/549)) ([4e64fa5](https://github.com/open-sauced/insights/commit/4e64fa5f6dc77553dce100cb623bcdb3a1b2d4b3))
* updated design for insights hub page ([#579](https://github.com/open-sauced/insights/issues/579)) ([f2dab35](https://github.com/open-sauced/insights/commit/f2dab35820bfc91add679c5931bc72240ce27290))
* updated text input component with new states ([6b34a4e](https://github.com/open-sauced/insights/commit/6b34a4e6839856de39c2deb88ed465cdc6fe6c1d))
* use GitHub API to fetch repo list for onboarding ([#573](https://github.com/open-sauced/insights/issues/573)) ([5fa3e3a](https://github.com/open-sauced/insights/commit/5fa3e3ae741cd5ee49a97cef8b710318bc8252ea)), closes [#544](https://github.com/open-sauced/insights/issues/544)

## [1.16.0-beta.18](https://github.com/open-sauced/insights/compare/v1.16.0-beta.17...v1.16.0-beta.18) (2022-11-11)


### 🍕 Features

* New insights soon ([#582](https://github.com/open-sauced/insights/issues/582)) ([1c36cc8](https://github.com/open-sauced/insights/commit/1c36cc873a02085298c13eb1d0cb2548828399c6))

## [1.16.0-beta.17](https://github.com/open-sauced/insights/compare/v1.16.0-beta.16...v1.16.0-beta.17) (2022-11-11)


### 🍕 Features

* add individual repo search on repositories page ([#580](https://github.com/open-sauced/insights/issues/580)) ([cbc9e43](https://github.com/open-sauced/insights/commit/cbc9e4357245d65ed90659629b1d4e6cff03d154)), closes [#322](https://github.com/open-sauced/insights/issues/322)

## [1.16.0-beta.16](https://github.com/open-sauced/insights/compare/v1.16.0-beta.15...v1.16.0-beta.16) (2022-11-11)


### 🍕 Features

* implement insight hub pages ([#578](https://github.com/open-sauced/insights/issues/578)) ([e8d53dd](https://github.com/open-sauced/insights/commit/e8d53dde2d8d370fa470440e12277f7858af05c8))

## [1.16.0-beta.15](https://github.com/open-sauced/insights/compare/v1.16.0-beta.14...v1.16.0-beta.15) (2022-11-11)


### 🍕 Features

* updated design for insights hub page ([#579](https://github.com/open-sauced/insights/issues/579)) ([f2dab35](https://github.com/open-sauced/insights/commit/f2dab35820bfc91add679c5931bc72240ce27290))

## [1.16.0-beta.14](https://github.com/open-sauced/insights/compare/v1.16.0-beta.13...v1.16.0-beta.14) (2022-11-09)


### 🍕 Features

* add repository cart components ([#577](https://github.com/open-sauced/insights/issues/577)) ([740a339](https://github.com/open-sauced/insights/commit/740a339405630b6ae631e2631ac51ba3377ce6e9)), closes [#560](https://github.com/open-sauced/insights/issues/560)

## [1.16.0-beta.13](https://github.com/open-sauced/insights/compare/v1.16.0-beta.12...v1.16.0-beta.13) (2022-11-08)


### 🍕 Features

* create search result component ([#572](https://github.com/open-sauced/insights/issues/572)) ([5aa4620](https://github.com/open-sauced/insights/commit/5aa462006dfe8e4d6d055a6a6abfb0ebdbbc356b)), closes [#553](https://github.com/open-sauced/insights/issues/553)
* implement initial user insights hub page ([#574](https://github.com/open-sauced/insights/issues/574)) ([107bee7](https://github.com/open-sauced/insights/commit/107bee71cfdb30eaf81f2b990d00407ebf1b16c5)), closes [#511](https://github.com/open-sauced/insights/issues/511)

## [1.16.0-beta.12](https://github.com/open-sauced/insights/compare/v1.16.0-beta.11...v1.16.0-beta.12) (2022-11-08)


### 🧑‍💻 Code Refactoring

* set default font weight to `medium` and removed all instance in code base ([#569](https://github.com/open-sauced/insights/issues/569)) ([f9f55ab](https://github.com/open-sauced/insights/commit/f9f55abcd7f9c2518024456bf59be4b83cc6d82c))

## [1.16.0-beta.11](https://github.com/open-sauced/insights/compare/v1.16.0-beta.10...v1.16.0-beta.11) (2022-11-07)


### 🍕 Features

* use GitHub API to fetch repo list for onboarding ([#573](https://github.com/open-sauced/insights/issues/573)) ([5fa3e3a](https://github.com/open-sauced/insights/commit/5fa3e3ae741cd5ee49a97cef8b710318bc8252ea)), closes [#544](https://github.com/open-sauced/insights/issues/544)

## [1.16.0-beta.10](https://github.com/open-sauced/insights/compare/v1.16.0-beta.9...v1.16.0-beta.10) (2022-11-03)


### 🍕 Features

* change default topic to javascript ([#570](https://github.com/open-sauced/insights/issues/570)) ([bc810d8](https://github.com/open-sauced/insights/commit/bc810d87b74b01257ae115a6960c948d1922bf44))


### 🐛 Bug Fixes

* pass topic to contributor and commit hooks ([#571](https://github.com/open-sauced/insights/issues/571)) ([ebb061f](https://github.com/open-sauced/insights/commit/ebb061fcf310fa156f437ddcdb056a341a9e67c9))

## [1.16.0-beta.9](https://github.com/open-sauced/insights/compare/v1.16.0-beta.8...v1.16.0-beta.9) (2022-11-01)


### 🧑‍💻 Code Refactoring

* replaced toggle switch component with radix ([#563](https://github.com/open-sauced/insights/issues/563)) ([3bdca61](https://github.com/open-sauced/insights/commit/3bdca61241f62bd8ecac6428f19a69997a3b10c0)), closes [#561](https://github.com/open-sauced/insights/issues/561)

## [1.16.0-beta.8](https://github.com/open-sauced/insights/compare/v1.16.0-beta.7...v1.16.0-beta.8) (2022-11-01)


### 🍕 Features

* create `SuggestedRepository` component ([#564](https://github.com/open-sauced/insights/issues/564)) ([5fe3bbf](https://github.com/open-sauced/insights/commit/5fe3bbffffeb177d56e94e1b1e62ee1e1df33440))
* implement insight page table ([#547](https://github.com/open-sauced/insights/issues/547)) ([a2b92b1](https://github.com/open-sauced/insights/commit/a2b92b1c393ba0043e6424849230eeceab828549))

## [1.16.0-beta.7](https://github.com/open-sauced/insights/compare/v1.16.0-beta.6...v1.16.0-beta.7) (2022-10-28)


### 🍕 Features

* implement Supabase auth helpers for managing authenticated user ([#565](https://github.com/open-sauced/insights/issues/565)) ([3b32f5f](https://github.com/open-sauced/insights/commit/3b32f5f1671ce4ea7a97404c8f38dc55ac316d43))

## [1.16.0-beta.6](https://github.com/open-sauced/insights/compare/v1.16.0-beta.5...v1.16.0-beta.6) (2022-10-28)


### 🍕 Features

* update top nav to include `NavLinks` ([#549](https://github.com/open-sauced/insights/issues/549)) ([4e64fa5](https://github.com/open-sauced/insights/commit/4e64fa5f6dc77553dce100cb623bcdb3a1b2d4b3))

## [1.16.0-beta.5](https://github.com/open-sauced/insights/compare/v1.16.0-beta.4...v1.16.0-beta.5) (2022-10-28)


### 🧑‍💻 Code Refactoring

* improve text input component ([#556](https://github.com/open-sauced/insights/issues/556)) ([707df9d](https://github.com/open-sauced/insights/commit/707df9d9c4d3383245f2a47289ce45d0287edf29)), closes [#552](https://github.com/open-sauced/insights/issues/552)

## [1.16.0-beta.4](https://github.com/open-sauced/insights/compare/v1.16.0-beta.3...v1.16.0-beta.4) (2022-10-25)


### 🐛 Bug Fixes

* diverge cron execution for rate limit purposes ([3607a80](https://github.com/open-sauced/insights/commit/3607a8030c6228b8fe7ecc5149d044889674ead5))

## [1.16.0-beta.3](https://github.com/open-sauced/insights/compare/v1.16.0-beta.2...v1.16.0-beta.3) (2022-10-25)


### 🐛 Bug Fixes

* correct retention and job timeouts for worflows ([43ae12b](https://github.com/open-sauced/insights/commit/43ae12be2caa78b1c067e96b291a3cbc11ab5bc8)), closes [#554](https://github.com/open-sauced/insights/issues/554)

## [1.16.0-beta.2](https://github.com/open-sauced/insights/compare/v1.16.0-beta.1...v1.16.0-beta.2) (2022-10-24)


### 🍕 Features

* updated text input component with new states ([6b34a4e](https://github.com/open-sauced/insights/commit/6b34a4e6839856de39c2deb88ed465cdc6fe6c1d))


### 📝 Documentation

* update text input story ([f508499](https://github.com/open-sauced/insights/commit/f5084998f74a60f83e2062606c56b729f6cfb763))

## [1.16.0-beta.1](https://github.com/open-sauced/insights/compare/v1.15.0...v1.16.0-beta.1) (2022-10-20)


### 🍕 Features

* redirect to recent filter by default ([#548](https://github.com/open-sauced/insights/issues/548)) ([edf99e7](https://github.com/open-sauced/insights/commit/edf99e7e58a81d5382a41a7939323047ef83ba1f)), closes [#517](https://github.com/open-sauced/insights/issues/517)

## [1.15.0](https://github.com/open-sauced/insights/compare/v1.14.0...v1.15.0) (2022-10-17)


### 🍕 Features

* make repositories clickable to apply filter for single repo ([#516](https://github.com/open-sauced/insights/issues/516)) ([80df544](https://github.com/open-sauced/insights/commit/80df544b6888404febc71c4b8f630e50e868e3fc)), closes [#497](https://github.com/open-sauced/insights/issues/497)

## [1.15.0-beta.1](https://github.com/open-sauced/insights/compare/v1.14.0...v1.15.0-beta.1) (2022-10-17)


### 🍕 Features

* make repositories clickable to apply filter for single repo ([#516](https://github.com/open-sauced/insights/issues/516)) ([80df544](https://github.com/open-sauced/insights/commit/80df544b6888404febc71c4b8f630e50e868e3fc)), closes [#497](https://github.com/open-sauced/insights/issues/497)

## [1.14.0](https://github.com/open-sauced/insights/compare/v1.13.0...v1.14.0) (2022-10-17)


### 🍕 Features

* allow for displaying insights based on custom topics ([#528](https://github.com/open-sauced/insights/issues/528)) ([93e1138](https://github.com/open-sauced/insights/commit/93e1138279b828882dace652394944a869daf632)), closes [#417](https://github.com/open-sauced/insights/issues/417)


### 🐛 Bug Fixes

* add root href to header logo component image ([#537](https://github.com/open-sauced/insights/issues/537)) ([e71e9cb](https://github.com/open-sauced/insights/commit/e71e9cbcb2384dda1a31be05e038f303d17fdf26)), closes [#523](https://github.com/open-sauced/insights/issues/523)
* correct card horizontal tooltip error on storybook ([#536](https://github.com/open-sauced/insights/issues/536)) ([100d93e](https://github.com/open-sauced/insights/commit/100d93e784510a6482576a68a718d17de50c4907)), closes [#525](https://github.com/open-sauced/insights/issues/525)
* humanize numbers and use absolute values in highlight cards ([#535](https://github.com/open-sauced/insights/issues/535)) ([f5c538c](https://github.com/open-sauced/insights/commit/f5c538c54036ffd0baace2f31bacac3bcd4f21b2)), closes [#506](https://github.com/open-sauced/insights/issues/506)
* show pr velocity in relative days ([#534](https://github.com/open-sauced/insights/issues/534)) ([27c178e](https://github.com/open-sauced/insights/commit/27c178e0f60de0262ddb1acba40e9080e6bf4f1e)), closes [#448](https://github.com/open-sauced/insights/issues/448)

## [1.14.0-beta.3](https://github.com/open-sauced/insights/compare/v1.14.0-beta.2...v1.14.0-beta.3) (2022-10-17)


### 🐛 Bug Fixes

* add root href to header logo component image ([#537](https://github.com/open-sauced/insights/issues/537)) ([e71e9cb](https://github.com/open-sauced/insights/commit/e71e9cbcb2384dda1a31be05e038f303d17fdf26)), closes [#523](https://github.com/open-sauced/insights/issues/523)
* correct card horizontal tooltip error on storybook ([#536](https://github.com/open-sauced/insights/issues/536)) ([100d93e](https://github.com/open-sauced/insights/commit/100d93e784510a6482576a68a718d17de50c4907)), closes [#525](https://github.com/open-sauced/insights/issues/525)

## [1.14.0-beta.2](https://github.com/open-sauced/insights/compare/v1.14.0-beta.1...v1.14.0-beta.2) (2022-10-14)


### 🐛 Bug Fixes

* humanize numbers and use absolute values in highlight cards ([#535](https://github.com/open-sauced/insights/issues/535)) ([f5c538c](https://github.com/open-sauced/insights/commit/f5c538c54036ffd0baace2f31bacac3bcd4f21b2)), closes [#506](https://github.com/open-sauced/insights/issues/506)

## [1.14.0-beta.1](https://github.com/open-sauced/insights/compare/v1.13.0...v1.14.0-beta.1) (2022-10-14)


### 🐛 Bug Fixes

* show pr velocity in relative days ([#534](https://github.com/open-sauced/insights/issues/534)) ([27c178e](https://github.com/open-sauced/insights/commit/27c178e0f60de0262ddb1acba40e9080e6bf4f1e)), closes [#448](https://github.com/open-sauced/insights/issues/448)


### 🍕 Features

* allow for displaying insights based on custom topics ([#528](https://github.com/open-sauced/insights/issues/528)) ([93e1138](https://github.com/open-sauced/insights/commit/93e1138279b828882dace652394944a869daf632)), closes [#417](https://github.com/open-sauced/insights/issues/417)

## [1.13.0](https://github.com/open-sauced/insights/compare/v1.12.0...v1.13.0) (2022-10-14)


### 🐛 Bug Fixes

* remove duplicate contributors from the scatter chart ([#529](https://github.com/open-sauced/insights/issues/529)) ([9b4b2c8](https://github.com/open-sauced/insights/commit/9b4b2c8efd31a5b1221dbffc613f31b9dae5da8f)), closes [#372](https://github.com/open-sauced/insights/issues/372)


### 🍕 Features

* implement InsightPageCard component ([#519](https://github.com/open-sauced/insights/issues/519)) ([0dd5057](https://github.com/open-sauced/insights/commit/0dd50576c57cfc6177f0cb71bef3be9c3dea589a)), closes [#509](https://github.com/open-sauced/insights/issues/509)
* re-enable toggling of bots on scatterchart ([#530](https://github.com/open-sauced/insights/issues/530)) ([bcd3428](https://github.com/open-sauced/insights/commit/bcd342806ae5f429bfac4797d4062ec67b4c1b33)), closes [#476](https://github.com/open-sauced/insights/issues/476)

## [1.13.0-beta.1](https://github.com/open-sauced/insights/compare/v1.12.0...v1.13.0-beta.1) (2022-10-13)


### 🐛 Bug Fixes

* remove duplicate contributors from the scatter chart ([#529](https://github.com/open-sauced/insights/issues/529)) ([9b4b2c8](https://github.com/open-sauced/insights/commit/9b4b2c8efd31a5b1221dbffc613f31b9dae5da8f)), closes [#372](https://github.com/open-sauced/insights/issues/372)


### 🍕 Features

* implement InsightPageCard component ([#519](https://github.com/open-sauced/insights/issues/519)) ([0dd5057](https://github.com/open-sauced/insights/commit/0dd50576c57cfc6177f0cb71bef3be9c3dea589a)), closes [#509](https://github.com/open-sauced/insights/issues/509)
* re-enable toggling of bots on scatterchart ([#530](https://github.com/open-sauced/insights/issues/530)) ([bcd3428](https://github.com/open-sauced/insights/commit/bcd342806ae5f429bfac4797d4062ec67b4c1b33)), closes [#476](https://github.com/open-sauced/insights/issues/476)

## [1.12.0](https://github.com/open-sauced/insights/compare/v1.11.0...v1.12.0) (2022-10-11)


### 🐛 Bug Fixes

* update pagination counts for repositories and contributors ([#503](https://github.com/open-sauced/insights/issues/503)) ([1332fab](https://github.com/open-sauced/insights/commit/1332fab8742bf832a1978bac95117fa1c0b0fecc))


### 🍕 Features

* add `PullRequestPieChart` component ([#514](https://github.com/open-sauced/insights/issues/514)) ([9132a93](https://github.com/open-sauced/insights/commit/9132a936ca04cda35b19a2b44df56a9b5495a5c2))
* add custom tooltip component to contributors bar chart ([#501](https://github.com/open-sauced/insights/issues/501)) ([855d66b](https://github.com/open-sauced/insights/commit/855d66b2848da85787bd03db6a77442834c64100))

## [1.12.0-beta.4](https://github.com/open-sauced/insights/compare/v1.12.0-beta.3...v1.12.0-beta.4) (2022-10-12)


### 🐛 Bug Fixes

* remove duplicate contributors from the scatter chart ([#529](https://github.com/open-sauced/insights/issues/529)) ([9b4b2c8](https://github.com/open-sauced/insights/commit/9b4b2c8efd31a5b1221dbffc613f31b9dae5da8f)), closes [#372](https://github.com/open-sauced/insights/issues/372)

## [1.12.0-beta.3](https://github.com/open-sauced/insights/compare/v1.12.0-beta.2...v1.12.0-beta.3) (2022-10-12)


### 🍕 Features

* implement InsightPageCard component ([#519](https://github.com/open-sauced/insights/issues/519)) ([0dd5057](https://github.com/open-sauced/insights/commit/0dd50576c57cfc6177f0cb71bef3be9c3dea589a)), closes [#509](https://github.com/open-sauced/insights/issues/509)

## [1.12.0-beta.2](https://github.com/open-sauced/insights/compare/v1.12.0-beta.1...v1.12.0-beta.2) (2022-10-10)


### 🍕 Features

* add custom tooltip component to contributors bar chart ([#501](https://github.com/open-sauced/insights/issues/501)) ([855d66b](https://github.com/open-sauced/insights/commit/855d66b2848da85787bd03db6a77442834c64100))

## [1.12.0-beta.1](https://github.com/open-sauced/insights/compare/v1.11.1-beta.1...v1.12.0-beta.1) (2022-10-10)


### 🍕 Features

* add `PullRequestPieChart` component ([#514](https://github.com/open-sauced/insights/issues/514)) ([9132a93](https://github.com/open-sauced/insights/commit/9132a936ca04cda35b19a2b44df56a9b5495a5c2))

### [1.11.1-beta.1](https://github.com/open-sauced/insights/compare/v1.11.0...v1.11.1-beta.1) (2022-10-07)


### 🐛 Bug Fixes

* update pagination counts for repositories and contributors ([#503](https://github.com/open-sauced/insights/issues/503)) ([1332fab](https://github.com/open-sauced/insights/commit/1332fab8742bf832a1978bac95117fa1c0b0fecc))

## [1.11.0](https://github.com/open-sauced/insights/compare/v1.10.0...v1.11.0) (2022-10-06)


### 🍕 Features

*  pull request overview hover with details update ([#495](https://github.com/open-sauced/insights/issues/495)) ([956d109](https://github.com/open-sauced/insights/commit/956d109518362564075a029177265178e7f001fa)), closes [#469](https://github.com/open-sauced/insights/issues/469)
* implement report generation on demand ([#489](https://github.com/open-sauced/insights/issues/489)) ([0879e08](https://github.com/open-sauced/insights/commit/0879e08e2dd3e55ae61e5756519460da95b2f01a)), closes [#486](https://github.com/open-sauced/insights/issues/486)


### 🐛 Bug Fixes

* grammar in PR table ([#494](https://github.com/open-sauced/insights/issues/494)) ([381b033](https://github.com/open-sauced/insights/commit/381b0334a60092dd58253c6ff0b555e4185f1b7b))
* removed duplicate repoList name in contributors card  ([#496](https://github.com/open-sauced/insights/issues/496)) ([24b8174](https://github.com/open-sauced/insights/commit/24b817488c600feac86f6e7dbb8535bcaeaa5f5c)), closes [#463](https://github.com/open-sauced/insights/issues/463)
* update hacktoberfest logo image ([#491](https://github.com/open-sauced/insights/issues/491)) ([f797abc](https://github.com/open-sauced/insights/commit/f797abcde417d0ad6ba557b7220648d63049b79b)), closes [#487](https://github.com/open-sauced/insights/issues/487)
* update logic for calculating unlabeled PRs ([#504](https://github.com/open-sauced/insights/issues/504)) ([416ade4](https://github.com/open-sauced/insights/commit/416ade48d45a002a7ba9acbade5ab49dae9e7d92))

## [1.11.0-beta.2](https://github.com/open-sauced/insights/compare/v1.11.0-beta.1...v1.11.0-beta.2) (2022-10-06)


### 🐛 Bug Fixes

* update logic for calculating unlabeled PRs ([#504](https://github.com/open-sauced/insights/issues/504)) ([416ade4](https://github.com/open-sauced/insights/commit/416ade48d45a002a7ba9acbade5ab49dae9e7d92))

## [1.11.0-beta.1](https://github.com/open-sauced/insights/compare/v1.10.1-beta.3...v1.11.0-beta.1) (2022-10-05)


### 🍕 Features

*  pull request overview hover with details update ([#495](https://github.com/open-sauced/insights/issues/495)) ([956d109](https://github.com/open-sauced/insights/commit/956d109518362564075a029177265178e7f001fa)), closes [#469](https://github.com/open-sauced/insights/issues/469)
* implement report generation on demand ([#489](https://github.com/open-sauced/insights/issues/489)) ([0879e08](https://github.com/open-sauced/insights/commit/0879e08e2dd3e55ae61e5756519460da95b2f01a)), closes [#486](https://github.com/open-sauced/insights/issues/486)

### [1.10.1-beta.3](https://github.com/open-sauced/insights/compare/v1.10.1-beta.2...v1.10.1-beta.3) (2022-10-05)


### 🐛 Bug Fixes

* removed duplicate repoList name in contributors card  ([#496](https://github.com/open-sauced/insights/issues/496)) ([24b8174](https://github.com/open-sauced/insights/commit/24b817488c600feac86f6e7dbb8535bcaeaa5f5c)), closes [#463](https://github.com/open-sauced/insights/issues/463)

### [1.10.1-beta.2](https://github.com/open-sauced/insights/compare/v1.10.1-beta.1...v1.10.1-beta.2) (2022-10-05)


### 🐛 Bug Fixes

* update hacktoberfest logo image ([#491](https://github.com/open-sauced/insights/issues/491)) ([f797abc](https://github.com/open-sauced/insights/commit/f797abcde417d0ad6ba557b7220648d63049b79b)), closes [#487](https://github.com/open-sauced/insights/issues/487)

### [1.10.1-beta.1](https://github.com/open-sauced/insights/compare/v1.10.0...v1.10.1-beta.1) (2022-10-05)


### 🐛 Bug Fixes

* grammar in PR table ([#494](https://github.com/open-sauced/insights/issues/494)) ([381b033](https://github.com/open-sauced/insights/commit/381b0334a60092dd58253c6ff0b555e4185f1b7b))

## [1.10.0](https://github.com/open-sauced/insights/compare/v1.9.0...v1.10.0) (2022-10-05)


### 🍕 Features

* connect dashboard insights to the API ([#485](https://github.com/open-sauced/insights/issues/485)) ([f4e5b6e](https://github.com/open-sauced/insights/commit/f4e5b6e854cf1422a3b3d17272dd659ccbbcaf1c)), closes [#481](https://github.com/open-sauced/insights/issues/481)
* prefetch totals for filter options ([#479](https://github.com/open-sauced/insights/issues/479)) ([a97b09b](https://github.com/open-sauced/insights/commit/a97b09b7f650d79114b0e8fec841087fce73e278)), closes [#471](https://github.com/open-sauced/insights/issues/471)


### 🐛 Bug Fixes

* Click target on filter button icon added ([#483](https://github.com/open-sauced/insights/issues/483)) ([d4aba03](https://github.com/open-sauced/insights/commit/d4aba0379152f394deeb2f26e0bf99679efc7a8c))

## [1.10.0-beta.3](https://github.com/open-sauced/insights/compare/v1.10.0-beta.2...v1.10.0-beta.3) (2022-10-04)


### 🐛 Bug Fixes

* Click target on filter button icon added ([#483](https://github.com/open-sauced/insights/issues/483)) ([d4aba03](https://github.com/open-sauced/insights/commit/d4aba0379152f394deeb2f26e0bf99679efc7a8c))

## [1.10.0-beta.2](https://github.com/open-sauced/insights/compare/v1.10.0-beta.1...v1.10.0-beta.2) (2022-10-04)


### 🍕 Features

* connect dashboard insights to the API ([#485](https://github.com/open-sauced/insights/issues/485)) ([f4e5b6e](https://github.com/open-sauced/insights/commit/f4e5b6e854cf1422a3b3d17272dd659ccbbcaf1c)), closes [#481](https://github.com/open-sauced/insights/issues/481)

## [1.10.0-beta.1](https://github.com/open-sauced/insights/compare/v1.9.0...v1.10.0-beta.1) (2022-10-04)


### 🍕 Features

* prefetch totals for filter options ([#479](https://github.com/open-sauced/insights/issues/479)) ([a97b09b](https://github.com/open-sauced/insights/commit/a97b09b7f650d79114b0e8fec841087fce73e278)), closes [#471](https://github.com/open-sauced/insights/issues/471)

## [1.9.0](https://github.com/open-sauced/insights/compare/v1.8.0...v1.9.0) (2022-10-03)


### 🐛 Bug Fixes

* add truncate to contributors repositories list tab ([#472](https://github.com/open-sauced/insights/issues/472)) ([b7ec96e](https://github.com/open-sauced/insights/commit/b7ec96e9b49aaf7fa54acce14c649f6aa442c3a8)), closes [#460](https://github.com/open-sauced/insights/issues/460)
* fix merged PRs that looks like closed  ([#475](https://github.com/open-sauced/insights/issues/475)) ([1dd820a](https://github.com/open-sauced/insights/commit/1dd820a15cf99f5b3b125bacf18671d7cbdb7f14)), closes [#462](https://github.com/open-sauced/insights/issues/462)
* issue template 👋🏾 ([31b7a7e](https://github.com/open-sauced/insights/commit/31b7a7ed925fca0ef5c165e3bc3d95f6267052de))
* moved page head and footer to repo page to avoid reloading the entire screen ([#473](https://github.com/open-sauced/insights/issues/473)) ([bf790e8](https://github.com/open-sauced/insights/commit/bf790e89951c4a8740538c7e2e223209f4a6e1fd)), closes [#449](https://github.com/open-sauced/insights/issues/449)
* replace churn with overview ([#470](https://github.com/open-sauced/insights/issues/470)) ([fc0fe3f](https://github.com/open-sauced/insights/commit/fc0fe3fbe905670b85beabb63b60e5268ff85fb6)), closes [#469](https://github.com/open-sauced/insights/issues/469)
* SEO descriptions ([980e01d](https://github.com/open-sauced/insights/commit/980e01d6eacb4e33dc40f946b219c4994b356085))


### 🍕 Features

* add filters to hooks for repos and contributions ([#458](https://github.com/open-sauced/insights/issues/458)) ([05e6bbe](https://github.com/open-sauced/insights/commit/05e6bbe535a62084df9f90de3a3b3de7d9170bd5)), closes [#457](https://github.com/open-sauced/insights/issues/457)
* add page title and info to repo and contributors page ([#459](https://github.com/open-sauced/insights/issues/459)) ([c0000e4](https://github.com/open-sauced/insights/commit/c0000e4ca129a2f2b3e30f204fb00463ae646158)), closes [#446](https://github.com/open-sauced/insights/issues/446)
* add pagination to contributors page ([#454](https://github.com/open-sauced/insights/issues/454)) ([37f4da8](https://github.com/open-sauced/insights/commit/37f4da890e986a1e89a19a879d699d638e28e7a5)), closes [#403](https://github.com/open-sauced/insights/issues/403)
* Add swr cache ([#437](https://github.com/open-sauced/insights/issues/437)) ([6b2b1cb](https://github.com/open-sauced/insights/commit/6b2b1cb604ffb46be30a8e63a298a48b9ad36410)), closes [#308](https://github.com/open-sauced/insights/issues/308)
* connect scatter chart to contributors data ([#466](https://github.com/open-sauced/insights/issues/466)) ([be78024](https://github.com/open-sauced/insights/commit/be7802420d5a918ce7d7a80e65f5b742442c00dc)), closes [#465](https://github.com/open-sauced/insights/issues/465)
* hide show/hide buttons temporarily ([#474](https://github.com/open-sauced/insights/issues/474)) ([2ce5b3c](https://github.com/open-sauced/insights/commit/2ce5b3c2888c4eb021754f83c5eeabd23e9d5535)), closes [#439](https://github.com/open-sauced/insights/issues/439)
* Leverage cloudinary for round images ([#467](https://github.com/open-sauced/insights/issues/467)) ([7dc64d8](https://github.com/open-sauced/insights/commit/7dc64d80c9bccdc16d49f81f9c22bfb0b8de901c)), closes [#373](https://github.com/open-sauced/insights/issues/373)
* update filters for repos and contributors ([#464](https://github.com/open-sauced/insights/issues/464)) ([e15bbf8](https://github.com/open-sauced/insights/commit/e15bbf8b76e8f3c1932137f5afee406fdd65ef70)), closes [#461](https://github.com/open-sauced/insights/issues/461)

## [1.8.0](https://github.com/open-sauced/insights/compare/v1.7.0...v1.8.0) (2022-09-28)


### 🍕 Features

* add data from API to contributors page for hacktoberfest ([#431](https://github.com/open-sauced/insights/issues/431)) ([56e12ea](https://github.com/open-sauced/insights/commit/56e12ea18ec8a7983146a4f7a0f6fe13c10f36ca)), closes [#404](https://github.com/open-sauced/insights/issues/404)
* Add truncate string for long pr names ([#440](https://github.com/open-sauced/insights/issues/440)) ([35b8541](https://github.com/open-sauced/insights/commit/35b8541b71bcdd782af096f3332e64d75ea72d56)), closes [#438](https://github.com/open-sauced/insights/issues/438)
* adds initial support for restricting reports by user roles ([#451](https://github.com/open-sauced/insights/issues/451)) ([15a7643](https://github.com/open-sauced/insights/commit/15a764339c2b4cd87ecee8bc61d5c3c84cb9424a)), closes [#395](https://github.com/open-sauced/insights/issues/395)


### 🐛 Bug Fixes

* adds links to footer ([#432](https://github.com/open-sauced/insights/issues/432)) ([7adfbe7](https://github.com/open-sauced/insights/commit/7adfbe72cc602748cad3e546d5e696ae60c101a6))
* inverse the scatter chart ([#433](https://github.com/open-sauced/insights/issues/433)) ([18dd094](https://github.com/open-sauced/insights/commit/18dd09474582269433cf36f29b17277b14ffceb5)), closes [#399](https://github.com/open-sauced/insights/issues/399)
* limit number of languages in contibutor's card ([#441](https://github.com/open-sauced/insights/issues/441)) ([4aba355](https://github.com/open-sauced/insights/commit/4aba355220a0b4f342dddf8f3ad6a0f4adadaa3c)), closes [#402](https://github.com/open-sauced/insights/issues/402)
* remove link from highlight card component ([#435](https://github.com/open-sauced/insights/issues/435)) ([25b6997](https://github.com/open-sauced/insights/commit/25b6997f8dbce1213ddbbaa367df9ebdd28b643e))
* remove remaining mock data for contributors ([#443](https://github.com/open-sauced/insights/issues/443)) ([974c739](https://github.com/open-sauced/insights/commit/974c7395f62c7518c14aaa6e1ab089ec0a5df88f)), closes [#404](https://github.com/open-sauced/insights/issues/404) [#444](https://github.com/open-sauced/insights/issues/444)

## [1.8.0-beta.14](https://github.com/open-sauced/insights/compare/v1.8.0-beta.13...v1.8.0-beta.14) (2022-10-03)


### 🍕 Features

* connect scatter chart to contributors data ([#466](https://github.com/open-sauced/insights/issues/466)) ([be78024](https://github.com/open-sauced/insights/commit/be7802420d5a918ce7d7a80e65f5b742442c00dc)), closes [#465](https://github.com/open-sauced/insights/issues/465)

## [1.8.0-beta.13](https://github.com/open-sauced/insights/compare/v1.8.0-beta.12...v1.8.0-beta.13) (2022-10-02)


### 🐛 Bug Fixes

* moved page head and footer to repo page to avoid reloading the entire screen ([#473](https://github.com/open-sauced/insights/issues/473)) ([bf790e8](https://github.com/open-sauced/insights/commit/bf790e89951c4a8740538c7e2e223209f4a6e1fd)), closes [#449](https://github.com/open-sauced/insights/issues/449)

## [1.8.0-beta.12](https://github.com/open-sauced/insights/compare/v1.8.0-beta.11...v1.8.0-beta.12) (2022-10-02)


### 🐛 Bug Fixes

* add truncate to contributors repositories list tab ([#472](https://github.com/open-sauced/insights/issues/472)) ([b7ec96e](https://github.com/open-sauced/insights/commit/b7ec96e9b49aaf7fa54acce14c649f6aa442c3a8)), closes [#460](https://github.com/open-sauced/insights/issues/460)
* fix merged PRs that looks like closed  ([#475](https://github.com/open-sauced/insights/issues/475)) ([1dd820a](https://github.com/open-sauced/insights/commit/1dd820a15cf99f5b3b125bacf18671d7cbdb7f14)), closes [#462](https://github.com/open-sauced/insights/issues/462)

## [1.8.0-beta.11](https://github.com/open-sauced/insights/compare/v1.8.0-beta.10...v1.8.0-beta.11) (2022-10-02)


### 🍕 Features

* hide show/hide buttons temporarily ([#474](https://github.com/open-sauced/insights/issues/474)) ([2ce5b3c](https://github.com/open-sauced/insights/commit/2ce5b3c2888c4eb021754f83c5eeabd23e9d5535)), closes [#439](https://github.com/open-sauced/insights/issues/439)

## [1.8.0-beta.10](https://github.com/open-sauced/insights/compare/v1.8.0-beta.9...v1.8.0-beta.10) (2022-10-02)


### 🍕 Features

* Leverage cloudinary for round images ([#467](https://github.com/open-sauced/insights/issues/467)) ([7dc64d8](https://github.com/open-sauced/insights/commit/7dc64d80c9bccdc16d49f81f9c22bfb0b8de901c)), closes [#373](https://github.com/open-sauced/insights/issues/373)

## [1.8.0-beta.9](https://github.com/open-sauced/insights/compare/v1.8.0-beta.8...v1.8.0-beta.9) (2022-10-02)


### 🍕 Features

* update filters for repos and contributors ([#464](https://github.com/open-sauced/insights/issues/464)) ([e15bbf8](https://github.com/open-sauced/insights/commit/e15bbf8b76e8f3c1932137f5afee406fdd65ef70)), closes [#461](https://github.com/open-sauced/insights/issues/461)

## [1.8.0-beta.8](https://github.com/open-sauced/insights/compare/v1.8.0-beta.7...v1.8.0-beta.8) (2022-10-02)


### 🐛 Bug Fixes

* replace churn with overview ([#470](https://github.com/open-sauced/insights/issues/470)) ([fc0fe3f](https://github.com/open-sauced/insights/commit/fc0fe3fbe905670b85beabb63b60e5268ff85fb6)), closes [#469](https://github.com/open-sauced/insights/issues/469)

## [1.8.0-beta.7](https://github.com/open-sauced/insights/compare/v1.8.0-beta.6...v1.8.0-beta.7) (2022-09-30)


### 🍕 Features

* add page title and info to repo and contributors page ([#459](https://github.com/open-sauced/insights/issues/459)) ([c0000e4](https://github.com/open-sauced/insights/commit/c0000e4ca129a2f2b3e30f204fb00463ae646158)), closes [#446](https://github.com/open-sauced/insights/issues/446)

## [1.8.0-beta.6](https://github.com/open-sauced/insights/compare/v1.8.0-beta.5...v1.8.0-beta.6) (2022-09-30)


### 🐛 Bug Fixes

* SEO descriptions ([980e01d](https://github.com/open-sauced/insights/commit/980e01d6eacb4e33dc40f946b219c4994b356085))

## [1.8.0-beta.5](https://github.com/open-sauced/insights/compare/v1.8.0-beta.4...v1.8.0-beta.5) (2022-09-30)


### 🍕 Features

* Add swr cache ([#437](https://github.com/open-sauced/insights/issues/437)) ([6b2b1cb](https://github.com/open-sauced/insights/commit/6b2b1cb604ffb46be30a8e63a298a48b9ad36410)), closes [#308](https://github.com/open-sauced/insights/issues/308)

## [1.8.0-beta.4](https://github.com/open-sauced/insights/compare/v1.8.0-beta.3...v1.8.0-beta.4) (2022-09-30)


### 🍕 Features

* add filters to hooks for repos and contributions ([#458](https://github.com/open-sauced/insights/issues/458)) ([05e6bbe](https://github.com/open-sauced/insights/commit/05e6bbe535a62084df9f90de3a3b3de7d9170bd5)), closes [#457](https://github.com/open-sauced/insights/issues/457)

## [1.8.0-beta.3](https://github.com/open-sauced/insights/compare/v1.8.0-beta.2...v1.8.0-beta.3) (2022-09-29)


### 🐛 Bug Fixes

* issue template 👋🏾 ([31b7a7e](https://github.com/open-sauced/insights/commit/31b7a7ed925fca0ef5c165e3bc3d95f6267052de))

## [1.8.0-beta.2](https://github.com/open-sauced/insights/compare/v1.8.0-beta.1...v1.8.0-beta.2) (2022-09-28)


### 🍕 Features

* add pagination to contributors page ([#454](https://github.com/open-sauced/insights/issues/454)) ([37f4da8](https://github.com/open-sauced/insights/commit/37f4da890e986a1e89a19a879d699d638e28e7a5)), closes [#403](https://github.com/open-sauced/insights/issues/403)

## [1.8.0-beta.1](https://github.com/open-sauced/insights/compare/v1.7.0...v1.8.0-beta.1) (2022-09-28)


### 🍕 Features

* add data from API to contributors page for hacktoberfest ([#431](https://github.com/open-sauced/insights/issues/431)) ([56e12ea](https://github.com/open-sauced/insights/commit/56e12ea18ec8a7983146a4f7a0f6fe13c10f36ca)), closes [#404](https://github.com/open-sauced/insights/issues/404)
* Add truncate string for long pr names ([#440](https://github.com/open-sauced/insights/issues/440)) ([35b8541](https://github.com/open-sauced/insights/commit/35b8541b71bcdd782af096f3332e64d75ea72d56)), closes [#438](https://github.com/open-sauced/insights/issues/438)
* adds initial support for restricting reports by user roles ([#451](https://github.com/open-sauced/insights/issues/451)) ([15a7643](https://github.com/open-sauced/insights/commit/15a764339c2b4cd87ecee8bc61d5c3c84cb9424a)), closes [#395](https://github.com/open-sauced/insights/issues/395)


### 🐛 Bug Fixes

* adds links to footer ([#432](https://github.com/open-sauced/insights/issues/432)) ([7adfbe7](https://github.com/open-sauced/insights/commit/7adfbe72cc602748cad3e546d5e696ae60c101a6))
* inverse the scatter chart ([#433](https://github.com/open-sauced/insights/issues/433)) ([18dd094](https://github.com/open-sauced/insights/commit/18dd09474582269433cf36f29b17277b14ffceb5)), closes [#399](https://github.com/open-sauced/insights/issues/399)
* limit number of languages in contibutor's card ([#441](https://github.com/open-sauced/insights/issues/441)) ([4aba355](https://github.com/open-sauced/insights/commit/4aba355220a0b4f342dddf8f3ad6a0f4adadaa3c)), closes [#402](https://github.com/open-sauced/insights/issues/402)
* remove link from highlight card component ([#435](https://github.com/open-sauced/insights/issues/435)) ([25b6997](https://github.com/open-sauced/insights/commit/25b6997f8dbce1213ddbbaa367df9ebdd28b643e))
* remove remaining mock data for contributors ([#443](https://github.com/open-sauced/insights/issues/443)) ([974c739](https://github.com/open-sauced/insights/commit/974c7395f62c7518c14aaa6e1ab089ec0a5df88f)), closes [#404](https://github.com/open-sauced/insights/issues/404) [#444](https://github.com/open-sauced/insights/issues/444)

## [1.7.0-beta.14](https://github.com/open-sauced/insights/compare/v1.7.0-beta.13...v1.7.0-beta.14) (2022-09-28)

### 🐛 Bug Fixes

* limit number of languages in contibutor's card ([#441](https://github.com/open-sauced/insights/issues/441)) ([4aba355](https://github.com/open-sauced/insights/commit/4aba355220a0b4f342dddf8f3ad6a0f4adadaa3c)), closes [#402](https://github.com/open-sauced/insights/issues/402)

## [1.7.0-beta.13](https://github.com/open-sauced/insights/compare/v1.7.0-beta.12...v1.7.0-beta.13) (2022-09-28)

### 🍕 Features

* Add truncate string for long pr names ([#440](https://github.com/open-sauced/insights/issues/440)) ([35b8541](https://github.com/open-sauced/insights/commit/35b8541b71bcdd782af096f3332e64d75ea72d56)), closes [#438](https://github.com/open-sauced/insights/issues/438)

## [1.7.0-beta.12](https://github.com/open-sauced/insights/compare/v1.7.0-beta.11...v1.7.0-beta.12) (2022-09-28)


### 🍕 Features

* adds initial support for restricting reports by user roles ([#451](https://github.com/open-sauced/insights/issues/451)) ([15a7643](https://github.com/open-sauced/insights/commit/15a764339c2b4cd87ecee8bc61d5c3c84cb9424a)), closes [#395](https://github.com/open-sauced/insights/issues/395)

## [1.7.0-beta.11](https://github.com/open-sauced/insights/compare/v1.7.0-beta.10...v1.7.0-beta.11) (2022-09-27)


### 🐛 Bug Fixes

* remove remaining mock data for contributors ([#443](https://github.com/open-sauced/insights/issues/443)) ([974c739](https://github.com/open-sauced/insights/commit/974c7395f62c7518c14aaa6e1ab089ec0a5df88f)), closes [#404](https://github.com/open-sauced/insights/issues/404) [#444](https://github.com/open-sauced/insights/issues/444)

## [1.7.0-beta.10](https://github.com/open-sauced/insights/compare/v1.7.0-beta.9...v1.7.0-beta.10) (2022-09-27)


### 🍕 Features

* add data from API to contributors page for hacktoberfest ([#431](https://github.com/open-sauced/insights/issues/431)) ([56e12ea](https://github.com/open-sauced/insights/commit/56e12ea18ec8a7983146a4f7a0f6fe13c10f36ca)), closes [#404](https://github.com/open-sauced/insights/issues/404)

## [1.7.0-beta.9](https://github.com/open-sauced/insights/compare/v1.7.0-beta.8...v1.7.0-beta.9) (2022-09-26)


### 🐛 Bug Fixes

* remove link from highlight card component ([#435](https://github.com/open-sauced/insights/issues/435)) ([25b6997](https://github.com/open-sauced/insights/commit/25b6997f8dbce1213ddbbaa367df9ebdd28b643e))

## [1.7.0-beta.8](https://github.com/open-sauced/insights/compare/v1.7.0-beta.7...v1.7.0-beta.8) (2022-09-23)


### 🐛 Bug Fixes

* adds links to footer ([#432](https://github.com/open-sauced/insights/issues/432)) ([7adfbe7](https://github.com/open-sauced/insights/commit/7adfbe72cc602748cad3e546d5e696ae60c101a6))
* inverse the scatter chart ([#433](https://github.com/open-sauced/insights/issues/433)) ([18dd094](https://github.com/open-sauced/insights/commit/18dd09474582269433cf36f29b17277b14ffceb5)), closes [#399](https://github.com/open-sauced/insights/issues/399## [1.7.0-beta.7](https://github.com/open-sauced/insights/compare/v1.7.0-beta.6...v1.7.0-beta.7) (2022-09-23)


### 🍕 Features

* create mobile version of repo table ([#409](https://github.com/open-sauced/insights/issues/409)) ([9355968](https://github.com/open-sauced/insights/commit/9355968b04a7b9da66a7962fe1dc1c32640d83ab))


### 🧑‍💻 Code Refactoring

* Update text styles on Scatter Chart card ([#429](https://github.com/open-sauced/insights/issues/429)) ([ab24703](https://github.com/open-sauced/insights/commit/ab24703ddd1d0c5b10448287fd450712e4b93114))

## [1.7.0-beta.6](https://github.com/open-sauced/insights/compare/v1.7.0-beta.5...v1.7.0-beta.6) (2022-09-22)


### 🧑‍💻 Code Refactoring

* Polish the Dashboard to match designs ([#427](https://github.com/open-sauced/insights/issues/427)) ([f919c27](https://github.com/open-sauced/insights/commit/f919c271d4a9e8dc8e826a49eb3b1946bb189bc9))
* Polish the Reports Page to match the design ([#425](https://github.com/open-sauced/insights/issues/425)) ([87a2bdc](https://github.com/open-sauced/insights/commit/87a2bdcbb8b1f5df88f1dd4f380aa6133face049))

## [1.7.0-beta.5](https://github.com/open-sauced/insights/compare/v1.7.0-beta.4...v1.7.0-beta.5) (2022-09-22)


### 🐛 Bug Fixes

* update PR overview calculation to use active PRs in last 30 days / total PRs ([#423](https://github.com/open-sauced/insights/issues/423)) ([05b48ff](https://github.com/open-sauced/insights/commit/05b48ffb4d50a0041060e07d78ab7e5f9eb79471)), closes [#418](https://github.com/open-sauced/insights/issues/418)

## [1.7.0-beta.4](https://github.com/open-sauced/insights/compare/v1.7.0-beta.3...v1.7.0-beta.4) (2022-09-22)


### 🐛 Bug Fixes

* add tooltip message on information icon hover ([#421](https://github.com/open-sauced/insights/issues/421)) ([12ff851](https://github.com/open-sauced/insights/commit/12ff85193d0ab75f61e6e0eda09d3864b2d3ca8f)), closes [#366](https://github.com/open-sauced/insights/issues/366)

## [1.7.0-beta.3](https://github.com/open-sauced/insights/compare/v1.7.0-beta.2...v1.7.0-beta.3) (2022-09-22)


### 🧑‍💻 Code Refactoring

* check avatarURL for orange avatar background and update pill colors ([#424](https://github.com/open-sauced/insights/issues/424)) ([c821cd5](https://github.com/open-sauced/insights/commit/c821cd53243f20255e2f5e7f22ad4fe8e0b55246)), closes [#414](https://github.com/open-sauced/insights/issues/414) [#416](https://github.com/open-sauced/insights/issues/416)

## [1.7.0-beta.2](https://github.com/open-sauced/insights/compare/v1.7.0-beta.1...v1.7.0-beta.2) (2022-09-22)


### 🍕 Features

* add privacy and license terms ([#422](https://github.com/open-sauced/insights/issues/422)) ([0dcc161](https://github.com/open-sauced/insights/commit/0dcc16129c7063dfb0d02e648beefd821f2c7dbb)), closes [#377](https://github.com/open-sauced/insights/issues/377)

## [1.7.0-beta.1](https://github.com/open-sauced/insights/compare/v1.6.1-beta.3...v1.7.0-beta.1) (2022-09-22)


### 🍕 Features

* connect repositories page to API data and pagination ([#405](https://github.com/open-sauced/insights/issues/405)) ([634de8e](https://github.com/open-sauced/insights/commit/634de8ecf5f2eb5ce5967b5eac2b38262b5fc09c)), closes [#320](https://github.com/open-sauced/insights/issues/320) [#384](https://github.com/open-sauced/insights/issues/384)

### [1.6.1-beta.3](https://github.com/open-sauced/insights/compare/v1.6.1-beta.2...v1.6.1-beta.3) (2022-09-22)


### 🎨 Styles

* added hover state style to footer links ([#420](https://github.com/open-sauced/insights/issues/420)) ([3aa5f17](https://github.com/open-sauced/insights/commit/3aa5f1785df89fd7562f41478719835eb83377ee))
* refactor show us button style to match design ([#419](https://github.com/open-sauced/insights/issues/419)) ([b6c21b1](https://github.com/open-sauced/insights/commit/b6c21b153c136ed7d1ae9a2ac243232b71fb7e66)), closes [#408](https://github.com/open-sauced/insights/issues/408)

### [1.6.1-beta.2](https://github.com/open-sauced/insights/compare/v1.6.1-beta.1...v1.6.1-beta.2) (2022-09-21)


### 🎨 Styles

* change text font and icon size to xs(12px) ([#401](https://github.com/open-sauced/insights/issues/401)) ([741288e](https://github.com/open-sauced/insights/commit/741288e19a267e4ddcf5c1afb0fcc0e8308d75eb))

### [1.6.1-beta.1](https://github.com/open-sauced/insights/compare/v1.6.0...v1.6.1-beta.1) (2022-09-19)


### 🐛 Bug Fixes

* adds brandon to top5 ([8bb56cb](https://github.com/open-sauced/insights/commit/8bb56cb72d2d904168f8443b3afe860faa98fc58))
* correct beta branch checking beta gitsense api ([2c6f576](https://github.com/open-sauced/insights/commit/2c6f57641838f5b219ce274b576e496daff2192b))
* redirect from onboarding if already complete with custom hook ([#388](https://github.com/open-sauced/insights/issues/388)) ([8600c76](https://github.com/open-sauced/insights/commit/8600c7648cc0092fa3b51de5e8a26d722e799819)), closes [#387](https://github.com/open-sauced/insights/issues/387)

## [1.6.0](https://github.com/open-sauced/insights/compare/v1.5.0...v1.6.0) (2022-09-16)


### 🧑‍💻 Code Refactoring

* created a new select component ([#346](https://github.com/open-sauced/insights/issues/346)) ([37a836b](https://github.com/open-sauced/insights/commit/37a836b1943d69f20b1b5912e367b3b0d4ec00b9)), closes [#318](https://github.com/open-sauced/insights/issues/318)


### 🐛 Bug Fixes

* Making adjustments to dashboard echart to more closely fit design ([#378](https://github.com/open-sauced/insights/issues/378)) ([f9ebfaf](https://github.com/open-sauced/insights/commit/f9ebfaf0a9f52d61c6b92aaa4c85cf636e5e20ca))
* Replaced stately's logo with freeCodeCamp and replaced name ([#380](https://github.com/open-sauced/insights/issues/380)) ([da45398](https://github.com/open-sauced/insights/commit/da45398af579310b18ca0bebea6155dec3b5c395)), closes [#376](https://github.com/open-sauced/insights/issues/376)
* Resolve 'Show Bots', 'Show Outside Contributors' and repo table mobile responsiveness bug. ([#368](https://github.com/open-sauced/insights/issues/368)) ([0beda90](https://github.com/open-sauced/insights/commit/0beda902bf20830fb4176f80f7c4af250372f8b8))


### 🍕 Features

* Add contributors data from repo to validate designed components ([#314](https://github.com/open-sauced/insights/issues/314)) ([cbccd8e](https://github.com/open-sauced/insights/commit/cbccd8e057ce3b8c809693cc7071a4ba2ff4c5cb))
* add One week data on scatter chart(mobile devices) ([#381](https://github.com/open-sauced/insights/issues/381)) ([04af186](https://github.com/open-sauced/insights/commit/04af186a3bdfb5add6bc2ec0830c30145d7b1061)), closes [#379](https://github.com/open-sauced/insights/issues/379)
* Added the avatars to the dashboard and to the contributors page. ([#371](https://github.com/open-sauced/insights/issues/371)) ([108152d](https://github.com/open-sauced/insights/commit/108152d214c47ee9e1ab20ca9f2c1a4a9434255f))
* Adding social media preview to project. ([#353](https://github.com/open-sauced/insights/issues/353)) ([e652ffc](https://github.com/open-sauced/insights/commit/e652ffca0f9cc7ca44206ffada48a6395861e55a))
* create `<PaginationResult/>` component  ([#360](https://github.com/open-sauced/insights/issues/360)) ([4bfb96d](https://github.com/open-sauced/insights/commit/4bfb96d1a06bc9f5715f18fcf653453b18c783c7)), closes [#325](https://github.com/open-sauced/insights/issues/325)
* Create `<RepositoriesTable>` component ([#364](https://github.com/open-sauced/insights/issues/364)) ([ef93890](https://github.com/open-sauced/insights/commit/ef93890d4517a3bdb082e1387ee45689c385293f)), closes [#321](https://github.com/open-sauced/insights/issues/321) [#326](https://github.com/open-sauced/insights/issues/326) [#327](https://github.com/open-sauced/insights/issues/327)
* create `PaginationGotoPage` component  ([#357](https://github.com/open-sauced/insights/issues/357)) ([f88fa98](https://github.com/open-sauced/insights/commit/f88fa98a9ea862ddb48aadea0fd95a934fd43928)), closes [#324](https://github.com/open-sauced/insights/issues/324)
* Implement `<TableRepositoryName>` component ([#354](https://github.com/open-sauced/insights/issues/354)) ([ede7f61](https://github.com/open-sauced/insights/commit/ede7f61fb7cfe21519fefaf5bddc2c2cee776cec))
* Implement footer component ([#347](https://github.com/open-sauced/insights/issues/347)) ([349a6b8](https://github.com/open-sauced/insights/commit/349a6b8e165d6c36120077d8adaa3426f472d1ff)), closes [#316](https://github.com/open-sauced/insights/issues/316)
* Implement Loading Screen design ([#335](https://github.com/open-sauced/insights/issues/335)) ([a3526dd](https://github.com/open-sauced/insights/commit/a3526dd5b2207fdbaa1481e9d20ba8075f133bf5))
* implement onboarding flow ([#369](https://github.com/open-sauced/insights/issues/369)) ([ef3adee](https://github.com/open-sauced/insights/commit/ef3adeeca0a380e81a0f862f5c390315fa0cec2e)), closes [#116](https://github.com/open-sauced/insights/issues/116)
* Implement the `Pagination` component  ([#343](https://github.com/open-sauced/insights/issues/343)) ([263f463](https://github.com/open-sauced/insights/commit/263f4636164af3a8864030913a5c6b27d67894ad)), closes [#323](https://github.com/open-sauced/insights/issues/323)
* **build:** Install Nivo charts and implement `<Sparkline>` component ([#361](https://github.com/open-sauced/insights/issues/361)) ([d37f0fb](https://github.com/open-sauced/insights/commit/d37f0fb3611687fad18c1319118f506b9c56ce49))

## [1.6.0-beta.14](https://github.com/open-sauced/insights/compare/v1.6.0-beta.13...v1.6.0-beta.14) (2022-09-16)


### 🐛 Bug Fixes

* adds brandon to top5 ([8bb56cb](https://github.com/open-sauced/insights/commit/8bb56cb72d2d904168f8443b3afe860faa98fc58))

## [1.6.0-beta.13](https://github.com/open-sauced/insights/compare/v1.6.0-beta.12...v1.6.0-beta.13) (2022-09-16)


### 🍕 Features

* implement onboarding flow ([#369](https://github.com/open-sauced/insights/issues/369)) ([ef3adee](https://github.com/open-sauced/insights/commit/ef3adeeca0a380e81a0f862f5c390315fa0cec2e)), closes [#116](https://github.com/open-sauced/insights/issues/116)

## [1.6.0-beta.12](https://github.com/open-sauced/insights/compare/v1.6.0-beta.11...v1.6.0-beta.12) (2022-09-16)


### 🐛 Bug Fixes

* Replaced stately's logo with freeCodeCamp and replaced name ([#380](https://github.com/open-sauced/insights/issues/380)) ([da45398](https://github.com/open-sauced/insights/commit/da45398af579310b18ca0bebea6155dec3b5c395)), closes [#376](https://github.com/open-sauced/insights/issues/376)


### 🍕 Features

* add One week data on scatter chart(mobile devices) ([#381](https://github.com/open-sauced/insights/issues/381)) ([04af186](https://github.com/open-sauced/insights/commit/04af186a3bdfb5add6bc2ec0830c30145d7b1061)), closes [#379](https://github.com/open-sauced/insights/issues/379)

## [1.6.0-beta.11](https://github.com/open-sauced/insights/compare/v1.6.0-beta.10...v1.6.0-beta.11) (2022-09-16)


### 🍕 Features

* Create `<RepositoriesTable>` component ([#364](https://github.com/open-sauced/insights/issues/364)) ([ef93890](https://github.com/open-sauced/insights/commit/ef93890d4517a3bdb082e1387ee45689c385293f)), closes [#321](https://github.com/open-sauced/insights/issues/321) [#326](https://github.com/open-sauced/insights/issues/326) [#327](https://github.com/open-sauced/insights/issues/327)


### 🐛 Bug Fixes

* Making adjustments to dashboard echart to more closely fit design ([#378](https://github.com/open-sauced/insights/issues/378)) ([f9ebfaf](https://github.com/open-sauced/insights/commit/f9ebfaf0a9f52d61c6b92aaa4c85cf636e5e20ca))

## [1.6.0-beta.10](https://github.com/open-sauced/insights/compare/v1.6.0-beta.9...v1.6.0-beta.10) (2022-09-15)


### 🍕 Features

* Added the avatars to the dashboard and to the contributors page. ([#371](https://github.com/open-sauced/insights/issues/371)) ([108152d](https://github.com/open-sauced/insights/commit/108152d214c47ee9e1ab20ca9f2c1a4a9434255f))

## [1.6.0-beta.9](https://github.com/open-sauced/insights/compare/v1.6.0-beta.8...v1.6.0-beta.9) (2022-09-15)


### 🍕 Features

* Add contributors data from repo to validate designed components ([#314](https://github.com/open-sauced/insights/issues/314)) ([cbccd8e](https://github.com/open-sauced/insights/commit/cbccd8e057ce3b8c809693cc7071a4ba2ff4c5cb))

## [1.6.0-beta.8](https://github.com/open-sauced/insights/compare/v1.6.0-beta.7...v1.6.0-beta.8) (2022-09-14)


### 🐛 Bug Fixes

* Resolve 'Show Bots', 'Show Outside Contributors' and repo table mobile responsiveness bug. ([#368](https://github.com/open-sauced/insights/issues/368)) ([0beda90](https://github.com/open-sauced/insights/commit/0beda902bf20830fb4176f80f7c4af250372f8b8))

## [1.6.0-beta.7](https://github.com/open-sauced/insights/compare/v1.6.0-beta.6...v1.6.0-beta.7) (2022-09-13)


### 🍕 Features

* Implement Loading Screen design ([#335](https://github.com/open-sauced/insights/issues/335)) ([a3526dd](https://github.com/open-sauced/insights/commit/a3526dd5b2207fdbaa1481e9d20ba8075f133bf5))

## [1.6.0-beta.6](https://github.com/open-sauced/insights/compare/v1.6.0-beta.5...v1.6.0-beta.6) (2022-09-13)


### 🍕 Features

* **build:** Install Nivo charts and implement `<Sparkline>` component ([#361](https://github.com/open-sauced/insights/issues/361)) ([d37f0fb](https://github.com/open-sauced/insights/commit/d37f0fb3611687fad18c1319118f506b9c56ce49))

## [1.6.0-beta.5](https://github.com/open-sauced/insights/compare/v1.6.0-beta.4...v1.6.0-beta.5) (2022-09-13)


### 🍕 Features

* create `<PaginationResult/>` component  ([#360](https://github.com/open-sauced/insights/issues/360)) ([4bfb96d](https://github.com/open-sauced/insights/commit/4bfb96d1a06bc9f5715f18fcf653453b18c783c7)), closes [#325](https://github.com/open-sauced/insights/issues/325)
* Implement the `Pagination` component  ([#343](https://github.com/open-sauced/insights/issues/343)) ([263f463](https://github.com/open-sauced/insights/commit/263f4636164af3a8864030913a5c6b27d67894ad)), closes [#323](https://github.com/open-sauced/insights/issues/323)

## [1.6.0-beta.4](https://github.com/open-sauced/insights/compare/v1.6.0-beta.3...v1.6.0-beta.4) (2022-09-13)


### 🍕 Features

* Implement `<TableRepositoryName>` component ([#354](https://github.com/open-sauced/insights/issues/354)) ([ede7f61](https://github.com/open-sauced/insights/commit/ede7f61fb7cfe21519fefaf5bddc2c2cee776cec))

## [1.6.0-beta.3](https://github.com/open-sauced/insights/compare/v1.6.0-beta.2...v1.6.0-beta.3) (2022-09-13)


### 🍕 Features

* create `PaginationGotoPage` component  ([#357](https://github.com/open-sauced/insights/issues/357)) ([f88fa98](https://github.com/open-sauced/insights/commit/f88fa98a9ea862ddb48aadea0fd95a934fd43928)), closes [#324](https://github.com/open-sauced/insights/issues/324)

## [1.6.0-beta.2](https://github.com/open-sauced/insights/compare/v1.6.0-beta.1...v1.6.0-beta.2) (2022-09-13)


### 🍕 Features

* Implement footer component ([#347](https://github.com/open-sauced/insights/issues/347)) ([349a6b8](https://github.com/open-sauced/insights/commit/349a6b8e165d6c36120077d8adaa3426f472d1ff)), closes [#316](https://github.com/open-sauced/insights/issues/316)

## [1.6.0-beta.1](https://github.com/open-sauced/insights/compare/v1.5.0...v1.6.0-beta.1) (2022-09-13)


### 🍕 Features

* Adding social media preview to project. ([#353](https://github.com/open-sauced/insights/issues/353)) ([e652ffc](https://github.com/open-sauced/insights/commit/e652ffca0f9cc7ca44206ffada48a6395861e55a))


### 🧑‍💻 Code Refactoring

* created a new select component ([#346](https://github.com/open-sauced/insights/issues/346)) ([37a836b](https://github.com/open-sauced/insights/commit/37a836b1943d69f20b1b5912e367b3b0d4ec00b9)), closes [#318](https://github.com/open-sauced/insights/issues/318)

## [1.5.0](https://github.com/open-sauced/insights/compare/v1.4.0...v1.5.0) (2022-09-12)


### 🐛 Bug Fixes

* Changed 'repo/list' endpoint to 'repos/list' ([#307](https://github.com/open-sauced/insights/issues/307)) ([7876f9e](https://github.com/open-sauced/insights/commit/7876f9e5d15f3bc24a78f335ce7ee6e013f4210d))
* Fix the `numOf` style on `ToolsNav` ([#342](https://github.com/open-sauced/insights/issues/342)) ([80e8736](https://github.com/open-sauced/insights/commit/80e8736c07e7a610d184604b04609e0f08f17a9d))
* remove activity ([#304](https://github.com/open-sauced/insights/issues/304)) ([17fcb9a](https://github.com/open-sauced/insights/commit/17fcb9a7aef488336f0a9f05b1041ca51eb96fbc))


### 🧑‍💻 Code Refactoring

* Fix type issue where prop was using a string when it should… ([#349](https://github.com/open-sauced/insights/issues/349)) ([7df6cde](https://github.com/open-sauced/insights/commit/7df6cdec95ccec068ad1006f743519b6df1c5ee6))


### 🍕 Features

* add comma option to humanized number ([#306](https://github.com/open-sauced/insights/issues/306)) ([d093733](https://github.com/open-sauced/insights/commit/d093733430e4704bf3e6ac0fcc46f22867368eff)), closes [#258](https://github.com/open-sauced/insights/issues/258)
* Add posthog analytics to project ([#311](https://github.com/open-sauced/insights/issues/311)) ([50836ba](https://github.com/open-sauced/insights/commit/50836bab1c724bc99323907a572e7ee312248544)), closes [#309](https://github.com/open-sauced/insights/issues/309)
* Implement `<PROverview>` component ([#344](https://github.com/open-sauced/insights/issues/344)) ([762cc54](https://github.com/open-sauced/insights/commit/762cc544840492aab91a93eefc3586003a47f16d))
* Implement `<TableTitle>` component ([#340](https://github.com/open-sauced/insights/issues/340)) ([44361a9](https://github.com/open-sauced/insights/commit/44361a9fdb2b79ebb17e26f07e9827129f49a151))
* Implement `Pill` component ([#341](https://github.com/open-sauced/insights/issues/341)) ([2a4da14](https://github.com/open-sauced/insights/commit/2a4da14fef505dd08ece76ec62d391ca783cea7e))
* Implement `Search` component  ([#337](https://github.com/open-sauced/insights/issues/337)) ([c67b7a1](https://github.com/open-sauced/insights/commit/c67b7a1670d6c895b5c223ede5948d1752e75af0))
* Implement page header component ([#336](https://github.com/open-sauced/insights/issues/336)) ([7894a2d](https://github.com/open-sauced/insights/commit/7894a2df78d0668fd08ad518944c0c6cb0ea80e6)), closes [#317](https://github.com/open-sauced/insights/issues/317)
* Implement Scatter Chart Component ([#285](https://github.com/open-sauced/insights/issues/285)) ([88a2872](https://github.com/open-sauced/insights/commit/88a28721fc7994f321556c3f472e38e2c389dbca)), closes [#160](https://github.com/open-sauced/insights/issues/160)
* Implemented new design for logout pop-up ([#310](https://github.com/open-sauced/insights/issues/310)) ([88a9279](https://github.com/open-sauced/insights/commit/88a9279db6ec4e9b9ac1544c6bb57da013089fd0))

## [1.4.0](https://github.com/open-sauced/insights/compare/v1.3.0...v1.4.0) (2022-09-06)


### 🧑‍💻 Code Refactoring

* Add types to useRepositoriesList hook ([#277](https://github.com/open-sauced/insights/issues/277)) ([4f1a771](https://github.com/open-sauced/insights/commit/4f1a7715b09f28f060ec5b93f0c1208cc1d0b40c))


### 🍕 Features

* Add download CSV funtionality to Reports page ([#286](https://github.com/open-sauced/insights/issues/286)) ([ada79d3](https://github.com/open-sauced/insights/commit/ada79d3ff5ff197e510f78fad959792c2bc522b4))
* **footer:** swap out footer text ([#296](https://github.com/open-sauced/insights/issues/296)) ([737df5b](https://github.com/open-sauced/insights/commit/737df5bb63cd09130fbf9815252f4ab3938999ad))
* Update Scatter Chart Legend ([#260](https://github.com/open-sauced/insights/issues/260)) ([309ef62](https://github.com/open-sauced/insights/commit/309ef62a14b8d78866b6cc26af919c7d9d16d3f1))


### 🐛 Bug Fixes

* Add background to selectable tr table ([#252](https://github.com/open-sauced/insights/issues/252)) ([7d6ae16](https://github.com/open-sauced/insights/commit/7d6ae164e2ddf9e4e0a21b486e61b1e4418bbc62)), closes [#183](https://github.com/open-sauced/insights/issues/183) [#289](https://github.com/open-sauced/insights/issues/289)
* Contributor card overlap on smaller devices ([#298](https://github.com/open-sauced/insights/issues/298)) ([777f6ba](https://github.com/open-sauced/insights/commit/777f6ba4f3d9f0d29f8d47c2a73c7941edde4867)), closes [#290](https://github.com/open-sauced/insights/issues/290)
* correct netlify build supabase redirect url ([#283](https://github.com/open-sauced/insights/issues/283)) ([0b2b80a](https://github.com/open-sauced/insights/commit/0b2b80a155bd1af6497a1ca84916e2513dd58581))
* Filter dropdown can only be closed by clicking on the filter button ([#299](https://github.com/open-sauced/insights/issues/299)) ([bce1f8e](https://github.com/open-sauced/insights/commit/bce1f8e2933fadb647c6f4f687b306bdbe24e9ae)), closes [#292](https://github.com/open-sauced/insights/issues/292)
* Fixing issues with TopNav and Highlight Card ([#294](https://github.com/open-sauced/insights/issues/294)) ([218f30d](https://github.com/open-sauced/insights/commit/218f30d98c4b077db2c666ab145f8f2c269f14e0)), closes [#287](https://github.com/open-sauced/insights/issues/287) [#291](https://github.com/open-sauced/insights/issues/291)
* grammar for header description ([#279](https://github.com/open-sauced/insights/issues/279)) ([a019912](https://github.com/open-sauced/insights/commit/a0199125d1c8cff4af514f2fb80fd90c19cb10dc))

## [1.4.0-beta.17](https://github.com/open-sauced/insights/compare/v1.4.0-beta.16...v1.4.0-beta.17) (2022-09-12)


### 🍕 Features

* Add posthog analytics to project ([#311](https://github.com/open-sauced/insights/issues/311)) ([50836ba](https://github.com/open-sauced/insights/commit/50836bab1c724bc99323907a572e7ee312248544)), closes [#309](https://github.com/open-sauced/insights/issues/309)

## [1.4.0-beta.16](https://github.com/open-sauced/insights/compare/v1.4.0-beta.15...v1.4.0-beta.16) (2022-09-11)


### 🍕 Features

* Implement `<PROverview>` component ([#344](https://github.com/open-sauced/insights/issues/344)) ([762cc54](https://github.com/open-sauced/insights/commit/762cc544840492aab91a93eefc3586003a47f16d))


### 🐛 Bug Fixes

* Fix the `numOf` style on `ToolsNav` ([#342](https://github.com/open-sauced/insights/issues/342)) ([80e8736](https://github.com/open-sauced/insights/commit/80e8736c07e7a610d184604b04609e0f08f17a9d))


### 🧑‍💻 Code Refactoring

* Fix type issue where prop was using a string when it should… ([#349](https://github.com/open-sauced/insights/issues/349)) ([7df6cde](https://github.com/open-sauced/insights/commit/7df6cdec95ccec068ad1006f743519b6df1c5ee6))

## [1.4.0-beta.15](https://github.com/open-sauced/insights/compare/v1.4.0-beta.14...v1.4.0-beta.15) (2022-09-10)


### 🍕 Features

* Implement `<TableTitle>` component ([#340](https://github.com/open-sauced/insights/issues/340)) ([44361a9](https://github.com/open-sauced/insights/commit/44361a9fdb2b79ebb17e26f07e9827129f49a151))

## [1.4.0-beta.14](https://github.com/open-sauced/insights/compare/v1.4.0-beta.13...v1.4.0-beta.14) (2022-09-10)


### 🍕 Features

* Implement `Search` component  ([#337](https://github.com/open-sauced/insights/issues/337)) ([c67b7a1](https://github.com/open-sauced/insights/commit/c67b7a1670d6c895b5c223ede5948d1752e75af0))

## [1.4.0-beta.13](https://github.com/open-sauced/insights/compare/v1.4.0-beta.12...v1.4.0-beta.13) (2022-09-10)


### 🍕 Features

* Implement `Pill` component ([#341](https://github.com/open-sauced/insights/issues/341)) ([2a4da14](https://github.com/open-sauced/insights/commit/2a4da14fef505dd08ece76ec62d391ca783cea7e))

## [1.4.0-beta.12](https://github.com/open-sauced/insights/compare/v1.4.0-beta.11...v1.4.0-beta.12) (2022-09-09)


### 🍕 Features

* add comma option to humanized number ([#306](https://github.com/open-sauced/insights/issues/306)) ([d093733](https://github.com/open-sauced/insights/commit/d093733430e4704bf3e6ac0fcc46f22867368eff)), closes [#258](https://github.com/open-sauced/insights/issues/258)
* Implement page header component ([#336](https://github.com/open-sauced/insights/issues/336)) ([7894a2d](https://github.com/open-sauced/insights/commit/7894a2df78d0668fd08ad518944c0c6cb0ea80e6)), closes [#317](https://github.com/open-sauced/insights/issues/317)

## [1.4.0-beta.11](https://github.com/open-sauced/insights/compare/v1.4.0-beta.10...v1.4.0-beta.11) (2022-09-08)


### 🍕 Features

* Implemented new design for logout pop-up ([#310](https://github.com/open-sauced/insights/issues/310)) ([88a9279](https://github.com/open-sauced/insights/commit/88a9279db6ec4e9b9ac1544c6bb57da013089fd0))

## [1.4.0-beta.10](https://github.com/open-sauced/insights/compare/v1.4.0-beta.9...v1.4.0-beta.10) (2022-09-07)


### 🍕 Features

* Implement Scatter Chart Component ([#285](https://github.com/open-sauced/insights/issues/285)) ([88a2872](https://github.com/open-sauced/insights/commit/88a28721fc7994f321556c3f472e38e2c389dbca)), closes [#160](https://github.com/open-sauced/insights/issues/160)

## [1.4.0-beta.9](https://github.com/open-sauced/insights/compare/v1.4.0-beta.8...v1.4.0-beta.9) (2022-09-07)


### 🐛 Bug Fixes

* Changed 'repo/list' endpoint to 'repos/list' ([#307](https://github.com/open-sauced/insights/issues/307)) ([7876f9e](https://github.com/open-sauced/insights/commit/7876f9e5d15f3bc24a78f335ce7ee6e013f4210d))

## [1.4.0-beta.8](https://github.com/open-sauced/insights/compare/v1.4.0-beta.7...v1.4.0-beta.8) (2022-09-06)


### 🐛 Bug Fixes

* remove activity ([#304](https://github.com/open-sauced/insights/issues/304)) ([17fcb9a](https://github.com/open-sauced/insights/commit/17fcb9a7aef488336f0a9f05b1041ca51eb96fbc))

## [1.4.0-beta.7](https://github.com/open-sauced/insights/compare/v1.4.0-beta.6...v1.4.0-beta.7) (2022-09-06)


### 🐛 Bug Fixes

* Filter dropdown can only be closed by clicking on the filter button ([#299](https://github.com/open-sauced/insights/issues/299)) ([bce1f8e](https://github.com/open-sauced/insights/commit/bce1f8e2933fadb647c6f4f687b306bdbe24e9ae)), closes [#292](https://github.com/open-sauced/insights/issues/292)

## [1.4.0-beta.6](https://github.com/open-sauced/insights/compare/v1.4.0-beta.5...v1.4.0-beta.6) (2022-09-06)


### 🐛 Bug Fixes

* Add background to selectable tr table ([#252](https://github.com/open-sauced/insights/issues/252)) ([7d6ae16](https://github.com/open-sauced/insights/commit/7d6ae164e2ddf9e4e0a21b486e61b1e4418bbc62)), closes [#183](https://github.com/open-sauced/insights/issues/183) [#289](https://github.com/open-sauced/insights/issues/289)
* Contributor card overlap on smaller devices ([#298](https://github.com/open-sauced/insights/issues/298)) ([777f6ba](https://github.com/open-sauced/insights/commit/777f6ba4f3d9f0d29f8d47c2a73c7941edde4867)), closes [#290](https://github.com/open-sauced/insights/issues/290)

## [1.4.0-beta.5](https://github.com/open-sauced/insights/compare/v1.4.0-beta.4...v1.4.0-beta.5) (2022-09-05)


### 🐛 Bug Fixes

* Fixing issues with TopNav and Highlight Card ([#294](https://github.com/open-sauced/insights/issues/294)) ([218f30d](https://github.com/open-sauced/insights/commit/218f30d98c4b077db2c666ab145f8f2c269f14e0)), closes [#287](https://github.com/open-sauced/insights/issues/287) [#291](https://github.com/open-sauced/insights/issues/291)

## [1.4.0-beta.4](https://github.com/open-sauced/insights/compare/v1.4.0-beta.3...v1.4.0-beta.4) (2022-09-05)


### 🍕 Features

* **footer:** swap out footer text ([#296](https://github.com/open-sauced/insights/issues/296)) ([737df5b](https://github.com/open-sauced/insights/commit/737df5bb63cd09130fbf9815252f4ab3938999ad))

## [1.4.0-beta.3](https://github.com/open-sauced/insights/compare/v1.4.0-beta.2...v1.4.0-beta.3) (2022-09-03)


### 🍕 Features

* Add download CSV funtionality to Reports page ([#286](https://github.com/open-sauced/insights/issues/286)) ([ada79d3](https://github.com/open-sauced/insights/commit/ada79d3ff5ff197e510f78fad959792c2bc522b4))

## [1.4.0-beta.2](https://github.com/open-sauced/insights/compare/v1.4.0-beta.1...v1.4.0-beta.2) (2022-09-02)


### 🧑‍💻 Code Refactoring

* Add types to useRepositoriesList hook ([#277](https://github.com/open-sauced/insights/issues/277)) ([4f1a771](https://github.com/open-sauced/insights/commit/4f1a7715b09f28f060ec5b93f0c1208cc1d0b40c))

## [1.4.0-beta.1](https://github.com/open-sauced/insights/compare/v1.3.1-beta.2...v1.4.0-beta.1) (2022-08-31)


### 🍕 Features

* Update Scatter Chart Legend ([#260](https://github.com/open-sauced/insights/issues/260)) ([309ef62](https://github.com/open-sauced/insights/commit/309ef62a14b8d78866b6cc26af919c7d9d16d3f1))

### [1.3.1-beta.2](https://github.com/open-sauced/insights/compare/v1.3.1-beta.1...v1.3.1-beta.2) (2022-08-31)


### 🐛 Bug Fixes

* correct netlify build supabase redirect url ([#283](https://github.com/open-sauced/insights/issues/283)) ([0b2b80a](https://github.com/open-sauced/insights/commit/0b2b80a155bd1af6497a1ca84916e2513dd58581))

### [1.3.1-beta.1](https://github.com/open-sauced/insights/compare/v1.3.0...v1.3.1-beta.1) (2022-08-30)


### 🐛 Bug Fixes

* grammar for header description ([#279](https://github.com/open-sauced/insights/issues/279)) ([a019912](https://github.com/open-sauced/insights/commit/a0199125d1c8cff4af514f2fb80fd90c19cb10dc))

## [1.3.0](https://github.com/open-sauced/insights/compare/v1.2.3...v1.3.0) (2022-08-29)


### 🧑‍💻 Code Refactoring

* Improve the `<ComponentCard>` CSS ([#266](https://github.com/open-sauced/insights/issues/266)) ([9da4d62](https://github.com/open-sauced/insights/commit/9da4d62680cd010c03834193e6df026bf6046509))
* Make the avatar component accept custom sizes ([#255](https://github.com/open-sauced/insights/issues/255)) ([9076e91](https://github.com/open-sauced/insights/commit/9076e914cf60ffff351acd1968446cc85ab087a9)), closes [#235](https://github.com/open-sauced/insights/issues/235)


### 🍕 Features

* Add Images to Scatter Chart ([#257](https://github.com/open-sauced/insights/issues/257)) ([20df419](https://github.com/open-sauced/insights/commit/20df419e8f32ccfa8c26982033a22fa8d6058cfc))
* Add item count meta data to Highlight Card ([#254](https://github.com/open-sauced/insights/issues/254)) ([693479e](https://github.com/open-sauced/insights/commit/693479e253a1856405b57817fb2ae3d8574fdedf))
* Added Reports History component to Reports Page ([#272](https://github.com/open-sauced/insights/issues/272)) ([c6a56f6](https://github.com/open-sauced/insights/commit/c6a56f6b66df43fd731ce23d91674734a65f3003))
* Implement Card Horizontal Bar component ([#237](https://github.com/open-sauced/insights/issues/237)) ([7bbbe40](https://github.com/open-sauced/insights/commit/7bbbe405fc4ceefd2396aeb536d485337bd2157d))
* Implement Card Table Component ([#243](https://github.com/open-sauced/insights/issues/243)) ([0cbc6ea](https://github.com/open-sauced/insights/commit/0cbc6ea13cbe2e66d8e57d62ef7e030fef17a54b))
* Implement contribution page ([#263](https://github.com/open-sauced/insights/issues/263)) ([f41d7f9](https://github.com/open-sauced/insights/commit/f41d7f9a7f6efa7b123448d1b61253f3efcaf803))
* Implement Contributor Card Component ([#245](https://github.com/open-sauced/insights/issues/245)) ([3bd55ea](https://github.com/open-sauced/insights/commit/3bd55ea461a63b00c1f99b0408e328326c1cc3d7))
* Implement Reports History Component ([#209](https://github.com/open-sauced/insights/issues/209)) ([bb531e4](https://github.com/open-sauced/insights/commit/bb531e4a74e09d686e5679bdf65b2890e015c91a))
* Implement the hacktoberfest reports page ([#229](https://github.com/open-sauced/insights/issues/229)) ([0cfa5e5](https://github.com/open-sauced/insights/commit/0cfa5e5f3d23b0eedc681a1fc93af96d65105cd8)), closes [#168](https://github.com/open-sauced/insights/issues/168)
* Implement waitlist page ([#210](https://github.com/open-sauced/insights/issues/210)) ([0826d07](https://github.com/open-sauced/insights/commit/0826d0790f3fda3815880f16877aab07458dc563)), closes [#152](https://github.com/open-sauced/insights/issues/152)


### 🐛 Bug Fixes

* adjusted opinion filter on mobile screens ([#264](https://github.com/open-sauced/insights/issues/264)) ([2d9785c](https://github.com/open-sauced/insights/commit/2d9785ccbbbaabdd88fe59f97663a5a35569ec3b))
* correct login redirect issues in supabase implemetation ([#274](https://github.com/open-sauced/insights/issues/274)) ([8fcd81e](https://github.com/open-sauced/insights/commit/8fcd81edf65ad7454ca1bba619b0880533ab6693))
* correct login redirect issues in supabase implemetation x2 ([#275](https://github.com/open-sauced/insights/issues/275)) ([0239abd](https://github.com/open-sauced/insights/commit/0239abdb8aac2248d690eaa6c6da30129281137d))
* correct supabase-ui default style for hover ([#267](https://github.com/open-sauced/insights/issues/267)) ([a23fe4b](https://github.com/open-sauced/insights/commit/a23fe4b5887b5fecd9a2f4a3ec53758b8e0e9232)), closes [#226](https://github.com/open-sauced/insights/issues/226)
* increase truncate string number of words ([#268](https://github.com/open-sauced/insights/issues/268)) ([ab47a96](https://github.com/open-sauced/insights/commit/ab47a96a1d5ca7dde333da814f07cc96b39f26c7)), closes [#247](https://github.com/open-sauced/insights/issues/247)
* max width removed from card ([#250](https://github.com/open-sauced/insights/issues/250)) ([523969a](https://github.com/open-sauced/insights/commit/523969a32a1b09b28c7ad8f765b61c8e771a3fdd)), closes [#249](https://github.com/open-sauced/insights/issues/249)
* removes unused function ([b37de35](https://github.com/open-sauced/insights/commit/b37de35af44d98d4346e0cc9c7437292c814ba3e))
* Repo count ([#244](https://github.com/open-sauced/insights/issues/244)) ([d59eef8](https://github.com/open-sauced/insights/commit/d59eef837004f05fdf3df0ed52b755cce0bfc96d))
* Update GitSense API route for repos ([#270](https://github.com/open-sauced/insights/issues/270)) ([8f7e1c5](https://github.com/open-sauced/insights/commit/8f7e1c5c03a92c8a7d38f394229a8b1c9f44c756))

## [1.3.0-beta.18](https://github.com/open-sauced/insights/compare/v1.3.0-beta.17...v1.3.0-beta.18) (2022-08-28)


### 🐛 Bug Fixes

* correct login redirect issues in supabase implemetation x2 ([#275](https://github.com/open-sauced/insights/issues/275)) ([0239abd](https://github.com/open-sauced/insights/commit/0239abdb8aac2248d690eaa6c6da30129281137d))

## [1.3.0-beta.17](https://github.com/open-sauced/insights/compare/v1.3.0-beta.16...v1.3.0-beta.17) (2022-08-26)


### 🐛 Bug Fixes

* correct login redirect issues in supabase implemetation ([#274](https://github.com/open-sauced/insights/issues/274)) ([8fcd81e](https://github.com/open-sauced/insights/commit/8fcd81edf65ad7454ca1bba619b0880533ab6693))

## [1.3.0-beta.16](https://github.com/open-sauced/insights/compare/v1.3.0-beta.15...v1.3.0-beta.16) (2022-08-26)


### 🍕 Features

* Added Reports History component to Reports Page ([#272](https://github.com/open-sauced/insights/issues/272)) ([c6a56f6](https://github.com/open-sauced/insights/commit/c6a56f6b66df43fd731ce23d91674734a65f3003))

## [1.3.0-beta.15](https://github.com/open-sauced/insights/compare/v1.3.0-beta.14...v1.3.0-beta.15) (2022-08-26)


### 🍕 Features

* Implement waitlist page ([#210](https://github.com/open-sauced/insights/issues/210)) ([0826d07](https://github.com/open-sauced/insights/commit/0826d0790f3fda3815880f16877aab07458dc563)), closes [#152](https://github.com/open-sauced/insights/issues/152)

## [1.3.0-beta.14](https://github.com/open-sauced/insights/compare/v1.3.0-beta.13...v1.3.0-beta.14) (2022-08-26)


### 🐛 Bug Fixes

* correct supabase-ui default style for hover ([#267](https://github.com/open-sauced/insights/issues/267)) ([a23fe4b](https://github.com/open-sauced/insights/commit/a23fe4b5887b5fecd9a2f4a3ec53758b8e0e9232)), closes [#226](https://github.com/open-sauced/insights/issues/226)
* increase truncate string number of words ([#268](https://github.com/open-sauced/insights/issues/268)) ([ab47a96](https://github.com/open-sauced/insights/commit/ab47a96a1d5ca7dde333da814f07cc96b39f26c7)), closes [#247](https://github.com/open-sauced/insights/issues/247)

## [1.3.0-beta.13](https://github.com/open-sauced/insights/compare/v1.3.0-beta.12...v1.3.0-beta.13) (2022-08-26)


### 🔥 Performance Improvements

* add backwards compatible issue templates ([#262](https://github.com/open-sauced/insights/issues/262)) ([af21ab5](https://github.com/open-sauced/insights/commit/af21ab587f008d96c935d8f331a0f2f7b2c423b7))


### 🐛 Bug Fixes

* correct feature request issue template for good ([6410fd2](https://github.com/open-sauced/insights/commit/6410fd236e9ee60f0237e2955634cacd345f2f52))
* correct issue template labelling ([3ce5039](https://github.com/open-sauced/insights/commit/3ce5039fcee2dba8afb682195ad866369de983d2))
* Update GitSense API route for repos ([#270](https://github.com/open-sauced/insights/issues/270)) ([8f7e1c5](https://github.com/open-sauced/insights/commit/8f7e1c5c03a92c8a7d38f394229a8b1c9f44c756))

### [1.2.3](https://github.com/open-sauced/insights/compare/v1.2.2...v1.2.3) (2022-08-24)


### 🐛 Bug Fixes

* correct feature request issue template for good ([6410fd2](https://github.com/open-sauced/insights/commit/6410fd236e9ee60f0237e2955634cacd345f2f52))

### [1.2.2](https://github.com/open-sauced/insights/compare/v1.2.1...v1.2.2) (2022-08-24)


### 🐛 Bug Fixes

* correct issue template labelling ([3ce5039](https://github.com/open-sauced/insights/commit/3ce5039fcee2dba8afb682195ad866369de983d2))

### [1.2.1](https://github.com/open-sauced/insights/compare/v1.2.0...v1.2.1) (2022-08-24)


### 🔥 Performance Improvements

* add backwards compatible issue templates ([#262](https://github.com/open-sauced/insights/issues/262)) ([af21ab5](https://github.com/open-sauced/insights/commit/af21ab587f008d96c935d8f331a0f2f7b2c423b7))

## [1.3.0-beta.12](https://github.com/open-sauced/insights/compare/v1.3.0-beta.11...v1.3.0-beta.12) (2022-08-25)


### 🧑‍💻 Code Refactoring

* Improve the `<ComponentCard>` CSS ([#266](https://github.com/open-sauced/insights/issues/266)) ([9da4d62](https://github.com/open-sauced/insights/commit/9da4d62680cd010c03834193e6df026bf6046509))

## [1.3.0-beta.11](https://github.com/open-sauced/insights/compare/v1.3.0-beta.10...v1.3.0-beta.11) (2022-08-25)


### 🐛 Bug Fixes

* adjusted opinion filter on mobile screens ([#264](https://github.com/open-sauced/insights/issues/264)) ([2d9785c](https://github.com/open-sauced/insights/commit/2d9785ccbbbaabdd88fe59f97663a5a35569ec3b))


### 🍕 Features

* Implement contribution page ([#263](https://github.com/open-sauced/insights/issues/263)) ([f41d7f9](https://github.com/open-sauced/insights/commit/f41d7f9a7f6efa7b123448d1b61253f3efcaf803))

## [1.3.0-beta.10](https://github.com/open-sauced/insights/compare/v1.3.0-beta.9...v1.3.0-beta.10) (2022-08-24)


### 🍕 Features

* Implement Contributor Card Component ([#245](https://github.com/open-sauced/insights/issues/245)) ([3bd55ea](https://github.com/open-sauced/insights/commit/3bd55ea461a63b00c1f99b0408e328326c1cc3d7))

## [1.3.0-beta.9](https://github.com/open-sauced/insights/compare/v1.3.0-beta.8...v1.3.0-beta.9) (2022-08-23)


### 🧑‍💻 Code Refactoring

* Make the avatar component accept custom sizes ([#255](https://github.com/open-sauced/insights/issues/255)) ([9076e91](https://github.com/open-sauced/insights/commit/9076e914cf60ffff351acd1968446cc85ab087a9)), closes [#235](https://github.com/open-sauced/insights/issues/235)

## [1.3.0-beta.8](https://github.com/open-sauced/insights/compare/v1.3.0-beta.7...v1.3.0-beta.8) (2022-08-23)


### 🍕 Features

* Implement Card Table Component ([#243](https://github.com/open-sauced/insights/issues/243)) ([0cbc6ea](https://github.com/open-sauced/insights/commit/0cbc6ea13cbe2e66d8e57d62ef7e030fef17a54b))

## [1.3.0-beta.7](https://github.com/open-sauced/insights/compare/v1.3.0-beta.6...v1.3.0-beta.7) (2022-08-23)


### 🍕 Features

* Add Images to Scatter Chart ([#257](https://github.com/open-sauced/insights/issues/257)) ([20df419](https://github.com/open-sauced/insights/commit/20df419e8f32ccfa8c26982033a22fa8d6058cfc))
* Add item count meta data to Highlight Card ([#254](https://github.com/open-sauced/insights/issues/254)) ([693479e](https://github.com/open-sauced/insights/commit/693479e253a1856405b57817fb2ae3d8574fdedf))

## [1.3.0-beta.6](https://github.com/open-sauced/insights/compare/v1.3.0-beta.5...v1.3.0-beta.6) (2022-08-22)


### 🍕 Features

* Implement Card Horizontal Bar component ([#237](https://github.com/open-sauced/insights/issues/237)) ([7bbbe40](https://github.com/open-sauced/insights/commit/7bbbe405fc4ceefd2396aeb536d485337bd2157d))

## [1.3.0-beta.5](https://github.com/open-sauced/insights/compare/v1.3.0-beta.4...v1.3.0-beta.5) (2022-08-22)


### 🐛 Bug Fixes

* max width removed from card ([#250](https://github.com/open-sauced/insights/issues/250)) ([523969a](https://github.com/open-sauced/insights/commit/523969a32a1b09b28c7ad8f765b61c8e771a3fdd)), closes [#249](https://github.com/open-sauced/insights/issues/249)

## [1.3.0-beta.4](https://github.com/open-sauced/insights/compare/v1.3.0-beta.3...v1.3.0-beta.4) (2022-08-22)


### 🐛 Bug Fixes

* removes unused function ([b37de35](https://github.com/open-sauced/insights/commit/b37de35af44d98d4346e0cc9c7437292c814ba3e))

## [1.3.0-beta.3](https://github.com/open-sauced/insights/compare/v1.3.0-beta.2...v1.3.0-beta.3) (2022-08-21)


### 🍕 Features

* Implement the hacktoberfest reports page ([#229](https://github.com/open-sauced/insights/issues/229)) ([0cfa5e5](https://github.com/open-sauced/insights/commit/0cfa5e5f3d23b0eedc681a1fc93af96d65105cd8)), closes [#168](https://github.com/open-sauced/insights/issues/168)

## [1.3.0-beta.2](https://github.com/open-sauced/insights/compare/v1.3.0-beta.1...v1.3.0-beta.2) (2022-08-21)


### 🐛 Bug Fixes

* Repo count ([#244](https://github.com/open-sauced/insights/issues/244)) ([d59eef8](https://github.com/open-sauced/insights/commit/d59eef837004f05fdf3df0ed52b755cce0bfc96d))

## [1.3.0-beta.1](https://github.com/open-sauced/insights/compare/v1.2.0...v1.3.0-beta.1) (2022-08-20)


### 🍕 Features

* Implement Reports History Component ([#209](https://github.com/open-sauced/insights/issues/209)) ([bb531e4](https://github.com/open-sauced/insights/commit/bb531e4a74e09d686e5679bdf65b2890e015c91a))

## [1.2.0](https://github.com/open-sauced/insights/compare/v1.1.3...v1.2.0) (2022-08-20)


### 🍕 Features

* **data:** adds live repo data and SWR ([#198](https://github.com/open-sauced/insights/issues/198)) ([b6d80c3](https://github.com/open-sauced/insights/commit/b6d80c3ac584fe1aa7a8d2b399194c7ec514c7f9)), closes [#191](https://github.com/open-sauced/insights/issues/191) [#191](https://github.com/open-sauced/insights/issues/191) [#206](https://github.com/open-sauced/insights/issues/206) [#206](https://github.com/open-sauced/insights/issues/206)
* Create Reports Filter Component ([#207](https://github.com/open-sauced/insights/issues/207)) ([efced23](https://github.com/open-sauced/insights/commit/efced2319433532e9ff124291dc64467da99abd8)), closes [#166](https://github.com/open-sauced/insights/issues/166)
* eChart for Contributors Component ([#216](https://github.com/open-sauced/insights/issues/216)) ([7d5837b](https://github.com/open-sauced/insights/commit/7d5837bef9cd1239793d77bb9562938bcdf608eb)), closes [#221](https://github.com/open-sauced/insights/issues/221) [#213](https://github.com/open-sauced/insights/issues/213) [#221](https://github.com/open-sauced/insights/issues/221)
* Implement Card Profile Component ([#232](https://github.com/open-sauced/insights/issues/232)) ([efae3c5](https://github.com/open-sauced/insights/commit/efae3c53fbd9b67ddbb2abd506fa43803581c7c6))
* Implement Card Repo List component ([#234](https://github.com/open-sauced/insights/issues/234)) ([4a58eea](https://github.com/open-sauced/insights/commit/4a58eea43cbab731b7813c3f674df40880fb85b8))


### 🧑‍💻 Code Refactoring

* Add another version of the logo in the design system ([#236](https://github.com/open-sauced/insights/issues/236)) ([f25b3a5](https://github.com/open-sauced/insights/commit/f25b3a5909df94c7c005f3278390196218b535e5))
* Move Dashboard and Repositories into their own component ([#228](https://github.com/open-sauced/insights/issues/228)) ([8b40fd8](https://github.com/open-sauced/insights/commit/8b40fd87e40a58b22ff01920f2cf363b065ddb10)), closes [#208](https://github.com/open-sauced/insights/issues/208) [#201](https://github.com/open-sauced/insights/issues/201) [#202](https://github.com/open-sauced/insights/issues/202)
* replace context-filter-option with radio component ([41ed2b3](https://github.com/open-sauced/insights/commit/41ed2b3c51ac35e9aec7bd48c9c9393ccb811c8c))


### 🐛 Bug Fixes

* **bug:** add require props ([#239](https://github.com/open-sauced/insights/issues/239)) ([b9f0942](https://github.com/open-sauced/insights/commit/b9f094258233944ee82a72067fb97a110a93efef))
* added Radio and SuperlativeSelector component stories ([06d956c](https://github.com/open-sauced/insights/commit/06d956c9ab6c3ada912f25999ad81c78d0f69c5e))
* eslint errors ([c191e26](https://github.com/open-sauced/insights/commit/c191e266bf12e552af7d84fe768aaf56fb9c8e0f))
* Removed gap from navbar and tools display ([#206](https://github.com/open-sauced/insights/issues/206)) ([a3de620](https://github.com/open-sauced/insights/commit/a3de6201b8a260a271ae871e785c2671d4e6d5ba))

## [1.2.0-beta.5](https://github.com/open-sauced/insights/compare/v1.2.0-beta.4...v1.2.0-beta.5) (2022-08-19)


### 🧑‍💻 Code Refactoring

* Add another version of the logo in the design system ([#236](https://github.com/open-sauced/insights/issues/236)) ([f25b3a5](https://github.com/open-sauced/insights/commit/f25b3a5909df94c7c005f3278390196218b535e5))


### 🐛 Bug Fixes

* **bug:** add require props ([#239](https://github.com/open-sauced/insights/issues/239)) ([b9f0942](https://github.com/open-sauced/insights/commit/b9f094258233944ee82a72067fb97a110a93efef))

## [1.2.0-beta.4](https://github.com/open-sauced/insights/compare/v1.2.0-beta.3...v1.2.0-beta.4) (2022-08-19)


### 🍕 Features

* Implement Card Repo List component ([#234](https://github.com/open-sauced/insights/issues/234)) ([4a58eea](https://github.com/open-sauced/insights/commit/4a58eea43cbab731b7813c3f674df40880fb85b8))

## [1.2.0-beta.3](https://github.com/open-sauced/insights/compare/v1.2.0-beta.2...v1.2.0-beta.3) (2022-08-19)


### 🍕 Features

* Implement Card Profile Component ([#232](https://github.com/open-sauced/insights/issues/232)) ([efae3c5](https://github.com/open-sauced/insights/commit/efae3c53fbd9b67ddbb2abd506fa43803581c7c6))

## [1.2.0-beta.2](https://github.com/open-sauced/insights/compare/v1.2.0-beta.1...v1.2.0-beta.2) (2022-08-19)


### 🐛 Bug Fixes

* added Radio and SuperlativeSelector component stories ([06d956c](https://github.com/open-sauced/insights/commit/06d956c9ab6c3ada912f25999ad81c78d0f69c5e))
* eslint errors ([c191e26](https://github.com/open-sauced/insights/commit/c191e266bf12e552af7d84fe768aaf56fb9c8e0f))


### 🧑‍💻 Code Refactoring

* Move Dashboard and Repositories into their own component ([#228](https://github.com/open-sauced/insights/issues/228)) ([8b40fd8](https://github.com/open-sauced/insights/commit/8b40fd87e40a58b22ff01920f2cf363b065ddb10)), closes [#208](https://github.com/open-sauced/insights/issues/208) [#201](https://github.com/open-sauced/insights/issues/201) [#202](https://github.com/open-sauced/insights/issues/202)
* replace context-filter-option with radio component ([41ed2b3](https://github.com/open-sauced/insights/commit/41ed2b3c51ac35e9aec7bd48c9c9393ccb811c8c))


### 🍕 Features

* **data:** adds live repo data and SWR ([#198](https://github.com/open-sauced/insights/issues/198)) ([b6d80c3](https://github.com/open-sauced/insights/commit/b6d80c3ac584fe1aa7a8d2b399194c7ec514c7f9)), closes [#191](https://github.com/open-sauced/insights/issues/191) [#191](https://github.com/open-sauced/insights/issues/191) [#206](https://github.com/open-sauced/insights/issues/206) [#206](https://github.com/open-sauced/insights/issues/206)
* eChart for Contributors Component ([#216](https://github.com/open-sauced/insights/issues/216)) ([7d5837b](https://github.com/open-sauced/insights/commit/7d5837bef9cd1239793d77bb9562938bcdf608eb)), closes [#221](https://github.com/open-sauced/insights/issues/221) [#213](https://github.com/open-sauced/insights/issues/213) [#221](https://github.com/open-sauced/insights/issues/221)

## [1.2.0-beta.1](https://github.com/open-sauced/insights/compare/v1.1.3-beta.3...v1.2.0-beta.1) (2022-08-17)


### 🍕 Features

* Create Reports Filter Component ([#207](https://github.com/open-sauced/insights/issues/207)) ([efced23](https://github.com/open-sauced/insights/commit/efced2319433532e9ff124291dc64467da99abd8)), closes [#166](https://github.com/open-sauced/insights/issues/166)

### [1.1.3-beta.3](https://github.com/open-sauced/insights/compare/v1.1.3-beta.2...v1.1.3-beta.3) (2022-08-15)


### 🐛 Bug Fixes

* Removed gap from navbar and tools display ([#206](https://github.com/open-sauced/insights/issues/206)) ([a3de620](https://github.com/open-sauced/insights/commit/a3de6201b8a260a271ae871e785c2671d4e6d5ba))

### [1.1.3](https://github.com/open-sauced/insights/compare/v1.1.2...v1.1.3) (2022-08-15)


### 🧑‍💻 Code Refactoring

* Reimplemented nav highlight ([#201](https://github.com/open-sauced/insights/issues/201)) ([a33becb](https://github.com/open-sauced/insights/commit/a33becb95e19b9baa54e6b22d86e5186933140e6))


### 🐛 Bug Fixes

* Fixed issue where dashboard would not appear when a filter was applied ([#202](https://github.com/open-sauced/insights/issues/202)) ([9fe3e81](https://github.com/open-sauced/insights/commit/9fe3e816e9334312402c043415294040b71dc15d))

### [1.1.3-beta.2](https://github.com/open-sauced/insights/compare/v1.1.3-beta.1...v1.1.3-beta.2) (2022-08-15)


### 🐛 Bug Fixes

* Fixed issue where dashboard would not appear when a filter was applied ([#202](https://github.com/open-sauced/insights/issues/202)) ([9fe3e81](https://github.com/open-sauced/insights/commit/9fe3e816e9334312402c043415294040b71dc15d))

### [1.1.3-beta.1](https://github.com/open-sauced/insights/compare/v1.1.2...v1.1.3-beta.1) (2022-08-15)


### 🧑‍💻 Code Refactoring

* Reimplemented nav highlight ([#201](https://github.com/open-sauced/insights/issues/201)) ([a33becb](https://github.com/open-sauced/insights/commit/a33becb95e19b9baa54e6b22d86e5186933140e6))

### [1.1.2](https://github.com/open-sauced/insights/compare/v1.1.1...v1.1.2) (2022-08-14)


### 🐛 Bug Fixes

* **auth:** enable auth with SSR and API routes ([#196](https://github.com/open-sauced/insights/issues/196)) ([8228815](https://github.com/open-sauced/insights/commit/8228815cc3a5a47dbed0c021acbe0cb89d23c3ed)), closes [#176](https://github.com/open-sauced/insights/issues/176) [#189](https://github.com/open-sauced/insights/issues/189)

### [1.1.1](https://github.com/open-sauced/insights/compare/v1.1.0...v1.1.1) (2022-08-14)


### 🐛 Bug Fixes

* **ui:** broken tools nav ([#194](https://github.com/open-sauced/insights/issues/194)) ([b146875](https://github.com/open-sauced/insights/commit/b146875ac95ee2f62666238b0c30d477be7c8cd2)), closes [#187](https://github.com/open-sauced/insights/issues/187) [#193](https://github.com/open-sauced/insights/issues/193)

## [1.1.0](https://github.com/open-sauced/insights/compare/v1.0.5...v1.1.0) (2022-08-13)


### ✅ Tests

* enable parallel netlify build for storybook ([#170](https://github.com/open-sauced/insights/issues/170)) ([d6c5a75](https://github.com/open-sauced/insights/commit/d6c5a751339282afbd349211a473ebd3a43e09ff)), closes [#49](https://github.com/open-sauced/insights/issues/49)


### 🔁 Continuous Integration

* add better release target deployment urls ([#172](https://github.com/open-sauced/insights/issues/172)) ([f3a93f0](https://github.com/open-sauced/insights/commit/f3a93f019b53e1f0e52fddb7a8f90fe9336ca0d1))


### 🧑‍💻 Code Refactoring

* update login text to say connect with github. ([#178](https://github.com/open-sauced/insights/issues/178)) ([5b7e572](https://github.com/open-sauced/insights/commit/5b7e5720798c7a34aeac1fa663dfa1d614bb4b9c)), closes [#139](https://github.com/open-sauced/insights/issues/139)


### 🍕 Features

* add animation to the progress pie component ([#182](https://github.com/open-sauced/insights/issues/182)) ([90f4bbb](https://github.com/open-sauced/insights/commit/90f4bbb6f5350a3b557eb86dccf7c4fd1e6591fc)), closes [#126](https://github.com/open-sauced/insights/issues/126)
* make entire row for selectable table clickable ([#177](https://github.com/open-sauced/insights/issues/177)) ([8fb914a](https://github.com/open-sauced/insights/commit/8fb914a74b2342eb144bb08c0c1fc1949ad77e7c)), closes [#84](https://github.com/open-sauced/insights/issues/84)
* Simplify the Dashboard ([#155](https://github.com/open-sauced/insights/issues/155)) ([80d445c](https://github.com/open-sauced/insights/commit/80d445c953cd4c896afa76d12755bd78794f7c50))


### 🐛 Bug Fixes

* correct domain dot com bubble error ([#173](https://github.com/open-sauced/insights/issues/173)) ([3816edb](https://github.com/open-sauced/insights/commit/3816edbc1365566fbe0c709aa26ab2ef4613b854))
* Fixing 'Maximum Depth Reached' or Infinite Loop bug. ([#188](https://github.com/open-sauced/insights/issues/188)) ([d7a4954](https://github.com/open-sauced/insights/commit/d7a49548b43c6baef5ad3c95313178c918dc6df2))

## [1.1.0-beta.3](https://github.com/open-sauced/insights/compare/v1.1.0-beta.2...v1.1.0-beta.3) (2022-08-12)


### 🐛 Bug Fixes

* Delete codeql-analysis.yml ([#186](https://github.com/open-sauced/insights/issues/186)) ([d7262ce](https://github.com/open-sauced/insights/commit/d7262cee0b0335cd954bcd2ef07e7589af6d9984))
* Fixing 'Maximum Depth Reached' or Infinite Loop bug. ([#188](https://github.com/open-sauced/insights/issues/188)) ([d7a4954](https://github.com/open-sauced/insights/commit/d7a49548b43c6baef5ad3c95313178c918dc6df2))

## [1.1.0-beta.2](https://github.com/open-sauced/insights/compare/v1.1.0-beta.1...v1.1.0-beta.2) (2022-08-12)


### 🍕 Features

* add animation to the progress pie component ([#182](https://github.com/open-sauced/insights/issues/182)) ([90f4bbb](https://github.com/open-sauced/insights/commit/90f4bbb6f5350a3b557eb86dccf7c4fd1e6591fc)), closes [#126](https://github.com/open-sauced/insights/issues/126)
* make entire row for selectable table clickable ([#177](https://github.com/open-sauced/insights/issues/177)) ([8fb914a](https://github.com/open-sauced/insights/commit/8fb914a74b2342eb144bb08c0c1fc1949ad77e7c)), closes [#84](https://github.com/open-sauced/insights/issues/84)

## [1.1.0-beta.1](https://github.com/open-sauced/insights/compare/v1.0.4...v1.1.0-beta.1) (2022-08-11)


### ✅ Tests

* enable parallel netlify build for storybook ([#170](https://github.com/open-sauced/insights/issues/170)) ([d6c5a75](https://github.com/open-sauced/insights/commit/d6c5a751339282afbd349211a473ebd3a43e09ff)), closes [#49](https://github.com/open-sauced/insights/issues/49)


### 🔁 Continuous Integration

* add better release target deployment urls ([#172](https://github.com/open-sauced/insights/issues/172)) ([f3a93f0](https://github.com/open-sauced/insights/commit/f3a93f019b53e1f0e52fddb7a8f90fe9336ca0d1))


### 🐛 Bug Fixes

* correct domain dot com bubble error ([#173](https://github.com/open-sauced/insights/issues/173)) ([3816edb](https://github.com/open-sauced/insights/commit/3816edbc1365566fbe0c709aa26ab2ef4613b854))


### 🧑‍💻 Code Refactoring

* update login text to say connect with github. ([#178](https://github.com/open-sauced/insights/issues/178)) ([5b7e572](https://github.com/open-sauced/insights/commit/5b7e5720798c7a34aeac1fa663dfa1d614bb4b9c)), closes [#139](https://github.com/open-sauced/insights/issues/139)


### 🍕 Features

* Simplify the Dashboard ([#155](https://github.com/open-sauced/insights/issues/155)) ([80d445c](https://github.com/open-sauced/insights/commit/80d445c953cd4c896afa76d12755bd78794f7c50))

### [1.0.4-beta.3](https://github.com/open-sauced/insights/compare/v1.0.4-beta.2...v1.0.4-beta.3) (2022-08-11)


### 🧑‍💻 Code Refactoring

* update login text to say connect with github. ([#178](https://github.com/open-sauced/insights/issues/178)) ([5b7e572](https://github.com/open-sauced/insights/commit/5b7e5720798c7a34aeac1fa663dfa1d614bb4b9c)), closes [#139](https://github.com/open-sauced/insights/issues/139)

### [1.0.4-beta.2](https://github.com/open-sauced/insights/compare/v1.0.4-beta.1...v1.0.4-beta.2) (2022-08-11)


### 🔁 Continuous Integration

* add better release target deployment urls ([#172](https://github.com/open-sauced/insights/issues/172)) ([f3a93f0](https://github.com/open-sauced/insights/commit/f3a93f019b53e1f0e52fddb7a8f90fe9336ca0d1))


### 🐛 Bug Fixes

* correct domain dot com bubble error ([#173](https://github.com/open-sauced/insights/issues/173)) ([3816edb](https://github.com/open-sauced/insights/commit/3816edbc1365566fbe0c709aa26ab2ef4613b854))

### [1.0.4-alpha.2](https://github.com/open-sauced/insights/compare/v1.0.4-alpha.1...v1.0.4-alpha.2) (2022-08-11)


### 🐛 Bug Fixes

* correct domain dot com bubble error ([#173](https://github.com/open-sauced/insights/issues/173)) ([3816edb](https://github.com/open-sauced/insights/commit/3816edbc1365566fbe0c709aa26ab2ef4613b854))

### [1.0.4-alpha.1](https://github.com/open-sauced/insights/compare/v1.0.3...v1.0.4-alpha.1) (2022-08-11)


### ✅ Tests

* enable parallel netlify build for storybook ([#170](https://github.com/open-sauced/insights/issues/170)) ([d6c5a75](https://github.com/open-sauced/insights/commit/d6c5a751339282afbd349211a473ebd3a43e09ff)), closes [#49](https://github.com/open-sauced/insights/issues/49)


### 🔁 Continuous Integration

* add better release target deployment urls ([#172](https://github.com/open-sauced/insights/issues/172)) ([f3a93f0](https://github.com/open-sauced/insights/commit/f3a93f019b53e1f0e52fddb7a8f90fe9336ca0d1))

### [1.0.4-beta.1](https://github.com/open-sauced/insights/compare/v1.0.3...v1.0.4-beta.1) (2022-08-11)


### ✅ Tests

* enable parallel netlify build for storybook ([#170](https://github.com/open-sauced/insights/issues/170)) ([d6c5a75](https://github.com/open-sauced/insights/commit/d6c5a751339282afbd349211a473ebd3a43e09ff)), closes [#49](https://github.com/open-sauced/insights/issues/49)

### [1.0.5](https://github.com/open-sauced/insights/compare/v1.0.4...v1.0.5) (2022-08-12)


### 🐛 Bug Fixes

* Delete codeql-analysis.yml ([#186](https://github.com/open-sauced/insights/issues/186)) ([d7262ce](https://github.com/open-sauced/insights/commit/d7262cee0b0335cd954bcd2ef07e7589af6d9984))

### [1.0.4](https://github.com/open-sauced/insights/compare/v1.0.3...v1.0.4) (2022-08-11)


### 🐛 Bug Fixes

* Make the description relevant ([#180](https://github.com/open-sauced/insights/issues/180)) ([f873039](https://github.com/open-sauced/insights/commit/f8730390798ce6de9e227dc6db7cc4da1b1637b7))

### [1.0.3](https://github.com/open-sauced/insights/compare/v1.0.2...v1.0.3) (2022-08-10)


### 🔁 Continuous Integration

* correct netlify build ([#163](https://github.com/open-sauced/insights/issues/163)) ([d78a088](https://github.com/open-sauced/insights/commit/d78a0886d3d3f23214eb0861bde84adb6bbeea3a))

### [1.0.2](https://github.com/open-sauced/insights/compare/v1.0.1...v1.0.2) (2022-08-10)


### 🎨 Styles

* Add transition to the `HighlightCard` progress bar ([#162](https://github.com/open-sauced/insights/issues/162)) ([0b2987a](https://github.com/open-sauced/insights/commit/0b2987abe60642fa094508e15d4055bcb664a12c))

### [1.0.1](https://github.com/open-sauced/insights/compare/v1.0.0...v1.0.1) (2022-08-10)


### 🐛 Bug Fixes

* correct storybook deps ([a930c0b](https://github.com/open-sauced/insights/commit/a930c0b99f593fbcf75b8a4e337ac797fb98d2be))

## 1.0.0 (2022-08-10)


### ⚠ BREAKING CHANGES

* Updated routing and removed references to portal in app (#99)
* Updated Atoms to enforce parent props and be easier to use (#70)
* Updating Storybook folder structure. (#41)

### 📝 Documentation

* Add a to-do to create an Avatar component ([237a633](https://github.com/open-sauced/insights/commit/237a63376f374af6e34186940bb4087e2f95057a))
* Add background to OnboardingButton story ([9e4972e](https://github.com/open-sauced/insights/commit/9e4972e9ebb677d936d96f88d3d76747316873e6))
* Add Button to storybook ([5926ea6](https://github.com/open-sauced/insights/commit/5926ea6ba53a79446004fa92a417f80e77f8e99b))
* Add Button Types to storybook ([0e28aa6](https://github.com/open-sauced/insights/commit/0e28aa6e076f620cc29efbbcbaf56c0031a3dc77))
* Add Button with Icons to storybook ([8ac670b](https://github.com/open-sauced/insights/commit/8ac670b32dc4da6d7b472b03068531e6a03ec890))
* Add controls to Avatar storybook ([1fc1d54](https://github.com/open-sauced/insights/commit/1fc1d547841ae79ea479bd7ac31b2aa2a5f685d3))
* Add controls to select the FilterCard icon to Storybook ([e2e96a1](https://github.com/open-sauced/insights/commit/e2e96a1882261bb27cb93b83d7a70f39c3a66e9e))
* Add FilterCards to Storybook ([041b6d0](https://github.com/open-sauced/insights/commit/041b6d0379856f974cf1d15306a2a5f8c11f63e8))
* Add HighlightCard to storybook ([ab11b8e](https://github.com/open-sauced/insights/commit/ab11b8e32a8c010ad6e1d7adb3534d061aab9bfc))
* Add OnboardingButton to storybook ([5517b5f](https://github.com/open-sauced/insights/commit/5517b5f0b24d3ee9c29012fef756b795e463df6b))
* Add pre-defined icon options to storybook ([08acf12](https://github.com/open-sauced/insights/commit/08acf125703bb4a147429cd3c6bd0aaad37fa9af))
* Add ProgressPie to storybook ([be8bab4](https://github.com/open-sauced/insights/commit/be8bab442daa90ec461c057e15550e5fc6ac981d))
* Document `metricIncreases` in storybook ([d12e828](https://github.com/open-sauced/insights/commit/d12e8283c610eb2c9c23817629dbdc1e18a6177c))
* Document new previews for Avatar component ([182c055](https://github.com/open-sauced/insights/commit/182c055504d84494124cdca4f6d4e439e024a579))
* Remove filterName attribute from storybook ([e851d03](https://github.com/open-sauced/insights/commit/e851d034b70e50f2af0f72398687c93619540a72))
* Update HighlightCard storybook documentation ([6ba8998](https://github.com/open-sauced/insights/commit/6ba8998afa0e283008297856d94cc1dbfd154cb8))
* Update storybook deployment in the README.md ([#38](https://github.com/open-sauced/insights/issues/38)) ([4240f40](https://github.com/open-sauced/insights/commit/4240f40a4c3dfabb4798b8f8eef2699db28508d1))


### 🎨 Styles

* Add flexbox to ToolList Button child span and remove whitespace wrap ([2ce327e](https://github.com/open-sauced/insights/commit/2ce327e8a7e51590cec5d199682bf9e1f7afe312))
* Add gap when percentage is over than 0 ([fde77e2](https://github.com/open-sauced/insights/commit/fde77e23cd829b9a2c3b5914c8885bef3018a952))
* Define `max-width` to the HighlightCard ([e23d670](https://github.com/open-sauced/insights/commit/e23d67059069540ecdd8ac5664d809e1f307e3af))
* Orange border only shows when focusing with keyboard ([3fb9fd3](https://github.com/open-sauced/insights/commit/3fb9fd3116cabbfae4345f243b349c04cf9b181a))
* Remove `overflow-hidden` from ToolList tab ([182104b](https://github.com/open-sauced/insights/commit/182104b642eb57a1d1412f77597391041eb21ba4))
* Rename ToolList Item class ([95d3bf2](https://github.com/open-sauced/insights/commit/95d3bf22ca808d596b92ffcf751cb2865a3a65e0))
* Update card spacing and icon sizes ([903d947](https://github.com/open-sauced/insights/commit/903d9479d65ed3ea491eb6b54e17d600aa994653))
* Update OnboardingButton color and font styles ([6a8d785](https://github.com/open-sauced/insights/commit/6a8d785b8b5029aadf93d833bfb8d0cdc02154b2))
* Update ProgressPie orange tone ([210c3ad](https://github.com/open-sauced/insights/commit/210c3ad09d2c620df5ed19b4b7eb557205101829))
* Use `h1` as the main Heading ([a79ea32](https://github.com/open-sauced/insights/commit/a79ea32ab4f43e31b94e7e65b83306faa912c764))
* Use Tailwind colors instead of hard-coded colors ([6e7aa3e](https://github.com/open-sauced/insights/commit/6e7aa3ecfdc7730eb1a9bcaa3cfa582537189460))
* Vertically align the Button Icons ([1915aff](https://github.com/open-sauced/insights/commit/1915aff901aaa42bb6424b3fd748771555a505dd))


### 🧑‍💻 Code Refactoring

* Add text styles to the `Button` in Nav component ([bb189cc](https://github.com/open-sauced/insights/commit/bb189cc2802ffd7d99e159248937700fc35a2b68))
* Add typeof to Story ([3f32115](https://github.com/open-sauced/insights/commit/3f321150c0acb058dba54bf5313cc77aed5609b7))
* Fix lint in `next.config.js` ([f27c959](https://github.com/open-sauced/insights/commit/f27c95922dd0317280e101a7f1c5985523f0622a))
* Fix lint issue ([e408f5e](https://github.com/open-sauced/insights/commit/e408f5e6c9839d26fec1e1e7332c26830ea1e51d))
* Move `isRemovable` conditional only to the `x` icon ([b9c0ee5](https://github.com/open-sauced/insights/commit/b9c0ee5b55b6e83c5a04051cbc55bf3b7e118a1a))
* Remove `<progress>` element ([cb88eef](https://github.com/open-sauced/insights/commit/cb88eefac7bb43be569702852fb78274d10fb257))
* Remove `color` and `metric` props from HighlightCard ([a48db58](https://github.com/open-sauced/insights/commit/a48db582b0a4f69a7e6cdf41e5d518885e83210b))
* Remove disabled from button ([6c80098](https://github.com/open-sauced/insights/commit/6c8009816bf5d40046f833c8d462ea845556a8d6))
* Remove div that wraps the Link component ([09790f1](https://github.com/open-sauced/insights/commit/09790f14909c8d24a2722d6fcb3b7d6a8fcbb1d0))
* Rename `slate-a` to `slate-opacity` ([cddb37c](https://github.com/open-sauced/insights/commit/cddb37c9c1875c1286793726e416e9579c6f97ab))
* Reorganize AuthSection elements and add flex gap ([fced100](https://github.com/open-sauced/insights/commit/fced100ff06f9724a81f4caef792797a12d6336f))
* Update Avatar attributes in Auth Section ([5a22ff5](https://github.com/open-sauced/insights/commit/5a22ff565b746bc3c8cc7a4959baa696109b9ba0))
* Update FilterCard attributes in Header ([7c01131](https://github.com/open-sauced/insights/commit/7c01131d8532f1e1cdf5fdc9efee28a47058786f))
* Update FilterCard to not be removable on Header component ([37f2277](https://github.com/open-sauced/insights/commit/37f22776917a6b672bbb6ef133598da05dde751d))
* Update icon props ([4d7eb79](https://github.com/open-sauced/insights/commit/4d7eb79d71c418b87c39bbd3bd989fe49e5b97ce))
* Update ProgressPie size ([d97ee92](https://github.com/open-sauced/insights/commit/d97ee9233b3242274e39146761171d7c5ab1dfae))
* Update ProgressPie size in OnboardingButton ([3fd58e6](https://github.com/open-sauced/insights/commit/3fd58e650df33f06f342edf238d5147cf1196629))
* Updated Atoms to enforce parent props and be easier to use ([#70](https://github.com/open-sauced/insights/issues/70)) ([f54b41f](https://github.com/open-sauced/insights/commit/f54b41f769d332a3ce948552be9fa279ca253d89))
* Updated routing and removed references to portal in app ([#99](https://github.com/open-sauced/insights/issues/99)) ([47f6c78](https://github.com/open-sauced/insights/commit/47f6c7853aa24b67b91a9da630b4db9ccd9143a4))
* Updating Storybook folder structure. ([#41](https://github.com/open-sauced/insights/issues/41)) ([db231fd](https://github.com/open-sauced/insights/commit/db231fd50efc6f50949a7f48f9a7bddfa5437298))
* Use `Text` instead of `StrongText` ([8d2d657](https://github.com/open-sauced/insights/commit/8d2d6576a7482f69e97705b7903c0b478c94bb88))
* Use Nav as a wrapper ([e7ff5bb](https://github.com/open-sauced/insights/commit/e7ff5bb25e861846138b91badef48ab5c0ab642b))
* Use storybook documentation code ([401ba90](https://github.com/open-sauced/insights/commit/401ba9041693cc46aedfddd553eb7cf933b5ed8f))


### 🍕 Features

* Add `isRemovable` attribute to FilterCard ([4463a87](https://github.com/open-sauced/insights/commit/4463a87d0dfa0c0560cf6a7560a251ea3c036a27))
* Add `metricIncreases` prop ([cc70b27](https://github.com/open-sauced/insights/commit/cc70b270b9b3436c4af211a3c291924d1da0c130))
* Add accessibility attributes to ToolList tab item ([54de569](https://github.com/open-sauced/insights/commit/54de56901cb6f915a3ce2ccd4c603c371f7bc1e7))
* Add Avatar Component to Storybook ([#30](https://github.com/open-sauced/insights/issues/30)) ([7b662c7](https://github.com/open-sauced/insights/commit/7b662c756e1a13a3a72187f060c52bb24128f310))
* Add border to Avatar component ([ce53adf](https://github.com/open-sauced/insights/commit/ce53adff9f4129791a2f421eb83bc75518f72450))
* Add Context Filter component to Header ([#145](https://github.com/open-sauced/insights/issues/145)) ([0bc29b4](https://github.com/open-sauced/insights/commit/0bc29b4d482ae14668a51ea2945e0631b9827121)), closes [#138](https://github.com/open-sauced/insights/issues/138)
* Add HighlightCard icons ([c5c3477](https://github.com/open-sauced/insights/commit/c5c3477d86aa021bbdbfe1a94131b51ac13096f1))
* Add icon prop to FilterCard with pre-defined icons ([04b727c](https://github.com/open-sauced/insights/commit/04b727c1eadd466308a63abad5c40c6514278891))
* Add icons to FilterCard component ([982e9c7](https://github.com/open-sauced/insights/commit/982e9c7f608994839bb0757336f0e068649514df))
* Add initials and pre-defined sizes to Avatar ([713c61a](https://github.com/open-sauced/insights/commit/713c61a9b6f4fa475c45562e253ad473c6fbba28))
* Add link to the `HighlightCard` component ([#130](https://github.com/open-sauced/insights/issues/130)) ([a6db7d7](https://github.com/open-sauced/insights/commit/a6db7d7136ff9b5b9a3bd211c5741f238a02a3dd))
* Add metricArrow icon ([2058c23](https://github.com/open-sauced/insights/commit/2058c23931728e87b549422e5dc658da4aaca42d))
* Add mobile responsiveness to organisms and dashboard ([#81](https://github.com/open-sauced/insights/issues/81)) ([f9e58ef](https://github.com/open-sauced/insights/commit/f9e58ef82de152e17f4d4cfac720dcbbddd7e926))
* Add new props to the component ([b41d179](https://github.com/open-sauced/insights/commit/b41d179596330e6a9df9baf1edb3f7e449edf191))
* Add newly created Storybook components to Tools Display ([#77](https://github.com/open-sauced/insights/issues/77)) ([45f1a6e](https://github.com/open-sauced/insights/commit/45f1a6e18d32da895fe0afb0a89bc4450b5c37be))
* Add OnboardingButton to AuthSection ([58979ce](https://github.com/open-sauced/insights/commit/58979ce552457d0a706e52caf8a53b4a9de85f96))
* Add orange, blue, red, and grass colors ([8d8eb52](https://github.com/open-sauced/insights/commit/8d8eb528f7d390d7ac6266da15210f8adebca603))
* Add props to make component dynamic ([3704dcf](https://github.com/open-sauced/insights/commit/3704dcf49c7a67b96b08adeb31db661ec4c208c4))
* add release automation ([bd64682](https://github.com/open-sauced/insights/commit/bd64682483f71363e35311600d0fa475002ed4c5)), closes [#16](https://github.com/open-sauced/insights/issues/16)
* Add Slate from Radix Colors ([d9156f4](https://github.com/open-sauced/insights/commit/d9156f47f7fdeb1260cbb919f9c88b0e1489856e))
* Add top content ([d24dfdd](https://github.com/open-sauced/insights/commit/d24dfddc91c8b0fe551773870a0733c22ad5bd33))
* Add user authentication to app ([#96](https://github.com/open-sauced/insights/issues/96)) ([81f6208](https://github.com/open-sauced/insights/commit/81f6208cd9c1e9f6a7190405c1e4e33a2ecf6fef))
* Added design updates to app based on a All-Hands discussions and feedback from Terrence ([#1](https://github.com/open-sauced/insights/issues/1)) ([2db7553](https://github.com/open-sauced/insights/commit/2db75539fb206985ba1df9f35ec96236605b7cf0))
* Added Selectable Table component ([#60](https://github.com/open-sauced/insights/issues/60)) ([0b77189](https://github.com/open-sauced/insights/commit/0b771898fe36a163fe458239b343eabcff105660))
* Adds compliance checks to PRs ([#32](https://github.com/open-sauced/insights/issues/32)) ([7872532](https://github.com/open-sauced/insights/commit/787253294bfe0d9a3a08d1d6b684076542a7406c))
* adds template files ([e9b3ece](https://github.com/open-sauced/insights/commit/e9b3ecefdd52b5a14f342d55a7cc91ac9ce7eab0))
* Change all checkboxes in Selectable Table Component ([#123](https://github.com/open-sauced/insights/issues/123)) ([b0719c3](https://github.com/open-sauced/insights/commit/b0719c33c167947deebe082a839de33a829bc919))
* Change icon color based on which option ([0101d18](https://github.com/open-sauced/insights/commit/0101d18046930a999a0e6adb9b3a6344ced44e20))
* Create `<Button>` component ([9f3c77a](https://github.com/open-sauced/insights/commit/9f3c77a4b8167d03d4b1f172ff36ee81f37fff43))
* Create `ProgressPie` component ([1cee615](https://github.com/open-sauced/insights/commit/1cee6159300be5bfd572363f859ca8c54754e7c7))
* Create OnboardingButton component ([5056f6d](https://github.com/open-sauced/insights/commit/5056f6d749c18894da9fb38c8f928ef9280f2401))
* Create progress bar ([fa07ba6](https://github.com/open-sauced/insights/commit/fa07ba6b81f73593bfd3a20f25495d79ef93cbc1))
* Create styles for button types ([c9a3766](https://github.com/open-sauced/insights/commit/c9a3766e01dd05b34932fd4d4f7788ab66b82570))
* create weekly top5 ([#46](https://github.com/open-sauced/insights/issues/46)) ([41d10bf](https://github.com/open-sauced/insights/commit/41d10bff966e1094a1c9421f8c669e26fbdd83f1))
* Implement `<ContextFilter>` component ([#94](https://github.com/open-sauced/insights/issues/94)) ([18b5707](https://github.com/open-sauced/insights/commit/18b57075fab32d298f6f218e89142527c949e8ae))
* Implement ContextThumbnail component ([#35](https://github.com/open-sauced/insights/issues/35)) ([600463f](https://github.com/open-sauced/insights/commit/600463fa7fa58f79e2da3f1670f942bebb7e0040))
* Implement Dropdown Component and Auth dropdown list ([#95](https://github.com/open-sauced/insights/issues/95)) ([ef8a4a7](https://github.com/open-sauced/insights/commit/ef8a4a79a2abf1ad942be7fabd28b46964a59908))
* Implement Onboarding Flow UI ([#117](https://github.com/open-sauced/insights/issues/117)) ([9e4d8e4](https://github.com/open-sauced/insights/commit/9e4d8e4d95d4dea60913d1aac04b799fa5ec4f1c))
* Implemented first draft of eChart Scatter Chart ([#65](https://github.com/open-sauced/insights/issues/65)) ([9f1bc3d](https://github.com/open-sauced/insights/commit/9f1bc3d156834f72c642cc1138ff7e2e5447af41))
* Set up the HighlightCard component ([597c938](https://github.com/open-sauced/insights/commit/597c938a05e3df3ac3695ff7dd5f230d0c51cf19))
* Structure the component ([b765b61](https://github.com/open-sauced/insights/commit/b765b61e62bbfc3f31225968a3c09d9cd3bf1917))
* Structure the main information on HighlightCard ([60a1c56](https://github.com/open-sauced/insights/commit/60a1c56755e703ac8846cf406b38d82528d590dc))
* Style removable FilterCards ([83b6c92](https://github.com/open-sauced/insights/commit/83b6c92638a644e9c034aebd85a20375aaab8091))
* Update Tool List Nav to be more compatible with Storybook ([#51](https://github.com/open-sauced/insights/issues/51)) ([745378b](https://github.com/open-sauced/insights/commit/745378b1c38524111ec7186eb2cc3a305ea33247))
* working supabase auth ([#106](https://github.com/open-sauced/insights/issues/106)) ([186dc84](https://github.com/open-sauced/insights/commit/186dc84e9d122f191b746a97c59f5d570a00ac2c))


### 🐛 Bug Fixes

* add link to video ([3b27a69](https://github.com/open-sauced/insights/commit/3b27a69920253acbe97ec8768d7799433a2aca1b))
* Cleaning up CSS alignment ([#91](https://github.com/open-sauced/insights/issues/91)) ([b570898](https://github.com/open-sauced/insights/commit/b5708988de3a595312b54fcbd70a37bb62d7c3a1))
* correct missing state dependency ([f3a5e06](https://github.com/open-sauced/insights/commit/f3a5e0636e4436f6416ef42f22f3b0c8f50f90fe))
* Re-implemented disabled functionality on selected tool nav. ([#27](https://github.com/open-sauced/insights/issues/27)) ([50e3401](https://github.com/open-sauced/insights/commit/50e3401d599cfed103d9aa770f5444b7da8ea907))
* team name ([57530d5](https://github.com/open-sauced/insights/commit/57530d5704140a7722739da9708b3fc8a3f3d66d))
* **storybook:** Update folder convention for storybook builds ([#37](https://github.com/open-sauced/insights/issues/37)) ([6d819f0](https://github.com/open-sauced/insights/commit/6d819f073f4588b5716fad2a433fd1c6b74239fc))
* Updated auth-section with the new avatar component. ([#47](https://github.com/open-sauced/insights/issues/47)) ([5b1053c](https://github.com/open-sauced/insights/commit/5b1053cdcdfc46abbd8dee3edc1e59e455420aa7))
* Updated eslint formatter to fix problem of formatter not linting ever… ([#53](https://github.com/open-sauced/insights/issues/53)) ([b8475ba](https://github.com/open-sauced/insights/commit/b8475bae800a889feb4603c1d56af1bc1819795c))
* Updated secondary link to Avatar component to hacktoberfest for now. … ([#34](https://github.com/open-sauced/insights/issues/34)) ([22671a6](https://github.com/open-sauced/insights/commit/22671a638866eb35a855d887671195a2825fa911))


### 🔁 Continuous Integration

* Added Storybook deployment automation script to project. ([#21](https://github.com/open-sauced/insights/issues/21)) ([d3685d8](https://github.com/open-sauced/insights/commit/d3685d8a957e4f1867f9917d621156d81d94a64f))
* correct nextjs build location ([0b24025](https://github.com/open-sauced/insights/commit/0b2402526d0be4e996540a0646ee41565caf1240))
* correct release workflow dependencies ([461dffd](https://github.com/open-sauced/insights/commit/461dffd68a1d19b5ae87510fc477a380eced52a3))
* default environment to development ([a5c286e](https://github.com/open-sauced/insights/commit/a5c286e90e04ba261fd8574f4bb28266360475a5))
