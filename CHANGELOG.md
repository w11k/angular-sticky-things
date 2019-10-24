<a name="1.1.4"></a>
## [1.1.4](https://github.com/w11k/angular-sticky-things/compare/1.1.3...1.1.4) (2019-10-23)

### Features
* **sticky:** adds event output with position information to sticky components
* **sticky:** merge respect margin and scroll container feature ([f6daa60](https://github.com/w11k/angular-sticky-things/commit/f6daa60), [a29979b](https://github.com/w11k/angular-sticky-things/commit/a29979b))
* **sticky:** respect initial css margins ([7f46bab](https://github.com/w11k/angular-sticky-things/commit/7f46bab), [38d8205](https://github.com/w11k/angular-sticky-things/commit/38d8205))

<a name="1.1.3"></a>
## [1.1.3](https://github.com/w11k/angular-sticky-things/compare/1.1.1...1.1.3) (2019-10-23)
### Features

* **sticky:** adds event output with status information to sticky components ([7ab98f6](https://github.com/w11k/angular-sticky-things/commit/7ab98f64945fca3e43d46422c727e271f8a9e2d8)) closes [#37](https://github.com/w11k/angular-sticky-things/issues/37) & [#38](https://github.com/w11k/angular-sticky-things/pull/38)

<a name="1.1.1"></a>
## [1.1.1](https://github.com/w11k/angular-sticky-things/compare/1.1.0...1.1.1) (2019-03-04)

### Features

* **sticky:** adds ability to change scroll container ([78c315d](https://github.com/w11k/angular-sticky-things/commit/78c315d)), closes [#25](https://github.com/w11k/angular-sticky-things/issues/25)
* **sticky:** bump angular support to 8.x.x ([9a08ba1](https://github.com/w11k/angular-sticky-things/commit/9a08ba1))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/w11k/angular-sticky-things/compare/1.0.6...1.1.0) (2018-12-31)


### Features

* **dev:** extends dev by toggle for sticky elements height ([cfed356](https://github.com/w11k/angular-sticky-things/commit/cfed356))
* **sticky:** enables height change, exposes recalculate method, combine all possible triggers in one stream ([9407681](https://github.com/w11k/angular-sticky-things/commit/9407681))
* **sticky:** improves the enabled=false handling ([cd8f7bc](https://github.com/w11k/angular-sticky-things/commit/cd8f7bc))



<a name="1.0.6"></a>
## [1.0.6](https://gitlab.com/w11k-es/angular-sticky-things/compare/1.0.5...1.0.6) (2018-12-07)


### Bug Fixes

* **sticky-directive:** fix element jumping ([9d59702](https://gitlab.com/w11k-es/angular-sticky-things/commit/9d59702))



<a name="1.0.5"></a>
## [1.0.5](https://gitlab.com/w11k-es/angular-sticky-things/compare/1.0.4...1.0.5) (2018-12-03)


### Bug Fixes

* **margin:** respect empty space above ([71ecdbe](https://gitlab.com/w11k-es/angular-sticky-things/commit/71ecdbe))
* **margins:** respect margin top in start calculation ([4ec6625](https://gitlab.com/w11k-es/angular-sticky-things/commit/4ec6625))
* **sticky-directive:** use resizeThrottled$ observable ([ad3a8a9](https://gitlab.com/w11k-es/angular-sticky-things/commit/ad3a8a9))


### Features

* **margins:** adds marginBottom ([c0e3cb4](https://gitlab.com/w11k-es/angular-sticky-things/commit/c0e3cb4))
* **sticky-directive:** add enable flag ([9d6d952](https://gitlab.com/w11k-es/angular-sticky-things/commit/9d6d952))
* **sticky-directive:** add marginTop input ([89f8afd](https://gitlab.com/w11k-es/angular-sticky-things/commit/89f8afd))



<a name="1.0.4"></a>
## [1.0.4](https://gitlab.com/w11k-es/angular-sticky-things/compare/1.0.3...1.0.4) (2018-11-20)


### Bug Fixes

* **aot:** makes host listener public ([e51c132](https://gitlab.com/w11k-es/angular-sticky-things/commit/e51c132))



<a name="1.0.3"></a>
## [1.0.3](https://gitlab.com/w11k-es/angular-sticky-things/compare/1.0.2...1.0.3) (2018-09-16)


### Bug Fixes

* **boundary:** adds missing check for boundary element in order to prevent NPE ([014effc](https://gitlab.com/w11k-es/angular-sticky-things/commit/014effc))



<a name="1.0.2"></a>
## [1.0.2](https://gitlab.com/w11k-es/angular-sticky-things/compare/1.0.1...1.0.2) (2018-09-16)


### Features

* **dependency:** removes [@w11k](https://gitlab.com/w11k)/ngx-componentdestroyed for easier handling of peerDependencies ([6df0aa4](https://gitlab.com/w11k-es/angular-sticky-things/commit/6df0aa4))



<a name="1.0.1"></a>
## [1.0.1](https://gitlab.com/w11k-es/angular-sticky-things/compare/1.0.0...1.0.1) (2018-09-15)


### Bug Fixes

* **dependency:** fixes dependency in libraries 'package.json' file ([e5b9d39](https://gitlab.com/w11k-es/angular-sticky-things/commit/e5b9d39))



<a name="1.0.0"></a>
# [1.0.0](https://gitlab.com/w11k-es/angular-sticky-things/compare/0.2.0...1.0.0) (2018-09-15)


### Bug Fixes

* **demo:** fixes home height on small devices ([88bdccf](https://gitlab.com/w11k-es/angular-sticky-things/commit/88bdccf))
* **sticky:** fixes minor position issue for boundary elements ([2c79fc0](https://gitlab.com/w11k-es/angular-sticky-things/commit/2c79fc0))


### Features

* **demo:** adds breakpoint to dev demo ([0479a52](https://gitlab.com/w11k-es/angular-sticky-things/commit/0479a52))
* **sticky:** rewrites scroll logic in rxjs in order to fix a bug, adds e2e tests and fixes a bug when boundary class was not removed ([1860784](https://gitlab.com/w11k-es/angular-sticky-things/commit/1860784))


### BREAKING CHANGES

* **sticky:** This package has now a dependency on rxjs and @w11k/ngx-componentdestroyed



<a name="0.2.0"></a>
# [0.2.0](https://gitlab.com/w11k-es/angular-sticky-things/compare/0.1.3...0.2.0) (2018-09-04)


### Bug Fixes

* **stick:** calculates now left properly, works now in nested elements and correctly calculates offsetTop. ([34eae37](https://gitlab.com/w11k-es/angular-sticky-things/commit/34eae37))
* **sticky:** fixes bug on window:resize ([8170a67](https://gitlab.com/w11k-es/angular-sticky-things/commit/8170a67))
* **sticky:** fixes wrong directive name in developer warning ([f592eb1](https://gitlab.com/w11k-es/angular-sticky-things/commit/f592eb1))


### Features

* **npm:** adds readme and license to npm package ([af28e20](https://gitlab.com/w11k-es/angular-sticky-things/commit/af28e20))
* **sticky:** implements boundary elements ([4538b5a](https://gitlab.com/w11k-es/angular-sticky-things/commit/4538b5a))
* **sticky:** removes deprecated methods 'getHeight' and 'getWidth' ([0875601](https://gitlab.com/w11k-es/angular-sticky-things/commit/0875601))



<a name="0.1.4"></a>
## [0.1.4](https://gitlab.com/w11k-es/angular-sticky-things/compare/0.1.3...0.1.4) (2018-09-04)


### Bug Fixes

* **stick:** calculates now left properly, works now in nested elements and correctly calculates offsetTop. ([34eae37](https://gitlab.com/w11k-es/angular-sticky-things/commit/34eae37))


### Features

* **npm:** adds readme and license to npm package ([af28e20](https://gitlab.com/w11k-es/angular-sticky-things/commit/af28e20))



<a name="0.1.3"></a>
## [0.1.3](https://gitlab.com/w11k-es/angular-sticky-things/compare/0.1.2...0.1.3) (2018-08-15)



<a name="0.1.2"></a>
## [0.1.2](https://gitlab.com/w11k-es/angular-sticky-things/compare/0.1.1...0.1.2) (2018-08-15)


### Bug Fixes

* **demo:** typo ([898619d](https://gitlab.com/w11k-es/angular-sticky-things/commit/898619d))
* **stick:** defaults now to false in order to have proper detection on page that are already scrolled down at load ([07a4b51](https://gitlab.com/w11k-es/angular-sticky-things/commit/07a4b51))
* **width:** restore elements width on resize ([45db16e](https://gitlab.com/w11k-es/angular-sticky-things/commit/45db16e))


### Features

* **host-listener:** limit makeSticky & removeSticky calls ([1ff348f](https://gitlab.com/w11k-es/angular-sticky-things/commit/1ff348f))
* **position:** respects elements position (width) ([08e0f61](https://gitlab.com/w11k-es/angular-sticky-things/commit/08e0f61))



<a name="0.1.1"></a>
## [0.1.1](https://gitlab.com/w11k-es/angular-sticky-things/compare/0.1.0...0.1.1) (2018-07-30)



<a name="0.1.0"></a>
# 0.1.0 (2018-07-30)


### Bug Fixes

* **lib:** improves prefixes (sticky for lib, demo for demo) ([721138d](https://gitlab.com/w11k-es/angular-sticky-things/commit/721138d))


### Features

* **ci:** first draft for gitlab-ci ([336a020](https://gitlab.com/w11k-es/angular-sticky-things/commit/336a020))
* **demo:** adds demo page ([57fe12a](https://gitlab.com/w11k-es/angular-sticky-things/commit/57fe12a))
* **lib:** adds sticky thing directive ([2e8fe33](https://gitlab.com/w11k-es/angular-sticky-things/commit/2e8fe33))



